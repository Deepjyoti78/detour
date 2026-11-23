import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      'pk_test_bm9ibGUtc3BhcnJvdy01OTI2LmNsZXJrLmFjY291bnRzLmRldiQ',
    CLERK_SECRET_KEY:
      process.env.CLERK_SECRET_KEY ||
      'sk_test_Rz7LKvf1cF6g6Du0ddM63Xdq9Vs8lZFyQinJ7YrGoi',
    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE || 'true',
    DEMO_MODE: process.env.DEMO_MODE || 'true',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  transpilePackages: ['geist'],
  serverExternalPackages: ['pg', '@prisma/adapter-pg'],
  experimental: {
    optimizePackageImports: [
      'recharts',
      'lucide-react',
      '@tabler/icons-react',
      'date-fns',
      'cmdk',
      'motion',
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard/overview',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
