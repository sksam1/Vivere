import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProgramHero from "../components/wellness/ProgramHero";
import WhoFor from "../components/wellness/WhoFor";
import ProgramPhases from "../components/wellness/ProgramPhases";
import Biomarkers from "../components/wellness/Biomarkers";
import Modalities from "../components/wellness/Modalities";
import Playbook from "../components/wellness/Playbook";
import Investment from "../components/wellness/Investment";
import DisclosureStrip from "../components/wellness/DisclosureStrip";

export const metadata: Metadata = {
  title: "Wellness Core",
  description:
    "A three-phase performance and wellness coaching program. Discovery Audit, Game Plan, Accountability. Optional biomarker testing and a sponsored wellness studio day.",
  alternates: { canonical: "/wellness-core" },
  openGraph: {
    title: "Wellness Core | Vivere Performance & Wellness",
    description:
      "Three phases. One standard. Coaching built around how you actually live.",
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
        <Modalities />
        <ProgramPhases />
        <Playbook />
        <Investment />
        <Biomarkers />
        <DisclosureStrip />
      </main>
      <Footer />
    </>
  );
}
