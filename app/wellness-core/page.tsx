import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProgramHero from "../components/wellness/ProgramHero";
import WhoFor from "../components/wellness/WhoFor";
import ProgramPhases from "../components/wellness/ProgramPhases";
import Biomarkers from "../components/wellness/Biomarkers";
import Durations from "../components/wellness/Durations";
import Modalities from "../components/wellness/Modalities";
import Playbook from "../components/wellness/Playbook";
import Investment from "../components/wellness/Investment";
import DisclosureStrip from "../components/wellness/DisclosureStrip";

export const metadata: Metadata = {
  title: "Wellness Core",
  description:
    "A four-phase performance and wellness coaching program, run over 90 days or six months. Discovery Audit, Game Plan, Accountability, Self-Reliance. Clear exit criteria and no lifetime retainer.",
  alternates: { canonical: "/wellness-core" },
  openGraph: {
    title: "Wellness Core | Vivere Performance & Wellness",
    description:
      "Four phases. One graduation. A coaching program built to end, not to keep you.",
    url: "/wellness-core",
    type: "article",
  },
};

export default function WellnessCorePage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ProgramHero />
        <WhoFor />
        <ProgramPhases />
        <Biomarkers />
        <Durations />
        <Modalities />
        <Playbook />
        <Investment />
        <DisclosureStrip />
      </main>
      <Footer />
    </>
  );
}
