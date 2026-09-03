"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  aBase: number;
  tw: number;
  phase: number;
};

/**
 * Slow-rising gold motes, like dust in a shaft of light. Reinforces "forge"
 * without reading as an effect. Canvas 2D (no WebGL bundle), DPR-aware,
 * pauses when scrolled offscreen or when the tab is hidden, and is skipped
 * entirely under prefers-reduced-motion.
 */
export default function EmberField({
  density = 0.00008,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let motes: Mote[] = [];
    let raf = 0;
    let running = true;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      const count = Math.min(150, Math.max(28, Math.round(w * h * density)));
      motes = Array.from({ length: count }, () => {
        const aBase = rand(0.06, 0.4);
        return {
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.5, 1.9),
          vy: rand(4, 14), // px/sec upward
          vx: rand(-2.5, 2.5),
          a: aBase,
          aBase,
          tw: rand(0.25, 0.85), // twinkle speed
          phase: rand(0, Math.PI * 2),
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      for (const m of motes) {
        m.phase += m.tw * dt;
        m.y -= m.vy * dt;
        m.x += m.vx * dt;

        // gentle repulsion from the pointer, like disturbed dust
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          const d = Math.max(Math.sqrt(d2), 12);
          const f = ((160 - d) / 160) * 26 * dt;
          m.x += (dx / d) * f;
          m.y += (dy / d) * f;
        }

        if (m.y < -8) {
          m.y = h + rand(0, 40);
          m.x = rand(0, w);
        }
        if (m.x < -8) m.x = w + 8;
        if (m.x > w + 8) m.x = -8;

        const twinkle = 0.55 + 0.45 * Math.sin(m.phase);
        const alpha = m.aBase * twinkle;

        const g = ctx!.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5);
        g.addColorStop(0, `rgba(240, 214, 150, ${alpha})`);
        g.addColorStop(0.42, `rgba(200, 162, 76, ${alpha * 0.35})`);
        g.addColorStop(1, "rgba(200, 162, 76, 0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf) return;
      last = performance.now();
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pause when the canvas scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
