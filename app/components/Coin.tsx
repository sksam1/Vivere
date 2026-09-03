"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

/**
 * A single gold coin that tilts in 3D toward the cursor with a moving
 * specular highlight, and drifts gently. Real minted coin, not stock.
 */
export default function Coin({
  src,
  alt,
  size = 260,
  priority = false,
  float = true,
  floatDelay = 0,
  className = "",
  widthClass,
}: {
  src: string;
  alt: string;
  size?: number;
  priority?: boolean;
  float?: boolean;
  floatDelay?: number;
  className?: string;
  /** Tailwind width class that overrides `size` (height follows via aspect). */
  widthClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [14, -14]), {
    stiffness: 150,
    damping: 15,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-16, 16]), {
    stiffness: 150,
    damping: 15,
  });
  const shineX = useTransform(px, [0, 1], ["12%", "88%"]);
  const shineY = useTransform(py, [0, 1], ["8%", "80%"]);
  const sheen = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,244,214,0.55), rgba(255,244,214,0) 44%)`,
  );

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className={`[perspective:900px] ${
        widthClass ? `${widthClass} aspect-square` : ""
      } ${className}`}
      style={widthClass ? undefined : { width: size, height: size }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry }}
        className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
        animate={
          float && !reduced ? { y: [0, -12, 0] } : undefined
        }
        transition={
          float && !reduced
            ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              }
            : undefined
        }
        whileHover={reduced ? undefined : { scale: 1.05 }}
      >
        <div className="relative h-full w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]">
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            priority={priority}
            sizes={`${size}px`}
            className="h-full w-full select-none object-contain"
            draggable={false}
          />
          {/* moving specular sheen */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full mix-blend-soft-light"
            style={{ background: sheen }}
          />
          {/* rim light */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 1px 2px rgba(255,240,200,0.35), inset 0 -2px 6px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
