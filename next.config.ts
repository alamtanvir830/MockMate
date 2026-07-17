import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cache bust: 2026-04-14
  // pdf-parse uses fs.readFileSync at module init time, which breaks when webpack
  // bundles it. Marking it as a server external forces Next.js to require() it at
  // runtime instead, which works correctly in the Node.js serverless environment.
  serverExternalPackages: ['pdf-parse'],
  async redirects() {
    return [
      {
        source: '/sat-rw-academy/study-plan',
        destination: '/sat-rw-academy',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
