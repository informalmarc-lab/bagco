/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['*'],
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/manufacturing',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/custom-printing',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
