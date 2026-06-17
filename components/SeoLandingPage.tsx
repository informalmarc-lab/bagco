import Link from 'next/link'

type SeoLandingPageProps = {
  h1: string
  intro: string
  bullets: string[]
  links: Array<{ href: string; label: string }>
}

export default function SeoLandingPage({ h1, intro, bullets, links }: SeoLandingPageProps) {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="max-w-4xl">
            <p className="kicker">Specialized Resource</p>
            <h1 className="heading-display mt-5">{h1}</h1>
            <p className="mt-4 max-w-3xl text-lg muted-text">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="surface-card p-5 text-sm font-semibold text-muted">
              {bullet}
            </div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Talk to Our Team</h2>
          <p className="mt-3 muted-text">
            Share your bag size, quantity, color count, and timeline to receive production options.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container pt-8">
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full border border-kraft-400/30 bg-white px-4 py-2 hover:bg-cream">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
