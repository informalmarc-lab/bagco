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
        <p className="kicker">FAQ</p>
        <h2 className="section-title mt-4">{title}</h2>
        <p className="mt-3 max-w-3xl muted-text">{intro}</p>
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <article key={item.question} className="surface-card rounded-2xl p-4">
              <h3 className="text-lg font-black text-[#1E4D2B]">{item.question}</h3>
              <p className="mt-2 text-sm muted-text">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
