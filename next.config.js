/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    staleTimes: {
      dynamic: 0,
    },
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/files/uploads/:path*',
      },
    ];
  },
}

module.exports = nextConfig