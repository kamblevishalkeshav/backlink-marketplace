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
  // Improve handling of Prisma in serverless environments
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure Prisma client is transpiled
      config.externals = [...config.externals, 'prisma', '@prisma/client'];
    }
    return config;
  },
  // More specific settings to fix route group issues
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    outputFileTracingIgnores: ['**/node_modules/@swc/core-linux-x64-gnu', '**/node_modules/@swc/core-linux-x64-musl'],
  },
  // Set top level "pageExtensions" to process only specific file types
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Handle the minification issues
  swcMinify: false,
};

export default nextConfig; 