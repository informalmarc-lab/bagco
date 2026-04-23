import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import NewsletterSignup from '@/components/NewsletterSignup'
import QuickQuoteForm from '@/components/QuickQuoteForm'
import FaqSection from '@/components/seo/FaqSection'
import StructuredData from '@/components/seo/StructuredData'
import { contactPhone } from '@/components/siteConfig'
import { getAllCatalogProducts, getCatalogOverviewPath, money } from '@/lib/catalogProducts'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildFaqJsonLd, buildOrganizationJsonLd } from '@/lib/seo/structuredData'

const HERO_IMAGE = '/catalog/pharmacy/gs/GS-22-FRONT.webp'

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
  'Stock and custom paper bag programs',
  'Blind shipping and drop shipping for distributor accounts',
  'Repeat-order support for multi-location buyers',
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
  const featuredProducts = getAllCatalogProducts().slice(0, 6)
  const categoryLinks = [
    { label: 'Pharmacy bags', href: '/catalog/pharmacy', note: 'Prescription bag sizes and stock designs' },
    { label: 'Veterinary bags', href: '/catalog/veterinary', note: 'Clinic-ready carryout and medication bags' },
    { label: 'Retail bags', href: '/catalog/retail-bags', note: 'Checkout bags for general retail' },
    { label: 'Mylar bags', href: '/catalog/mylar-bags', note: 'Dispensary and smoke shop packaging' },
    { label: 'Compliance labels', href: '/catalog/labels', note: 'Required and add-on label programs' },
    { label: 'Custom print', href: '/catalog/custom', note: '1, 2, and 3 color custom paper bags' },
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
                Wholesale bag supply for pharmacies, veterinary clinics, dispensaries, retailers, and distributors.
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-[#4B3E2E]">
                Buy stocked bags, custom print programs, and distributor fulfillment support from one supplier with
                clear category structure and repeat-order planning.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-[#4B3E2E] md:max-w-2xl">
                {operationalPoints.map((item) => (
                  <li key={item} className="rounded-md border border-[#D8C5A7] bg-white px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog" className="btn-primary">
                  Browse Catalogs
                </Link>
                <Link href="/generic-bag-quote" className="btn-secondary">
                  Build a Quote
                </Link>
                <Link href="/distributors" className="btn-quiet">
                  wholesale bag pricing for distributors
                </Link>
              </div>
              <div className="mt-8 grid gap-4 border-t border-[#D8C5A7] pt-6 text-sm text-[#5F4D33] md:grid-cols-3">
                <div>
                  <p className="font-black text-[#1E4D2B]">Stock orders</p>
                  <p className="mt-1">Same-day shipping before 1 PM ET on in-stock items.</p>
                </div>
                <div>
                  <p className="font-black text-[#1E4D2B]">Custom lead time</p>
                  <p className="mt-1">Typical production window is 3-4 weeks after proof approval.</p>
                </div>
                <div>
                  <p className="font-black text-[#1E4D2B]">Buyer support</p>
                  <p className="mt-1">Text {contactPhone} for quote help, reorders, or distributor setup.</p>
                </div>
              </div>
            </div>

            <aside className="hero-panel">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#D8C5A7] bg-[#F4ECE1]">
                <FallbackImage
                  src={HERO_IMAGE}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt="white kraft paper pharmacy bags, GS design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="border-b border-[#E7D9C3] pb-4">
                  <p className="font-black text-[#1E4D2B]">Most requested buying paths</p>
                  <p className="mt-2 text-[#5F4D33]">
                    Pharmacy stock bags, dispensary packaging kits, veterinary carryout bags, and distributor blind-ship programs.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="font-black text-[#1E4D2B]">Starting price</p>
                    <p className="mt-1 text-[#5F4D33]">Featured bags start at {money(featuredProducts[0]?.startingPrice || 0)} per case.</p>
                  </div>
                  <div>
                    <p className="font-black text-[#1E4D2B]">Distributor support</p>
                    <p className="mt-1 text-[#5F4D33]">Blind ship and drop ship support are available for approved accounts.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="section-title">Choose the category that matches how your team buys.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5F4D33]">
              The site is organized around practical buying paths, not generic marketing sections. Start with the product family you need now, then move into custom print or distributor support if the program expands.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryLinks.map((item) => (
              <Link key={item.href} href={item.href} className="surface-card rounded-md p-4">
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
            <article key={step.title} className="tonal-panel">
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
            <h2 className="section-title">Featured wholesale products</h2>
            <p className="mt-3 text-sm text-[#5F4D33]">
              These are common starting points for repeat B2B orders across pharmacy, veterinary, and retail buyers.
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
                  className="object-cover"
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
