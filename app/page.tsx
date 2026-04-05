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
  { label: 'Pharmacies', href: '/industries/pharmacies', icon: '\u{1F3E5}' },
  { label: 'Dispensaries', href: '/industries/dispensary', icon: '\u{1F33F}' },
  { label: 'Veterinary', href: '/industries/veterinary', icon: '\u{1F43E}' },
  { label: 'Smoke Shops', href: '/industries/smoke-shops', icon: '\u{1F6AC}' },
  { label: 'Custom Bags', href: '/catalog/custom', icon: 'CB' },
  { label: 'Distributors', href: '/distributors', icon: '\u{1F4E6}' },
]

const deliveryPoints = [
  'Stock and custom paper bag programs',
  'Blind shipping and drop shipping support for distributor accounts',
  'Recurring replenishment support for multi-location teams',
]

const faqItems = [
  {
    question: 'Can I order stock bags and custom printed bags from the same supplier?',
    answer:
      'Yes. We support both stock and custom programs so teams can move quickly now and standardize branding over time.',
  },
  {
    question: 'Do you show pricing anchors before I contact sales?',
    answer:
      'Yes. Catalog cards show starting case prices so you can align options before requesting a final quote.',
  },
  {
    question: 'How fast can stock and custom orders ship?',
    answer:
      'Stock programs ship same day before 1 PM ET and custom print programs typically run 3-4 weeks after proof approval.',
  },
  {
    question: 'Do you work with distributors?',
    answer:
      'Yes. We offer distributor accounts with factory-direct pricing, blind shipping, and drop shipping support.',
  },
  {
    question: 'What is blind shipping?',
    answer:
      'Blind shipping means we ship orders directly to your end customers with no Bag Supply Co branding on the package or packing slip. Your brand stays protected and your customer relationship stays yours.',
  },
  {
    question: 'Do you offer drop shipping for distributors?',
    answer:
      'Yes. Distributor accounts can set up drop ship programs where we fulfill orders directly to their end customers on their behalf. Contact us to set up a distributor account.',
  },
  {
    question: 'How do I set up a distributor account?',
    answer:
      "Contact our team by building a quote or by texting (704) 862-9256. We'll walk you through volume requirements, blind ship setup, and drop ship logistics.",
  },
  {
    question: 'What is the minimum order quantity?',
    answer:
      'Stock programs have no minimum. Custom print requires a 4-case minimum per bag type.',
  },
  {
    question: 'Can I get samples before ordering?',
    answer:
      'Yes - contact us and we will send relevant samples before you commit.',
  },
  {
    question: 'What file format for artwork?',
    answer:
      'AI, EPS, or PDF vector files. We review during proofing before production.',
  },
  {
    question: 'How does shipping work?',
    answer:
      'We ship across the US. Orders of 8+ cases qualify for our Fuel Surcharge (FSC) freight model.',
  },
  {
    question: 'What is FSC?',
    answer:
      'FSC means Forest Stewardship Council. It confirms the paper comes from responsibly managed forests.',
  },
  {
    question: 'Lead time for custom bags?',
    answer:
      '3-4 weeks from proof approval. Stock orders may ship faster.',
  },
  {
    question: 'Quality issue with my order?',
    answer:
      "Contact us immediately and we'll make it right on the next production run.",
  },
  {
    question: 'Do you support recurring reorder programs?',
    answer:
      'Yes. We can build a recurring cadence so your locations get inventory before reorder stress hits.',
  },
]

