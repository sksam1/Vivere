"use client";

import { creed } from "../content";
import Reveal, { RevealGroup, revealItem } from "./Reveal";
import CoinFlip from "./CoinFlip";
import { motion } from "motion/react";

export default function Creed() {
  return (
    <section
      id="creed"
      className="scroll-mt-24 border-t border-line-soft py-24 md:py-32"
    >
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-sm text-marble">{creed.title}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-marble-dim">
                {creed.lead}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="flex items-start gap-5">
              <span className="mt-3 hidden h-px w-12 shrink-0 bg-gold/60 lg:block" />
              <p className="text-[0.95rem] leading-relaxed text-stone">
                {creed.note}
              </p>
            </div>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-3"
          stagger={0.14}
        >
          {creed.coins.map((c) => (
            <motion.figure
              key={c.key}
              variants={revealItem}
              className="flex flex-col items-center text-center"
            >
              <CoinFlip src={c.src} motto={c.motto} trigger={c.trigger} />
              <figcaption className="mt-8">
                <h3 className="font-display text-base uppercase tracking-[0.2em] text-gold">
                  {c.motto}
                </h3>
                <p className="mt-2 font-display text-[0.58rem] uppercase tracking-[0.22em] text-stone">
                  {c.trigger}
                </p>
                <p className="mx-auto mt-5 max-w-xs leading-relaxed text-marble-dim">
                  {c.body}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
