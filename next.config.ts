import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project visuals will be served from external hosts (Vimeo stills, CDNs).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
