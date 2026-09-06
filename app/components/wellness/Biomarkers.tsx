"use client";

import { biomarkers } from "../../content";
import Reveal from "../Reveal";
import MaskHeadline from "../MaskHeadline";

/**
 * Optional bloodwork. Sits near the foot of the page because testing is an
 * add-on to the coaching, not a condition of it.
 *
 * The disclaimer block is deliberately rendered inline and at full contrast
 * rather than as a footnote: the boundary between coaching and medical care
 * has to be visible at the same moment the testing is being sold.
 */
export default function Biomarkers() {
  return (
    <section
      id="biomarkers"
      className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label mb-4 text-gold">{biomarkers.eyebrow}</p>
          </Reveal>
          <MaskHeadline
            lines={[biomarkers.title]}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {biomarkers.lead}
            </p>
          </Reveal>
        </div>

        {/* Panel + process, side by side */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6" y={40}>
            <h3 className="font-display text-base uppercase tracking-[0.2em] text-gold">
              {biomarkers.panelTitle}
            </h3>
            <ul className="mt-7 flex flex-col border-t border-line-soft">
              {biomarkers.panel.map((p) => (
                <li
                  key={p}
                  className="flex gap-4 border-b border-line-soft py-4"
                >
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-px w-4 shrink-0 bg-gold/50"
                  />
                  <span className="leading-relaxed text-marble-dim">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6" y={40} delay={0.1}>
            <h3 className="font-display text-base uppercase tracking-[0.2em] text-gold">
              {biomarkers.process.title}
            </h3>
            <ol className="mt-7 flex flex-col gap-6">
              {biomarkers.process.items.map((item, i) => (
                <li key={item} className="flex gap-5">
                  <span className="numeral shrink-0 text-[0.7rem] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-marble-dim">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* Scope boundary. Not a footnote. */}
        <Reveal delay={0.08}>
          <aside className="mt-20 border border-gold/25 bg-panel/40 p-8 md:p-10">
            <h3 className="font-display text-[0.72rem] uppercase tracking-[0.28em] text-gold">
              {biomarkers.disclaimer.title}
            </h3>
            <p className="mt-6 max-w-3xl leading-relaxed text-marble-dim">
              {biomarkers.disclaimer.body}
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-marble-dim">
              {biomarkers.disclaimer.referral}
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
