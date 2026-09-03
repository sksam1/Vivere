"use client";

import { motion } from "motion/react";
import { modalities } from "../../content";
import Reveal, { RevealGroup, revealItem } from "../Reveal";
import MaskHeadline from "../MaskHeadline";

/**
 * Optional recovery practices.
 *
 * Copy describes what each practice is and how it is used, never what it does
 * to the body: these are third-party therapies and Samuel is not a clinician,
 * so health-benefit claims are not his to make. See CONTENT-DECISIONS.md 2.2.
 */
export default function Modalities() {
  return (
    <section
      id="modalities"
      className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <MaskHeadline
            lines={[modalities.title]}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {modalities.lead}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {modalities.items.map((m) => (
            <motion.li
              key={m.n}
              variants={revealItem}
              className="group border-t border-line-soft pt-6 transition-colors duration-500 hover:border-gold/50"
            >
              <span className="numeral text-sm text-gold/70">{m.n}</span>
              <h3 className="font-display mt-4 text-base uppercase tracking-[0.14em] text-marble">
                {m.name}
              </h3>
              <p className="mt-4 leading-relaxed text-marble-dim">{m.body}</p>
            </motion.li>
          ))}
        </RevealGroup>

        <Reveal delay={0.08}>
          <p className="mt-16 max-w-3xl border-l border-gold/40 pl-6 text-[0.95rem] leading-relaxed text-stone">
            {modalities.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
