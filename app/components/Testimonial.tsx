import Image from "next/image";
import { testimonial } from "../content";
import Reveal from "./Reveal";

export default function Testimonial() {
  return (
    <section className="border-y border-line-soft bg-obsidian-deep py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <span className="font-display text-3xl text-gold" aria-hidden>
            ❝
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <blockquote className="mt-4 font-display text-2xl leading-snug text-marble md:text-[2.2rem] md:leading-[1.28]">
            {testimonial.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-marble-dim">
            {testimonial.detail}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <figcaption className="mt-10 flex items-center justify-center gap-4">
            <span className="relative h-12 w-12 overflow-hidden rounded-full border border-line">
              <Image
                src="/assets/daniel-avatar.webp"
                alt={testimonial.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="text-left">
              <span className="block font-display text-sm uppercase tracking-[0.2em] text-marble">
                {testimonial.name}
              </span>
              <span className="block text-sm italic text-stone">
                {testimonial.role}
              </span>
            </span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
