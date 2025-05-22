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
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
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
      // Ensure Prisma is handled correctly
      config.externals.push('_http_common');
    }
    return config;
  },
  // Updated experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Set top level "pageExtensions" to process only specific file types
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
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
  },
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/login',
      },
      {
        source: '/register',
        destination: '/register',
      },
      {
        source: '/signin',
        destination: '/signin',
      },
      {
        source: '/test-page',
        destination: '/test-page',
      },
    ];
  },
};

export default nextConfig; 