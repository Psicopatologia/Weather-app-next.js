/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Weather-app-next.js",
  output: "export",
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
