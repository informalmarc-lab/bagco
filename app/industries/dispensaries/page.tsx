import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Dispensary Exit Bags | Custom Cannabis Bags Manufacturer | Bag Supply Co',
  },
  description:
    'Custom and stock dispensary exit bags. Opaque, branded, or plain options. Ships nationwide. Instant case-level pricing available.',
}

export default function DispensariesIndustryPage() {
  return (
    <IndustryLandingPage
      industry="dispensary"
      title="Dispensary Packaging Programs"
      description="Build a dispensary bag program with child-resistant and smell-proof options, then scale into custom print with reliable lead-time expectations."
      bottomCatalogHref="/catalog?industry=dispensary"
      bottomCatalogLabel="Open Dispensary Catalog"
      deepDiveSection={{
        title: 'Dispensary Exit Bag Options: Stock, Custom, and Compliance',
        paragraphs: [
          'Most dispensary operators evaluate exit bags around three factors: compliance, cost control, and customer experience. In many markets, dispensary exit bags must be opaque and sealed in a way that limits direct product visibility during transport. Some operations also choose resealable or child resistant exit bags for additional safety and consistency at checkout. Because regulations vary by jurisdiction, teams should confirm state and local requirements before locking in spec, especially if they serve multiple locations with different compliance rules.',
          'Ordering strategy matters just as much as bag type. Mini-case purchasing can help smaller storefronts test demand and avoid tying up cash, while full-case orders are usually better for consistent throughput and lower per-case pricing. For high-volume programs, dispensary paper bags bulk plans typically reduce stockout risk when tied to weekly sales and event cycles. A mixed approach often works best: keep stock bags on hand for immediate replenishment and reserve custom dispensary bags for core branded lines or campaign periods.',
          'From a brand perspective, plain bags prioritize speed and flexibility, while printed cannabis dispensary bags strengthen recognition after each sale. The right balance depends on your reorder rhythm and marketing goals. Custom programs require planning lead time, but they deliver stronger shelf-to-street visibility when executed consistently. Teams that document compliance checks, size standards, and reorder triggers can scale with less friction. Whether you choose plain, printed, or hybrid formats, a structured exit-bag program improves operational reliability and keeps every transaction aligned with compliance expectations.',
        ],
      }}
    />
  )
}
