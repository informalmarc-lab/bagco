import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import Link from 'next/link'
import AudienceHome from '@/components/home/AudienceHome'
import StructuredData from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildFaqJsonLd, buildOrganizationJsonLd } from '@/lib/seo/structuredData'

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = buildPageMetadata({
  title: 'Custom Printed Paper Bags for Dispensaries, Pharmacies, and Vet Clinics | Bag Supply Co',
  description:
    'Custom printed white paper bags for dispensaries, pharmacies, and vet clinics. Family-made in Monroe, NC since 1955. Get a price online.',
  path: '/',
  imagePath: '/catalog/custom/3-color/CBC-25-FC3C.webp',
})

const steps = [
  {
    title: 'Get a price',
    detail: 'Pick a size, quantity, and number of colors. The quote tool shows your price right away.',
  },
  {
    title: 'Send your logo',
    detail: 'Email whatever you have. We turn it into print-ready art and send you a digital proof.',
  },
  {
    title: 'Approve and we print',
    detail: 'Once you sign off on the proof, your bags go on press and ship to your door.',
  },
]

const facts = [
  { value: 'Since 1955', label: 'Family-made paper bags' },
  { value: 'USA', label: 'Printed in Monroe, NC' },
  { value: '8+ cases', label: 'No freight charge, fuel surcharge only' },
  { value: '45%', label: 'Post-consumer recycled paper' },
]

const otherIndustries = [
  { label: 'Smoke shops', href: '/industries/smoke-shops' },
  { label: 'Retail', href: '/industries/retail' },
  { label: 'Distributors', href: '/distributors' },
]

const faqItems = [
  {
    question: 'What is the minimum order?',
    answer:
      '4 cases per size. For the #25 the minimum is 6,000 bags. Each size is priced on its own quantity.',
  },
  {
    question: 'How many colors can you print?',
    answer:
      'Up to 3 colors on the front. The sides and back can print too, all in one single color, for a one-time charge per side.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Most orders ship 2 to 3 weeks after you approve the proof. The holiday season can run longer, so order early. Need bags sooner? We can ship plain stock bags to hold you over.',
  },
  {
    question: 'Can you print my license number and warnings?',
    answer:
      'Yes. We print whatever copy you send: license number, address, website, and required warnings. Check your state rules for what your exit bag must say.',
  },
  {
    question: 'How much is shipping?',
    answer:
      'Orders of 8 cases or more have no freight charge, only a fuel surcharge based on your zone. Smaller orders ship UPS Ground at cost.',
  },
]

export default function Home() {
  return (
    <div className={`${display.variable} pb-0`}>
      <StructuredData data={buildOrganizationJsonLd()} />
      <StructuredData data={buildFaqJsonLd(faqItems)} />

      <AudienceHome />

      {/* How it works */}
      <section className="border-y border-[#E3E3DE] bg-[#F6F6F3]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2
            className="font-display text-4xl font-extrabold tracking-[-0.01em] text-[#1A1A1A] sm:text-5xl"
            style={{ fontStretch: '78%' }}
          >
            How ordering works
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-[#1A1A1A] pt-5">
                <span className="font-display text-5xl font-extrabold text-[#1E4D2B]" style={{ fontStretch: '78%' }}>
                  {index + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#1A1A1A]">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[#3D3D39]">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-[#E3E3DE]">
          {facts.map((fact) => (
            <div key={fact.label} className="md:px-6 md:first:pl-0">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-[#1A1A1A]" style={{ fontStretch: '78%' }}>
                  {fact.value}
                </span>
                <span className="mt-1 block text-sm text-[#3D3D39]">{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-14 text-[#3D3D39]">
          We also make bags for{' '}
          {otherIndustries.map((item, index) => (
            <span key={item.href}>
              <Link
                href={item.href}
                className="font-semibold text-[#1E4D2B] underline decoration-1 underline-offset-4 hover:text-[#1A1A1A]"
              >
                {item.label.toLowerCase()}
              </Link>
              {index < otherIndustries.length - 2 ? ', ' : index === otherIndustries.length - 2 ? ', and ' : '.'}
            </span>
          ))}
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <h2
          className="font-display text-4xl font-extrabold tracking-[-0.01em] text-[#1A1A1A]"
          style={{ fontStretch: '78%' }}
        >
          Common questions
        </h2>
        <div className="mt-8 divide-y divide-[#E3E3DE] border-y border-[#E3E3DE]">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-2xl font-normal text-[#1E4D2B] group-open:rotate-45 motion-safe:transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[#3D3D39]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  )
}
