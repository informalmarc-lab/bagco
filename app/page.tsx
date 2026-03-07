import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import QuickQuoteForm from '@/components/QuickQuoteForm'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import NewsletterSignup from '@/components/NewsletterSignup'
import { contactPhone, contactTextHref } from '@/components/siteConfig'
import { getAllCatalogProducts, money } from '@/lib/catalogProducts'

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Paper Bag Manufacturer | Pharmacy, Dispensary & Retail | Bag Supply Co',
  },
  description:
    'Factory-direct custom and stock paper bags for pharmacies, dispensaries, vet clinics and retail. Instant quotes. Ships across the US. Net 30 available.',
  keywords: [
    'custom pharmacy bags',
    'dispensary exit bags',
    'retail paper bags wholesale',
    'veterinary paper bags',
    'custom printed paper bags',
  ],
}

const industryQuickNav = [
  { label: 'Pharmacy', href: '/industries/pharmacies', icon: 'RX' },
  { label: 'Veterinary', href: '/industries/veterinary', icon: 'VT' },
  { label: 'Dispensary', href: '/industries/dispensaries', icon: 'DS' },
  { label: 'Smoke Shop', href: '/industries/smoke-shops', icon: 'SM' },
  { label: 'Retail', href: '/industries/retail-stores', icon: 'RT' },
  { label: 'Food & Beverage', href: '/industries/food-beverage', icon: 'FB' },
]

const testimonials = [
  {
    quote: 'The catalog filters made it easy to compare sizes and place our quote request in minutes.',
    person: 'R. Patel',
    role: 'Independent Pharmacy Owner',
    image: '/catalog/pharmacy/ty/TY-25-FRONT.webp',
  },
  {
    quote: 'We picked a custom dispensary line and had clear case pricing before our first reorder.',
    person: 'J. Monroe',
    role: 'Retail Operations Manager',
    image: '/catalog/dispensary/d7d49ada01_CBC-DMC24_7c313f11.png',
  },
  {
    quote: 'The veterinary options were straightforward, and lead-time expectations were clear from day one.',
    person: 'A. Kim',
    role: 'Veterinary Practice Manager',
    image: '/catalog/veterinary/vb2/VB2-22-FRONT.webp',
  },
]

const processSteps = [
  {
    title: 'Diagnose',
    detail: 'Map industry, usage patterns, and best-fit bag specs.',
    icon: '01',
  },
  {
    title: 'Design',
    detail: 'Select stock vs custom print, colors, and final artwork direction.',
    icon: '02',
  },
  {
    title: 'Produce',
    detail: 'Run production to approved spec with case-level planning.',
    icon: '03',
  },
  {
    title: 'Replenish',
    detail: 'Repeat with structured reorder cadence and reliable lead windows.',
    icon: '04',
  },
]

const whoWeServeLinks = [
  { label: 'Pharmacies', href: '/industries/pharmacies' },
  { label: 'Dispensaries', href: '/industries/dispensaries' },
  { label: 'Smoke Shops', href: '/industries/smoke-shops' },
  { label: 'Veterinary Clinics', href: '/industries/veterinary' },
  { label: 'Retail Stores', href: '/industries/retail-stores' },
  { label: 'Food & Beverage', href: '/industries/food-beverage' },
]

const clientTypes = [
  { label: 'Independent Pharmacies', icon: 'RX' },
  { label: 'Veterinary Clinics', icon: 'VT' },
  { label: 'Dispensaries', icon: 'DS' },
  { label: 'Smoke Shops', icon: 'SM' },
  { label: 'Retail Chains', icon: 'RT' },
  { label: 'Food Service', icon: 'FB' },
]

const faqs = [
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
      'Generic stock orders placed before 1 PM ET typically ship same day. Custom print programs typically run 3-4 weeks after proof approval.',
  },
]

