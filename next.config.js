/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    typedRoutes: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
