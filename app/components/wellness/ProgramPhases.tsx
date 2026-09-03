"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { wellnessCore } from "../../content";
import Reveal from "../Reveal";
import MaskHeadline from "../MaskHeadline";

const { phases } = wellnessCore;

/**
 * The four phases in full. The home page carries a one-line summary of each;
 * this is the long form. The gold rail draws down as the section scrolls,
 * the vertical counterpart of the connector in the home Phases section.
 */
export default function ProgramPhases() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="phases" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <MaskHeadline
            lines={[phases.title]}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {phases.lead}
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Vertical rail, desktop only. Sits under the numeral column. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[1.35rem] top-0 hidden w-px bg-line-soft lg:block"
          >
            <motion.div
              className="h-full w-px origin-top bg-gradient-to-b from-gold-deep via-gold to-gold-deep"
              style={{ scaleY: reduced ? 1 : railScale }}
            />
          </div>

          <ol className="flex flex-col gap-20 md:gap-24">
            {phases.items.map((p) => (
              <li key={p.n}>
                <Reveal y={44}>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Numeral + window */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
                        <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center border border-gold/50 bg-obsidian font-display text-[0.7rem] font-semibold tracking-[0.08em] text-gold">
                          {p.n}
                        </span>
                        <p className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-stone">
                          {p.window}
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="lg:col-span-9">
                      <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-marble md:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-display text-[0.72rem] uppercase tracking-[0.24em] text-gold">
                        {p.objective}
                      </p>
                      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-marble-dim">
                        {p.body}
                      </p>

                      <ul className="mt-8 flex flex-col border-t border-line-soft">
                        {p.detail.map((d) => (
                          <li
                            key={d}
                            className="flex gap-4 border-b border-line-soft py-4"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.7em] h-px w-4 shrink-0 bg-gold/50"
                            />
                            <span className="leading-relaxed text-marble-dim">
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-8 max-w-2xl border-l border-gold/40 pl-5 font-display text-[0.95rem] italic leading-relaxed text-marble">
                        {p.outcome}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
