import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Shipping and fuel surcharge policy for Bag Supply Co orders by case volume and zone group.',
}

const rules = [
  'Orders under 8 cases ship UPS Ground and freight is added to invoice.',
  'Orders at 8+ cases use Fuel Surcharge (FSC) only based on zone group.',
  'Large LTL orders use pallet-based Fuel Surcharge (FSC) and are confirmed after review.',
]

const zones = [
  { label: 'UPS Zones 2-3', value: '5.0% Fuel Surcharge (FSC)' },
  { label: 'UPS Zones 4-6', value: '7.5% Fuel Surcharge (FSC)' },
  { label: 'UPS Zones 7-8', value: '10.0% Fuel Surcharge (FSC)' },
]

export default function ShippingPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Shipping Policy</p>
          <h1 className="heading-display mt-5">Freight and FSC Rules</h1>
          <p className="mt-3 max-w-3xl text-base font-semibold text-[#5F4D33]">
            FSC stands for Fuel Surcharge — a percentage added to orders based on shipping zone, replacing flat freight rates on qualifying case volumes.
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">
            Shipping is calculated by case volume and destination zone. FSC here means Fuel Surcharge. Use these rules
            when planning quote totals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {rules.map((rule) => (
            <article key={rule} className="tonal-panel">
              <p className="text-sm font-semibold text-[#5F4D33]">{rule}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Fuel Surcharge Groups</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {zones.map((zone) => (
              <div key={zone.label} className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#7A6548]">{zone.label}</p>
                <p className="mt-2 text-lg font-black text-[#1E4D2B]">{zone.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-secondary">Contact Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}



