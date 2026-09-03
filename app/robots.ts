import type { MetadataRoute } from "next";
import { site } from "./content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The inquiry handler is a POST endpoint, nothing for a crawler to index.
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