export default function Home() {
  const products = getAllCatalogProducts()
  const featuredProducts = products.slice(0, 6)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const homepageLocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Bag Supply Co',
    url: 'https://www.bagsupplyco.com',
    telephone: '+12525161944',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '912 Houston Drive',
      addressLocality: 'Monroe',
      addressRegion: 'NC',
      postalCode: '28110',
      addressCountry: 'US',
    },
    description:
      'Stock and custom paper bag programs for pharmacies, dispensaries, veterinary clinics and retail stores across the US.',
    sameAs: ['https://www.facebook.com/profile.php?id=61586254914821'],
  }

  return (
    <div className="pb-20">
      <Script
        id="bagsupplyco-home-localbusiness"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageLocalBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="split-panel items-start">
            <div>
              <p className="kicker">Bag Supply Co</p>
              <h1 className="heading-display mt-5">Paper Bags. Priced. Shipped. Done.</h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Stock and custom bag programs for pharmacies, dispensaries, vet clinics, and retail with pricing you can see before you call.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.08em] text-[#5F4D33]">
                <span className="rounded-full bg-white px-3 py-1.5">Generic Ships Same Day (Before 1 PM ET)</span>
                <span className="rounded-full bg-white px-3 py-1.5">Custom 3-4 Weeks</span>
                <span className="rounded-full bg-white px-3 py-1.5">Net 30 Available</span>
                <span className="rounded-full bg-white px-3 py-1.5">Ships Across The US</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#5F4D33]">
                Text to order: <a href={contactTextHref} className="underline">{contactPhone}</a>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/generic-bag-quote" className="btn-primary">
                  Build a Quote
                </Link>
                <Link href="/catalog" className="btn-secondary">
                  Browse Products {String.fromCharCode(8594)}
                </Link>
              </div>
            </div>

            <div className="hero-panel overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]">
                <Image
                  src="/catalog/custom/2-color/CBC-25-FC2C.webp"
                  alt="Branded paper bag product photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  priority
                />
              </div>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-[#5F4D33]">
                <p className="surface-card rounded-xl px-3 py-2">Stock bags from {money(65.91)}/case</p>
                <p className="surface-card rounded-xl px-3 py-2">Generic lead time: same day before 1 PM ET</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Shop by Industry</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {industryQuickNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C4935A66] bg-white px-4 py-2 text-sm font-semibold text-[#5F4D33] hover:bg-[#FAF6F0]"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1E4D2B] text-[10px] font-black text-white">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-8">
        <div className="rounded-3xl bg-[#1E4D2B] px-6 py-8 text-white shadow-[0_22px_50px_rgba(30,77,43,0.36)] md:px-10">
          <h2 className="text-3xl font-black tracking-[-0.03em]">See pricing before you call.</h2>
          <p className="mt-3 max-w-3xl text-base text-[#F4E8D8] md:text-lg">
            Most bag suppliers make you wait for a quote. We show case-level pricing upfront so you can build your estimate in under 2 minutes.
          </p>
          <Link href="/generic-bag-quote" className="btn-primary mt-6">
            Build Your Quote {String.fromCharCode(8594)}
          </Link>
        </div>
      </section>

      <section className="section-container py-4">
        <div className="tonal-panel">
          <p className="kicker">Who We Serve</p>
          <h2 className="section-title mt-4">Packaging Programs by Industry</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {whoWeServeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[#C4935A66] bg-white px-4 py-2 text-sm font-semibold text-[#5F4D33] hover:bg-[#FAF6F0]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-title">Featured Catalog Products</h2>
          <Link href="/catalog" className="btn-secondary">
            View Full Catalog
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.sku} className="surface-card overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">SKU {product.sku}</p>
                <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h3>
                <p className="mt-1 text-sm text-[#5F4D33]">From {money(product.startingPrice)}/case</p>
                <Link href={`/products/${product.slug}`} className="btn-secondary mt-4">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-6">
        <div className="tonal-panel">
          <p className="kicker">Social Proof</p>
          <h2 className="section-title mt-4">Trusted by Packaging Buyers Across Core Industries</h2>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3">
              {testimonials.map((item) => (
                <article key={item.quote} className="surface-card rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl border border-[#C4935A66] bg-[#FAF6F0]">
                      <Image src={item.image} alt={item.person} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <p className="text-sm text-[#5F4D33]">"{item.quote}"</p>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">
                        {item.person} | {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-[#7A6548]">Client Types</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {clientTypes.map((type) => (
                  <div key={type.label} className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#5F4D33]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1E4D2B] text-[10px] font-black text-white">
                      {type.icon}
                    </span>{' '}
                    {type.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-6">
        <div className="tonal-panel">
          <p className="kicker">How It Works</p>
          <h2 className="section-title mt-4">Diagnose to Replenish in Four Clear Steps</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.title} className="surface-card rounded-2xl p-4">
                <p className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E4D2B] text-xs font-black text-white">
                  {step.icon}
                </p>
                <h3 className="mt-3 text-lg font-black text-[#1E4D2B]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#5F4D33]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="section-container py-10 md:py-16">
        <div className="split-panel items-start">
          <div className="tonal-panel">
            <p className="kicker">Quick Quote</p>
            <h2 className="section-title mt-4">Start with Industry, Bag Type, and Case Volume</h2>
            <p className="mt-3 muted-text">
              Use the quote form to send requirements quickly. We respond with stock/custom options and lead-time.
            </p>
          </div>

          <QuickQuoteForm />
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">FAQ</p>
          <h2 className="section-title mt-4">Answers Before You Reach Out</h2>
          <div className="mt-6 grid gap-3">
            {faqs.map((item) => (
              <article key={item.question} className="surface-card rounded-2xl p-4">
                <h3 className="text-lg font-black text-[#1E4D2B]">{item.question}</h3>
                <p className="mt-2 text-sm muted-text">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-4">
        <NewsletterSignup
          source="homepage"
          heading="Stay ahead of reorder season."
          subheading="New designs, seasonal collections, and reorder reminders delivered to your inbox."
          microcopy="No spam. Unsubscribe anytime."
          compact={false}
        />
      </section>
    </div>
  )
}

