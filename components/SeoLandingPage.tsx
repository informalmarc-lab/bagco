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
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">SEO Landing Page</p>
        <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">{h1}</h1>
        <p className="mt-4 text-lg text-slate-700">{intro}</p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {bullets.map((bullet) => (
          <div key={bullet} className="surface-card rounded-lg p-4 text-slate-800">
            {bullet}
          </div>
        ))}
      </div>

      <div className="mt-9 tonal-panel">
        <h2 className="text-2xl font-black text-slate-900">Talk to Our Team</h2>
        <p className="mt-3 text-slate-700">
          Email your bag size, quantity, color count, and timeline to receive production options.
        </p>
        <a href={pricingMailto} className="btn-primary mt-4">
          {contactEmail}
        </a>
        <p className="mt-4 font-semibold text-slate-900">Email us for pricing.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md bg-white px-3 py-2 underline">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
