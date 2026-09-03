"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the app in Lenis smooth-scroll. Respects prefers-reduced-motion:
 * Lenis is skipped entirely so native scroll (and reduced-motion) is honored.
 * The check comes from motion's `useReducedMotion`, which is what the rest of
 * the site uses and is null until hydration, so the server and first client
 * render always agree instead of risking a mismatch.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const firstRender = useRef(true);

  /**
   * Lenis owns the scroll position and does not know the router moved, so a
   * client-side navigation would otherwise open the next page already scrolled
   * to wherever the previous one sat. Reset to the top on pathname change only:
   * the first render is skipped so a deep link like /wellness-core#modalities
   * still lands on its anchor, and a hash in the target URL keeps precedence
   * so cross-page links such as /#contact scroll to the section, not the top.
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.location.hash) return;
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