export default function Home() {
  const featuredProducts = getAllCatalogProducts().slice(0, 6)

  return (
    <div className="pb-20">
      <StructuredData data={buildOrganizationJsonLd()} />
      <StructuredData data={buildFaqJsonLd(faqItems)} />

      <section className="page-hero page-hero-home">
        <div className="page-hero-inner">
          <div className="split-panel items-start">
            <div>
              <p className="kicker">Bag Supply Co</p>
              <h1 className="heading-display mt-5 hero-reveal hero-delay-1">
                Custom Paper Bags for Pharmacies, Veterinary, Dispensaries, Smoke Shops & Distributors - Ready in 3-4 Weeks
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text hero-reveal hero-delay-2">
                Stock and custom print bag programs with blind shipping, drop shipping, and recurring reorder support.
                Built for teams that can&apos;t afford to run out.
              </p>
              <div className="hero-divider hero-reveal hero-delay-3" />
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/generic-bag-quote" className="btn-primary hero-reveal hero-delay-4">
                  Build a Quote
                </Link>
                <Link href="/catalog" className="btn-secondary hero-reveal hero-delay-4">
                  Explore Catalogs {String.fromCharCode(8594)}
                </Link>
                <Link href="/distributors" className="btn-quiet hero-reveal hero-delay-4">
                  wholesale bag pricing for distributors
                </Link>
              </div>
            </div>

            <div className="hero-panel overflow-hidden hero-reveal hero-delay-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]">
                <FallbackImage
                  src={HERO_IMAGE}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt="Pharmacy Bags - GS Design, white paper pharmacy bag"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  priority
                />
              </div>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-[#5F4D33]">
                <p className="surface-card rounded-xl px-3 py-2">
                  Wholesale distributors needing blind ship and drop ship programs
                </p>
                <p className="surface-card rounded-xl px-3 py-2">
                  From {money(featuredProducts[0]?.startingPrice || 0)}/case
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="tonal-panel">
            <p className="kicker">Who We Serve</p>
            <h2 className="section-title mt-4">Wholesale bag programs for pharmacy, veterinary, dispensary, retail, and distributor buyers.</h2>
            <p className="mt-3 text-sm text-[#5F4D33]">
              Pharmacies, veterinary clinics, dispensaries, smoke shops, custom bag buyers, and wholesale distributors.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {industryQuickNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-[#C4935A66] bg-white px-3 py-1.5 text-xs font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0]"
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="tonal-panel">
            <p className="kicker">What We Deliver</p>
            <h2 className="section-title mt-4">Stock and custom wholesale bags with repeat supply support.</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#5F4D33]">
              {deliveryPoints.map((item) => (
                <li key={item} className="surface-card rounded-xl px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 surface-card rounded-xl p-3 text-sm text-[#5F4D33]">
              <p className="font-black text-[#1E4D2B]">
                🚚 Blind & Drop Shipping
              </p>
              <p className="mt-1">
                Available for distributor accounts. Your brand, your customers, zero exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[linear-gradient(135deg,#1E4D2B,#225935_55%,#1A4126)] py-20 text-white">
        <div className="section-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <p className="text-5xl font-black">500+</p>
              <p className="mt-1 text-sm font-semibold text-[#F4E8D8]">Clients Served</p>
            </div>
            <div>
              <p className="text-5xl font-black">10M+</p>
              <p className="mt-1 text-sm font-semibold text-[#F4E8D8]">Bags Shipped</p>
            </div>
            <div>
              <p className="text-5xl font-black">3-4 Weeks</p>
              <p className="mt-1 text-sm font-semibold text-[#F4E8D8]">Lead Time</p>
            </div>
            <div>
              <p className="text-5xl font-black">Net 30</p>
              <p className="mt-1 text-sm font-semibold text-[#F4E8D8]">Terms Available</p>
            </div>
            <div>
              <p className="text-5xl font-black">Blind & Drop Ship</p>
              <p className="mt-1 text-sm font-semibold text-[#F4E8D8]">Available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <h2 className="section-title">Featured wholesale bag products for repeat B2B ordering.</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.sku} className="surface-card product-card flex h-full flex-col">
              <div className="relative aspect-[4/3] bg-[#FAF6F0]">
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
                <p className="text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">SKU {product.sku}</p>
                <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h3>
                <p className="mt-1 product-card-price">From {money(product.startingPrice)}/case</p>
                <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-auto pt-4">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Before</p>
            <p className="mt-2 text-sm text-[#5F4D33]">You&apos;re guessing when to reorder and running out at the worst time.</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">After</p>
            <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">You&apos;re on a set cadence - bags arrive before you need them.</p>
          </article>
          <article className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Before</p>
            <p className="mt-2 text-sm text-[#5F4D33]">Generic bags make your brand look like everyone else.</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">After</p>
            <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">Custom print bags make your store memorable every time a customer walks out.</p>
          </article>
          <article className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Before</p>
            <p className="mt-2 text-sm text-[#5F4D33]">You&apos;re juggling three suppliers and no one has your full history.</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">After</p>
            <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">One partner, full order history, zero communication drag.</p>
          </article>
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="tonal-panel">
            <p className="kicker">Build Your Program</p>
            <h2 className="section-title mt-4">Wholesale bag quote intake built for B2B teams.</h2>
            <p className="mt-3 muted-text">
              Build your quote in a guided flow for stock, custom print, distributor blind ship, and drop ship requirements.
            </p>
          </div>
          <QuickQuoteForm />
        </div>
      </section>

      <FaqSection
        title="Wholesale bag FAQs for buyers comparing stock, custom print, and distributor programs."
        intro="These answers cover the questions B2B buyers ask most often before requesting pricing."
        items={faqItems}
      />

      <section className="section-container pt-4">
        <NewsletterSignup
          source="homepage"
          heading="Stay ahead of reorder season."
          subheading="New designs, seasonal collections, and reorder reminders delivered to your inbox."
          microcopy={`No spam. Unsubscribe anytime. Questions? Text ${contactPhone}.`}
          compact={false}
        />
      </section>
    </div>
  )
}
