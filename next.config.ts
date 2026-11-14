import type { NextConfig } from "next";

// The site is a static page in /public (index.html + assets). Next serves it at the root,
// and the routes of the previous site redirect there.
const oldRoutes = ["/research", "/projects", "/experience", "/blog", "/blog/:slug*", "/beyond"];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return oldRoutes.map((source) => ({ source, destination: "/", permanent: false }));
  },
};

export default nextConfig;
