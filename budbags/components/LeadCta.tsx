import Link from 'next/link'
import { contactInfo } from '@/lib/products'

export default function LeadCta() {
  return (
    <section className="container-page py-10">
      <div className="rounded-lg border border-leaf bg-leaf p-6 text-white md:p-8">
        <h2 className="text-2xl font-black md:text-3xl">Price the bags your dispensary needs next.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#F4E8D8] md:text-base">
          Build a custom print estimate for branded checkout bags, then send it over so freight, artwork, and reorder timing can be confirmed by a real person.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-bold text-leaf hover:bg-[#F4E8D8]">
            Build Custom Quote
          </Link>
          <a href={contactInfo.textHref} className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">
            Text {contactInfo.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
