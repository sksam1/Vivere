import { ogCard, size, contentType } from "./lib/og-card";

export const alt =
  "VIVERE. Performance and Wellness with Samuel Korgi. Press on. Stay the course.";
export { size, contentType };

export default async function Image() {
  return ogCard({
    kicker: "Performance & Wellness",
    title: "Vivere",
    subtitle: ["Forge your body. Fortify your mind.", "Fuel your future."],
  });
}
