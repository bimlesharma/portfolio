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
  redirects: async () => {
    return [
      {
        source: '/:path*',
        destination: 'https://bimlesh.vercel.app/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
