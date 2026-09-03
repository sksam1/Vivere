"use client";

import Link from "next/link";
import { disclosures } from "../../content";
import Reveal from "../Reveal";

/**
 * The coaching agreement in plain language.
 *
 * Deliberately sober: no mask headlines, no staggered cascades, no gold
 * flourish beyond the rules. A terms page that performs is a terms page nobody
 * trusts. Anchors are derived from section titles so individual clauses can be
 * linked to directly, which matters when someone asks "where does it say that".
 */
const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function Disclosures() {
  return (
    <>
      <section className="relative pb-16 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
        <div className="mx-auto max-w-[80rem] px-6 md:px-10">
          <Reveal>
            <p className="label text-gold">Vivere</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-display-sm mt-7 text-marble">
              {disclosures.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-marble-dim">
              {disclosures.lead}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 font-display text-[0.6rem] uppercase tracking-[0.26em] text-stone">
              {disclosures.updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line-soft py-16 md:py-24">
        <div className="mx-auto max-w-[80rem] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Contents */}
            <nav aria-label="Contents" className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-gold">
                  Contents
                </h2>
                <ol className="mt-6 flex flex-col">
                  {disclosures.sections.map((s, i) => (
                    <li
                      key={s.title}
                      className="border-t border-line-soft last:border-b"
                    >
                      <a
                        href={`#${slug(s.title)}`}
                        className="group flex gap-4 py-3.5 transition-colors duration-300 hover:text-gold"
                      >
                        <span className="numeral shrink-0 text-[0.68rem] text-gold/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.95rem] leading-snug text-marble-dim transition-colors duration-300 group-hover:text-gold">
                          {s.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* Terms */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-16">
                {disclosures.sections.map((s, i) => (
                  <section
                    key={s.title}
                    id={slug(s.title)}
                    className="scroll-mt-28"
                  >
                    <Reveal y={30}>
                      <div className="flex items-baseline gap-4">
                        <span className="numeral text-[0.7rem] text-gold/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-xl uppercase tracking-[0.1em] text-marble md:text-2xl">
                          {s.title}
                        </h2>
                      </div>

                      <ul className="mt-7 flex flex-col border-t border-line-soft">
                        {s.items.map((it) => (
                          <li
                            key={it}
                            className="flex gap-4 border-b border-line-soft py-4"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.7em] h-px w-4 shrink-0 bg-gold/50"
                            />
                            <span className="leading-relaxed text-marble-dim">
                              {it}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </section>
                ))}
              </div>

              <Reveal y={30}>
                <p className="mt-16 border-l border-gold/40 pl-6 font-display text-lg italic leading-relaxed text-marble">
                  {disclosures.closing}
                </p>
              </Reveal>

              <Reveal y={30}>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                  <Link
                    href="/wellness-core"
                    className="group inline-flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:text-gold-bright"
                  >
                    Back to Wellness Core
                    <span
                      aria-hidden
                      className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
                    />
                  </Link>
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.26em] text-marble-dim transition-colors duration-300 hover:text-gold"
                  >
                    Ask a question first
                    <span
                      aria-hidden
                      className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
