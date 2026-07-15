import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
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
  '1, 2, and 3 color custom paper bag programs',
  'Artwork and reorder planning for branded buyers',
  'Stock bags when speed matters more than customization',
]

const processSteps = [
  {
    title: 'Pick your program',
    detail: 'Stock if you need bags this week. Custom print if you\'re building a branded program. We\'ll tell you which makes sense for your volume.',
  },
  {
    title: 'We handle the details',
    detail: 'For custom orders: artwork coordination, sizing, proof review, and production timeline — we walk through it, you don\'t figure it out alone.',
  },
  {
    title: 'Reorders without the restart',
    detail: 'Once specs are set, repeat orders run faster. Same proof, same sizes, no re-explaining your requirements from scratch.',
  },
]

const customBagHighlights = [
  '1-color, 2-color, and 3-color custom paper bag programs',
  'Brand consistency across all your locations',
  'Guided artwork, sizing, and reorder planning from start to finish',
]

const dispensaryHighlights = [
  'Exit bags, mylar bags, and compliance labels in one buying path',
  'Opaque carryout options for dispensary checkout workflows',
  'Start with stock, move to custom when your reorder pattern is stable',
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
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <p className="kicker mb-4">Pharmacies · Dispensaries · Vet Clinics · Smoke Shops</p>
              <h1 className="heading-display max-w-3xl">
                Custom printed bags for serious wholesale buyers.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B3E2E] md:text-lg">
                Build branded paper bag programs with clear pricing, real product visuals, and support for repeat orders.
                Stock bags and distributor paths are available when speed matters.
              </p>
              <ul className="mt-6 grid max-w-3xl gap-3 text-sm text-[#4B3E2E] md:grid-cols-3">
                {operationalPoints.map((item) => (
                  <li key={item} className="min-w-0 rounded-2xl border border-kraft-300/60 bg-white px-4 py-3 leading-6">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/request-sample" className="btn-primary">
                  Request a Sample
                </Link>
                <Link href="/catalog/custom" className="btn-secondary">
                  Browse Custom Bags
                </Link>
              </div>
            </div>

            <aside className="rounded-[18px] border border-[rgba(196,147,90,0.16)] bg-white p-4 shadow-[0_10px_24px_rgba(30,77,43,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-kraft-300/60 bg-[#F6EFE5]">
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
              <div className="mt-4 space-y-4 text-sm">
                <div className="border-b border-[#E7D9C3] pb-4">
                  <p className="font-black text-brand-600">Custom-first buying path</p>
                  <p className="mt-2 text-muted">
                    Branded paper bags first, then stock replenishment and distributor support when the program needs it.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <p className="font-black text-brand-600">Custom starting price</p>
                    <p className="mt-1 text-muted">{featuredProducts[0]?.startingPrice ? <>Custom bags start at {money(featuredProducts[0].startingPrice)} per case.</> : 'Starting prices shown on each product page.'}</p>
                  </div>
                  <div>
                    <p className="font-black text-brand-600">Quote support</p>
                    <p className="mt-1 text-muted">Artwork, sizing, and production guidance are available before the order is locked in.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="rounded-2xl border border-kraft-300/60 bg-white p-4 md:p-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3">
            {trustProofItems.map((item) => (
              <div key={item} className="min-w-0 rounded-2xl border border-[#E7D9C3] bg-[#FCF8F2] px-4 py-3 text-sm font-semibold leading-6 text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="rounded-[24px] border border-kraft-400/40 bg-brand-600 px-6 py-8 text-[#FAF6F0] md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.11em] text-accent-300">Custom Print Programs</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.01em] text-white md:text-4xl">
                Your branded bags should do more than carry the purchase out the door.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#E9DFD0] md:text-base">
                Every carry-out is a brand impression. Custom print programs give you 1, 2, or 3-color bags built to your spec — with guided artwork, proofing, and a reorder plan that keeps you stocked without the scramble.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {customBagHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/12 bg-brand-700/60 p-4 text-sm leading-6 text-[#F4E8D8]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog/custom" className="btn-secondary-inverse">
                  Shop Custom Bags
                </Link>
                <Link href="/makeyourquote" className="btn-primary">
                  Start a Custom Quote
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 bg-brand-700/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.09em] text-accent-300">Why Custom Print</p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-black text-white">Stronger brand on every carry-out</p>
                  <p className="mt-1 text-[#E9DFD0]">Your bags leave the store with your customers. Custom print turns every transaction into a brand touchpoint.</p>
                </div>
                <div>
                  <p className="font-black text-white">Clear production timeline</p>
                  <p className="mt-1 text-[#E9DFD0]">Custom programs run 3–4 weeks from proof approval. Plan ahead and we&apos;ll keep you stocked on schedule.</p>
                </div>
                <div>
                  <p className="font-black text-white">Ready when you are</p>
                  <p className="mt-1 text-[#E9DFD0]">Browse the custom catalog or start a quote — we&apos;ll walk you through sizing, artwork, and pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="rounded-[24px] border border-kraft-300/60 bg-white px-6 py-8 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.11em] text-accent-500">Dispensaries</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-4xl">
                Need a cleaner path into bags, mylar, and compliance labels?
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted md:text-base">
                If you&apos;re balancing compliance requirements, checkout presentation, and reorder speed, this is the right starting point. Exit bags, mylar, and compliance labels — available in one buying path.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {dispensaryHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#E2D4BF] bg-[#FFFCF7] p-4 text-sm leading-6 text-muted">
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

            <div className="rounded-2xl border border-kraft-300/60 bg-[#FAF6F0] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.09em] text-accent-600">Best Use Case</p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-black text-brand-600">Fast stock replenishment</p>
                  <p className="mt-1 text-muted">Keep checkout moving with stocked exit bags and ready-to-order packaging basics.</p>
                </div>
                <div>
                  <p className="font-black text-brand-600">Compliance support</p>
                  <p className="mt-1 text-muted">Opaque exit bags, compliance labels, and mylar all available — match your state&apos;s specific checkout requirements.</p>
                </div>
                <div>
                  <p className="font-black text-brand-600">Custom upgrade path</p>
                  <p className="mt-1 text-muted">Start with stock if needed, then move into custom print once the reorder pattern is stable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <h2 className="section-title">Choose the category that matches how your team buys.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Organized around practical buying paths — custom print, stock replenishment, and industry-specific programs.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryLinks.map((item) => (
              <Link key={item.href} href={item.href} className="surface-card p-5 transition hover:border-accent-400/60 hover:bg-[#FFFCF7]">
                <p className="font-black text-brand-600">{item.label}</p>
                <p className="mt-2 text-sm text-muted">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <h2 className="section-title">How the buying process works</h2>
        <div className="mt-6 grid gap-px bg-kraft-300/40 overflow-hidden rounded-2xl md:grid-cols-3">
          {processSteps.map((step) => (
            <article key={step.title} className="bg-white p-6">
              <h3 className="font-serif text-xl text-brand-600">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Browse products by industry</h2>
            <p className="mt-3 text-sm text-muted">
              Stock bags ship same day before 1 PM ET. Custom print programs take 3–4 weeks after proof approval.
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
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-600">SKU {product.sku}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${product.availability === 'stock' ? 'bg-emerald-50 text-emerald-700' : 'bg-accent-50 text-accent-700'}`}>
                    {product.availability === 'stock' ? 'Stock' : 'Custom'}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg text-brand-600">{product.name}</h3>
                <p className="mt-2 text-sm text-muted">Starting at {money(product.startingPrice)} per case</p>
                <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-5 w-full justify-center">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="section-container py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="tonal-panel">
            <h2 className="section-title">Build your quote</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Send the basics and we&apos;ll point you to the right stock category, custom route, or distributor program. Response within 24 hours.
            </p>
          </div>
          <QuickQuoteForm />
        </div>
      </section>

      <FaqSection
        title="Common buyer questions"
        intro="Questions most buyers have before locking in pricing or switching to a new supplier."
        items={faqItems}
      />

      <section className="section-container py-12">
        <div className="rounded-[24px] border border-kraft-300/60 bg-white px-6 py-8 text-center md:px-8">
          <p className="kicker">Still have questions?</p>
          <h2 className="mt-3 section-title">Talk to someone who knows your industry.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
            We respond to quote requests within 24 hours. Prefer to talk through your needs first? Call or text us directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`tel:${contactPhone}`} className="btn-primary">
              Call {contactPhone}
            </a>
            <Link href="/contact" className="btn-secondary">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
