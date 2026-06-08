import Image from 'next/image'
import Link from 'next/link'
import LeadCta from '@/components/LeadCta'
import ProductProgramCard from '@/components/ProductProgramCard'
import StockBagCard from '@/components/StockBagCard'
import { contactInfo, printPrograms, productImages, stockBagProducts } from '@/lib/products'

const painPoints = [
  'Plastic bans are not waiting for your next reorder.',
  'Your customer should not leave with a bag that feels like an afterthought.',
  'Factory-direct pricing keeps packaging from chewing up margin.',
  'Custom bags for the brand. Stock bags when the shelf is empty.',
]

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-tight text-leaf md:text-6xl">
              Your dispensary brand deserves a better bag.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-mute md:text-lg">
              Custom printed paper bags for dispensaries that care about the checkout handoff. Factory direct, low minimums, and stock options when you need bags fast.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">Build a Quote</Link>
              <Link href="/products" className="btn-secondary">View Pricing</Link>
              <a href={contactInfo.textHref} className="btn-secondary">Text {contactInfo.phone}</a>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-ink">
              Family-owned manufacturer since 1955. One of the last factory-direct paper bag makers in the US.
            </p>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <Stat value="4 cases" label="Standard minimum" />
              <Stat value="24 hrs" label="Quote follow-up" />
              <Stat value="4 weeks" label="After proof approval" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {productImages.slice(0, 4).map((image, index) => (
              <div key={image} className="relative aspect-square rounded-lg border border-line bg-white">
                <Image
                  src={image}
                  alt={`Bud Bags custom paper bag sample ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-sm font-bold leading-6 text-ink">
            Need help now? Call or text <a href={contactInfo.phoneHref} className="text-leaf">{contactInfo.phone}</a> and we will point you to the fastest path.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={contactInfo.phoneHref} className="btn-primary">Call Now</a>
            <a href={contactInfo.textHref} className="btn-secondary">Text Us</a>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-4 py-10 md:grid-cols-4">
        {painPoints.map((point) => (
          <div key={point} className="border-t border-line bg-bone py-4">
            <p className="text-sm font-bold leading-6 text-ink">{point}</p>
          </div>
        ))}
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-leaf">Custom print when the bag needs to feel like your shop.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-mute">
              Pick print colors, bag size, and case count around how your shop actually moves flower, pre-rolls, gummies, carts, and pickup orders. The quote shows setup fees and freight placeholders before you send anything in.
            </p>
          </div>
          <Link href="/products" className="btn-secondary">See All Prices</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {printPrograms.map((program) => (
            <ProductProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-leaf">Need bags before custom print lands?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-mute">
              Keep checkout covered with stocked TY and DS exit bags while your branded run is being proofed, printed, or reordered.
            </p>
          </div>
          <Link href="/products#stock-bags" className="btn-secondary">View Stock Bags</Link>
        </div>
        <div className="grid gap-4">
          {stockBagProducts.map((product) => (
            <StockBagCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 rounded-lg border border-line bg-bone p-6 md:grid-cols-3 md:p-8">
          <div>
            <h2 className="text-2xl font-black text-leaf">Built around real cannabis retail.</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm leading-6 text-mute md:text-base">
              You need bags that show up, look right, and do not make checkout feel cheap.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Rule text="Low minimums when you are testing a branded run." />
              <Rule text="Clear setup costs before artwork goes anywhere." />
              <Rule text="Stock bags when the back room is almost out." />
              <Rule text="Real follow-up from people who make the bags." />
            </div>
          </div>
        </div>
      </section>

      <LeadCta />

      <section className="container-page pb-12">
        <div className="border-t border-line pt-6 text-sm text-mute">
          Questions now? Call or text <a href={contactInfo.phoneHref} className="font-bold text-leaf">{contactInfo.phone}</a>. {contactInfo.support}.
        </div>
      </section>
    </>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-kraft bg-white px-4 py-3">
      <p className="text-lg font-black text-leaf">{value}</p>
      <p className="mt-1 text-xs font-semibold text-mute">{label}</p>
    </div>
  )
}

function Rule({ text }: { text: string }) {
  return <p className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">{text}</p>
}
