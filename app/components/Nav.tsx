"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "../content";
import Social from "./Social";
import SiteLink, { type SiteLinkTarget } from "./SiteLink";

const links: SiteLinkTarget[] = [
  { label: "Disciplines", hash: "#disciplines" },
  { label: "How We Work", hash: "#process" },
  { label: "Coins", hash: "#creed" },
  { label: "Wellness Core", path: "/wellness-core" },
  { label: "About", hash: "#about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
          scrolled || open
            ? "border-b border-line-soft bg-obsidian/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-[88rem] items-center justify-between px-6 md:px-10">
          {onHome ? (
            <a
              href="#top"
              aria-label={`${site.name} home`}
              className="font-display text-xl font-semibold tracking-[0.24em] text-marble transition-colors hover:text-gold"
            >
              {site.wordmark}
            </a>
          ) : (
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="font-display text-xl font-semibold tracking-[0.24em] text-marble transition-colors hover:text-gold"
            >
              {site.wordmark}
            </Link>
          )}

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => {
              const active = l.path !== undefined && l.path === pathname;
              return (
                <SiteLink
                  key={l.label}
                  link={l}
                  ariaCurrent={active ? "page" : undefined}
                  className={`font-display text-[0.66rem] uppercase tracking-[0.24em] transition-colors duration-300 hover:text-gold ${
                    active ? "text-gold" : "text-marble-dim"
                  }`}
                >
                  {l.label}
                </SiteLink>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <Social className="hidden sm:flex" size={16} />
            <SiteLink
              link={{ label: "Begin", hash: "#contact" }}
              className="hidden border border-gold/40 px-5 py-2.5 font-display text-[0.62rem] uppercase tracking-[0.24em] text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian md:inline-block"
            >
              Begin
            </SiteLink>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative h-6 w-7 md:hidden"
            >
              <motion.span
                className="absolute left-0 block h-px w-7 bg-marble"
                animate={open ? { rotate: 45, top: 11 } : { rotate: 0, top: 6 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.span
                className="absolute left-0 block h-px w-7 bg-marble"
                animate={
                  open ? { rotate: -45, top: 11 } : { rotate: 0, top: 16 }
                }
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian/97 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ul className="flex flex-col gap-2">
              {[...links, { label: "Contact", hash: "#contact" }].map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <SiteLink
                    link={l}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-3xl font-semibold uppercase tracking-[0.06em] text-marble"
                  >
                    {l.label}
                  </SiteLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <Social size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
