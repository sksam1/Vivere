"use client";

import { wellnessCore } from "../../content";
import Reveal from "../Reveal";
import MaskHeadline from "../MaskHeadline";
import MagneticButton from "../MagneticButton";

const { investment } = wellnessCore;

/**
 * No figures exist in the source framework, so this routes to the enquiry form
 * rather than inventing an anchor price. The two cost notes are here because
 * both are real and both land badly if they surface late.
 */
export default function Investment() {
  return (
    <section
      id="investment"
      className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <MaskHeadline
          lines={[investment.title]}
          className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
        />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-marble-dim">
            {investment.lead}
          </p>
        </Reveal>

        <div className="rule-gold mx-auto my-12 h-px w-24" />

        <Reveal delay={0.16}>
          <ul className="mx-auto flex max-w-xl flex-col gap-4">
            {investment.notes.map((n) => (
              <li key={n} className="leading-relaxed text-stone">
                {n}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-14 flex justify-center">
            <MagneticButton href="/#contact">{investment.cta}</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
