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
}

module.exports = nextConfig