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
            <article key={item.question} className="surface-card rounded-md p-4">
              <p className="text-xs font-semibold text-[#B5813A]">0{index + 1}</p>
              <h3 className="text-lg font-black text-[#1E4D2B]">{item.question}</h3>
              <p className="mt-2 text-sm muted-text">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
