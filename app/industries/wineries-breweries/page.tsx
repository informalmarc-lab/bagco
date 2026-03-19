import type { Metadata } from 'next'
import IndustryLandingPage from '@/components/IndustryLandingPage'

export const metadata: Metadata = {
  title: 'Winery & Brewery Packaging Programs',
  description:
    'Stock and custom kraft paper bottle bags for wineries, breweries, tasting rooms, and wine clubs with predictable lead times.',
}

export default function WineriesBreweriesIndustryPage() {
  return (
    <IndustryLandingPage
      industry="wineries-breweries"
      title="Winery & Brewery Packaging Programs"
      description="Stock and custom kraft paper bottle bags for wineries, breweries, tasting rooms, and wine clubs. Built for bottle handoff, tasting room retail, and seasonal reorder cycles."
      badges={[
        'Transparent Case Pricing',
        'Build a Quote',
        'Same Day Stock (Before 1 PM ET)',
        'Custom 3-4 Weeks',
        'Net 30 Available',
        'Ships Across The US',
      ]}
      heroCatalogLabel="Browse Winery Catalog"
      featuredProductSlugs={[
        'winery-bag-wmc09',
        'winery-bag-wmc10',
        'winery-bag-wmc11',
        'winery-bag-custom',
      ]}
      bottomCatalogHref="/catalog?industry=wineries-breweries"
      bottomCatalogLabel="Browse Winery Catalog"
      deepDiveSection={{
        title: 'Choosing the Right Winery Bottle Bag Program',
        paragraphs: [
          'Selecting the right winery bottle bag starts with understanding your sales mix — single bottle purchases, multi-bottle tasting room sales, and wine club fulfillment each call for different formats. Bags sized for single bottles with twisted paper handles are the standard for walk-out purchases, while wider gusset formats support two- and four-bottle orders without losing structural integrity. For tasting rooms doing high weekend volume, stocking two or three sizes covers the full range of transactions without requiring staff judgment calls at the point of sale.',
          'Custom printed winery bottle bags are one of the most effective branding investments a winery can make. Every bag that leaves the tasting room or wine club fulfillment center is a mobile advertisement — at restaurants, dinner parties, and gift occasions. Stock designs provide immediate availability and lower case minimums, making them ideal for new operations or seasonal volume spikes. Custom programs with your label colors, logo, and vineyard imagery deliver stronger brand recall and work especially well for established wineries with consistent reorder volume and defined seasonal windows.',
          'Reorder planning for winery bags typically follows harvest and holiday cycles. Spring and summer tasting room traffic, fall harvest events, and holiday gift season each drive volume spikes that can exhaust stock quickly if not planned ahead. Building a recurring replenishment cadence around these windows — with stock bags as a buffer and custom bags as the primary program — keeps fulfillment consistent without emergency reorders at peak margin periods. A reliable 3-4 week lead time on custom runs means orders placed in September are ready for November and December without guesswork.',
        ],
      }}
    />
  )
}
