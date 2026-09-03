"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "line";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

/**
 * Carved, inscriptional CTA. Cinzel small-caps, sharp edges, aged gold.
 * Keeps a restrained magnetic drift (premium tactile feedback), no
 * decorative circle-arrow.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  ariaLabel,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] font-display font-semibold " +
    "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] will-change-transform";
  const skins: Record<string, string> = {
    solid: "bg-gold text-obsidian hover:bg-gold-bright",
    line: "border border-gold/40 text-gold hover:border-gold hover:bg-gold/[0.06]",
  };

  const MotionEl = href ? motion.a : motion.button;
  return (
    <MotionEl
      // @ts-expect-error polymorphic ref across a/button
      ref={ref}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${skins[variant]} ${className}`}
    >
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="h-px w-5 bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-8"
      />
    </MotionEl>
  );
}
