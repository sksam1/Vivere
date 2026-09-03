import type { MetadataRoute } from "next";
import { site } from "./content";

type Route = {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

/**
 * Routes are listed here rather than derived from the filesystem, so shipping a
 * page is a deliberate sitemap entry instead of an accidental one. Add each new
 * public route as it goes live.
 */
const routes: Route[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/wellness-core", changeFrequency: "monthly", priority: 0.9 },
  { path: "/disclosures", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, site.url).href,
    lastModified,
    changeFrequency,
    priority,
  }));
}
