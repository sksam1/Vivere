import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

/**
 * Durable storage for inquiries, and the counters behind the rate limit.
 *
 * Both need the same thing: state that outlives a single serverless instance.
 * A Redis store (Upstash, provisioned through the Vercel marketplace) provides
 * it. When no store is configured the module degrades on purpose rather than
 * failing: inquiries fall back to the dev file log, and rate limiting falls
 * back to per-instance memory. That keeps `npm run dev` working with no setup,
 * and it keeps a misconfigured production deploy taking inquiries instead of
 * dropping them on the floor.
 */

export type StoreBackend = "redis" | "file" | "console";

export type Inquiry = {
  receivedAt: string;
  name: string;
  email: string;
  focus: string;
  message: string;
};

const KEY_INQUIRIES = "vivere:inquiries";
/** Newest-first list cap. Well past any plausible volume, but not unbounded. */
const KEEP_LAST = 5000;

/**
 * The marketplace integration injects REST credentials, but the variable names
 * differ by how the store was connected: the Upstash-native pair, or the
 * `KV_`-prefixed pair kept for compatibility with the old Vercel KV SDK. Accept
 * either so the code does not depend on which route was taken.
 */
function credentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? null;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.KV_REST_API_TOKEN ??
    null;
  return url && token ? { url, token } : null;
}

let client: Redis | null | undefined;

/** `undefined` = not yet resolved, `null` = no store configured. */
function redis(): Redis | null {
  if (client !== undefined) return client;
  const creds = credentials();
  client = creds ? new Redis(creds) : null;
  if (!client) {
    console.warn(
      "[inquiry] no Redis credentials — using in-memory limits and the file log.",
    );
  }
  return client;
}

export function hasDurableStore() {
  return credentials() !== null;
}

/* ------------------------------------------------------------------ *
 * Rate limiting
 * ------------------------------------------------------------------ */

const memoryHits = new Map<string, number[]>();

type Window = { max: number; windowMs: number };

/** Per-instance sliding window. The fallback when there is no Redis. */
function allowInMemory(key: string, { max, windowMs }: Window) {
  const now = Date.now();

  if (memoryHits.size > 5000) {
    for (const [k, times] of memoryHits) {
      if (times.every((t) => now - t > windowMs)) memoryHits.delete(k);
    }
  }

  const recent = (memoryHits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    memoryHits.set(key, recent);
    return false;
  }
  recent.push(now);
  memoryHits.set(key, recent);
  return true;
}

/**
 * Shared sliding window, held in a sorted set scored by timestamp.
 *
 * Reads before it writes, so a rejected request does not extend its own
 * lockout: expired entries are trimmed and counted in one round trip, and the
 * new entry is only added once the request is known to be under the limit.
 */
async function allowInRedis(key: string, { max, windowMs }: Window) {
  const db = redis();
  if (!db) return allowInMemory(key, { max, windowMs });

  const now = Date.now();
  const cutoff = now - windowMs;

  try {
    const pipe = db.pipeline();
    pipe.zremrangebyscore(key, 0, cutoff);
    pipe.zcard(key);
    const [, count] = (await pipe.exec()) as [number, number];

    if (count >= max) return false;

    const add = db.pipeline();
    // The member must be unique or repeat requests in the same millisecond
    // collapse into one entry and the window undercounts.
    add.zadd(key, { score: now, member: `${now}:${Math.random()}` });
    add.pexpire(key, windowMs);
    await add.exec();
    return true;
  } catch (e) {
    // A store outage must not take the form offline. Fall back to the
    // per-instance limiter, which is weaker but still a real ceiling.
    console.error("[inquiry] rate limit store failed, using memory", e);
    return allowInMemory(key, { max, windowMs });
  }
}

export function allow(key: string, window: Window) {
  return allowInRedis(key, window);
}

/* ------------------------------------------------------------------ *
 * Inquiry records
 * ------------------------------------------------------------------ */

/** Dev-only file log. Serverless filesystems are read-only or ephemeral. */
async function saveToFile(entry: Inquiry): Promise<StoreBackend> {
  try {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "inquiries.jsonl"),
      JSON.stringify(entry) + "\n",
      "utf8",
    );
    return "file";
  } catch {
    console.log("[inquiry]", JSON.stringify(entry));
    return "console";
  }
}

/**
 * Persists one inquiry and reports where it landed. Never throws: losing the
 * record is bad, but failing the request loses the lead outright, and the
 * console line below is still captured in the platform's logs.
 */
export async function saveInquiry(entry: Inquiry): Promise<StoreBackend> {
  const db = redis();
  if (!db) return saveToFile(entry);

  try {
    const pipe = db.pipeline();
    pipe.lpush(KEY_INQUIRIES, JSON.stringify(entry));
    pipe.ltrim(KEY_INQUIRIES, 0, KEEP_LAST - 1);
    await pipe.exec();
    return "redis";
  } catch (e) {
    console.error("[inquiry] redis write failed, falling back", e);
    return saveToFile(entry);
  }
}

/** Newest first. Backs the `npm run inquiries` reader. */
export async function readInquiries(limit = 50): Promise<Inquiry[]> {
  const db = redis();
  if (!db) throw new Error("No Redis store configured.");
  const rows = await db.lrange<Inquiry | string>(KEY_INQUIRIES, 0, limit - 1);
  // The client parses JSON strings automatically, but a raw string can come
  // back if a value was ever written by something else. Handle both.
  return rows.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
}

export async function countInquiries() {
  const db = redis();
  if (!db) throw new Error("No Redis store configured.");
  return db.llen(KEY_INQUIRIES);
}
