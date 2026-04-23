import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Terms and Conditions | BagSupplyCo',
  },
  description:
    "Read BagSupplyCo's Terms and Conditions, including our return policy, shipping terms, payment policies, and custom order rules.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.bagsupplyco.com/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Legal</p>
          <h1 className="heading-display mt-5">Terms and Conditions</h1>
          <p className="mt-4 text-base font-semibold text-[#B5813A] md:text-lg">Effective Date: March 2026</p>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Please read these terms carefully before placing an order or using our website.
          </p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">1. Acceptance of Terms</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              By placing an order with BagSupplyCo, accessing our website, or otherwise engaging with our services,
              you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain
              from using our services.
            </p>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              These Terms and Conditions apply to all customers, including retail buyers, wholesale accounts, and
              resellers.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">2. Products and Orders</h2>
            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">2.1 Product Availability</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              All orders are subject to product availability. BagSupplyCo reserves the right to limit order quantities
              and to discontinue products at any time without prior notice.
            </p>

            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">2.2 Order Confirmation</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              An order is not confirmed until you receive written confirmation from BagSupplyCo. We reserve the right
              to refuse or cancel any order for any reason, including but not limited to errors in pricing or product
              descriptions.
            </p>

            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">2.3 Minimum Orders</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              Minimum order quantities may apply to certain products. Please refer to the product listing or contact
              us for details.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">3. Pricing and Payment</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              All prices are listed in U.S. dollars and are subject to change without notice. The following payment
              terms apply:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#3E3427] md:text-lg">
              <li>A 3% credit card processing surcharge applies to all credit card transactions.</li>
              <li>Net 30 payment terms are available to qualified wholesale accounts upon approval.</li>
              <li>Late payments are subject to a 2% monthly finance charge on the outstanding balance.</li>
              <li>BagSupplyCo reserves the right to suspend or terminate account access for delinquent accounts.</li>
            </ul>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">4. Shipping and Delivery</h2>
            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">4.1 Processing Times</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              In-stock items ship the same business day when orders are placed before our daily cutoff time.
              Custom-printed orders ship within 3&ndash;4 weeks from artwork approval.
            </p>

            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">4.2 Free Shipping</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              Free standard shipping is available on qualifying orders of 8 or more cases. Orders below this threshold
              are subject to standard shipping rates, which will be displayed at checkout or included in your quote.
            </p>

            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">4.3 Risk of Loss</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              Title and risk of loss for all products pass to the buyer upon delivery to the carrier. BagSupplyCo is
              not responsible for delays, damages, or losses that occur during transit.
            </p>

            <h3 className="mt-5 text-xl font-bold text-[#B5813A]">4.4 Shipping Address</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              Customers are responsible for providing accurate shipping information. BagSupplyCo is not liable for
              shipments delivered to incorrect addresses provided by the customer.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">5. Custom Orders and Artwork</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#3E3427] md:text-lg">
              <li>A one-time custom artwork setup fee of $75 applies to all new customer custom print orders.</li>
              <li>
                Customers are responsible for ensuring all submitted artwork is accurate, complete, and does not
                infringe on any third-party intellectual property rights.
              </li>
              <li>
                BagSupplyCo will provide a digital proof for approval before production. Orders will not proceed
                without written customer approval of the proof.
              </li>
              <li>
                Once production has begun on a custom order, cancellations are not accepted and refunds will not be
                issued.
              </li>
              <li>
                Minor color variations between proofs and finished products may occur due to printing processes and are
                not grounds for return or refund.
              </li>
            </ul>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article className="rounded-2xl border-2 border-[#B5813A66] bg-[#FAF6F0] p-5 md:p-6">
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">6. Returns and Refunds</h2>
            <p className="mt-4 text-base font-black leading-8 text-[#1E4D2B] md:text-lg">
              BagSupplyCo does not accept returns or exchanges under standard circumstances. All sales are considered
              final upon shipment.
            </p>

            <h3 className="mt-6 text-xl font-bold text-[#B5813A]">6.1 Damaged Items</h3>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              The only exception to our no-return policy is for items that arrive damaged or defective. If you receive
              a damaged shipment, you must:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-8 text-[#3E3427] md:text-lg">
              <li>
                Notify BagSupplyCo within 5 business days of delivery by contacting us at
                {' '}
                <a className="font-semibold text-[#1E4D2B] underline" href="mailto:Marc.Castella@bagsupplyco.com">
                  Marc.Castella@bagsupplyco.com
                </a>
                {' '}
                or
                {' '}
                <a className="font-semibold text-[#1E4D2B] underline" href="tel:+17048629256">
                  (704) 862-9256
                </a>
                .
              </li>
              <li>Provide photographic evidence of the damaged items and original packaging.</li>
              <li>Retain all original packaging materials until the claim is resolved.</li>
            </ul>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              Upon verification of the damage, BagSupplyCo will, at its sole discretion, issue a replacement shipment
              or a credit toward a future order. Refunds to the original payment method may be issued in cases where a
              replacement is not possible.
            </p>

            <h3 className="mt-6 text-xl font-bold text-[#B5813A]">
              6.2 Exclusions &mdash; the following are never eligible for return or refund:
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-8 text-[#3E3427] md:text-lg">
              <li>Custom-printed or personalized orders, once production has commenced.</li>
              <li>Items that have been used, altered, or stored improperly.</li>
              <li>Discrepancies in quantity not reported within 5 business days of delivery.</li>
              <li>Orders where the customer provided incorrect specifications or artwork.</li>
            </ul>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">7. Intellectual Property</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              All content on the BagSupplyCo website, including text, graphics, logos, and product images, is the
              property of BagSupplyCo and is protected by applicable intellectual property laws. Unauthorized use,
              reproduction, or distribution of any content is strictly prohibited.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">8. Limitation of Liability</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              To the fullest extent permitted by law, BagSupplyCo shall not be liable for any indirect, incidental,
              special, or consequential damages arising from the use of our products or services, including but not
              limited to loss of revenue, loss of profits, or business interruption.
            </p>
            <p className="mt-3 text-base leading-8 text-[#3E3427] md:text-lg">
              In all cases, BagSupplyCo's total liability to any customer shall not exceed the amount paid for the
              specific order giving rise to the claim.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">9. Governing Law</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the State
              of North Carolina, without regard to its conflict of law provisions. Any disputes arising under these
              terms shall be resolved in the courts of Union County, North Carolina.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">10. Changes to These Terms</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              BagSupplyCo reserves the right to update or modify these Terms and Conditions at any time. Changes will
              be posted on our website with an updated effective date. Continued use of our services following any
              changes constitutes acceptance of the revised terms.
            </p>
          </article>

          <hr className="my-8 border-[#C4935A66]" />

          <article>
            <h2 className="text-2xl font-black text-[#1E4D2B] md:text-3xl">11. Contact Information</h2>
            <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8 text-[#3E3427] md:text-lg">
              <li>
                Email:
                {' '}
                <a className="font-semibold text-[#1E4D2B] underline" href="mailto:Marc.Castella@bagsupplyco.com">
                  Marc.Castella@bagsupplyco.com
                </a>
              </li>
              <li>
                Phone:
                {' '}
                <a className="font-semibold text-[#1E4D2B] underline" href="tel:+17048629256">
                  (704) 862-9256
                </a>
              </li>
              <li>
                Website:
                {' '}
                <a className="font-semibold text-[#1E4D2B] underline" href="https://www.bagsupplyco.com">
                  www.bagsupplyco.com
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}

