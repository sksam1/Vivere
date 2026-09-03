"use client";

import { ethos } from "../content";
import Reveal from "./Reveal";
import MaskHeadline from "./MaskHeadline";

export default function Ethos() {
  return (
    <section id="ethos" className="scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <p className="font-display text-xl tracking-[0.32em] text-gold-foil md:text-2xl">
            {ethos.latin}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 font-display text-[0.6rem] uppercase tracking-[0.34em] text-stone">
            {ethos.translation}
          </p>
        </Reveal>

        <div className="rule-gold mx-auto my-10 h-px w-24" />

        <MaskHeadline
          lines={ethos.headline}
          goldLine={1}
          className="text-[clamp(1.8rem,3.6vw,3rem)]"
        />

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-marble-dim">
            {ethos.body}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-10 font-display text-[0.68rem] uppercase tracking-[0.26em] text-gold">
            {ethos.line}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
