import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "./content";
import SmoothScroll from "./components/SmoothScroll";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VIVERE | Performance & Wellness with Samuel Korgi",
    template: "%s · VIVERE",
  },
  description:
    "Forge your body. Fortify your mind. Fuel your future. Vivere Performance & Wellness is coaching rooted in discipline and faith, for those who want to build health that lasts, not just look fit.",
  keywords: [
    "wellness coaching",
    "human performance",
    "health coaching",
    "habits",
    "discipline",
    "faith",
    "longevity",
    "Samuel Korgi",
    "VIVERE",
  ],
  openGraph: {
    title: "VIVERE | Performance & Wellness",
    description:
      "Wellness coaching rooted in discipline and faith. Press on. Stay the course.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIVERE | Performance & Wellness",
    description:
      "Wellness coaching rooted in discipline and faith. Press on. Stay the course.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian text-marble">
        <div className="grain" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
