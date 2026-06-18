import type { Metadata } from 'next'
import Link from 'next/link'
import DistributorRequestForm from '@/components/DistributorRequestForm'
import StructuredData from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildDistributorServiceJsonLd } from '@/lib/seo/structuredData'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Bag Pricing for Distributors',
  description:
    'Wholesale bag pricing for distributors who need factory-direct supply, drop-ship support, and BagSupplyCo guidance for repeat customer orders.',
  path: '/distributors',
  imagePath: '/catalog/pharmacy/gs/GS-22-FRONT.webp',
})

const products = [
  {
    title: 'Stock White Paper Bags',
    copy: 'Pharmacy-ready white bags in core sizes with no minimums and fast replenishment.',
    note: 'Pharmacy sizes, no minimums',
  },
  {
    title: 'Stock Kraft Paper Bags',
    copy: 'Multiple kraft sizes for front-counter, clinic, and retail carryout programs.',
    note: 'Multiple sizes, no minimums',
  },
  {
    title: 'Custom-Printed Paper Bags',
    copy: 'Add logos, addresses, and compliance messaging with a one-time $75 setup fee.',
    note: 'Private label ready',
  },
  {
    title: 'Generic Plastic Bags',
    copy: 'Two practical styles for customers that need an economical plastic option.',
    note: '2 styles',
  },
  {
    title: 'Dispensary Exit Bags',
    copy: 'Stock and compliant carryout options for dispensary and smoke shop accounts.',
    note: 'Dispensary programs',
  },
  {
    title: 'Veterinary Bags',
    copy: 'Clinic-friendly bag options for medications, retail items, and take-home products.',
    note: 'Vet-focused assortments',
  },
  {
    title: 'Retail Shopping Bags',
    copy: 'Versatile shopping bags for broader wholesale programs and general retail accounts.',
    note: 'Retail-ready',
  },
] as const

const volumeOptions = [
  'Single cases for smaller distributors',
  'Mixed pallets for broader product coverage',
  'Full pallets for high-volume accounts',
  'Up to 20% savings on pallet orders',
  'Custom volume pricing available - contact us for a quote',
] as const

const pricingRows = [
  {
    product: 'Card Bag',
    size: '7 x 10',
    listPrice: '$94',
    minQty: '3,000',
    discount15: '12,000',
    discount16: '18,000',
    discount17: '24,000',
    discount18: '120,000',
    discount19: '240,000',
    discount20: '360,000+',
  },
  {
    product: 'Rx Bag',
    size: '3.5 x 1.5 x 10',
    listPrice: '$78',
    minQty: '3,000',
    discount15: '12,000',
    discount16: '18,000',
    discount17: '24,000',
    discount18: '120,000',
    discount19: '240,000',
    discount20: '360,000+',
  },
  {
    product: 'Large Rx Bag',
    size: '5 x 2 x 10',
    listPrice: '$95',
    minQty: '3,000',
    discount15: '12,000',
    discount16: '18,000',
    discount17: '24,000',
    discount18: '96,000',
    discount19: '192,000',
    discount20: '288,000+',
  },
  {
    product: '6lb Bag',
    size: '6 x 4 x 11',
    listPrice: '$53',
    minQty: '1,000',
    discount15: '6,000',
    discount16: '10,000',
    discount17: '16,000',
    discount18: '24,000',
    discount19: '48,000',
    discount20: '72,000+',
  },
  {
    product: '12lb Bag',
    size: '7 x 4 x 14',
    listPrice: '$85',
    minQty: '1,000',
    discount15: '4,000',
    discount16: '6,000',
    discount17: '10,000',
    discount18: '18,000',
    discount19: '36,000',
    discount20: '54,000+',
  },
  {
    product: '20lb Bag',
    size: '8 x 5 x 17',
    listPrice: '$62',
    minQty: '500',
    discount15: '3,000',
    discount16: '5,000',
    discount17: '7,000',
    discount18: '9,000',
    discount19: '18,000',
    discount20: '27,000+',
  },
] as const

const partnerReasons = [
  'Stock and custom options in one supplier',
  'Blind/drop-ship at no extra charge',
  'Net 30 available for qualified accounts',
  'Free shipping on 8+ cases',
  'Same-day shipping on stock orders placed before 1PM ET',
  'Pallet orders welcome - up to 20% bulk savings',
  'Low minimums on custom',
] as const

const steps = [
  {
    number: '1',
    title: 'Request pricing sheet',
    copy: 'Tell us what categories and volumes your team wants to cover, and we will send the right pricing structure.',
  },
  {
    number: '2',
    title: 'Place your first order',
    copy: 'Start with single cases, mixed pallets, or full pallets depending on your customer mix and stocking plan.',
  },
  {
    number: '3',
    title: 'We ship direct to you or your customers',
    copy: 'Choose direct inbound freight for your warehouse or blind/drop-ship fulfillment for your downstream accounts.',
  },
] as const

