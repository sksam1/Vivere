"use client";

import { wellnessCore } from "../../content";
import Reveal from "../Reveal";
import MaskHeadline from "../MaskHeadline";

const { durations } = wellnessCore;

/**
 * 3 month against 6 month.
 *
 * One semantic <table> throughout rather than a desktop table plus a duplicate
 * mobile card list: below md the rows unstack into blocks and each cell grows
 * its own inline heading, so a phone reads it as two labelled answers per row
 * instead of scrolling a 3-column grid sideways.
 */
export default function Durations() {
  return (
    <section id="durations" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6 md:px-10">
        <div className="max-w-3xl">
          <MaskHeadline
            lines={[durations.title]}
            className="text-[clamp(1.7rem,3.2vw,2.9rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-marble-dim">
              {durations.lead}
            </p>
          </Reveal>
        </div>

        {/* The two options, stated before the row-by-row detail. */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[durations.a, durations.b].map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08} y={40}>
              <article
                className={`h-full p-8 md:p-10 ${
                  i === 0
                    ? "bg-marble text-obsidian"
                    : "border border-line bg-panel/40 text-marble"
                }`}
              >
                <header className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-2xl uppercase tracking-[0.08em]">
                    {d.name}
                  </h3>
                  <span
                    className={`shrink-0 whitespace-nowrap px-4 py-2 font-display text-[0.55rem] uppercase tracking-[0.22em] ${
                      i === 0
                        ? "bg-obsidian text-marble"
                        : "bg-gold text-obsidian"
                    }`}
                  >
                    {d.badge}
                  </span>
                </header>
                <p
                  className={`mt-6 leading-relaxed ${
                    i === 0 ? "text-obsidian/70" : "text-marble-dim"
                  }`}
                >
                  {d.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {durations.a.name} compared with {durations.b.name}
              </caption>

              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gold/30">
                  <th scope="col" className="w-[34%] py-5 pr-6" />
                  <th
                    scope="col"
                    className="w-[33%] py-5 pr-6 font-display text-[0.62rem] uppercase tracking-[0.26em] text-gold"
                  >
                    {durations.a.name}
                  </th>
                  <th
                    scope="col"
                    className="w-[33%] py-5 font-display text-[0.62rem] uppercase tracking-[0.26em] text-gold"
                  >
                    {durations.b.name}
                  </th>
                </tr>
              </thead>

              <tbody className="block md:table-row-group">
                {durations.rows.map((r) => (
                  <tr
                    key={r.label}
                    className="block border-b border-line-soft py-6 md:table-row md:py-0"
                  >
                    <th
                      scope="row"
                      className="block pb-4 text-left font-display text-[0.62rem] uppercase tracking-[0.24em] text-stone md:table-cell md:w-[34%] md:py-6 md:pr-6 md:align-top"
                    >
                      {r.label}
                    </th>
                    <td className="block pb-3 leading-relaxed text-marble md:table-cell md:w-[33%] md:py-6 md:pr-6 md:align-top md:text-marble-dim">
                      <span className="mr-3 font-display text-[0.58rem] uppercase tracking-[0.22em] text-gold md:hidden">
                        {durations.a.name}
                      </span>
                      {r.a}
                    </td>
                    <td className="block leading-relaxed text-marble md:table-cell md:w-[33%] md:py-6 md:align-top md:text-marble-dim">
                      <span className="mr-3 font-display text-[0.58rem] uppercase tracking-[0.22em] text-gold md:hidden">
                        {durations.b.name}
                      </span>
                      {r.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
