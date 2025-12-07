import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/blog',
        has: [
          {
            type: 'host',
            value: 'blog.bimlesh.xyz',
          },
        ],
      },
      {
        source: '/:path*',
        destination: '/blog/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.bimlesh.xyz',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
