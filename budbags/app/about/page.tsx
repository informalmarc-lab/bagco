import type { Metadata } from 'next'
import LeadCta from '@/components/LeadCta'
import { contactInfo } from '@/lib/products'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Bud Bags supplies factory-direct custom printed and stock paper bags for dispensary owners across the United States.',
}

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="container-page py-12">
          <h1 className="text-4xl font-black text-leaf md:text-5xl">Paper bag supply built for dispensary owners.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-mute">
            Bud Bags was built for independent cannabis dispensaries that need paper bags for real store conditions: compliance pressure, pickup orders, branded checkout, tight inventory, and reorder decisions that cannot sit for a week.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.45fr_0.55fr]">
        <div className="card p-6">
          <h2 className="text-2xl font-black text-leaf">What matters at the counter</h2>
          <p className="mt-3 text-sm leading-6 text-mute">
            The checkout bag should carry the store name, hold up during handoff, and be easy to reorder before shelves run low. Bud Bags stays focused on dispensary paper bags: custom print, stock coverage, clear pricing, practical minimums, and fast follow-up.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Value title="Brand control" text="Your logo, your colors, your bag. The customer should leave with packaging that feels like it came from your store." />
          <Value title="Cost clarity" text="Per-case pricing is published so owners can compare custom programs before handing off artwork or committing budget." />
          <Value title="Accessible minimums" text="The standard custom program starts at 4 cases, with a 3-case trial option for dispensary owners testing paper for the first time." />
          <Value title="Fast coverage" text="Stock paper bags can cover the counter while your branded run is proofed, printed, and scheduled." />
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-lg border border-line bg-bone p-6 md:p-8">
          <h2 className="text-2xl font-black text-leaf">Paper is becoming an operating decision.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-mute md:text-base">
            Plastic bag bans like California&apos;s SB 1053 are pushing dispensaries toward paper. Bud Bags does not provide legal advice, but we do help owners plan a paper bag program that fits checkout volume, brand standards, pickup flow, and reorder timing.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="border-t border-line pt-6 text-sm leading-6 text-mute">
          Bud Bags support is available Monday-Friday. Call or text <a href={contactInfo.phoneHref} className="font-bold text-leaf">{contactInfo.phone}</a>. Address: {contactInfo.address}.
        </div>
      </section>

      <LeadCta />
    </>
  )
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-black text-leaf">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-mute">{text}</p>
    </div>
  )
}
