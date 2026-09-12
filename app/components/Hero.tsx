"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { hero } from "../content";
import MagneticButton from "./MagneticButton";
import EmberField from "./EmberField";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-20"
    >
      <EmberField />

      {/* warm shaft of light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(115% 80% at 74% 34%, rgba(200,162,76,0.13), transparent 58%), radial-gradient(70% 55% at 46% 118%, rgba(146,112,47,0.12), transparent 62%)",
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto w-full max-w-[68rem] px-6 md:px-10"
      >
        {/* Copy */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-marble-dim"
          >
            {hero.words.map((w, i) => (
              <span key={w} className="flex items-center gap-3">
                <span className="font-display text-[0.58rem] uppercase tracking-[0.3em]">
                  {w}
                </span>
                {i < hero.words.length - 1 && (
                  <span className="text-[0.45rem] text-gold" aria-hidden>
                    ◆
                  </span>
                )}
              </span>
            ))}
          </motion.div>

          <h1 className="text-display mt-8 text-marble">
            {hero.headline.map((line, i) => {
              const [verb, ...rest] = line.split(" ");
              return (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.12 + i * 0.13,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    <span className="gold-sheen">{verb}</span>{" "}
                    {rest.join(" ")}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-marble-dim"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton href="#contact" variant="solid">
              {hero.primaryCta}
            </MagneticButton>
            <MagneticButton href="#process" variant="line">
              {hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
