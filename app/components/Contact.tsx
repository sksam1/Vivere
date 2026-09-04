"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { contact, focusOptions, site } from "../content";
import Reveal from "./Reveal";
import Social from "./Social";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [focus, setFocus] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  /** Server-supplied failure text (rate limit, oversized body). */
  const [notice, setNotice] = useState<string | null>(null);

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setNotice(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, focus }),
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      if (!res.ok) {
        // 429 (rate limited) and 413 (oversized) carry a message worth showing
        // verbatim, so the visitor knows to wait or trim rather than retrying
        // blindly into the same wall.
        const data = await res.json().catch(() => null);
        setNotice(data?.error ?? null);
        throw new Error("failed");
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Pitch */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="text-display-sm text-marble">{contact.title}</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-marble-dim">
              {contact.lead}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10">
              <div className="my-6 h-px w-20 rule-gold" />
              <p className="font-display text-sm uppercase tracking-[0.28em] text-gold">
                {contact.motto}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block text-marble-dim underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                {site.email}
              </a>
              <div className="mt-6">
                <Social size={20} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <p role="status" aria-live="polite" className="sr-only">
            {status === "sending" && "Sending your inquiry."}
            {status === "done" &&
              `Message received. Thank you, ${form.name.split(" ")[0] || "friend"}. We will reply within a day.`}
            {status === "error" &&
              (notice ?? "Something went wrong. Please try again.")}
            {status === "idle" &&
              Object.keys(errors).length > 0 &&
              "There were problems with your submission. Please review the highlighted fields."}
          </p>
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="flex min-h-[360px] flex-col items-center justify-center border border-line bg-panel/40 p-10 text-center"
              >
                <span className="font-display text-4xl text-gold">✦</span>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-[0.14em] text-marble">
                  Message received
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-marble-dim">
                  Thank you, {form.name.split(" ")[0] || "friend"}. I read every
                  note and will reply within a day. Press on.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </div>

                <div>
                  <span className="mb-3 block font-display text-[0.62rem] uppercase tracking-[0.24em] text-marble-dim">
                    Focus <span className="text-stone">(optional)</span>
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {focusOptions.map((opt) => {
                      const on = focus === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFocus(on ? "" : opt)}
                          aria-pressed={on}
                          className={`border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                            on
                              ? "border-gold bg-gold text-obsidian"
                              : "border-line text-marble-dim hover:border-gold/60 hover:text-gold"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field
                  label="Where you stand"
                  name="message"
                  textarea
                  value={form.message}
                  onChange={(v) => update("message", v)}
                  error={errors.message}
                  required
                  maxLength={5000}
                />

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 font-display text-[0.72rem] uppercase tracking-[0.28em] font-semibold text-obsidian transition-colors duration-500 hover:bg-gold-bright disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending" : "Send inquiry"}
                    <span
                      aria-hidden
                      className="h-px w-5 bg-obsidian transition-all duration-500 group-hover:w-8"
                    />
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-gold">
                      {notice ?? "Something went wrong. Please try again."}
                    </p>
                  )}
                  <p className="text-xs text-stone">
                    Your email is used only to reply to you.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  autoComplete,
  required = false,
  maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  required?: boolean;
  /** Mirrors the server's cap, so a person is stopped before they submit. */
  maxLength?: number;
}) {
  const base =
    "w-full border bg-panel/50 px-4 py-3.5 text-marble placeholder:text-stone transition-colors duration-300 focus:bg-panel focus:outline-none";
  const ring = error
    ? "border-dashed border-gold"
    : "border-line focus:border-gold";
  const errorId = `${name}-error`;
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[0.62rem] uppercase tracking-[0.24em] text-marble-dim">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          required={required}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${ring} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${ring}`}
        />
      )}
      {error && (
        <span id={errorId} className="mt-1.5 block text-xs text-gold">
          {error}
        </span>
      )}
    </label>
  );
}
