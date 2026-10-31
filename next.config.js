// Next loads .env* before this file, so missing admin secrets stop build/start/dev here.
for (const name of ['BAGCO_ADMIN_PASSWORD', 'BAGCO_ADMIN_SECRET']) {
  if (!process.env[name]) throw new Error(`${name} is not set. Add it to .env.local.`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Stopgap: keep the Next 14 image optimizer (several unpatched advisories) out of the request path.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
