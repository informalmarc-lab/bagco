import type { FaqItem } from '@/lib/seo/structuredData'

type FaqSectionProps = {
  title: string
  intro: string
  items: FaqItem[]
}

export default function FaqSection({ title, intro, items }: FaqSectionProps) {
  return (
    <section className="section-container pt-2">
      <div className="tonal-panel">
        <h2 className="section-title">{title}</h2>
        <p className="mt-3 max-w-3xl muted-text">{intro}</p>
        <div className="mt-6 grid gap-3">
          {items.map((item, index) => (
            <article key={item.question} className="surface-card p-5">
              <p className="text-xs font-semibold text-accent-500">0{index + 1}</p>
              <h3 className="mt-1 font-serif text-lg text-brand-600">{item.question}</h3>
              <p className="mt-2 text-sm muted-text">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
