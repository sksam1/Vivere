import { ogCard, size, contentType } from "../lib/og-card";

export const alt =
  "Wellness Core. A three-phase performance and wellness coaching program from VIVERE.";
export { size, contentType };

export default async function Image() {
  return ogCard({
    kicker: "Vivere Performance & Wellness",
    title: "Wellness Core",
    subtitle: [
      "Three phases. One standard.",
      "Coaching built around how you actually live.",
    ],
    titleSize: 96,
  });
}
