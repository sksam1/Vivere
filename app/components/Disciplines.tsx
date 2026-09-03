"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { pillars } from "../content";
import Reveal from "./Reveal";

/**
 * Scroll-pinned triptych. The section is tall; an inner sticky stage holds
 * the viewport while the three disciplines advance. A gold meter tracks
 * progress. Under reduced motion it degrades to a plain stacked list.
 */
export default function Disciplines() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const n = pillars.items.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // bias slightly so each panel holds through its band
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)));
    setIndex(i);
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section
        id="disciplines"
        className="scroll-mt-24 border-t border-line-soft bg-obsidian-deep py-24"
      >
        <div className="mx-auto max-w-[80rem] px-6 md:px-10">
          <h2 className="text-display-sm text-marble">{pillars.title}</h2>
          <ul className="mt-12 flex flex-col">
            {pillars.items.map((p) => (
              <li
                key={p.numeral}
                className="grid gap-4 border-t border-line-soft py-9 md:grid-cols-12"
              >
                <span className="numeral text-4xl text-gold md:col-span-2">
                  {p.numeral}
                </span>
                <h3 className="font-display text-2xl text-marble md:col-span-4">
                  <span className="text-gold">{p.verb}</span> {p.noun}
                </h3>
                <p className="text-marble-dim md:col-span-6">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const active = pillars.items[index];

  return (
    <section
      id="disciplines"
      ref={ref}
      className="relative scroll-mt-24 border-t border-line-soft bg-obsidian-deep"
      style={{ height: `${n * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        {/* colossal ghost numeral */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`ghost-${index}`}
            aria-hidden
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="numeral pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none text-[38vw] leading-none text-gold md:text-[28vw]"
          >
            {active.numeral}
          </motion.span>
        </AnimatePresence>

        <div className="relative mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Reveal>
            <h2 className="text-display-sm text-marble">{pillars.title}</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-12 items-start gap-6">
            {/* rail */}
            <ol className="col-span-12 flex gap-6 md:col-span-3 md:flex-col md:gap-5">
              {pillars.items.map((p, i) => {
                const on = i === index;
                return (
                  <li key={p.numeral} className="flex items-center gap-3">
                    <span
                      className={`numeral text-2xl transition-colors duration-500 ${
                        on ? "text-gold" : "text-stone/50"
                      }`}
                    >
                      {p.numeral}
                    </span>
                    <span
                      className={`font-display text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-500 ${
                        on ? "text-marble" : "text-stone/50"
                      }`}
                    >
                      {p.verb}
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* stage */}
            <div className="col-span-12 min-h-[16rem] md:col-span-9 md:min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.numeral}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.1] text-marble">
                    <span className="gold-sheen">{active.verb}</span>{" "}
                    {active.noun}
                  </h3>
                  <p className="mt-6 max-w-2xl text-xl leading-relaxed text-marble-dim">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* progress meter */}
          <div className="mt-16 h-px w-full max-w-md bg-line-soft">
            <motion.div
              className="h-px origin-left bg-gold"
              style={{ scaleX: barScale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
