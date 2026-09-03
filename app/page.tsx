import type { Metadata } from "next";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ethos from "./components/Ethos";
import Disciplines from "./components/Disciplines";
import Phases from "./components/Phases";
import Creed from "./components/Creed";
import Tracks from "./components/Tracks";
import Testimonial from "./components/Testimonial";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * Title and description are inherited from the root layout. Canonical is set
 * here rather than in the layout so a future page that forgets to declare one
 * ends up with no canonical, instead of silently inheriting "/".
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Ethos />
        <Disciplines />
        <Phases />
        <Creed />
        <Tracks />
        <Testimonial />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
