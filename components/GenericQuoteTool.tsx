'use client'

import { useEffect, useMemo, useState } from 'react'

type QuoteVariant = {
  id: string
  label: string
  quantityPerCase: string
  pricePerCase: number
  isCustom: boolean
}

type QuoteCategory = {
  id: string
  title: string
  variants: QuoteVariant[]
}

const CATEGORIES: QuoteCategory[] = [
  {
    id: 'pharmacy-gs',
    title: 'Pharmacy Bags - GS Design',
    variants: [
      { id: 'gs-21', label: '#21 (3.5" x 1.5" x 10")', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: false },
      { id: 'gs-22', label: '#22 (4.5" x 2.25" x 11")', quantityPerCase: '3,000', pricePerCase: 119.81, isCustom: false },
      { id: 'gs-23', label: '#23 (5" x 2" x 10")', quantityPerCase: '3,000', pricePerCase: 117.42, isCustom: false },
      { id: 'gs-25', label: '#25 (6" x 4" x 11")', quantityPerCase: '1,000', pricePerCase: 65.91, isCustom: false },
      { id: 'gs-26', label: '#26 (7" x 4" x 14")', quantityPerCase: '1,000', pricePerCase: 102.29, isCustom: false },
      { id: 'gs-28', label: '#28 (8" x 5" x 17")', quantityPerCase: '500', pricePerCase: 112.1, isCustom: false },
      { id: 'gs-12', label: '#12 (7" x 10")', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: false },
      { id: 'gs-14', label: '#14 (9" x 11")', quantityPerCase: '2,000', pricePerCase: 99.69, isCustom: false },
      { id: 'gs-15', label: '#15 (8.5" x 3.5" x 14.5")', quantityPerCase: '1,000', pricePerCase: 95.78, isCustom: false },
    ],
  },
  {
    id: 'pharmacy-ty',
    title: 'Pharmacy Bags - Thank You Design',
    variants: [
      { id: 'ty-21', label: '#21', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: false },
      { id: 'ty-22', label: '#22', quantityPerCase: '3,000', pricePerCase: 119.81, isCustom: false },
      { id: 'ty-23', label: '#23', quantityPerCase: '3,000', pricePerCase: 117.41, isCustom: false },
      { id: 'ty-25', label: '#25', quantityPerCase: '1,000', pricePerCase: 65.91, isCustom: false },
      { id: 'ty-26', label: '#26', quantityPerCase: '1,000', pricePerCase: 102.29, isCustom: false },
      { id: 'ty-28', label: '#28', quantityPerCase: '500', pricePerCase: 112.1, isCustom: false },
      { id: 'ty-12', label: '#12', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: false },
      { id: 'ty-14', label: '#14', quantityPerCase: '2,000', pricePerCase: 99.69, isCustom: false },
      { id: 'ty-15', label: '#15', quantityPerCase: '1,000', pricePerCase: 95.78, isCustom: false },
    ],
  },
  {
    id: 'plastic-gs',
    title: 'Plastic Pharmacy Bags - GS Design',
    variants: [
      { id: 'plastic-32', label: '#32 (9" x 5.5" x 18")', quantityPerCase: '1,000', pricePerCase: 70.84, isCustom: false },
      { id: 'plastic-35', label: '#35 (12" x 7" x 23")', quantityPerCase: '1,000', pricePerCase: 90.84, isCustom: false },
      { id: 'plastic-30', label: '#30 (12" x 7" x 25")', quantityPerCase: '500', pricePerCase: 116.03, isCustom: false },
    ],
  },
  {
    id: 'vet-vb1',
    title: 'Veterinary Bag Design - VB1',
    variants: [
      { id: 'vb1-22', label: 'Pinch bottom #22', quantityPerCase: '3,000', pricePerCase: 119.81, isCustom: false },
      { id: 'vb1-12', label: 'Flat pinch bottom #12', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: false },
      { id: 'vb1-25', label: 'Square bottom #25', quantityPerCase: '1,000', pricePerCase: 65.91, isCustom: false },
    ],
  },
  {
    id: 'vet-vb2',
    title: 'Veterinary Bag Design - VB2',
    variants: [
      { id: 'vb2-22', label: 'Pinch bottom #22', quantityPerCase: '3,000', pricePerCase: 119.81, isCustom: false },
      { id: 'vb2-12', label: 'Flat pinch bottom #12', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: false },
      { id: 'vb2-25', label: 'Square bottom #25', quantityPerCase: '1,000', pricePerCase: 65.91, isCustom: false },
    ],
  },
  {
    id: 'vet-vb6',
    title: 'Veterinary Bag Design - VB6',
    variants: [
      { id: 'vb6-22', label: 'Pinch bottom #22', quantityPerCase: '3,000', pricePerCase: 119.81, isCustom: false },
      { id: 'vb6-12', label: 'Flat pinch bottom #12', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: false },
      { id: 'vb6-25', label: 'Square bottom #25', quantityPerCase: '1,000', pricePerCase: 65.91, isCustom: false },
    ],
  },
  {
    id: 'custom-1',
    title: 'Full-Custom, 1-Color Bags',
    variants: [
      { id: 'c1-21', label: '#21', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-22', label: '#22', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-23', label: '#23', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-25', label: '#25', quantityPerCase: '2,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-26', label: '#26', quantityPerCase: '1,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-28', label: '#28', quantityPerCase: '500', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-12', label: '#12', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-14', label: '#14', quantityPerCase: '2,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c1-15', label: '#15', quantityPerCase: '1,000', pricePerCase: 95.56, isCustom: true },
    ],
  },
  {
    id: 'custom-2',
    title: 'Full-Custom, 2-Color Bags',
    variants: [
      { id: 'c2-21', label: '#21', quantityPerCase: '3,000', pricePerCase: 95.56, isCustom: true },
      { id: 'c2-22', label: '#22', quantityPerCase: '3,000', pricePerCase: 119.8, isCustom: true },
      { id: 'c2-23', label: '#23', quantityPerCase: '3,000', pricePerCase: 117.39, isCustom: true },
      { id: 'c2-25', label: '#25', quantityPerCase: '2,000', pricePerCase: 133.08, isCustom: true },
      { id: 'c2-26', label: '#26', quantityPerCase: '1,000', pricePerCase: 102.29, isCustom: true },
      { id: 'c2-28', label: '#28', quantityPerCase: '500', pricePerCase: 112.1, isCustom: true },
      { id: 'c2-12', label: '#12', quantityPerCase: '3,000', pricePerCase: 115.35, isCustom: true },
      { id: 'c2-14', label: '#14', quantityPerCase: '2,000', pricePerCase: 99.68, isCustom: true },
      { id: 'c2-15', label: '#15', quantityPerCase: '1,000', pricePerCase: 95.78, isCustom: true },
    ],
  },
  {
    id: 'custom-3',
    title: 'Full-Custom, 3-Color Bags',
    variants: [
      { id: 'c3-21', label: '#21', quantityPerCase: '3,000', pricePerCase: 119.46, isCustom: true },
      { id: 'c3-22', label: '#22', quantityPerCase: '3,000', pricePerCase: 149.76, isCustom: true },
      { id: 'c3-23', label: '#23', quantityPerCase: '3,000', pricePerCase: 146.76, isCustom: true },
      { id: 'c3-25', label: '#25', quantityPerCase: '2,000', pricePerCase: 166.36, isCustom: true },
      { id: 'c3-26', label: '#26', quantityPerCase: '1,000', pricePerCase: 127.86, isCustom: true },
      { id: 'c3-28', label: '#28', quantityPerCase: '500', pricePerCase: 140.12, isCustom: true },
      { id: 'c3-12', label: '#12', quantityPerCase: '3,000', pricePerCase: 144.18, isCustom: true },
      { id: 'c3-14', label: '#14', quantityPerCase: '2,000', pricePerCase: 124.61, isCustom: true },
      { id: 'c3-15', label: '#15', quantityPerCase: '1,000', pricePerCase: 119.71, isCustom: true },
    ],
  },
]

function money(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

export default function GenericQuoteTool() {
  const [casesById, setCasesById] = useState<Record<string, number>>({})
  const [generatedAt, setGeneratedAt] = useState('')
  const [quoteId, setQuoteId] = useState('')
  const [customer, setCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString())
    setQuoteId(`BAGCO-${Date.now().toString().slice(-8)}`)
  }, [])

  const allLines = useMemo(() => {
    return CATEGORIES.flatMap((category) =>
      category.variants.map((variant) => {
        const cases = casesById[variant.id] || 0
        return {
          categoryId: category.id,
          categoryTitle: category.title,
          ...variant,
          cases,
          lineTotal: cases * variant.pricePerCase,
        }
      }),
    )
  }, [casesById])

  const selectedLines = allLines.filter((line) => line.cases > 0)
  const totalCases = selectedLines.reduce((sum, line) => sum + line.cases, 0)
  const subtotal = selectedLines.reduce((sum, line) => sum + line.lineTotal, 0)
  const usesFuelSurchargeOnly = totalCases >= 8
  const selectedLineCount = selectedLines.length
  const shippingMessage = usesFuelSurchargeOnly
    ? '8+ cases: Fuel Surcharge (FSC) only applies. FSC is 5%, 7.5%, or 10% based on UPS zone.'
    : 'Under 8 cases: ships UPS Ground and freight is added to invoice.'

  const customMinErrors = selectedLines.filter((line) => line.isCustom && line.cases < 4)

  const quoteBody = useMemo(() => {
    if (selectedLines.length === 0) return ''

    const lines = selectedLines.map(
      (line) =>
        `${line.categoryTitle} | ${line.label} | Cases: ${line.cases} | Price/Case: ${money(line.pricePerCase)} | Line Total: ${money(line.lineTotal)}`,
    )

    return [
      'Generic Bag Quote Request',
      '',
      `Quote ID: ${quoteId || 'Pending'}`,
      `Generated: ${generatedAt || 'Pending'}`,
      '',
      `Name: ${customer.name || 'N/A'}`,
      `Company: ${customer.company || 'N/A'}`,
      `Email: ${customer.email || 'N/A'}`,
      `Phone: ${customer.phone || 'N/A'}`,
      '',
      ...lines,
      '',
      `Total Cases: ${totalCases}`,
      `Subtotal (no shipping): ${money(subtotal)}`,
      `Shipping: ${shippingMessage}`,
      '',
      'Note: This is an estimated quote and not a final invoice.',
    ].join('\n')
  }, [selectedLines, shippingMessage, totalCases, subtotal, quoteId, generatedAt, customer])

  const mailtoHref =
    selectedLines.length > 0
      ? `mailto:info@bagco.com?subject=${encodeURIComponent('Generic Bag Quote Request')}&body=${encodeURIComponent(quoteBody)}`
      : '#'

  const updateCases = (id: string, value: string) => {
    const numeric = Number.parseInt(value, 10)
    const safeValue = Number.isFinite(numeric) && numeric > 0 ? numeric : 0
    setCasesById((prev) => ({ ...prev, [id]: safeValue }))
  }

  const updateCustomer = (key: 'name' | 'company' | 'email' | 'phone', value: string) => {
    setCustomer((prev) => ({ ...prev, [key]: value }))
  }

  const resetQuote = () => {
    setCasesById({})
    setCustomer({
      name: '',
      company: '',
      email: '',
      phone: '',
    })
  }

  return (
    <div className="quote-print pb-16">
      <div className="quote-web">
        <section className="quote-hero relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
          <div className="section-container py-14 md:py-20">
            <p className="kicker">Estimate Tool</p>
            <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Generic Bag Quote Builder</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-700">
              Enter case quantities to build an estimated quote. Shipping is not calculated here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 print-hide">
              <button type="button" className="btn-secondary" onClick={() => window.print()}>
                Save as PDF
              </button>
              <button type="button" className="btn-secondary" onClick={resetQuote}>
                Reset Quote
              </button>
              <a
                href={mailtoHref}
                className={`btn-primary ${selectedLines.length === 0 || customMinErrors.length > 0 ? 'pointer-events-none opacity-50' : ''}`}
              >
                Email Quote Request
              </a>
            </div>
          </div>
        </section>

        <section className="section-container py-10">
          <div className="tonal-panel">
            <h2 className="text-2xl font-black text-slate-900">Quote Rules</h2>
            <p className="mt-3 text-slate-700">This is an estimate only and not an exact quote or final invoice.</p>
            <p className="mt-2 text-slate-700">Under 8 total cases: ships UPS Ground and freight is added to invoice.</p>
            <p className="mt-2 text-slate-700">8 or more total cases: Fuel Surcharge (FSC) only is applied.</p>
            <p className="mt-2 text-slate-700">FSC groups: Zone 2-3 = 5%, Zone 4-6 = 7.5%, Zone 7-8 = 10% of order total.</p>
            <p className="mt-2 text-slate-700">Large LTL orders use a flat FSC per pallet. We provide LTL pallet rates after review.</p>
            <p className="mt-2 text-slate-700">Custom bags require a minimum of 4 cases per selected bag type.</p>
          </div>
        </section>

        <section className="section-container pb-8 print-hide">
          <div className="tonal-panel">
            <h2 className="text-2xl font-black text-slate-900">Customer Details for PDF</h2>
            <p className="mt-2 text-slate-700">
              Add customer info so your saved PDF quote is complete and ready to send.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold text-slate-800">
                Customer Name
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => updateCustomer('name', e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-800">
                Company Name
                <input
                  type="text"
                  value={customer.company}
                  onChange={(e) => updateCustomer('company', e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-800">
                Email
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => updateCustomer('email', e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-800">
                Phone
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => updateCustomer('phone', e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          </div>
        </section>

        {customMinErrors.length > 0 && (
          <section className="section-container pb-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900">
              <p className="font-black">Custom minimum not met</p>
              <p className="mt-1 text-sm">
                Each selected custom bag line must be at least 4 cases. Please update quantities before emailing the quote.
              </p>
            </div>
          </section>
        )}

        <section className="section-container pb-8 print-hide">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-900 text-xs uppercase tracking-[0.08em] text-amber-100">
                <tr>
                  <th className="px-4 py-3">Category / Bag</th>
                  <th className="px-4 py-3">Qty / Case</th>
                  <th className="px-4 py-3">Price / Case</th>
                  <th className="px-4 py-3">Cases</th>
                  <th className="px-4 py-3">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((category) => (
                  <tr key={category.id} className="border-b border-slate-200/80 last:border-b-0">
                    <td className="px-4 py-4 align-top" colSpan={5}>
                      <p className="text-lg font-black text-slate-900">{category.title}</p>
                      <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full">
                          <tbody>
                            {category.variants.map((variant) => {
                              const cases = casesById[variant.id] || 0
                              return (
                                <tr key={variant.id} className="border-b border-slate-100 last:border-b-0">
                                  <td className="w-[42%] px-2 py-3 text-sm font-semibold text-slate-800">{variant.label}</td>
                                  <td className="w-[14%] px-2 py-3 text-sm text-slate-700">{variant.quantityPerCase}</td>
                                  <td className="w-[14%] px-2 py-3 text-sm text-slate-700">{money(variant.pricePerCase)}</td>
                                  <td className="w-[14%] px-2 py-3">
                                    <input
                                      type="number"
                                      min={0}
                                      step={1}
                                      value={cases === 0 ? '' : cases}
                                      onChange={(e) => updateCases(variant.id, e.target.value)}
                                      className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm font-semibold"
                                      aria-label={`Cases for ${variant.label}`}
                                    />
                                  </td>
                                  <td className="w-[16%] px-2 py-3 text-sm font-bold text-slate-900">
                                    {money(cases * variant.pricePerCase)}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-container">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
            <h2 className="heading-serif text-3xl font-black md:text-4xl">Quote Summary</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-300">Subtotal</p>
                <p className="mt-1 text-2xl font-black">{money(subtotal)}</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-300">Total Cases</p>
                <p className="mt-1 text-2xl font-black">{totalCases}</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-300">Shipping Status</p>
                <p className="mt-1 text-sm font-bold">{shippingMessage}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-300">
              This quote is an estimate only. Final totals and shipping are confirmed by our team after review.
            </p>
            <p className="mt-1 text-xs text-slate-400">Generated {generatedAt}</p>
          </div>
        </section>
      </div>

      <section className="quote-pdf-only">
        <div className="quote-pdf-sheet">
          <div className="quote-pdf-brandbar">
            <p className="quote-pdf-brand">BAG CO</p>
            <p className="quote-pdf-doclabel">Generic Bag Quote</p>
          </div>

          <div className="quote-pdf-header">
            <div>
              <h1>Quote Estimate</h1>
              <p className="quote-pdf-subtitle">Factory-direct paper bag pricing</p>
            </div>
            <div className="quote-pdf-meta">
              <p><strong>Quote ID:</strong> {quoteId || 'Pending'}</p>
              <p><strong>Date & Time:</strong> {generatedAt || 'Pending'}</p>
              <p><strong>Prepared By:</strong> Bag Co</p>
              <p><strong>Email:</strong> info@bagco.com</p>
              <p><strong>Phone:</strong> (252) 516-1944</p>
            </div>
          </div>

          <div className="quote-pdf-client">
            <div>
              <p className="quote-pdf-label">Customer Name</p>
              <p>{customer.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="quote-pdf-label">Company</p>
              <p>{customer.company || 'Not provided'}</p>
            </div>
            <div>
              <p className="quote-pdf-label">Email</p>
              <p>{customer.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="quote-pdf-label">Phone</p>
              <p>{customer.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="quote-pdf-summary">
            <div>
              <p className="quote-pdf-label">Line Items</p>
              <strong>{selectedLineCount}</strong>
            </div>
            <div>
              <p className="quote-pdf-label">Total Cases</p>
              <strong>{totalCases}</strong>
            </div>
            <div>
              <p className="quote-pdf-label">Subtotal</p>
              <strong>{money(subtotal)}</strong>
            </div>
          </div>

          <table className="quote-print-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Bag</th>
                <th>Qty / Case</th>
                <th>Cases</th>
                <th>Price / Case</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedLines.length === 0 ? (
                <tr>
                  <td colSpan={7}>No line items selected.</td>
                </tr>
              ) : (
                selectedLines.map((line, index) => (
                  <tr key={line.id}>
                    <td>{index + 1}</td>
                    <td>{line.categoryTitle}</td>
                    <td>{line.label}</td>
                    <td>{line.quantityPerCase}</td>
                    <td>{line.cases}</td>
                    <td>{money(line.pricePerCase)}</td>
                    <td>{money(line.lineTotal)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="quote-pdf-totalbar">
            <div className="quote-pdf-totalrows">
              <p>
                <span>Subtotal (No Shipping)</span>
                <strong>{money(subtotal)}</strong>
              </p>
              <p>
                <span>Total Cases</span>
                <strong>{totalCases}</strong>
              </p>
            </div>
            <div className="quote-pdf-shipping">
              <p className="quote-pdf-label">Shipping Status</p>
              <strong>{shippingMessage}</strong>
            </div>
          </div>

          <p className="quote-pdf-note">
            This is an estimated quote only and not a final invoice.
          </p>

          <div className="quote-pdf-notes">
            <p>Custom bags require a minimum of 4 cases per selected bag type.</p>
            <p>Under 8 total cases, orders ship UPS Ground and freight is added to invoice.</p>
            <p>At 8+ total cases, Fuel Surcharge (FSC) only applies: Zone 2-3 (5%), Zone 4-6 (7.5%), Zone 7-8 (10%).</p>
            <p>LTL orders use a flat FSC per pallet, confirmed after team review.</p>
            <p>Final totals and freight are confirmed after our team reviews the request.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
