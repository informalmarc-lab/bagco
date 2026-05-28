import type { Metadata } from 'next'
import Link from 'next/link'
import DispensaryCustomScrollStory, {
  type DispensaryCustomStoryItem,
} from '@/components/DispensaryCustomScrollStory'
import FallbackImage from '@/components/FallbackImage'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'
import {
  getCatalogOverviewPath,
  getCatalogProductBySlug,
  getCatalogProductsByIndustry,
  money,
} from '@/lib/catalogProducts'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Custom Dispensary Paper Bags',
  description:
    'Custom dispensary paper bags, printed exit bags, and branded paper bag quote support from Bag Supply Co.',
  path: '/dispensaries',
  imagePath: '/catalog/custom/2-color/CBC-22-FC2C.webp',
})

const programRows = [
  ['4 case minimum', 'Accessible first runs for dispensaries testing a branded paper bag program.'],
  ['1, 2, or 3 colors', 'Choose the print level that fits the brand, artwork, and budget.'],
  ['Proof before production', 'Artwork is checked before the custom run moves forward.'],
  ['Repeatable reorders', 'Keep the same size mix and print setup ready for the next run.'],
]

const customSteps = [
  'Choose the print level: 1-color, 2-color, or 3-color.',
  'Pick the bag sizes that match checkout volume and product mix.',
  'Send artwork, logo files, or a clear direction for the layout.',
  'Approve the proof, then move the run into production.',
]

const quoteDetails = [
  'Logo or artwork file',
  'Preferred bag sizes',
  'Print color count',
  'Estimated case quantity',
  'Store count and ship-to ZIP',
  'Target in-hand date',
]

const customProgramNotes: Record<string, { fit: string; detail: string }> = {
  FC1C: {
    fit: 'Best for simple logo bags',
    detail: 'Clean, lower-entry branding for stores that want the bag to carry the name without adding print complexity.',
  },
  FC2C: {
    fit: 'Best balanced choice',
    detail: 'A stronger branded look for most dispensary teams: enough contrast and personality without overbuilding the first order.',
  },
  FC3C: {
    fit: 'Best for high-impact artwork',
    detail: 'Use when the bag needs more visual presence at checkout, on pickup shelves, or across multiple store locations.',
  },
}

function getCustomProgramNote(sku: string) {
  return customProgramNotes[sku] || {
    fit: 'Best for custom checkout programs',
    detail: 'A practical route for dispensaries that want the paper bag to feel intentional and repeatable.',
  }
}

function getCustomStoryItems(customProducts: ReturnType<typeof getCatalogProductsByIndustry>): DispensaryCustomStoryItem[] {
  const programItems = customProducts.map((product, index) => {
    const note = getCustomProgramNote(product.sku)

    return {
      id: product.sku,
      eyebrow: `0${index + 1} ${product.colorOptions[0] || 'Custom print'}`,
      title: note.fit,
      copy: note.detail,
      image: product.image,
      href: getCatalogOverviewPath(product),
      price: `From ${money(product.startingPrice)}`,
      meta: [product.caseCount, product.colorOptions[0] || 'Custom print', 'Proof before production'],
    }
  })

  return [
    ...programItems,
    {
      id: 'proof-reorder',
      eyebrow: '04 Proof and reorder',
      title: 'Lock the bag once, then make reorders easier.',
      copy:
        'After the first custom run is approved, the same print setup and size mix can become the repeatable checkout bag program for the store.',
      image: customProducts[1]?.image || customProducts[0]?.image || '/catalog/custom/2-color/CBC-22-FC2C.webp',
      href: '/makeyourquote',
      meta: ['Artwork proof', 'Repeat setup', 'Reorder planning'],
    },
  ]
}

function getSizeHighlights(customProducts: ReturnType<typeof getCatalogProductsByIndustry>) {
  return Array.from(new Set(customProducts.flatMap((product) => product.sizeOptions))).slice(0, 8)
}

