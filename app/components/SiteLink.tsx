"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * `hash` points at a section of the home page, `path` at a route of its own.
 * Off the home page a bare "#contact" resolves against the current route and
 * goes nowhere, so it has to be rewritten to "/#contact".
 */
export type SiteLinkTarget = { label: string; hash?: string; path?: string };

/**
 * Same-page hashes stay plain anchors, preserving the home page's existing
 * native jump behaviour. Anything that changes route goes through Link, for
 * prefetching and a client-side transition.
 */
export default function SiteLink({
  link,
  className,
  ariaLabel,
  ariaCurrent,
  onClick,
  children,
}: {
  link: SiteLinkTarget;
  className?: string;
  ariaLabel?: string;
  /** Set on the link representing the page currently being viewed. */
  ariaCurrent?: "page";
  onClick?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  if (link.path) {
    return (
      <Link
        href={link.path}
        className={className}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  if (onHome) {
    return (
      <a
        href={link.hash}
        className={className}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={`/${link.hash}`}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
