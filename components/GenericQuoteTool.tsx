'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  INDUSTRY_LABELS,
  INDUSTRY_ORDER,
  getAllCatalogProducts,
  money,
  type CatalogIndustryKey,
} from '@/lib/catalogProducts'

type QuoteLine = {
  slug: string
  cases: number
}

type CustomerInfo = {
  name: string
  company: string
  email: string
  phone: string
}

type ShareState = {
  selectedIndustry: CatalogIndustryKey | ''
  selectedBagType: string
  selectedProductSlug: string
  lines: QuoteLine[]
  customer: CustomerInfo
}

const LEAD_TIME_MESSAGE = 'Stock: ships in 3-5 days | Custom: 3-4 weeks'

function parseIndustryValue(value: string): CatalogIndustryKey | '' {
  return INDUSTRY_ORDER.includes(value as CatalogIndustryKey) ? (value as CatalogIndustryKey) : ''
}

function encodeShareState(payload: ShareState): string {
  const json = JSON.stringify(payload)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  for (const value of bytes) {
    binary += String.fromCharCode(value)
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function decodeShareState(value: string): ShareState | null {
  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4 || 4)) % 4)
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    const json = new TextDecoder().decode(bytes)
    const parsed = JSON.parse(json)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as ShareState
  } catch {
    return null
  }
}

