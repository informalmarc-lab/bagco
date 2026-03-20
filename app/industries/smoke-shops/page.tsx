import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Dispensary Style Paper Bags for Smoke Shops | Wholesale | Bag Supply Co',
  },
  description:
    'Stocked dispensary bag designs for smoke shops and specialty retailers. Classic RX and #12-DS paper sizes with case pricing starting at $43.40.',
}

export default function SmokeShopsIndustryPage() {
  return (
    <IndustryLandingPage
      industry="smoke-shop"
      title="Smoke Shop Dispensary Bag Designs"
      description="Stocked dispensary-style paper bag designs for smoke shops, vape counters, and specialty retailers that want discreet, ready-to-ship carryout. Choose from 15 printed designs in the same Classic RX and #12-DS formats used for fast front-counter handoff."
      badges={[
        'Transparent Case Pricing',
        'Build a Quote',
        'Same Day Stock (Before 1 PM ET)',
        '15 Stocked Designs',
        'Net 30 Available',
        'Ships Across The US',
      ]}
      startingPriceOverride={43.4}
      featuredProductSlugs={[
        'dispensary-bag-design-10',
        'dispensary-bag-design-11',
        'dispensary-bag-design-12',
        'dispensary-bag-design-13',
        'dispensary-bag-design-14',
        'dispensary-bag-design-15',
      ]}
      mostOrderedSizesOverride={[
        'Classic RX (10" x 5" x 1") - narrow bottle and single-order handoff',
        '#12-DS (7" x 10") - flat pack and multi-item paper carryout',
      ]}
      bottomCatalogHref="/catalog?industry=smoke-shop"
      bottomCatalogLabel="Browse Smoke Shop Design Catalog"
      deepDiveSection={{
        title: 'Choosing the Right Stocked Design Mix',
        paragraphs: [
          'These stocked dispensary bag designs give smoke shops a ready-made paper program without the long setup cycle of custom print. The lineup keeps the format simple: the narrow Classic RX size handles quick counter handoff cleanly, while the #12-DS format gives you a flatter paper option for slightly larger orders and bundled accessories.',
          'Because every design shares the same core size program, replenishment is easier than managing a mixed assortment of unrelated bags. You can choose a single look across all orders or rotate multiple designs for variety while keeping the same case count, handling flow, and storage footprint in the back room.',
          'For teams that want a more discreet paper carryout option, stocked designs are the fastest route. They deliver visual polish immediately, hold up well at checkout, and let you reorder familiar formats quickly instead of rebuilding the bag program from scratch each time demand changes.',
        ],
      }}
    />
  )
}
