import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import NewsletterSignup from '@/components/NewsletterSignup'
import QuickQuoteForm from '@/components/QuickQuoteForm'
import FaqSection from '@/components/seo/FaqSection'
import StructuredData from '@/components/seo/StructuredData'
import { getCatalogImageClass } from '@/lib/catalogImagePresentation'
import { contactPhone } from '@/components/siteConfig'
import { getAllCatalogProducts, getCatalogOverviewPath, money } from '@/lib/catalogProducts'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildFaqJsonLd, buildOrganizationJsonLd } from '@/lib/seo/structuredData'

const HERO_IMAGE = '/catalog/custom/3-color/CBC-28-FC3C.webp'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Bags for Pharmacies, Vet Clinics, Dispensaries, Retailers, and Distributors',
  description:
    'Wholesale bag programs for buyers who need stock, custom print, and distributor support with reliable pricing, fast replenishment, and BagSupplyCo guidance.',
  path: '/',
  imagePath: HERO_IMAGE,
})

const industryQuickNav = [
  { label: 'Pharmacies', href: '/industries/pharmacies' },
  { label: 'Dispensaries', href: '/industries/dispensary' },
  { label: 'Veterinary', href: '/industries/veterinary' },
  { label: 'Smoke Shops', href: '/industries/smoke-shops' },
  { label: 'Custom Bags', href: '/catalog/custom' },
  { label: 'Distributors', href: '/distributors' },
]

const operationalPoints = [
  '1-color, 2-color, and 3-color custom paper bag programs',
  'Artwork, sizing, and reorder planning for branded bag buyers',
  'Stock bags and distributor support when custom is not the right first move',
]

const processSteps = [
  {
    title: 'Choose your category',
    detail: 'Start with pharmacy, veterinary, retail, mylar, labels, or custom print depending on the order type.',
  },
  {
    title: 'Review pricing',
    detail: 'Catalog pages show starting price anchors so buyers can compare options before sending a quote request.',
  },
  {
    title: 'Set your reorder plan',
    detail: 'Once the right bag is in place, we help keep repeat orders predictable instead of reactive.',
  },
]

const customBagHighlights = [
  '1-color, 2-color, and 3-color custom paper bag programs',
  'Better fit for repeat buyers who want brand consistency across locations',
  'Structured quote support for artwork, sizing, and reorder planning',
]

const dispensaryHighlights = [
  'Exit bags, mylar bags, and compliance labels in one buying path',
  'Opaque carryout options for dispensary checkout workflows',
  'Better fit for operators who need stock now and custom later',
]

const trustProofItems = [
  'Same-day stock shipping before 1 PM ET',
  'Custom print programs in 1, 2, and 3 colors',
  'Blind ship and distributor support available',
  'Follow-up within 24 hours on active quote requests',
]

const faqItems = [
  {
    question: 'Can I order stock bags and custom printed bags from the same supplier?',
    answer:
      'Yes. We support both stock and custom programs so teams can move quickly now and standardize branding over time.',
  },
  {
    question: 'Do you show pricing before I contact your team?',
    answer:
      'Yes. Catalog pages include starting case pricing so buyers can narrow options before requesting a final quote.',
  },
  {
    question: 'How fast can stock and custom orders ship?',
    answer:
      'Stock programs ship same day before 1 PM ET and custom print programs typically run 3-4 weeks after proof approval.',
  },
]

