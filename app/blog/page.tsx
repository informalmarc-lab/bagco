import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Paper Bag Buying Guides & Insights | Bag Supply Co Blog',
  description:
    'Guides on pharmacy, dispensary, veterinary, and retail bag programs, including sizing, case planning, compliance, and custom print timelines.',
  path: '/blog',
})

const posts = [
  {
    slug: 'how-many-pharmacy-bags-per-case',
    title: 'How Many Pharmacy Bags Come Per Case? A Complete Size Guide',
    date: '2026-03-07',
    excerpt:
      'Standard Rx sizes, common case quantities, and a practical formula for forecasting monthly case demand from prescription volume.',
  },
  {
    slug: 'rx-bag-sizes-chart',
    title: 'Rx Bag Sizes Explained: Which Size Is Right for Your Pharmacy?',
    date: '2026-03-06',
    excerpt:
      'A breakdown of #6, #8, #10, #12, and #14 bag sizes with clear recommendations on matching size to prescription type.',
  },
  {
    slug: 'dispensary-exit-bag-requirements',
    title: 'Dispensary Exit Bag Requirements by State (2025 Guide)',
    date: '2026-03-05',
    excerpt:
      'How to approach opaque, resealable, and child-resistant requirements with a scalable compliance and bulk-ordering process.',
  },
  {
    slug: 'child-resistant-vs-standard-pharmacy-bags',
    title: "Child-Resistant vs Standard Pharmacy Bags: What's the Difference?",
    date: '2026-03-04',
    excerpt:
      'A practical comparison of compliance use cases, cost impact, and operations tradeoffs across standard and child-resistant formats.',
  },
  {
    slug: 'how-to-order-custom-printed-paper-bags',
    title: 'How to Order Custom Printed Paper Bags: A Step-by-Step Guide',
    date: '2026-03-03',
    excerpt:
      'From size planning and artwork prep to proofing, production, and delivery scheduling for custom print programs.',
  },
  {
    slug: 'veterinary-bag-sizes-guide',
    title: 'Veterinary Bag Sizes: What Most Vet Clinics Actually Need',
    date: '2026-03-02',
    excerpt:
      'A clinic-focused guide to matching bag sizes with medication handoff, food samples, and reorder strategy.',
  },
  {
    slug: 'buying-direct-vs-distributor-pharmacy-bags',
    title: "Buying Pharmacy Bags Direct vs. Through a Distributor: What's the Difference?",
    date: '2026-03-01',
    excerpt:
      'A side-by-side comparison of cost, lead time, customization, and minimum order differences across sourcing models.',
  },
  {
    slug: 'custom-bag-lead-times',
    title: 'Custom Printed Bag Lead Times: What to Expect in 2025',
    date: '2026-02-28',
    excerpt:
      'What drives stock versus custom lead times and how to build a reorder system that avoids running out.',
  },
]

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Resource Center</p>
          <h1 className="heading-display mt-5">Bag Supply Co Blog</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Buying guides for pharmacy, dispensary, veterinary, smoke shop, and retail paper bag programs.
          </p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4">
          {posts.map((post) => (
            <article key={post.slug} className="surface-card rounded-2xl p-5 md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#1E4D2B]">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5F4D33] md:text-base">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="btn-primary mt-5">
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

