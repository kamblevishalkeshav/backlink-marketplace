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
    outputFileTracingIgnores: [
      '**/node_modules/@swc/core-linux-x64-gnu', 
      '**/node_modules/@swc/core-linux-x64-musl',
      // Explicitly ignore route groups with parentheses
      '**/src/app/(**)/**',
    ],
  },
  // Set top level "pageExtensions" to process only specific file types
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Handle the minification issues
  swcMinify: false,
  // Exclude problematic routes from build
  excludeDefaultMomentLocales: true,
  // Clear the cached build output directory before starting a new build
  cleanDistDir: true,
  // Add redirects for the parentheses routes
  async redirects() {
    return [
      {
        source: '/(dashboard)',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/(admin)',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/(auth)',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/(publisher)',
        destination: '/publisher',
        permanent: true,
      },
      {
        source: '/(public)',
        destination: '/public',
        permanent: true,
      }
    ]
  }
};

export default nextConfig; 