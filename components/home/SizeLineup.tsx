import Link from 'next/link'
import products from '@/data/makeYourQuoteProducts.json'

type QuoteProduct = { item: string; size: string; pack: number; prices: Record<string, number> }

// Dispensary lineup, drawn to scale. Width and height are the bag face in inches; depth is the gusset.
const LINEUP = [
  { item: '#23', label: 'Pinch bottom', w: 5, d: 2, h: 10, minimum: 12000, note: 'Pre-rolls, carts, edibles' },
  { item: '#25', label: 'Square bottom', w: 6, d: 3.5, h: 11, minimum: 6000, note: 'Most popular exit bag' },
  { item: '#26', label: 'Square bottom', w: 6.5, d: 4, h: 13.5, minimum: 4000, note: 'Bigger baskets and jars' },
]

const PX_PER_INCH = 20

function inches(value: number): string {
  const whole = Math.floor(value)
  return value - whole === 0.5 ? `${whole}-1/2` : String(whole)
}

function priceAtMinimum(item: string, minimum: number): number | null {
  const product = (products as unknown as QuoteProduct[]).find((p) => p.item === item)
  if (!product) return null
  const tiers = Object.keys(product.prices)
    .map(Number)
    .filter((tier) => tier <= minimum)
    .sort((a, b) => b - a)
  return tiers.length ? product.prices[String(tiers[0])] : null
}

function BagFace({ w, h }: { w: number; h: number }) {
  const width = w * PX_PER_INCH
  const height = h * PX_PER_INCH
  const teeth = Math.round(width / 8)
  const step = width / teeth
  let top = `M0 6`
  for (let i = 0; i < teeth; i += 1) top += ` l${step / 2} -6 l${step / 2} 6`
  return (
    <svg
      viewBox={`0 -1 ${width} ${height + 7}`}
      aria-hidden="true"
      className="block"
      style={{ width: `calc(var(--ppi) * ${w})`, height: `calc(var(--ppi) * ${h} + 6px)` }}
    >
      <path d={`${top} V${height + 6} H0 Z`} fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.25" />
      <line x1="0" y1={height - 4} x2={width} y2={height - 4} stroke="#B9BAB4" strokeWidth="1" />
    </svg>
  )
}

export default function SizeLineup() {
  return (
    <div>
      {/* Bags drawn to the same scale, standing on one shelf line */}
      <div
        className="grid grid-cols-3 items-end gap-3 border-b-2 border-[#1A1A1A] [--ppi:8.5px] sm:gap-10 sm:[--ppi:20px]"
        aria-hidden="true"
      >
        {LINEUP.map((bag) => (
          <div key={bag.item} className="flex items-end gap-2">
            <div className="flex flex-col items-center" style={{ height: `calc(var(--ppi) * ${bag.h})` }}>
              <span className="w-px flex-1 bg-[#8C8C86]" />
              <span className="whitespace-nowrap py-1 text-[11px] font-semibold text-[#3D3D39] sm:text-xs">{inches(bag.h)}&quot;</span>
              <span className="w-px flex-1 bg-[#8C8C86]" />
            </div>
            <BagFace w={bag.w} h={bag.h} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#5F5F5A]">Front view, drawn to scale.</p>

      <div className="mt-10 grid gap-10 sm:grid-cols-3">
        {LINEUP.map((bag) => {
          const price = priceAtMinimum(bag.item, bag.minimum)
          return (
            <div key={bag.item}>
              <h3 className="font-display text-3xl font-extrabold text-[#1A1A1A]">{bag.item}</h3>
              <p className="mt-1 text-[#1E4D2B]">{bag.note}</p>
              <dl className="mt-4 space-y-1.5 text-sm text-[#3D3D39]">
                <div className="flex justify-between gap-4 border-b border-[#E3E3DE] pb-1.5">
                  <dt>Size</dt>
                  <dd className="font-semibold text-[#1A1A1A]">
                    {inches(bag.w)}&quot; × {inches(bag.d)}&quot; × {inches(bag.h)}&quot;
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#E3E3DE] pb-1.5">
                  <dt>Style</dt>
                  <dd className="font-semibold text-[#1A1A1A]">{bag.label}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#E3E3DE] pb-1.5">
                  <dt>Minimum order</dt>
                  <dd className="font-semibold text-[#1A1A1A]">{bag.minimum.toLocaleString('en-US')} bags</dd>
                </div>
                {price !== null && (
                  <div className="flex justify-between gap-4 pb-1.5">
                    <dt>At minimum</dt>
                    <dd className="font-semibold text-[#1A1A1A]">${price.toFixed(2)} per 1,000</dd>
                  </div>
                )}
              </dl>
              <Link
                href="/makeyourquote"
                className="mt-4 inline-block font-semibold text-[#1E4D2B] underline decoration-2 underline-offset-4 hover:text-[#1A1A1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
              >
                Price the {bag.item}
              </Link>
            </div>
          )
        })}
      </div>
      <p className="mt-8 text-sm text-[#5F5F5A]">
        Prices are for 1 or 2 colors on the front; 3 colors adds 25% on smaller runs. Add a one-time $75 plate per size. Bigger runs cost less per bag.
      </p>
    </div>
  )
}
