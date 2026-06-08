const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bagsupplyco.com',
        pathname: '/catalog/**',
      },
      {
        protocol: 'https',
        hostname: 'cardinalbag.store',
        pathname: '/cdn/shop/products/**',
      },
    ],
  },
}

module.exports = nextConfig
