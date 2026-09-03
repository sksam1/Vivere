"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, useEffect } from "react";
import { hero, site } from "../content";
import MagneticButton from "./MagneticButton";
import Coin from "./Coin";
import EmberField from "./EmberField";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const coinsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  // pointer parallax: each coin sits at its own depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20, mass: 0.6 };
  const px = useSpring(mx, spring);
  const py = useSpring(my, spring);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: PointerEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  // three parallax depths (hooks called unconditionally, in order)
  const nearX = useTransform(px, [-1, 1], [-26, 26]);
  const nearY = useTransform(py, [-1, 1], [-16, 16]);
  const midX = useTransform(px, [-1, 1], [-14, 14]);
  const midY = useTransform(py, [-1, 1], [-8, 8]);
  const farX = useTransform(px, [-1, 1], [-7, 7]);
  const farY = useTransform(py, [-1, 1], [-4, 4]);

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
        className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-8"
      >
        {/* Copy */}
        <motion.div style={{ y: textY }} className="lg:col-span-6">
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

        {/* Coins, staged at three depths */}
        <motion.div style={{ y: coinsY }} className="relative lg:col-span-6">
          <div
            aria-hidden
            className="coin-halo pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 sm:gap-5"
          >
            {/* side coins are dropped on small screens so the cluster fits */}
            <motion.div
              style={{ x: farX, y: farY }}
              className="hidden translate-y-8 -rotate-[7deg] opacity-90 sm:block"
            >
              <Coin
                src="/assets/coin-stay-course.webp"
                alt="Coin engraved: Stay the Course"
                size={150}
                floatDelay={0.9}
              />
            </motion.div>

            <motion.div style={{ x: nearX, y: nearY }} className="relative z-10">
              <Coin
                src="/assets/coin-press-on.webp"
                alt="Coin engraved: Press On"
                size={272}
                priority
                floatDelay={0}
                widthClass="w-[min(64vw,17rem)]"
              />
            </motion.div>

            <motion.div
              style={{ x: midX, y: midY }}
              className="hidden translate-y-8 rotate-[7deg] opacity-90 sm:block"
            >
              <Coin
                src="/assets/coin-philippians.webp"
                alt="Coin engraved: Philippians 4:13"
                size={150}
                floatDelay={1.7}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.1 }}
            className="mt-12 text-center font-display text-[0.58rem] uppercase tracking-[0.36em] text-gold"
          >
            {site.motto}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
