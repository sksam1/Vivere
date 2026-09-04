/**
 * Prints stored inquiries, newest first.
 *
 * The route writes them to Redis in production and to `.data/inquiries.jsonl`
 * in dev; this reads whichever is configured. It talks to the Upstash REST API
 * directly rather than importing the app's store module, so it stays a plain
 * node script with no build step.
 *
 * Usage:
 *   npm run inquiries          # latest 50
 *   npm run inquiries -- 200   # latest 200
 */
import { readFileSync, existsSync } from "node:fs";

/** Minimal .env reader: node does not load .env.local outside of Next. */
function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, key, raw] = m;
    if (process.env[key]) continue;
    process.env[key] = raw.replace(/^["']|["']$/g, "");
  }
}
loadEnv(".env.local");

const limit = Number(process.argv[2] ?? 50);
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

function show(entries, source) {
  if (!entries.length) {
    console.log(`No inquiries stored (${source}).`);
    return;
  }
  console.log(`${entries.length} inquiry(s), newest first — ${source}\n`);
  for (const e of entries) {
    console.log(`  ${e.receivedAt}`);
    console.log(`  ${e.name} <${e.email}>${e.focus ? `  [${e.focus}]` : ""}`);
    console.log(
      `  ${String(e.message).replace(/\s+/g, " ").slice(0, 300)}${
        e.message.length > 300 ? "…" : ""
      }`,
    );
    console.log("  " + "-".repeat(64));
  }
}

if (url && token) {
  const res = await fetch(`${url}/lrange/vivere:inquiries/0/${limit - 1}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error(`Redis read failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const { result } = await res.json();
  show(
    result.map((r) => (typeof r === "string" ? JSON.parse(r) : r)),
    "redis",
  );
} else if (existsSync(".data/inquiries.jsonl")) {
  const rows = readFileSync(".data/inquiries.jsonl", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l))
    .reverse()
    .slice(0, limit);
  show(rows, ".data/inquiries.jsonl (dev)");
} else {
  console.log(
    "No store configured and no dev log found.\n" +
      "Set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (or the KV_ pair)\n" +
      "in .env.local to read production inquiries locally.",
  );
}
