import { ogCard, size, contentType } from "../lib/og-card";

export const alt =
  "Wellness Core. A four-phase coaching program from VIVERE, built to end, not to keep you.";
export { size, contentType };

export default async function Image() {
  return ogCard({
    kicker: "Vivere Performance & Wellness",
    title: "Wellness Core",
    subtitle: [
      "Four phases. One graduation.",
      "A program built to end, not to keep you.",
    ],
    titleSize: 96,
  });
}
