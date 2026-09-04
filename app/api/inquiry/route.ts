import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";
import { focusOptions } from "../../content";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  focus?: string;
  message?: string;
  // honeypot — must stay empty
  company?: string;
};

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "hello@viverehumanperformance.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "VIVERE <hello@viverehumanperformance.com>";

/**
 * Field caps. A genuine inquiry is a few paragraphs; these are generous for a
 * person and hostile to a script. Enforced server-side because the matching
 * `maxLength` attributes on the form are a courtesy to humans, not a control.
 */
const LIMITS = { name: 100, email: 254, message: 5000 } as const;

/** Whole-body ceiling, checked before the JSON is parsed. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Rate limits. The public endpoint spends two finite resources on every call:
 * the owner's attention and the Resend send quota. `PER_IP` stops one person
 * hammering the form; `GLOBAL` is the backstop that keeps a distributed flood
 * from draining the daily quota before anyone notices.
 *
 * Caveat: this state lives in the instance's memory, so on Vercel each warm
 * lambda counts separately and a cold start forgets everything. That makes it
 * a speed bump, not a wall. For a real limit, move the counters to Vercel KV
 * (see TODO(persistence) below — the same store serves both needs).
 */
const PER_IP = { max: 5, windowMs: 10 * 60 * 1000 };
const GLOBAL = { max: 60, windowMs: 60 * 60 * 1000 };

const hits = new Map<string, number[]>();

/**
 * Sliding window. Returns false once `max` timestamps sit inside the window.
 * Prunes as it goes, and sweeps the whole map when it grows, so a long-lived
 * instance under a spray of unique IPs cannot leak memory indefinitely.
 */
function allow(key: string, { max, windowMs }: { max: number; windowMs: number }) {
  const now = Date.now();

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t > windowMs)) hits.delete(k);
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

/**
 * Client address. `x-forwarded-for` is set by Vercel's proxy; the left-most
 * entry is the original client. Spoofable in principle, but the header is
 * rewritten at the edge on Vercel, so it is the best signal available here.
 */
function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Always logs the inquiry so nothing is lost even if email delivery fails. */
async function logInquiry(entry: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "inquiries.jsonl"),
      JSON.stringify(entry) + "\n",
      "utf8",
    );
  } catch {
    // Serverless filesystems are read-only/ephemeral — the console is the
    // durable log there (visible in Vercel → Logs). Never throw.
    console.log("[inquiry]", JSON.stringify(entry));
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!allow(`ip:${ip}`, PER_IP) || !allow("global", GLOBAL)) {
    console.warn(`[inquiry] rate limited ${ip}`);
    return NextResponse.json(
      { error: "Too many inquiries just now. Please try again shortly." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  // Size guard before parsing: `req.json()` on a route handler will happily
  // buffer a body of any size, so an unbounded POST is otherwise free to send.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without doing anything.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const focusRaw = (body.focus ?? "").trim();
  const message = (body.message ?? "").trim();

  // Anything outside the form's own chips is dropped rather than rejected: it
  // can only come from a hand-rolled request, and it is an optional field.
  const focus = (focusOptions as readonly string[]).includes(focusRaw)
    ? focusRaw
    : "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!isEmail(email) || email.length > LIMITS.email)
    errors.email = "Please enter a valid email.";

  if (message.length < 10)
    errors.message = "Tell me a little more (10+ characters).";
  else if (message.length > LIMITS.message)
    errors.message = `Please keep your note under ${LIMITS.message} characters.`;

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const receivedAt = new Date().toISOString();
  const entry = { receivedAt, name, email, focus, message };

  // 1) Durable log — the requirement: log name, email, and inquiry.
  // TODO(persistence): for a permanent, queryable record in production, write
  // `entry` to Vercel Postgres or KV here (the file log below is dev-only).
  await logInquiry(entry);

  // 2) Notify the owner by email (no mail client needed on the visitor's end).
  const apiKey = process.env.RESEND_API_KEY;
  let emailed = false;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New VIVERE inquiry: ${name}${focus ? ` (${focus})` : ""}`,
        text:
          `New inquiry via viverehumanperformance.com\n\n` +
          `Name:  ${name}\n` +
          `Email: ${email}\n` +
          (focus ? `Focus: ${focus}\n` : "") +
          `\nMessage:\n${message}\n\n` +
          `Received: ${receivedAt}`,
        html: `
          <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:auto;color:#262019">
            <h2 style="font-weight:600;margin:0 0 4px">New VIVERE inquiry</h2>
            <p style="color:#8a8072;margin:0 0 20px;font-size:13px">via viverehumanperformance.com &middot; ${receivedAt}</p>
            <table style="width:100%;border-collapse:collapse;font-size:15px">
              <tr><td style="padding:8px 0;color:#8a8072;width:80px">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;color:#8a8072">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              ${focus ? `<tr><td style="padding:8px 0;color:#8a8072">Focus</td><td style="padding:8px 0">${escapeHtml(focus)}</td></tr>` : ""}
            </table>
            <div style="margin-top:16px;padding:16px;background:#f7f2ea;border-radius:12px;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
          </div>`,
      });
      emailed = !error;
      if (error) console.error("[inquiry] resend error", error);
    } catch (e) {
      console.error("[inquiry] send failed", e);
    }
  } else {
    console.warn(
      "[inquiry] RESEND_API_KEY not set — inquiry logged but email not sent.",
    );
  }

  return NextResponse.json({ ok: true, emailed });
}
