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
      description="Plain and custom kraft paper bags for smoke shops, head shops, and tobacco retailers. Durable carry-out formats with stock and custom print options for single-item and multi-item purchases."
      badges={[
        'Transparent Case Pricing',
        'Build a Quote',
        'Same Day Stock (Before 1 PM ET)',
        'Custom 3-4 Weeks',
        'Net 30 Available',
        'Ships Across The US',
      ]}
      startingPriceOverride={65.91}
      featuredProductSlugs={[
        'smoke-shop-plain-kraft-bag',
        'smoke-shop-custom-bag',
        'pharmacy-bag-gs-design',
      ]}
      mostOrderedSizesOverride={[
        '#22 (4.5" x 2.25" x 11") — standard single-item carry-out',
        '#25 (6" x 4" x 11") — mid-size multi-item carry-out',
        '#28 (8" x 5" x 17") — large item and accessory carry-out',
      ]}
      bottomCatalogHref="/catalog?industry=smoke-shop"
      bottomCatalogLabel="Browse Smoke Shop Catalog"
      deepDiveSection={{
        title: 'Choosing the Right Smoke Shop Bag Program',
        paragraphs: [
          'Smoke shop carry-out bags serve a straightforward purpose — durable, discreet transport for glassware, accessories, tobacco, and related products. The right size mix matters: smaller bags like the #21 and #22 handle single-item purchases cleanly, while larger formats like the #25 and #28 accommodate multi-item transactions and larger accessories without stress on the seams or handles. Stocking two or three core sizes eliminates checkout friction and keeps the transaction moving at busy periods.',
          'Plain kraft bags are the default choice for most smoke shops because they are neutral, professional, and immediately available. Custom printed bags are a step up in brand presence — a shop name and logo on the bag that walks out the door is low-cost advertising in the local area. Even a one-color imprint with the store name significantly improves recall compared to a plain bag, and the cost difference per bag is minimal at case volume. For shops with consistent weekly volume, a custom program paired with a plain stock buffer is a reliable approach that covers branding without risking stockouts.',
          'Reorder planning for smoke shop bags is typically straightforward — volume is relatively stable week to week compared to seasonal verticals. The main risk is running out mid-week during high-traffic periods. Setting a reorder trigger at one case remaining per size eliminates most stockout situations. For shops doing higher volume, monthly ordering with same-day stock fulfillment as a safety net keeps the operation clean. Custom programs require a 3-4 week lead time, so factoring that into seasonal or promotional planning prevents gaps in branded carry-out availability.',
        ],
      }}
    />
  )
}

