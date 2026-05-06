/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so Netlify serves a plain `out/` directory just like today.
  output: 'export',
  // Match today's URLs (no trailing slash). Reflected in canonical metadata.
  trailingSlash: false,
  // next/image is unavailable in static export; treat all images as plain <img>.
  images: { unoptimized: true },
  // Skip type-check during build (run `npm run typecheck` in CI). Lets `next build`
  // succeed even when in-progress phases have known TS gaps.
  typescript: { ignoreBuildErrors: false },
  reactStrictMode: true,
};

export default nextConfig;