export default function Home() {
  const allProducts = getAllCatalogProducts()
  const featuredProducts = [
    ...allProducts.filter((product) => product.industry === 'custom'),
    ...allProducts.filter((product) => product.industry !== 'custom'),
  ].slice(0, 6)
  const categoryLinks = [
    { label: 'Custom print', href: '/catalog/custom', note: '1, 2, and 3 color custom paper bags' },
    { label: 'Pharmacy bags', href: '/catalog/pharmacy', note: 'Prescription bag sizes and stock designs' },
    { label: 'Veterinary bags', href: '/catalog/veterinary', note: 'Clinic-ready carryout and medication bags' },
    { label: 'Retail bags', href: '/catalog/retail-bags', note: 'Checkout bags for general retail' },
    { label: 'Mylar bags', href: '/catalog/mylar-bags', note: 'Dispensary and smoke shop packaging' },
    { label: 'Compliance labels', href: '/catalog/labels', note: 'Required and add-on label programs' },
  ]

  return (
    <div className="pb-16">
      <StructuredData data={buildOrganizationJsonLd()} />
      <StructuredData data={buildFaqJsonLd(faqItems)} />

      <section className="page-hero page-hero-home">
        <div className="page-hero-inner">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px]">
            <div>
              <h1 className="heading-display max-w-4xl">
                Custom printed bags should be the first thing serious buyers see.
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-[#4B3E2E]">
                Start with branded paper bags if custom print is the real money path, then backfill with stock bags,
                distributor support, and repeat-order planning when the program needs it.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#4B3E2E] md:max-w-3xl md:grid-cols-3">
                {operationalPoints.map((item) => (
                  <li key={item} className="rounded-md border border-[#D8C5A7] bg-white px-4 py-3 leading-6 shadow-[0_2px_10px_rgba(30,77,43,0.04)]">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog/custom" className="btn-primary">
                  Shop Custom Bags
                </Link>
                <Link href="/generic-bag-quote" className="btn-secondary">
                  Start a Custom Quote
                </Link>
                <Link href="/catalog" className="btn-quiet">
                  Browse All Catalogs
                </Link>
                <Link href="/distributors" className="btn-quiet">
                  wholesale bag pricing for distributors
                </Link>
              </div>
              <div className="mt-8 grid gap-4 border-t border-[#D8C5A7] pt-6 text-sm text-[#5F4D33] md:grid-cols-3">
                <div className="rounded-md bg-[rgba(255,255,255,0.55)] p-3">
                  <p className="font-black text-[#1E4D2B]">Custom focus</p>
                  <p className="mt-1">Push branded paper bags first when the buyer wants repeatable brand presentation.</p>
                </div>
                <div className="rounded-md bg-[rgba(255,255,255,0.55)] p-3">
                  <p className="font-black text-[#1E4D2B]">Custom lead time</p>
                  <p className="mt-1">Typical production window is 3-4 weeks after proof approval.</p>
                </div>
                <div className="rounded-md bg-[rgba(255,255,255,0.55)] p-3">
                  <p className="font-black text-[#1E4D2B]">Fallback path</p>
                  <p className="mt-1">Use stock bags and distributor support when speed matters more than customization.</p>
                </div>
              </div>
            </div>

            <aside className="hero-panel">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#D8C5A7] bg-[#F4ECE1]">
                <FallbackImage
                  src={HERO_IMAGE}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt="custom printed paper bag sample"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="border-b border-[#E7D9C3] pb-4">
                  <p className="font-black text-[#1E4D2B]">Custom-first buying path</p>
                  <p className="mt-2 text-[#5F4D33]">
                    Custom branded paper bags first, then stock replenishment, distributor blind-ship support, and category expansion after the core program is set.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="font-black text-[#1E4D2B]">Custom starting price</p>
                    <p className="mt-1 text-[#5F4D33]">Featured custom bags start at {money(featuredProducts[0]?.startingPrice || 0)} per case.</p>
                  </div>
                  <div>
                    <p className="font-black text-[#1E4D2B]">Quote support</p>
                    <p className="mt-1 text-[#5F4D33]">Artwork, sizing, and production guidance are available before the order is locked in.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="rounded-md border border-[#D8C5A7] bg-white px-5 py-5 md:px-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {trustProofItems.map((item) => (
              <div key={item} className="rounded-md border border-[#E7D9C3] bg-[#FCF8F2] px-4 py-3 text-sm font-semibold leading-6 text-[#5F4D33]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="rounded-[10px] border border-[#C4935A66] bg-[#1E4D2B] px-6 py-8 text-[#FAF6F0] md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.11em] text-[#D8C5A7]">Custom Bags</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                Custom printed bags should be the homepage priority, not a side option.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#E9DFD0] md:text-base">
                If branded paper bags are the real growth lane, this is the fastest path into it. Push buyers toward custom print early, then use stock programs as the fallback when speed matters more than brand presentation.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {customBagHighlights.map((item) => (
                  <div key={item} className="rounded-md border border-[#4A6A51] bg-[#204D2C] p-4 text-sm leading-6 text-[#F4E8D8]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog/custom" className="btn-secondary-inverse">
                  Shop Custom Bags
                </Link>
                <Link href="/generic-bag-quote" className="btn-primary">
                  Start a Custom Quote
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-[#4A6A51] bg-[#204D2C] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.09em] text-[#D8C5A7]">Why Push It</p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-black text-white">Higher-value buying path</p>
                  <p className="mt-1 text-[#E9DFD0]">Custom programs create bigger, stickier reorder relationships than one-off stock purchases.</p>
                </div>
                <div>
                  <p className="font-black text-white">Clear production expectation</p>
                  <p className="mt-1 text-[#E9DFD0]">Typical custom lead time is 3-4 weeks after proof approval, so buyers know the tradeoff up front.</p>
                </div>
                <div>
                  <p className="font-black text-white">Best next step</p>
                  <p className="mt-1 text-[#E9DFD0]">Send them straight into the custom catalog or the quote builder while intent is high.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="rounded-[10px] border border-[#D8C5A7] bg-white px-6 py-8 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.11em] text-[#B5813A]">Dispensaries</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1E4D2B] md:text-4xl">
                Dispensary buyers need a cleaner path into bags, mylar, and compliance.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5F4D33] md:text-base">
                This path is for operators who are balancing compliance, checkout presentation, and reorder speed. Lead with the dispensary packaging route when the buyer needs more than a plain paper bag.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {dispensaryHighlights.map((item) => (
                  <div key={item} className="rounded-md border border-[#E2D4BF] bg-[#FFFCF7] p-4 text-sm leading-6 text-[#5F4D33]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/industries/dispensary" className="btn-primary">
                  Shop Dispensary Packaging
                </Link>
                <Link href="/catalog/mylar-bags" className="btn-secondary">
                  Browse Mylar Bags
                </Link>
                <Link href="/catalog/labels" className="btn-quiet">
                  View Compliance Labels
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-[#D8C5A7] bg-[#FAF6F0] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.09em] text-[#7A6548]">Best Use Case</p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-black text-[#1E4D2B]">Fast stock replenishment</p>
                  <p className="mt-1 text-[#5F4D33]">Keep checkout moving with stocked exit bags and ready-to-order packaging basics.</p>
                </div>
                <div>
                  <p className="font-black text-[#1E4D2B]">Compliance support</p>
                  <p className="mt-1 text-[#5F4D33]">Layer in labels and opaque packaging when local workflow requirements demand it.</p>
                </div>
                <div>
                  <p className="font-black text-[#1E4D2B]">Custom upgrade path</p>
                  <p className="mt-1 text-[#5F4D33]">Start with stock if needed, then move into custom print once the reorder pattern is stable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <h2 className="section-title">Choose the category that matches how your team buys.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5F4D33]">
              The site is organized around practical buying paths, but custom print should lead the conversation when the goal is higher-value, repeatable business.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryLinks.map((item) => (
              <Link key={item.href} href={item.href} className="surface-card rounded-md p-4 transition hover:border-[#C4935A] hover:bg-[#FFFCF7]">
                <p className="font-black text-[#1E4D2B]">{item.label}</p>
                <p className="mt-2 text-sm text-[#5F4D33]">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="tonal-panel border-l-4 border-l-[#B5813A]">
              <p className="text-sm font-black text-[#B5813A]">0{index + 1}</p>
              <h2 className="mt-3 text-xl font-black text-[#1E4D2B]">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5F4D33]">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured custom-first products</h2>
            <p className="mt-3 text-sm text-[#5F4D33]">
              These featured picks lean custom first so buyers see the higher-value path before they drift into plain stock ordering.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {industryQuickNav.map((item) => (
              <Link key={item.href} href={item.href} className="btn-quiet px-4 py-2">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.sku} className="surface-card product-card flex h-full flex-col">
              <div className="relative aspect-[4/3] bg-[#F4ECE1]">
                <FallbackImage
                  src={product.image}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt={getCatalogProductAlt(product)}
                  fill
                  className={getCatalogImageClass(product)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h3>
                <p className="mt-2 text-sm text-[#5F4D33]">Starting at {money(product.startingPrice)} per case</p>
                <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-5 w-full justify-center">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="section-container py-14">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="tonal-panel">
            <h2 className="section-title">Build your quote</h2>
            <p className="mt-3 text-sm leading-7 text-[#5F4D33]">
              Send the basics and we will point you to the right stock category, custom route, or distributor program.
            </p>
          </div>
          <QuickQuoteForm />
        </div>
      </section>

      <FaqSection
        title="Common buyer questions"
        intro="These answers cover the questions teams usually ask before they lock in pricing or move a category under one supplier."
        items={faqItems}
      />

      <section className="section-container pt-6">
        <NewsletterSignup
          source="homepage"
          heading="Stay ahead of reorder season"
          subheading="Get product updates, new category additions, and useful reminders without a lot of filler."
          microcopy={`No spam. Unsubscribe anytime. Questions? Text ${contactPhone}.`}
          compact={false}
        />
      </section>
    </div>
  )
}
