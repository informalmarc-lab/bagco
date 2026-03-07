import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

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
            <h1 className="heading-display mt-5 text-4xl md:text-6xl">{h1}</h1>
            <p className="mt-4 max-w-3xl text-lg muted-text">{intro}</p>
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-3 md:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">
              {bullet}
            </div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Talk to Our Team</h2>
          <p className="mt-3 muted-text">
            Email your bag size, quantity, color count, and timeline to receive production options.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={pricingMailto} className="btn-primary">
              {contactEmail}
            </a>
            <Link href="/generic-bag-quote" className="btn-secondary">
              Use Quote Tool
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container pt-8">
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#5F4D33]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2 hover:bg-[#FAF6F0]">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

