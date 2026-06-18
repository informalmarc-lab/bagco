import type { Metadata } from 'next'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Privacy Policy',
  description:
    'Privacy policy for Bag Supply Co quote requests, contact submissions, and communication handling.',
  path: '/privacy-policy',
})

const sections = [
  {
    title: 'Information We Collect',
    copy: 'Name, company, email, phone, and request details submitted through quote and contact forms.',
  },
  {
    title: 'How We Use Information',
    copy: 'To prepare pricing, coordinate production, provide support updates, and maintain business communication.',
  },
  {
    title: 'Data Handling',
    copy: 'Submitted information is used for service operations and is not sold to third parties.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Legal</p>
          <h1 className="heading-display mt-5">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            This policy explains how Bag Supply Co handles website form submissions and communication data.
          </p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4">
          {sections.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="font-serif text-2xl text-brand-600">{item.title}</h2>
              <p className="mt-3 muted-text">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}


