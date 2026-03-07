import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Paper Bags for Smoke Shops | Wholesale | Bag Supply Co',
  },
  description:
    'Branded paper bags for smoke shops and head shops. Stock and custom print options with bulk pricing and fast turnaround.',
}

export default function SmokeShopsIndustryPage() {
  return (
    <IndustryLandingPage
      industry="smoke-shop"
      title="Smoke Shop Packaging Programs"
      description="Use stock and branded carry-out bags to strengthen store recognition while keeping restock cadence consistent."
      bottomCatalogHref="/catalog?industry=smoke-shop"
      bottomCatalogLabel="Open Smoke Shop Catalog"
      deepDiveSection={{
        title: 'Why Branded Bags Matter for Smoke Shops',
        paragraphs: [
          'For smoke shops, packaging is more than a checkout necessity. It is one of the few brand touchpoints customers carry into public spaces after purchase. Choosing the right smoke shop paper bags starts with product mix. Smaller formats support accessories, wraps, and compact hardware, while larger sizes cover glass, apparel, and bundled orders. Standardizing your top bag sizes by transaction type helps staff move faster and avoids overusing premium formats for small-ticket purchases.',
          'Branding also changes the long-term value of each order. Generic bags can work for short-term cost control, but custom bags for smoke shops create repeated local impressions every time customers leave the store. In neighborhoods with heavy foot traffic, that visibility compounds quickly. A recognizable print style, consistent logo placement, and durable paper quality can make your bag part of the store experience rather than disposable overhead. This is especially useful for independent stores competing with chains and online alternatives.',
          'When comparing stock versus custom, teams should evaluate total cost per transaction, not just headline case price. Stock options usually deliver faster and can be ideal for baseline replenishment. Custom programs often require more planning lead time, but they improve brand recall and can support higher perceived value. Many operators run a blended model: stock for daily volume and branded lines for priority categories or seasonal campaigns. If you are sourcing retail paper bags wholesale, the most effective setup is predictable reorders, consistent sizing, and a print strategy that matches your in-store identity.',
        ],
      }}
    />
  )
}