const domesticReasons = [
  {
    title: 'No tariff risk',
    copy: 'Domestic sourcing keeps your bag program clear of import duties and trade-policy swings affecting Chinese goods.',
  },
  {
    title: 'No 6-8 week lead times',
    copy: 'Stock orders ship same day instead of sitting on a container schedule for months.',
  },
  {
    title: 'Low minimums',
    copy: 'We ship single cases on stock programs, so you can cover more accounts without oversized inventory bets.',
  },
  {
    title: 'Custom printing without massive commitments',
    copy: 'Private label programs stay accessible without the huge overseas quantity requirements.',
  },
  {
    title: 'Drop-ship ready',
    copy: 'We can blind ship to your customers directly, which overseas manufacturers typically will not support.',
  },
  {
    title: 'Reliable, consistent supply',
    copy: 'No port delays, no customs holds, and no surprise disruptions when your customers need reorders.',
  },
] as const

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-accent-500" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.7 12.2 10.9 14.4 15.6 9.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export default function DistributorsPage() {
  return (
    <div className="pb-16">
      <StructuredData data={buildDistributorServiceJsonLd()} />
      <section className="overflow-hidden border-b border-kraft-400/40 bg-brand-600 text-[#FAF6F0]">
        <div className="section-container py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-[#F4E8D899] bg-[#F4E8D81A] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#F4E8D8]">
                Distributor Program
              </p>
              <h1 className="heading-serif mt-5 max-w-4xl text-4xl tracking-[-0.01em] text-[#FAF6F0] md:text-6xl">
                Wholesale bag pricing for distributors and drop-ship programs.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F4E8D8] md:text-xl">
                BagSupplyCo partners with distributors to supply stock and custom bags for pharmacies,
                dispensaries, veterinary clinics, and retailers - by the case or by the pallet.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#request-form" className="btn-secondary-inverse">
                  Request a Pricing Sheet
                </a>
              </div>
            </div>

            <aside className="rounded-[2.5rem] border border-kraft-400/60 bg-[#FAF6F0] p-6 text-brand-600 shadow-[0_20px_44px_rgba(0,0,0,0.2)] md:p-7">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-accent-500">Featured Category</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#FAF6F0]">
                  Rx Bags
                </span>
                <span className="text-sm font-semibold text-muted">Top distributor mover</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl text-brand-600">Fast-moving pharmacy essentials.</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Stock white and kraft Rx bag programs are ideal for pharmacy supply distributors that need
                dependable turns, low minimums, and a clean path into private label.
              </p>
              <div className="mt-5 grid gap-2">
                <p className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-muted">
                  Stock sizes with no minimums
                </p>
                <p className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-muted">
                  Custom print available with one-time $75 setup fee
                </p>
                <p className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-muted">
                  Same-day shipping on in-stock orders before 1PM ET
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="max-w-3xl">
          <p className="kicker">What We Carry</p>
          <h2 className="section-title mt-4">Wholesale stock and private label bag programs for distributors.</h2>
          <p className="mt-4 text-base leading-8 text-muted md:text-lg">
            Built for pharmacy supply, vet supply, dispensary supply, and broader wholesale accounts that
            need reliable fill rates and cleaner vendor consolidation.
          </p>
        </div>

        <article className="mt-8 rounded-[2.5rem] border border-kraft-400/60 bg-[linear-gradient(135deg,#FFF8EA,#FAF6F0)] p-6 shadow-[0_18px_40px_rgba(30,77,43,0.12)] md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-[#B5813A] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
              Featured Product
            </span>
            <span className="inline-flex rounded-full border border-[#1E4D2B] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-brand-600">
              Rx Bags
            </span>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h3 className="font-serif text-3xl text-brand-600 md:text-4xl">Rx bags that make reordering simple.</h3>
              <p className="mt-4 text-base leading-8 text-muted">
                Rx bags are the anchor item for many wholesale programs because they move consistently,
                support independent and regional pharmacy accounts, and give distributors an easy path into
                stock plus custom private label supply.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-600">Stock Options</p>
                <p className="mt-2 text-sm font-semibold text-muted">
                  White and kraft pharmacy sizes with no minimums.
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-600">Custom Options</p>
                <p className="mt-2 text-sm font-semibold text-muted">
                  Logo, address, and compliance messaging for private label pharmacy programs.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.title} className="tonal-panel h-full">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-500">{product.note}</p>
              <h3 className="mt-3 font-serif text-2xl text-brand-600">{product.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{product.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#FFFDF9] py-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="kicker">Order Volume</p>
            <h2 className="section-title mt-4">Programs sized for emerging distributors and high-volume wholesale buyers.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {volumeOptions.map((item) => (
              <article key={item} className="surface-card rounded-2xl p-5">
                <p className="text-base font-semibold leading-7 text-muted">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="rounded-[2.5rem] border border-kraft-400/40 bg-[#FAF6F0] p-6 shadow-[0_14px_34px_rgba(30,77,43,0.12)] md:p-8">
          <div className="max-w-3xl">
            <p className="kicker">Wholesale Pricing</p>
            <h2 className="section-title mt-4">Wholesale pallet pricing for distributor bag programs.</h2>
            <p className="mt-4 text-base leading-8 text-muted md:text-lg">
              The more you order, the more you save - up to 20% off on high-volume orders.
            </p>
          </div>

          <details className="group mt-8 overflow-hidden rounded-[1.6rem] border border-kraft-400/40 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="inline-flex items-center gap-3 text-base font-black text-brand-600 md:text-lg">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm text-[#FAF6F0]">
                  $
                </span>
                View Pallet Pricing
              </span>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-accent-500">
                Expand table
              </span>
            </summary>

            <div className="border-t border-kraft-400/40 px-4 py-5 md:px-5 md:py-6">
              <div className="overflow-x-auto rounded-2xl border border-kraft-400/40">
                <table className="min-w-[980px] bg-[#FAF6F0] text-left text-sm text-[#3E3427]">
                  <thead className="bg-brand-600 text-[#FAF6F0]">
                    <tr>
                      <th className="px-4 py-3 font-black">Product</th>
                      <th className="px-4 py-3 font-black">Size</th>
                      <th className="px-4 py-3 font-black">List Price</th>
                      <th className="px-4 py-3 font-black">Min Qty</th>
                      <th className="px-4 py-3 font-black">15% Off</th>
                      <th className="px-4 py-3 font-black">16% Off</th>
                      <th className="px-4 py-3 font-black">17% Off</th>
                      <th className="px-4 py-3 font-black">18% Off</th>
                      <th className="px-4 py-3 font-black">19% Off</th>
                      <th className="px-4 py-3 font-black">20% Off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row, index) => (
                      <tr
                        key={row.product}
                        className={index % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-[#FFFDF9]'}
                      >
                        <td className="border-t border-kraft-400/30 px-4 py-3 font-bold text-brand-600">
                          {row.product}
                        </td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.size}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3 font-bold text-accent-500">
                          {row.listPrice}
                        </td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.minQty}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount15}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount16}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount17}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount18}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount19}</td>
                        <td className="border-t border-kraft-400/30 px-4 py-3">{row.discount20}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm font-semibold text-muted">
                Prices shown per case. Contact us for custom volume quotes or mixed pallet pricing.
              </p>
              <a href="#request-form" className="btn-primary mt-5">
                Request a Quote
              </a>
            </div>
          </details>
        </div>
      </section>

      <section className="bg-[#FFFDF9] py-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="kicker">Why Partner With Us</p>
            <h2 className="section-title mt-4">A cleaner wholesale bag supply partner for distributor accounts.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {partnerReasons.map((reason) => (
              <article key={reason} className="surface-card flex items-start gap-3 rounded-2xl p-5">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8EA]">
                  <CheckIcon />
                </span>
                <p className="text-sm font-semibold leading-7 text-muted">{reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="max-w-3xl">
          <p className="kicker">How It Works</p>
          <h2 className="section-title mt-4">A simple first wholesale bag order for distributor teams.</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="tonal-panel h-full">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-[#FAF6F0]">
                {step.number}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-brand-600">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container pb-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-kraft-400/60 bg-[linear-gradient(135deg,#1E4D2B,#225935_58%,#3A2A19)] p-6 text-[#FAF6F0] shadow-[0_22px_46px_rgba(30,77,43,0.22)] md:p-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#F4E8D899] bg-[#F4E8D81A] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#F4E8D8]">
              Domestic Advantage
            </p>
            <h2 className="heading-serif mt-4 text-3xl text-[#FAF6F0] md:text-5xl">
              Why Source Domestic?
            </h2>
            <p className="mt-4 text-base leading-8 text-[#F4E8D8] md:text-lg">
              Give your customers a supply program that moves faster, carries less risk, and does not force
              oversized commitments just to get started.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {domesticReasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-2xl border border-kraft-400/50 bg-[#FAF6F0] p-5 text-brand-600 shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-500">{reason.title}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-muted">{reason.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request-form" className="section-container scroll-mt-28 py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="tonal-panel">
            <p className="kicker">Request Pricing</p>
            <h2 className="section-title mt-4">Tell us what your wholesale distributor program needs.</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Share your volume, product mix, and private label goals. We will respond with the right mix of
              case pricing, pallet pricing, and custom print guidance for your team.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-600">Best Fit</p>
                <p className="mt-2 text-sm font-semibold text-muted">
                  Pharmacy supply, veterinary supply, dispensary supply, and general retail wholesale teams.
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-600">Response Focus</p>
                <p className="mt-2 text-sm font-semibold text-muted">
                  Stock assortment guidance, pallet breakpoints, and private label opportunities.
                </p>
              </div>
            </div>
          </div>

          <DistributorRequestForm />
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="rounded-[2.5rem] border border-kraft-400/60 bg-brand-600 p-6 text-center text-[#FAF6F0] shadow-[0_20px_44px_rgba(30,77,43,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F4E8D8]">Footer CTA</p>
          <h2 className="heading-serif mt-3 text-3xl text-[#FAF6F0] md:text-4xl">
            Already a customer?
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#F4E8D8]">
            Access your account tools and customer portal here.
          </p>
          <Link href="/admin" className="btn-secondary-inverse mt-6">
            Log in to your account
          </Link>
        </div>
      </section>
    </div>
  )
}
