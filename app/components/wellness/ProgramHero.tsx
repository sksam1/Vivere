"use client";

import Link from "next/link";
import { wellnessCore } from "../../content";
import Reveal from "../Reveal";
import MaskHeadline from "../MaskHeadline";
import MagneticButton from "../MagneticButton";

/**
 * Program page opener. Deliberately typographic: the home hero owns the
 * cinematic treatment, so this one carries weight through type and space
 * instead of competing with it.
 */
export default function ProgramHero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <Reveal>
          <p className="label text-gold">{wellnessCore.eyebrow}</p>
        </Reveal>

        <div className="mt-8 max-w-4xl">
          <MaskHeadline
            as="h1"
            lines={wellnessCore.headline}
            goldLine={1}
            className="text-[clamp(2.2rem,5vw,4.2rem)]"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.14}>
            <p className="text-lg leading-relaxed text-marble-dim md:text-xl">
              {wellnessCore.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="/#contact">Begin the work</MagneticButton>
              <MagneticButton href="#phases" variant="line">
                See the phases
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.22}>
            <figure className="border-l border-gold/30 pl-6 md:pl-8">
              <blockquote className="font-display text-xl leading-relaxed tracking-[0.01em] text-marble md:text-2xl">
                {wellnessCore.keyLine}
              </blockquote>
              <figcaption className="mt-5 font-display text-[0.6rem] uppercase tracking-[0.28em] text-stone">
                {wellnessCore.label}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 font-display text-[0.62rem] uppercase tracking-[0.26em] text-stone">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-gold"
            >
              Vivere
            </Link>
            <span className="mx-3 text-gold/40">/</span>
            <span className="text-marble-dim">{wellnessCore.label}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
