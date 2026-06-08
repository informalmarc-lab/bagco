import type { Metadata } from 'next'
import Link from 'next/link'
import { contactInfo } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Plastic Bag Ban Compliance',
  description:
    'Plastic bag ban planning for dispensaries. See states with bag bans, coming changes, and custom paper bag options for compliant cannabis checkout.',
}

const bannedStates = [
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Hawaii',
  'Maine',
  'New Jersey',
  'New York',
  'Oregon',
  'Rhode Island',
  'Vermont',
  'Washington',
]

const comingSoon = [
  {
    state: 'Oregon',
    detail: 'Expanding its ban to include reusable plastic bags on January 1, 2027.',
  },
  {
    state: 'Pennsylvania',
    detail: 'Statewide legislation was introduced in 2025, and operators should start watching the category now.',
  },
  {
    state: 'New Mexico',
    detail: 'A single-use plastic bag bill passed committee and is expected to return next session.',
  },
  {
    state: 'Washington',
    detail:
      'Reusable plastic film bags now carry a 12-cent charge, with an added 4-cent penalty on thick reusable plastic through 2027. Paper is becoming the cheaper checkout option.',
  },
]

const ownerNotes = [
  'Paper bags are not just compliant. In states with per-bag fees, they can be the cheaper option.',
  'Do not wait for the ban date to figure out size, stock levels, artwork, and reorder timing.',
  'Custom printed paper bags keep your shop compliant without giving up the brand moment at checkout.',
]

export default function CompliancePage() {
  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="container-page py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black leading-tight text-leaf md:text-6xl">
              Plastic Bag Bans Are Here. Is Your Dispensary Ready?
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-mute md:text-lg">
              If your state is pushing plastic out of checkout, the bag program needs to be decided before the rule hits the register.
              Bud Bags helps dispensaries move into paper without making the handoff look generic.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">Build a Compliance Quote</Link>
              <a href={contactInfo.textHref} className="btn-secondary">Text {contactInfo.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-2xl font-black text-leaf">Already banned as of 2026</h2>
          <p className="mt-3 text-sm leading-6 text-mute">
            These states already have statewide checkout bag bans or statewide plastic bag restrictions that make paper planning a normal part of retail operations.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {bannedStates.map((state) => (
              <p key={state} className="border-b border-line py-2 text-sm font-bold text-ink">
                {state}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-bone p-6">
          <h2 className="text-2xl font-black text-leaf">Coming soon</h2>
          <div className="mt-5 grid gap-4">
            {comingSoon.map((item) => (
              <div key={item.state} className="border-l-2 border-kraft bg-white px-4 py-3">
                <h3 className="text-base font-black text-ink">{item.state}</h3>
                <p className="mt-1 text-sm leading-6 text-mute">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {ownerNotes.map((note) => (
            <p key={note} className="rounded-lg border border-line bg-bone px-5 py-4 text-sm font-bold leading-6 text-ink">
              {note}
            </p>
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="rounded-lg border border-line bg-leaf p-6 text-white md:p-8">
          <h2 className="text-3xl font-black">Get your paper bag program settled before the deadline.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#F4E8D8] md:text-base">
            Build a custom printed paper bag estimate now, then use stock bags if your store needs inventory while the custom run is being proofed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-secondary bg-white">Start the Quote</Link>
            <Link href="/products#stock-bags" className="btn-secondary bg-white">See Stock Bags</Link>
          </div>
        </div>
      </section>
    </>
  )
}
