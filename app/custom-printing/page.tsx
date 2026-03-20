import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Custom Printing',
  description:
    'Custom paper bag printing programs with 1-color, 2-color, and 3-color options for pharmacy and retail teams.',
}

const capabilities = [
  '1-color custom printing',
  '2-color custom printing',
  '3-color custom printing',
  'Multiple bag sizes and formats',
  'Proofing path before production',
]

export default function CustomPrintingPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Custom Printing</p>
          <h1 className="heading-display mt-5">Print Programs That Scale With Your Brand</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Choose the print depth that fits your budget and brand requirements, then move into a repeatable production process.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <p key={item} className="tonal-panel text-sm font-semibold text-[#5F4D33]">{item}</p>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="tonal-panel">
            <p className="kicker">How It Works</p>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">Simple path from idea to proof.</h2>
            <p className="mt-3 muted-text">
              Start with your target size, print depth, and estimated case volume. We review the program, confirm the best bag format,
              and move into proofing before production begins.
            </p>
          </article>
          <article className="tonal-panel">
            <p className="kicker">Turnaround</p>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">Built for repeatable production windows.</h2>
            <p className="mt-3 muted-text">
              Most custom orders move on a 3-4 week production schedule after artwork approval. That keeps expectations clear
              for launch planning, reorders, and multi-location rollouts.
            </p>
          </article>
          <article className="tonal-panel">
            <p className="kicker">Artwork</p>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">Send vector files when possible.</h2>
            <p className="mt-3 muted-text">
              AI, EPS, and print-ready PDF files are the fastest route. If your team is still organizing assets, we can review
              what you have and help shape the cleanest proofing plan.
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="tonal-panel">
            <p className="kicker">Program Fit</p>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">Custom printing works best when the reorder lane is clear.</h2>
            <p className="mt-3 muted-text">
              We usually recommend aligning on your core bag sizes first, then deciding whether 1-color, 2-color, or 3-color
              printing gives the right balance of impact and cost. That keeps the quote grounded in how your team will actually reorder.
            </p>
          </div>

          <div className="tonal-panel">
            <p className="kicker">What to Prepare</p>
            <div className="mt-4 grid gap-3">
              {[
                'Logo or brand artwork',
                'Target bag sizes and case counts',
                'Desired print colors',
                'Any launch or reorder timeline requirements',
              ].map((item) => (
                <p key={item} className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-[#1E4D2B]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Next Step</h2>
          <p className="mt-3 muted-text">
            Use the quote builder to send your logo, target bag size, and quantity for a structured production recommendation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/custom" className="btn-secondary">Open Custom Catalog</Link>
            <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
          </div>
        </div>
      </section>
    </div>
  )
}
