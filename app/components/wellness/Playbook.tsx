"use client";

import { motion } from "motion/react";
import { wellnessCore } from "../../content";
import Reveal, { RevealGroup, revealItem } from "../Reveal";
import MaskHeadline from "../MaskHeadline";

const { playbook } = wellnessCore;

/** What the client keeps, and the point that coaching carries on after it. */
export default function Playbook() {
  return (
    <section id="playbook" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <MaskHeadline
              lines={[playbook.title]}
              className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-marble-dim">
                {playbook.lead}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12 border-l border-gold/40 pl-6">
                <p className="font-display text-xl italic leading-relaxed text-marble md:text-2xl">
                  “{playbook.close}”
                </p>
                <p className="mt-5 leading-relaxed text-stone">
                  {playbook.door}
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup
            as="ul"
            className="flex flex-col lg:col-span-7"
            stagger={0.09}
          >
            {playbook.items.map((it, i) => (
              <motion.li
                key={it}
                variants={revealItem}
                className="flex gap-6 border-t border-line-soft py-6 last:border-b"
              >
                <span className="numeral shrink-0 pt-1 text-[0.7rem] text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-relaxed text-marble-dim">
                  {it}
                </span>
              </motion.li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
