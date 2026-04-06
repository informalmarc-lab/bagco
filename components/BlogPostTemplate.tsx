import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'

export type BlogPostSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPostInternalLink = {
  href: string
  label: string
}

type BlogPostTemplateProps = {
  title: string
  date: string
  intro: string
  sections: BlogPostSection[]
  internalLinks: BlogPostInternalLink[]
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostTemplate({
  title,
  date,
  intro,
  sections,
  internalLinks,
}: BlogPostTemplateProps) {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/blog" className="btn-secondary">
            Back to Blog
          </Link>
          <p className="kicker mt-6">Bag Supply Co Blog</p>
          <h1 className="heading-display mt-5">{title}</h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#7A6548]">
            {formatDate(date)}
          </p>
          <p className="mt-5 max-w-3xl text-lg muted-text">{intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <article className="section-container py-20">
        <div className="tonal-panel">
          <div className="grid gap-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">{section.heading}</h2>
                <div className="mt-4 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[#5F4D33] md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="section-container pt-1">
        <div className="tonal-panel">
          <h2 className="section-title">Helpful Internal Links</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {internalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="btn-secondary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-3">
        <NewsletterSignup
          source="blog-post"
          heading="Want updates on new bag designs and industry news? Subscribe below."
          subheading="Get practical packaging insights, seasonal reminders, and new bag launches sent directly to your inbox."
          microcopy="No spam. Unsubscribe anytime."
          compact
        />
      </section>

    </div>
  )
}


