"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * A coin that turns in 3D to reveal its reverse: the moment it is carried for.
 * Front is the real minted coin, back is an engraved obsidian face with a
 * gold rim. Hover or focus on desktop, tap on touch. Keyboard accessible.
 */
export default function CoinFlip({
  src,
  motto,
  trigger,
  size = 210,
}: {
  src: string;
  motto: string;
  trigger: string;
  size?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  const flipped = hovered || pinned;

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => setPinned((v) => !v)}
      aria-label={`${motto}. ${trigger}.`}
      className="group relative block cursor-pointer rounded-full [perspective:1100px]"
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden
        className="coin-halo pointer-events-none absolute -inset-4 rounded-full opacity-0 blur-lg transition-opacity duration-700 group-hover:opacity-100"
      />
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped && !reduced ? 180 : 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Obverse: the minted coin */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Image
            src={src}
            alt={`Coin engraved: ${motto}`}
            width={size}
            height={size}
            sizes={`${size}px`}
            className="h-full w-full select-none object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 1px 2px rgba(255,240,200,0.32), inset 0 -2px 7px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Reverse: the trigger, engraved */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-gold/55 bg-gradient-to-b from-panel to-obsidian-deep px-6 text-center shadow-[0_22px_36px_rgba(0,0,0,0.6)]">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[6px] rounded-full border border-gold/20"
            />
            <span className="font-display text-[0.66rem] uppercase leading-[1.7] tracking-[0.2em] text-gold">
              {trigger}
            </span>
          </div>
        </div>
      </motion.div>
    </button>
  );
}
