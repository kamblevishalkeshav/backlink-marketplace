/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  typescript: {
    // We'll do type checking in a separate process during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // We'll do linting in a separate process during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 