import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  focus?: string;
  message?: string;
  // honeypot — must stay empty
  company?: string;
};

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "hello@viverehp.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "VIVERE <onboarding@resend.dev>";

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
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without doing anything.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const focus = (body.focus ?? "").trim();
  const message = (body.message ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10)
    errors.message = "Tell me a little more (10+ characters).";

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
          `New inquiry via viverehp.com\n\n` +
          `Name:  ${name}\n` +
          `Email: ${email}\n` +
          (focus ? `Focus: ${focus}\n` : "") +
          `\nMessage:\n${message}\n\n` +
          `Received: ${receivedAt}`,
        html: `
          <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:auto;color:#262019">
            <h2 style="font-weight:600;margin:0 0 4px">New VIVERE inquiry</h2>
            <p style="color:#8a8072;margin:0 0 20px;font-size:13px">via viverehp.com &middot; ${receivedAt}</p>
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
