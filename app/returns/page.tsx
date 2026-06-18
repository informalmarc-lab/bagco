import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Return Policy | BagSupplyCo \u2014 Wholesale Bags',
    },
    description:
      'Read BagSupplyCo\u2019s return policy for defective or damaged products, including claim timing, qualification rules, and resolution details.',
    alternates: {
      canonical: '/returns',
    },
  }
}

const sections = [
  {
    title: 'Our Return Policy',
    copy:
      'BagSupplyCo accepts returns only on products that arrive defective or damaged. We do not accept returns for change of mind, over-ordering, or incorrect orders placed by the customer.',
  },
  {
    title: 'How to Request a Return',
    copy:
      'Contact us within 7 days of receiving your order if you believe your product is defective. Email us at support@bagsupplyco.com with your order number and photos of the defective product. We will review your claim and respond within 2 business days.',
  },
  {
    title: 'What Qualifies as Defective',
    copy:
      'Bags with manufacturing defects, incorrect printing on custom orders (where the error is ours), or products damaged in transit.',
  },
  {
    title: 'What Does Not Qualify',
    copy:
      'Incorrect quantities ordered by the customer, change of mind, or products that have been used or altered.',
  },
  {
    title: 'Resolution',
    copy:
      'Approved returns will be replaced or refunded at our discretion. We do not charge return shipping on approved defective claims.',
  },
] as const

export default function ReturnsPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Legal</p>
          <h1 className="heading-display mt-5">Return Policy</h1>
          <p className="mt-4 text-base font-semibold text-accent-500 md:text-lg">
            Defective product claims only
          </p>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            This page explains when BagSupplyCo accepts returns, how to report a defective order, and what happens after a claim is approved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Team
            </Link>
            <a href="mailto:support@bagsupplyco.com" className="btn-secondary">
              Email support@bagsupplyco.com
            </a>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className={
                index === 0
                  ? 'rounded-[2.5rem] border border-kraft-400/60 bg-[linear-gradient(135deg,#1E4D2B,#225935_58%,#173A21)] p-6 text-[#FAF6F0] shadow-[0_20px_44px_rgba(30,77,43,0.18)] md:p-8'
                  : 'tonal-panel'
              }
            >
              <h2
                className={
                  index === 0
                    ? 'font-serif text-3xl text-[#FAF6F0] md:text-4xl'
                    : 'font-serif text-2xl text-brand-600 md:text-3xl'
                }
              >
                {section.title}
              </h2>
              <p
                className={
                  index === 0
                    ? 'mt-4 max-w-4xl text-base leading-8 text-[#F4E8D8] md:text-lg'
                    : 'mt-4 text-base leading-8 text-[#3E3427] md:text-lg'
                }
              >
                {section.copy}
              </p>
            </article>
          ))}

          <article className="rounded-[2.5rem] border border-accent-400/40 bg-[#FAF6F0] p-6 shadow-[0_14px_34px_rgba(30,77,43,0.08)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-accent-500">Need Help?</p>
            <h2 className="mt-3 font-serif text-2xl text-brand-600 md:text-3xl">Return questions or a defective shipment?</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#3E3427] md:text-lg">
              Send your order number, delivery details, and product photos to{' '}
              <a href="mailto:support@bagsupplyco.com" className="font-semibold text-brand-600 underline">
                support@bagsupplyco.com
              </a>
              . We will review the claim and reply within 2 business days.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
