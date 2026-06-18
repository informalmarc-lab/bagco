import Link from 'next/link'

type RelatedIndustryLink = {
  href: string
  label: string
  description: string
}

type RelatedIndustryLinksProps = {
  title: string
  intro: string
  links: RelatedIndustryLink[]
}

export default function RelatedIndustryLinks({
  title,
  intro,
  links,
}: RelatedIndustryLinksProps) {
  return (
    <section className="section-container pt-2">
      <div className="tonal-panel">
        <h2 className="section-title">{title}</h2>
        <p className="mt-3 max-w-3xl muted-text">{intro}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surface-card rounded-2xl p-5 transition hover:bg-[#FFF8EA]"
            >
              <h3 className="font-serif text-lg text-brand-600">{link.label}</h3>
              <p className="mt-2 text-sm text-muted">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
