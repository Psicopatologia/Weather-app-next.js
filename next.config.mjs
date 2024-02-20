/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/Weather-app-next.js",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
