import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Disclosures from "../components/wellness/Disclosures";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "Coaching, not medical care. The scope, boundaries, and terms of Vivere Performance & Wellness coaching, including biomarker interpretation, recovery practices, assumption of risk, and confidentiality.",
  alternates: { canonical: "/disclosures" },
  openGraph: {
    title: "Disclosures | Vivere Performance & Wellness",
    description:
      "What this is, what it is not, and where the boundaries sit.",
    url: "/disclosures",
    type: "article",
  },
};

export default function DisclosuresPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Disclosures />
      </main>
      <Footer />
    </>
  );
}
