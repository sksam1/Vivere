import Link from "next/link";
import { wellnessCore } from "../../content";
import Reveal from "../Reveal";

/**
 * Closing scope note. Repeats the coaching/medical boundary at the foot of the
 * page and routes to the full terms, so a reader who scrolled past the
 * biomarker disclaimer still meets it before they leave.
 */
export default function DisclosureStrip() {
  return (
    <section className="border-t border-line-soft py-16">
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-2xl text-[0.95rem] leading-relaxed text-stone">
              {wellnessCore.who.notFor}
            </p>
            <Link
              href="/disclosures"
              className="group inline-flex shrink-0 items-center gap-3 font-display text-[0.66rem] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:text-gold-bright"
            >
              Read the full disclosures
              <span
                aria-hidden
                className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