export default function GenericQuoteTool() {
  const products = useMemo(() => getAllCatalogProducts(), [])

  const [selectedIndustry, setSelectedIndustry] = useState<CatalogIndustryKey | ''>('')
  const [selectedBagType, setSelectedBagType] = useState('')
  const [selectedProductSlug, setSelectedProductSlug] = useState('')
  const [casesInput, setCasesInput] = useState('1')
  const [lines, setLines] = useState<QuoteLine[]>([])
  const [generatedAt, setGeneratedAt] = useState('')
  const [quoteId, setQuoteId] = useState('')
  const [copied, setCopied] = useState(false)

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString())
    setQuoteId(`BAGCO-${Date.now().toString().slice(-8)}`)

    const params = new URLSearchParams(window.location.search)
    const shareToken = params.get('share')
    const skuParam = params.get('sku')

    if (shareToken) {
      const restored = decodeShareState(shareToken)
      if (restored) {
        setSelectedIndustry(restored.selectedIndustry)
        setSelectedBagType(restored.selectedBagType)
        setSelectedProductSlug(restored.selectedProductSlug)
        setLines(restored.lines || [])
        setCustomer(restored.customer || { name: '', company: '', email: '', phone: '' })
        return
      }
    }

    if (skuParam) {
      const bySku = products.find((product) => product.sku === skuParam)
      if (bySku) {
        setSelectedIndustry(bySku.industry)
        setSelectedBagType(bySku.bagType)
        setSelectedProductSlug(bySku.slug)
      }
    }
  }, [products])

  const industryProducts = useMemo(() => {
    if (!selectedIndustry) return []
    return products.filter((product) => product.industry === selectedIndustry)
  }, [products, selectedIndustry])

  const bagTypeOptions = useMemo(() => {
    return Array.from(new Set(industryProducts.map((product) => product.bagType))).sort((a, b) =>
      a.localeCompare(b),
    )
  }, [industryProducts])

  const bagTypeProducts = useMemo(() => {
    if (!selectedBagType) return industryProducts
    return industryProducts.filter((product) => product.bagType === selectedBagType)
  }, [industryProducts, selectedBagType])

  const previewProduct = useMemo(() => {
    if (!selectedIndustry || !selectedBagType) return null
    if (selectedProductSlug) {
      return bagTypeProducts.find((product) => product.slug === selectedProductSlug) || bagTypeProducts[0] || null
    }
    return bagTypeProducts[0] || null
  }, [bagTypeProducts, selectedBagType, selectedIndustry, selectedProductSlug])

  const quoteLines = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find((item) => item.slug === line.slug)
        if (!product) return null
        return {
          ...line,
          product,
          lineTotal: line.cases * product.startingPrice,
        }
      })
      .filter((line): line is { slug: string; cases: number; product: (typeof products)[number]; lineTotal: number } => Boolean(line))
  }, [lines, products])

  const totalCases = quoteLines.reduce((sum, line) => sum + line.cases, 0)
  const subtotal = quoteLines.reduce((sum, line) => sum + line.lineTotal, 0)
  const shippingMessage =
    totalCases >= 8
      ? '8+ cases: Fuel Surcharge only applies based on UPS zone.'
      : 'Under 8 cases: ships UPS Ground and freight is added to invoice.'

  const shareState: ShareState = {
    selectedIndustry,
    selectedBagType,
    selectedProductSlug,
    lines,
    customer,
  }

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const token = encodeShareState(shareState)
    return `${window.location.origin}${window.location.pathname}?share=${token}`
  }, [shareState])

  const quoteBody = useMemo(() => {
    if (quoteLines.length === 0) return ''

    const lineText = quoteLines.map((line) => {
      return `${line.product.name} | SKU ${line.product.sku} | Cases: ${line.cases} | Price/Case: ${money(
        line.product.startingPrice,
      )} | Line Total: ${money(line.lineTotal)} | Lead Time: ${
        line.product.availability === 'stock' ? '3-5 days' : '3-4 weeks'
      }`
    })

    return [
      'Bag Supply Co Quote Request',
      '',
      `Quote ID: ${quoteId || 'Pending'}`,
      `Generated: ${generatedAt || 'Pending'}`,
      '',
      `Name: ${customer.name || 'N/A'}`,
      `Company: ${customer.company || 'N/A'}`,
      `Email: ${customer.email || 'N/A'}`,
      `Phone: ${customer.phone || 'N/A'}`,
      '',
      ...lineText,
      '',
      `Total Cases: ${totalCases}`,
      `Subtotal (no shipping): ${money(subtotal)}`,
      `Shipping: ${shippingMessage}`,
      `Lead Time: ${LEAD_TIME_MESSAGE}`,
      '',
      'Note: This is an estimate and not a final invoice.',
    ].join('\n')
  }, [customer, generatedAt, quoteId, quoteLines, shippingMessage, subtotal, totalCases])

  const mailtoHref =
    quoteLines.length > 0
      ? `mailto:info@bagco.com?subject=${encodeURIComponent('Bag Quote Request')}&body=${encodeURIComponent(quoteBody)}`
      : '#'

  const addLine = () => {
    if (!previewProduct) return
    const cases = Number.parseInt(casesInput, 10)
    if (!Number.isFinite(cases) || cases <= 0) return

    setLines((prev) => {
      const existing = prev.find((line) => line.slug === previewProduct.slug)
      if (existing) {
        return prev.map((line) =>
          line.slug === previewProduct.slug ? { ...line, cases: line.cases + cases } : line,
        )
      }
      return [...prev, { slug: previewProduct.slug, cases }]
    })
    setCasesInput('1')
  }

  const updateLineCases = (slug: string, value: string) => {
    const numeric = Number.parseInt(value, 10)
    const safe = Number.isFinite(numeric) && numeric > 0 ? numeric : 1
    setLines((prev) => prev.map((line) => (line.slug === slug ? { ...line, cases: safe } : line)))
  }

  const removeLine = (slug: string) => {
    setLines((prev) => prev.filter((line) => line.slug !== slug))
  }

  const copyShareLink = async () => {
    if (!shareLink) return
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="pb-16">
      <section className="quote-hero relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Estimate Tool</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-[#1E4D2B] md:text-6xl">Generic Bag Quote Builder</h1>
          <p className="mt-4 max-w-3xl text-lg text-[#5F4D33]">
            Select industry and bag type, preview the product, then add case quantities to build a structured quote.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#5F4D33]">{LEAD_TIME_MESSAGE}</p>
          <div className="mt-6 flex flex-wrap gap-3 print-hide">
            <button type="button" className="btn-secondary" onClick={() => window.print()}>
              Save as PDF
            </button>
            <a href={mailtoHref} className={`btn-primary ${quoteLines.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
              Save & Share Quote (Email)
            </a>
            <button type="button" className="btn-secondary" onClick={copyShareLink}>
              {copied ? 'Share Link Copied' : 'Save & Share Quote (Link)'}
            </button>
          </div>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="tonal-panel">
          <h2 className="text-2xl font-black text-[#1E4D2B]">Quote Builder</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Industry
              <select
                value={selectedIndustry}
                onChange={(event) => {
                  const nextIndustry = parseIndustryValue(event.target.value)
                  setSelectedIndustry(nextIndustry)
                  setSelectedBagType('')
                  setSelectedProductSlug('')
                }}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="">Select industry</option>
                {INDUSTRY_ORDER.map((industry) => (
                  <option key={industry} value={industry}>
                    {INDUSTRY_LABELS[industry]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Bag Type
              <select
                value={selectedBagType}
                onChange={(event) => {
                  setSelectedBagType(event.target.value)
                  setSelectedProductSlug('')
                }}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
                disabled={!selectedIndustry}
              >
                <option value="">Select bag type</option>
                {bagTypeOptions.map((bagType) => (
                  <option key={bagType} value={bagType}>
                    {bagType}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Product
              <select
                value={selectedProductSlug}
                onChange={(event) => setSelectedProductSlug(event.target.value)}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
                disabled={!selectedBagType}
              >
                <option value="">Select product</option>
                {bagTypeProducts.map((product) => (
                  <option key={product.slug} value={product.slug}>
                    {product.name} ({product.sku})
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Cases
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={casesInput}
                  onChange={(event) => setCasesInput(event.target.value)}
                  className="w-full rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
                />
                <button type="button" className="btn-primary whitespace-nowrap" onClick={addLine} disabled={!previewProduct}>
                  Add
                </button>
              </div>
            </label>
          </div>

          {previewProduct && (
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]">
                <Image src={previewProduct.image} alt={previewProduct.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <div className="surface-card rounded-2xl p-4">
                <h3 className="text-xl font-black text-[#1E4D2B]">{previewProduct.name}</h3>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">SKU {previewProduct.sku}</p>
                <p className="mt-3 text-sm text-[#5F4D33]">
                  <span className="font-semibold text-[#1E4D2B]">Sizes:</span> {previewProduct.sizeOptions.join(', ')}
                </p>
                <p className="mt-1 text-sm text-[#5F4D33]">
                  <span className="font-semibold text-[#1E4D2B]">Case Count:</span> {previewProduct.caseCount}
                </p>
                <p className="mt-1 text-sm text-[#5F4D33]">
                  <span className="font-semibold text-[#1E4D2B]">From:</span> {money(previewProduct.startingPrice)}/case
                </p>
                <p className="mt-3 text-sm font-semibold text-[#5F4D33]">
                  Lead time: {previewProduct.availability === 'stock' ? 'Stock ships in 3-5 days' : 'Custom runs 3-4 weeks'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-container pb-8">
        <div className="tonal-panel">
          <h2 className="text-2xl font-black text-[#1E4D2B]">Quote Lines</h2>
          {quoteLines.length === 0 ? (
            <p className="mt-3 text-sm text-[#5F4D33]">No lines added yet.</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">
                    <th className="px-2 py-1">Product</th>
                    <th className="px-2 py-1">Price/Case</th>
                    <th className="px-2 py-1">Cases</th>
                    <th className="px-2 py-1">Line Total</th>
                    <th className="px-2 py-1">Lead Time</th>
                    <th className="px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteLines.map((line) => (
                    <tr key={line.slug} className="surface-card text-sm text-[#5F4D33]">
                      <td className="rounded-l-xl px-2 py-2">
                        <p className="font-semibold text-[#1E4D2B]">{line.product.name}</p>
                        <p className="text-xs text-[#7A6548]">SKU {line.product.sku}</p>
                      </td>
                      <td className="px-2 py-2">{money(line.product.startingPrice)}</td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min={1}
                          value={line.cases}
                          onChange={(event) => updateLineCases(line.slug, event.target.value)}
                          className="w-24 rounded-lg border border-[#C4935A66] px-2 py-1"
                        />
                      </td>
                      <td className="px-2 py-2 font-semibold text-[#1E4D2B]">{money(line.lineTotal)}</td>
                      <td className="px-2 py-2">
                        {line.product.availability === 'stock' ? '3-5 days' : '3-4 weeks'}
                      </td>
                      <td className="rounded-r-xl px-2 py-2">
                        <button type="button" className="rounded-lg border border-[#C4935A66] px-2 py-1 text-xs font-semibold" onClick={() => removeLine(line.slug)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">Total Cases</p>
              <p className="mt-2 text-2xl font-black text-[#1E4D2B]">{totalCases}</p>
            </div>
            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">Subtotal</p>
              <p className="mt-2 text-2xl font-black text-[#1E4D2B]">{money(subtotal)}</p>
            </div>
            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">Shipping Rule</p>
              <p className="mt-2 text-sm font-semibold text-[#5F4D33]">{shippingMessage}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Customer Name
              <input
                type="text"
                value={customer.name}
                onChange={(event) => setCustomer((prev) => ({ ...prev, name: event.target.value }))}
                className="rounded-lg border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Company
              <input
                type="text"
                value={customer.company}
                onChange={(event) => setCustomer((prev) => ({ ...prev, company: event.target.value }))}
                className="rounded-lg border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Email
              <input
                type="email"
                value={customer.email}
                onChange={(event) => setCustomer((prev) => ({ ...prev, email: event.target.value }))}
                className="rounded-lg border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Phone
              <input
                type="tel"
                value={customer.phone}
                onChange={(event) => setCustomer((prev) => ({ ...prev, phone: event.target.value }))}
                className="rounded-lg border border-[#C4935A66] px-3 py-2"
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}

