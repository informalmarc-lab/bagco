import Link from 'next/link'
import { money } from '@/lib/catalogProducts'
import {
  getIndustryProducts,
  getIndustryRecommendedSizes,
  getIndustryStartingPrice,
  type IndustryMeta,
} from '@/lib/seo/industries'
import { getIndustryCityLinks } from '@/lib/seo/cities'

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function IndustryHubPage({ industry }: { industry: IndustryMeta }) {
  const products = getIndustryProducts(industry).slice(0, 3)
  const sizes = getIndustryRecommendedSizes(industry)
  const startingPrice = getIndustryStartingPrice(industry)
  const topCities = getIndustryCityLinks(industry.key, 20)

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Program</p>
          <h1 className="heading-display mt-5">{industry.label} programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">{industry.focus}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Starting price</p>
            <p className="mt-3 text-2xl font-black text-[#1E4D2B]">{money(startingPrice)} per case</p>
            <p className="mt-2 text-sm muted-text">Based on current catalog pricing.</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Common sizes</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">{sizes.join(', ')}</p>
            <p className="mt-2 text-sm muted-text">Most ordered sizes for this industry.</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Lead times</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">Same-day or 3-4 weeks</p>
            <p className="mt-2 text-sm muted-text">Stock before 1 PM ET, custom after proof.</p>
          </div>
        </div>
      </section>

      <section className="section-container pb-10">
        <h2 className="section-title">Top markets for {industry.label.toLowerCase()}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F4D33]">
          These are the highest-count markets based on county-level CBP establishments for NAICS {industry.naics}.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${industry.slug}/${city.slug}`}
              className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0]"
            >
              {city.label} ({formatNumber(city.count)})
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container pb-8">
        <h2 className="section-title">SKU highlights</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1E4D2B] text-white">
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Bag</th>
                <th className="px-4 py-3 text-left">Price range</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const prices = product.sizePricing?.map((row) => row.price) || [product.startingPrice]
                const min = Math.min(...prices)
                const max = Math.max(...prices)
                const label = min === max ? money(min) : `${money(min)} - ${money(max)}`
                return (
                  <tr key={product.sku} className="border-b border-[#C4935A66] bg-white">
                    <td className="px-4 py-3 font-semibold text-[#1E4D2B]">{product.sku}</td>
                    <td className="px-4 py-3 text-[#4B3E2E]">{product.name}</td>
                    <td className="px-4 py-3 font-semibold text-[#1E4D2B]">{label} per case</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container pb-6">
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-secondary">
            Contact Team
          </Link>
        </div>
      </section>
    </div>
  )
}
