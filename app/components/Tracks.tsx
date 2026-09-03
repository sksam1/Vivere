"use client";

import { tracks } from "../content";
import Reveal, { RevealGroup, revealItem } from "./Reveal";
import MaskHeadline from "./MaskHeadline";
import MagneticButton from "./MagneticButton";
import SiteLink from "./SiteLink";
import { motion } from "motion/react";

export default function Tracks() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <MaskHeadline
            lines={tracks.headline}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {tracks.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Track A — the foundation, struck in marble */}
          <Reveal className="lg:col-span-7" y={44}>
            <article className="group h-full bg-marble p-8 text-obsidian transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-10">
              <header className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-obsidian/55">
                    {tracks.a.label} · {tracks.a.weight}
                  </p>
                  <h3 className="font-display mt-2 text-2xl uppercase tracking-[0.08em] md:text-3xl">
                    {tracks.a.name}
                  </h3>
                </div>
                <span className="shrink-0 whitespace-nowrap bg-obsidian px-4 py-2 font-display text-[0.55rem] uppercase tracking-[0.22em] text-marble">
                  {tracks.a.badge}
                </span>
              </header>

              <RevealGroup as="ul" className="mt-10 flex flex-col" stagger={0.1}>
                {tracks.a.items.map((it) => (
                  <motion.li
                    key={it.title}
                    variants={revealItem}
                    className="border-t border-obsidian/12 py-6 first:border-t-0 first:pt-0"
                  >
                    <h4 className="font-display text-lg tracking-[0.02em]">
                      {it.title}
                    </h4>
                    <p className="mt-2 leading-relaxed text-obsidian/70">
                      {it.body}
                    </p>
                    {/* Only offers with a page of their own carry a link. */}
                    {it.href && it.cta && (
                      <SiteLink
                        link={{ label: it.cta, path: it.href }}
                        className="group/link mt-4 inline-flex items-center gap-3 font-display text-[0.6rem] uppercase tracking-[0.24em] text-obsidian/80 transition-colors duration-300 hover:text-obsidian"
                      >
                        {it.cta}
                        <span
                          aria-hidden
                          className="h-px w-5 bg-current transition-all duration-500 group-hover/link:w-9"
                        />
                      </SiteLink>
                    )}
                  </motion.li>
                ))}
              </RevealGroup>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="group/cta inline-flex items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.26em] text-obsidian"
                >
                  Start here
                  <span className="h-px w-6 bg-obsidian transition-all duration-500 group-hover/cta:w-10" />
                </a>
              </div>
            </article>
          </Reveal>

          {/* Track B — the edge, cut from obsidian */}
          <Reveal className="lg:col-span-5" y={44} delay={0.1}>
            <article className="group flex h-full flex-col border border-line bg-panel/40 p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-10">
              <header className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-stone">
                    {tracks.b.label} · {tracks.b.weight}
                  </p>
                  <h3 className="font-display mt-2 text-2xl uppercase tracking-[0.08em] text-marble md:text-3xl">
                    {tracks.b.name}
                  </h3>
                </div>
                <span className="shrink-0 whitespace-nowrap bg-gold px-4 py-2 font-display text-[0.55rem] uppercase tracking-[0.22em] text-obsidian">
                  {tracks.b.badge}
                </span>
              </header>

              <RevealGroup as="ul" className="mt-10 flex flex-col" stagger={0.1}>
                {tracks.b.items.map((it) => (
                  <motion.li
                    key={it.title}
                    variants={revealItem}
                    className="border-t border-line-soft py-6 first:border-t-0 first:pt-0"
                  >
                    <h4 className="font-display text-lg tracking-[0.02em] text-marble">
                      {it.title}
                    </h4>
                    <p className="mt-2 leading-relaxed text-marble-dim">
                      {it.body}
                    </p>
                  </motion.li>
                ))}
              </RevealGroup>

              <div className="mt-auto pt-8">
                <MagneticButton href="#contact" variant="line">
                  Enquire
                </MagneticButton>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
