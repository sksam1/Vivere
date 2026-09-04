import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    /**
     * Pin the workspace root to this project.
     *
     * Turbopack infers the root from the nearest lockfile, and a stray
     * package-lock.json in a parent directory (a home-directory `npm install`
     * is the usual cause) makes it pick that directory instead. It then
     * watches the whole tree, which turned a dev page load into minutes.
     * Pinning it keeps resolution and file watching inside the project.
     */
    root: path.join(__dirname),
  },
};

export default nextConfig;
