import type { Metadata } from 'next'
import LeadCta from '@/components/LeadCta'
import PricingTable from '@/components/PricingTable'
import ProductProgramCard from '@/components/ProductProgramCard'
import StockBagCard from '@/components/StockBagCard'
import { printPrograms, stockBagProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Bag Designs and Pricing',
  description:
    'Compare custom printed paper bag programs and fast-ship stock bags for dispensary owners and purchasing managers.',
}

const rules = [
  '$75 art/plate fee on initial custom orders and proof changes for front printing.',
  '$35 additional setup for back printing.',
  '3-color surcharge of 25% applies when ordering under 3x the minimum quantity.',
  '8+ cases receive free freight to commercial addresses, with FSC fuel surcharge only.',
  'FSC rates: zones 2-3 = 5%, zones 4-6 = 7.5%, zones 7-8 = 10%.',
  'Under 8 cases: standard UPS Ground rates are added to invoice.',
  'Bag sizes cannot be combined for quantity pricing.',
  'Printing available front, back, and gussets for dispensary counter branding.',
  '30-50# machine-finished paper.',
  'About 4 weeks after proof approval.',
]

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="container-page py-12">
          <h1 className="text-4xl font-black text-leaf md:text-5xl">Dispensary Bag Designs and Pricing</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-mute">
            Use custom print when you want your logo at the counter. Use stock bags when the store needs inventory now. Either way, the pricing is built for dispensary owners who need fast decisions and clean reorders.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-4 py-10 lg:grid-cols-3">
        {printPrograms.map((program) => (
          <ProductProgramCard key={program.id} program={program} />
        ))}
      </section>

      <section className="container-page py-10">
        <div className="mb-5">
          <h2 className="text-3xl font-black text-leaf">Stock bags for immediate coverage</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-mute">
            Keep checkout moving while custom bags are in proofing or production. These are ready-to-ship stock options for dispensary owners who cannot wait four weeks to replenish paper.
          </p>
        </div>
        <div className="grid gap-4">
          {stockBagProducts.map((product) => (
            <StockBagCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-5">
          <h2 className="text-3xl font-black text-leaf">Custom print per-size case pricing</h2>
          <p className="mt-2 text-sm leading-6 text-mute">
            Primary dispensary sizes are #25 and #28 because they handle most checkout and pickup orders. Size mix matters operationally, but size quantities are priced separately.
          </p>
        </div>
        <PricingTable />
      </section>

      <section className="container-page py-10">
        <div className="rounded-lg border border-line bg-bone p-6">
          <h2 className="text-2xl font-black text-leaf">Fees, freight, and production rules for custom bags</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {rules.map((rule) => (
              <p key={rule} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold leading-6 text-ink">
                {rule}
              </p>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-mute">
            A 3-case minimum option exists for dispensary owners who want to test a branded paper program before committing to a full run.
          </p>
        </div>
      </section>

      <LeadCta />
    </>
  )
}
