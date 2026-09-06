"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { phases } from "../content";
import Reveal, { RevealGroup, revealItem } from "./Reveal";
import MaskHeadline from "./MaskHeadline";

/**
 * "Structure first. Then consistency."
 * Three phases with a gold connector that draws across as the section enters.
 */
export default function Phases() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <MaskHeadline
            lines={phases.headline}
            goldLine={1}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {phases.lead}
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* connector rail (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-line-soft lg:block"
          >
            <motion.div
              className="h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-deep"
              style={{ scaleX: reduced ? 1 : lineScale }}
            />
          </div>

          <RevealGroup
            as="ul"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.13}
          >
            {phases.items.map((p) => (
              <motion.li
                key={p.n}
                variants={revealItem}
                className="group relative"
              >
                <span className="relative z-10 grid h-11 w-11 place-items-center border border-gold/50 bg-obsidian font-display text-[0.7rem] font-semibold tracking-[0.08em] text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-obsidian">
                  {p.n}
                </span>
                <h3 className="font-display mt-7 text-base uppercase tracking-[0.16em] text-marble">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-marble-dim">{p.body}</p>
              </motion.li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
