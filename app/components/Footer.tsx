import { site } from "../content";
import Social from "./Social";
import SiteLink, { type SiteLinkTarget } from "./SiteLink";

const links: SiteLinkTarget[] = [
  { label: "Disciplines", hash: "#disciplines" },
  { label: "How We Work", hash: "#process" },
  { label: "Coins", hash: "#creed" },
  { label: "Programs", hash: "#work" },
  { label: "Core", path: "/wellness-core" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-soft bg-obsidian-deep">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:px-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <SiteLink
            link={{ label: site.wordmark, hash: "#top" }}
            className="font-display text-3xl font-semibold tracking-[0.3em] text-marble transition-colors hover:text-gold"
          >
            {site.wordmark}
          </SiteLink>
          <p className="font-display text-[0.62rem] uppercase tracking-[0.34em] text-gold">
            {site.sub}
          </p>
          <div className="my-2 h-px w-24 rule-gold" />
          <p className="font-display text-lg italic tracking-[0.06em] text-marble-dim">
            {site.motto}
          </p>
        </div>

        <nav className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((l) => (
            <SiteLink
              key={l.label}
              link={l}
              className="font-display text-[0.62rem] uppercase tracking-[0.24em] text-marble-dim transition-colors hover:text-gold"
            >
              {l.label}
            </SiteLink>
          ))}
        </nav>

        <div className="mt-10 flex justify-center">
          <Social size={20} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-line-soft pt-8 text-sm text-stone sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {site.coach}.
          </p>
          <div className="flex items-center gap-5">
            <SiteLink
              link={{ label: "Disclosures", path: "/disclosures" }}
              className="transition-colors duration-300 hover:text-gold"
            >
              Disclosures
            </SiteLink>
            <span aria-hidden className="h-3 w-px bg-line-soft" />
            <p>Decatur, Georgia. Coaching worldwide.</p>
          </div>
        </div>

        {/* Scope boundary, stated once more at the very bottom of every page. */}
        <p className="mt-8 text-center text-xs leading-relaxed text-stone/70 sm:text-left">
          Coaching for generally healthy adults. Not medical care, and not a
          substitute for advice from your physician.
        </p>
      </div>
    </footer>
  );
}