export default function DispensariesLandingPage() {
  const paperBag = getCatalogProductBySlug('dispensary-prescription-exit-bag')
  const paperProducts = getCatalogProductsByIndustry('dispensary')
  const customProducts = getCatalogProductsByIndustry('custom')
  const heroProduct = customProducts[1] || customProducts[0] || paperBag || paperProducts[0]
  const storyItems = getCustomStoryItems(customProducts)
  const sizeHighlights = getSizeHighlights(customProducts)

  return (
    <div className="bg-[#FAF6F0] pb-16">
      <section className="border-b border-[#D8C5A7] bg-[#FFFDF8]">
        <div className="section-container grid gap-8 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-balance text-4xl font-black leading-tight text-[#1E4D2B] md:text-6xl">
              Custom dispensary paper bags that make checkout feel branded.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F4D33] md:text-lg">
              Logo bags, branded exit bags, and repeatable paper bag runs for dispensaries that want the carryout
              moment to look more polished without slowing the counter down.
            </p>
            <div className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-3">
              <div className="border-l-2 border-[#B5813A] bg-white px-3 py-2">
                <p className="text-sm font-black text-[#1E4D2B]">1-3 colors</p>
                <p className="text-xs text-[#5F4D33]">Print options</p>
              </div>
              <div className="border-l-2 border-[#B5813A] bg-white px-3 py-2">
                <p className="text-sm font-black text-[#1E4D2B]">4 cases</p>
                <p className="text-xs text-[#5F4D33]">Minimum run</p>
              </div>
              <div className="border-l-2 border-[#B5813A] bg-white px-3 py-2">
                <p className="text-sm font-black text-[#1E4D2B]">Proof first</p>
                <p className="text-xs text-[#5F4D33]">Before production</p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/makeyourquote" className="btn-primary">
                Quote Custom Bags
              </Link>
              <Link href="/catalog/custom" className="btn-secondary">
                Browse Custom Bags
              </Link>
              <Link href="/catalog?industry=dispensary" className="btn-secondary">
                View Stock Exit Bags
              </Link>
            </div>
          </div>

          {heroProduct && (
            <div className="surface-card overflow-hidden rounded-lg bg-white">
              <Link href={getCatalogOverviewPath(heroProduct)} className="relative block aspect-[16/10] bg-[#FAF6F0]">
                <FallbackImage
                  src={heroProduct.image}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt={getCatalogProductAlt(heroProduct)}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </Link>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E1D2BB] p-4">
                <div>
                  <p className="text-xs font-black uppercase text-[#7A6548]">Featured custom paper bag</p>
                  <h2 className="mt-1 text-lg font-black text-[#1E4D2B]">{heroProduct.name}</h2>
                </div>
                <p className="product-card-price">From {money(heroProduct.startingPrice)}</p>
              </div>
              <div className="grid border-t border-[#E1D2BB] sm:grid-cols-3">
                {customProducts.map((product) => (
                  <Link
                    key={product.sku}
                    href={getCatalogOverviewPath(product)}
                    className="border-t border-[#E1D2BB] px-4 py-3 text-sm font-bold text-[#1E4D2B] hover:bg-[#FAF6F0] sm:border-l sm:border-t-0 sm:first:border-l-0"
                  >
                    {product.colorOptions[0]}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-container grid gap-3 py-8 md:grid-cols-4">
        {programRows.map(([title, copy]) => (
          <div key={title} className="border-t border-[#D8C5A7] bg-[#FFFDF8] py-4">
            <h2 className="text-base font-black text-[#1E4D2B]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#5F4D33]">{copy}</p>
          </div>
        ))}
      </section>

      <DispensaryCustomScrollStory items={storyItems} />

      <section className="section-container py-8">
        <div className="border-y border-[#D8C5A7] py-8">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <h2 className="section-title">Then build the size mix around checkout.</h2>
              <p className="mt-4 text-base leading-7 text-[#5F4D33]">
                Custom print is the visual decision. Sizing is the operational one: small bags for single-item
                handoff, larger formats for jars, accessories, receipts, and multi-item orders.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {sizeHighlights.map((size) => (
                <div key={size} className="border-l-2 border-[#B5813A] bg-[#FFFDF8] px-4 py-3">
                  <p className="text-lg font-black text-[#1E4D2B]">{size}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">Available custom paper bag size</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container grid gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-[#D8C5A7] bg-white p-5 md:p-7">
          <h2 className="section-title">Make the paper bag the brand touchpoint.</h2>
          <p className="mt-4 text-base leading-7 text-[#5F4D33]">
            The customer sees the bag at pickup, at the counter, and after they leave the store. A custom paper bag
            makes that handoff recognizable without adding friction for the team behind the counter.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={contactTextHref} className="btn-secondary">
              Text {contactPhone}
            </a>
            <a href={contactPhoneHref} className="btn-secondary">
              Call {contactPhone}
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-[#D8C5A7] bg-white p-5 md:p-7">
          <h2 className="text-2xl font-black text-[#1E4D2B]">What to send for pricing.</h2>
          <p className="mt-3 text-sm leading-6 text-[#5F4D33]">
            The quote gets cleaner when the artwork, quantity, and timing are clear up front.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quoteDetails.map((detail) => (
              <div key={detail} className="rounded-lg border border-[#E1D2BB] bg-[#FFFDF8] px-4 py-3 text-sm font-semibold text-[#5F4D33]">
                {detail}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-8">
        <div className="rounded-lg border border-[#D8C5A7] bg-white p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="section-title">How the custom bag quote works.</h2>
              <p className="mt-4 text-sm leading-6 text-[#5F4D33]">
                Keep the intake focused on the paper bag: size, print colors, artwork, quantity, and reorder timing.
                Compliance labels and mylar can stay separate from the first custom paper bag decision.
              </p>
              <Link href="/makeyourquote" className="btn-primary mt-5">
                Start Custom Quote
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {customSteps.map((step, index) => (
                <div key={step} className="rounded-lg border border-[#E1D2BB] bg-[#FFFDF8] p-4">
                  <p className="text-sm font-black text-[#B5813A]">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5F4D33]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-8">
        <div className="rounded-lg border border-[#D8C5A7] bg-white p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="section-title">Stock exit bags are still here when speed matters.</h2>
              <p className="mt-4 text-sm leading-6 text-[#5F4D33]">
                Use stock dispensary paper bags when the store needs inventory quickly, then move into custom print
                once the size mix and reorder volume are clear.
              </p>
              <Link href="/catalog?industry=dispensary" className="btn-secondary mt-5">
                Browse Stock Exit Bags
              </Link>
            </div>
            <div className="grid gap-3">
              {paperProducts.slice(0, 4).map((product) => (
                <Link
                  key={product.slug}
                  href={getCatalogOverviewPath(product)}
                  className="grid grid-cols-[96px_1fr] gap-3 rounded-lg border border-[#E1D2BB] bg-[#FFFDF8] p-3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                    <FallbackImage
                      src={product.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={getCatalogProductAlt(product)}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-black leading-5 text-[#1E4D2B]">{product.name}</h3>
                    <p className="mt-1 text-sm text-[#5F4D33]">From {money(product.startingPrice)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-8">
        <div className="rounded-lg border border-[#1E4D2B] bg-[#1E4D2B] p-6 text-white md:p-8">
          <h2 className="text-3xl font-black text-white">Build a custom dispensary paper bag quote.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#F4E8D8] md:text-base">
            Send the bag sizes, print color count, artwork status, order volume, store count, and reorder timing. The
            team can price the custom paper bag run first, then add stock exit bags only if they help the program.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">
              Start Quote
            </Link>
            <Link href="/industries/dispensary" className="btn-secondary-inverse">
              Read Full Dispensary Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
