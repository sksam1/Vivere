"use client";

import Image from "next/image";
import { about } from "../content";
import Reveal, { RevealGroup, revealItem } from "./Reveal";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Arched niche portrait */}
        <Reveal className="lg:col-span-5" y={50}>
          <div className="sticky top-28">
            <div className="relative mx-auto max-w-sm">
              <div className="relative overflow-hidden rounded-t-[999px] border border-line bg-gradient-to-b from-panel-2 to-obsidian-deep">
                <div
                  aria-hidden
                  className="coin-halo absolute inset-x-0 bottom-0 top-1/3"
                />
                <div className="relative flex aspect-[3/4] items-end justify-center">
                  <Image
                    src="/assets/coach-cutout.webp"
                    alt="Portrait of Samuel Korgi, founder of VIVERE"
                    width={693}
                    height={1103}
                    sizes="(max-width: 1024px) 80vw, 34vw"
                    className="relative z-10 h-[94%] w-auto object-contain [filter:saturate(0.85)_contrast(1.05)]"
                  />
                </div>
              </div>
              <p className="mt-5 text-center font-display text-sm uppercase tracking-[0.28em] text-gold">
                Samuel Korgi
              </p>
              <p className="mt-1 text-center font-display text-[0.62rem] uppercase tracking-[0.28em] text-stone">
                Founder, VIVERE
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bio */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-display-sm text-marble">{about.title}</h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 + i * 0.04}>
                <p className="text-lg leading-relaxed text-marble-dim">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <blockquote className="mt-10 border-l border-gold pl-6">
              <p className="font-display text-xl italic leading-snug text-marble md:text-2xl">
                {about.mission}
              </p>
            </blockquote>
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line-soft pt-8"
            stagger={0.06}
          >
            {about.creed.map((c) => (
              <motion.li
                key={c}
                variants={revealItem}
                className="font-display text-[0.66rem] uppercase tracking-[0.26em] text-marble-dim"
              >
                {c}
              </motion.li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
