import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
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
