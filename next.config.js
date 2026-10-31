// Next loads .env* before this file, so missing admin secrets stop build/start/dev here.
for (const name of ['BAGCO_ADMIN_PASSWORD', 'BAGCO_ADMIN_SECRET']) {
  if (!process.env[name]) throw new Error(`${name} is not set. Add it to .env.local.`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Removed sections (Oct 2026 simplification). Permanent redirects keep old links and Google results working.
    return [
      { source: '/cart', destination: '/makeyourquote', permanent: true },
      { source: '/checkout', destination: '/makeyourquote', permanent: true },
      { source: '/order-confirmation', destination: '/makeyourquote', permanent: true },
      { source: '/catalog/mylar-bags/:path*', destination: '/catalog', permanent: true },
      { source: '/catalog/labels', destination: '/catalog', permanent: true },
      { source: '/catalog/cigar-bags/:path*', destination: '/catalog', permanent: true },
      { source: '/industries/cigar-shops', destination: '/industries/smoke-shops', permanent: true },
      { source: '/industries/dispensary', destination: '/dispensaries', permanent: true },
      { source: '/industries/dispensaries', destination: '/dispensaries', permanent: true },
      { source: '/weddings-events', destination: '/catalog/custom', permanent: true },
      { source: '/event-company-bags/:path*', destination: '/catalog/custom', permanent: true },
    ]
  },
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
