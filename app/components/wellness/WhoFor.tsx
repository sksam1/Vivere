"use client";

import { motion } from "motion/react";
import { wellnessCore } from "../../content";
import Reveal, { RevealGroup, revealItem } from "../Reveal";

const { who } = wellnessCore;

export default function WhoFor() {
  return (
    <section
      id="who"
      className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="text-display-sm text-marble">{who.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {who.lead}
            </p>
          </Reveal>
        </div>

        {/* The strongest line in the source material. Given room to land. */}
        <Reveal delay={0.14}>
          <figure className="mt-16 border-y border-line-soft py-12 text-center md:py-16">
            <blockquote className="mx-auto max-w-3xl font-display text-[clamp(1.35rem,3vw,2.3rem)] italic leading-[1.35] text-marble">
              <span className="gold-sheen">“{who.quote}”</span>
            </blockquote>
            <figcaption className="mt-7 font-display text-[0.62rem] uppercase tracking-[0.26em] text-stone">
              {who.quoteNote}
            </figcaption>
          </figure>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-3"
          stagger={0.12}
        >
          {who.items.map((it) => (
            <motion.li key={it.title} variants={revealItem}>
              <span aria-hidden className="block h-px w-10 bg-gold/60" />
              <h3 className="font-display mt-6 text-base uppercase tracking-[0.16em] text-marble">
                {it.title}
              </h3>
              <p className="mt-4 leading-relaxed text-marble-dim">{it.body}</p>
            </motion.li>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-16 max-w-2xl text-[0.95rem] leading-relaxed text-stone">
            {who.notFor}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
