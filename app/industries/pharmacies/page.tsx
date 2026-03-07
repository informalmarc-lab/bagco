import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Pharmacy Bags & Rx Bags | Bulk Paper Bag Manufacturer | Bag Supply Co',
  },
  description:
    'Stock and custom printed pharmacy bags in all standard Rx sizes. Low minimums, 3-4 week lead times, recurring reorder programs.',
}

export default function PharmaciesIndustryPage() {
  return (
    <IndustryLandingPage
      industry="pharmacy"
      title="Pharmacy Packaging Programs"
      description="Keep pharmacy checkout smooth with stock and custom bag options built around script volume, case counts, and predictable replenishment."
      bottomCatalogHref="/catalog/pharmacy"
      bottomCatalogLabel="Open Pharmacy Catalog"
      deepDiveSection={{
        title: 'Choosing the Right Pharmacy Bag for Your Operation',
        paragraphs: [
          'Selecting the right pharmacy paper bag starts with understanding prescription mix, pickup flow, and shelf space at your counter. Most operations rotate through a small set of core formats, especially 5x2x10, 6x4x11, 7x4x13, and 10x5x15. Smaller sizes handle single-script pickups and blister packs, while medium and large bags support multi-script orders, over-the-counter add-ons, and specialty items. Standardizing around the right pharmacy bag sizes keeps purchasing cleaner and minimizes partial-case leftovers that create waste.',
          'When evaluating custom pharmacy bags, teams should compare stock availability against branding goals. Stock lines are ideal for immediate demand and tighter reorder windows, while custom printed rx bags support stronger brand recall at handoff. A practical strategy is to run stock for baseline volume and layer in custom pharmacy bags for higher-traffic locations or growth periods. Working with an rx bags manufacturer that supports both tracks gives you flexibility without changing vendors when your needs shift.',
          'For high-volume stores, reorder cadence is as important as unit cost. Pharmacy paper bags bulk ordering works best when tied to script counts and refill behavior, not guesswork. If weekly volume is stable, monthly replenishment can reduce admin burden; if volume swings seasonally, biweekly ordering often prevents overstock and stockouts. This is where lead time matters: a delayed custom run can disrupt operations if there is no stock buffer. Reliable 3-4 week planning for custom orders plus stock backup inventory helps pharmacies stay consistent, protect front-counter speed, and maintain a professional patient experience every day.',
        ],
      }}
    />
  )
}
