"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Display headline whose lines rise out of an overflow mask on scroll.
 *
 * The scroll trigger MUST sit on the outer (un-translated) mask element and
 * drive the inner line through variants. Putting `whileInView` on the inner
 * span fails: it starts translated fully below its `overflow-hidden` parent,
 * so its clipped intersection rect is empty and the observer never fires.
 */
export default function MaskHeadline({
  lines,
  className = "",
  goldLine,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  /** index of the line rendered in gold, if any */
  goldLine?: number;
  as?: "h1" | "h2";
}) {
  const reduced = useReducedMotion();

  const line: Variants = {
    hidden: reduced ? { opacity: 0 } : { y: "115%" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <Tag
      className={`font-display font-semibold leading-[1.14] text-marble ${className}`}
    >
      {lines.map((text, i) => (
        <motion.span
          key={text}
          className="block overflow-hidden pb-[0.1em]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span className="block" variants={line} custom={i}>
            {goldLine === i ? (
              <span className="gold-sheen">{text}</span>
            ) : (
              text
            )}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
