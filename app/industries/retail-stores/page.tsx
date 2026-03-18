import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Retail Paper Bags | Branded Shopping Bags | Bag Supply Co',
  },
  description:
    'Factory-direct custom retail bags for boutiques, gift shops and storefronts. 1, 2, and 3-color print options. Net 30 available.',
}

export default function RetailStoresIndustryPage() {
  return (
    <IndustryLandingPage
      industry="retail"
      title="Retail / Boutique Packaging Programs"
      description="Compare handled kraft, euro totes, glossy white, and seasonal collections in one filtered retail catalog flow."
      bottomCatalogHref="/catalog?industry=retail"
      bottomCatalogLabel="Open Retail Catalog"
      deepDiveSection={{
        title: 'Custom Retail Bags That Work as Hard as You Do',
        paragraphs: [
          'Retail packaging is one of the last impressions customers take with them after checkout. Well-built custom retail paper bags keep product presentation strong beyond the register and reinforce your brand in the street, parking lot, and workplace. For boutiques, gift stores, and specialty retailers, this matters because bag quality and print consistency often influence how customers remember the purchase experience. A durable bag that looks intentional can extend perceived value long after the transaction ends.',
          'Sizing strategy should match merchandising reality. Smaller formats are practical for accessories and single-item purchases, while medium and large bags support apparel stacks, boxed goods, and multi-item baskets. Teams that map bag sizes to average basket composition usually see cleaner inventory behavior and fewer emergency reorders. If you need branded shopping bags across multiple store formats, standardizing two to four high-frequency sizes is usually more effective than carrying a wide but inconsistent mix.',
          'Minimum order requirements and reorder planning also shape long-term cost. A reliable retail bag manufacturer should help you balance stock speed with custom branding needs, then keep print quality stable across repeat runs. That consistency is critical for chains and growth-stage brands that cannot afford color shifts or paper-grade changes between locations. For teams buying bulk paper bags for retail, the best outcomes come from predictable lead windows, quality control on each run, and a structured reorder cadence that prevents downtime during peak selling periods.',
        ],
      }}
    />
  )
}

