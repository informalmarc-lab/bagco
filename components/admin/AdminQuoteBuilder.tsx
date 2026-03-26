'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type AdminQuotePayload, type AdminQuoteRecord, type AdminLineItem } from '@/lib/admin/types'

type AdminQuoteBuilderProps = {
  initialQuote: AdminQuoteRecord | null
  nextDocNumber: string
}

const defaultCardNotice =
  'All credit card transactions will incur a 3% surcharge that does not exceed our cost of acceptance. Late fees at the rate of 2% per month will be applied after 30 days from date of invoice.'

function createEmptyLineItem(): AdminLineItem {
  return {
    id: crypto.randomUUID(),
    qty: 1,
    item: '',
    sizeAndPaper: '',
    description: '',
    price: 0,
  }
}

function toPayload(initialQuote: AdminQuoteRecord | null, nextDocNumber: string): AdminQuotePayload {
  if (initialQuote) {
    return {
      id: initialQuote.id,
      docType: initialQuote.docType,
      docNumber: initialQuote.docNumber,
      date: initialQuote.date,
      validForDays: initialQuote.validForDays,
      customer: initialQuote.customer,
      lineItems: initialQuote.lineItems,
      includeSetupFee: initialQuote.includeSetupFee,
      freightCost: initialQuote.freightCost,
      terms: initialQuote.terms,
      internalNotes: initialQuote.internalNotes,
      status: initialQuote.status,
    }
  }

  return {
    docType: 'QUOTE',
    docNumber: nextDocNumber,
    date: new Date().toISOString().slice(0, 10),
    validForDays: '30 days',
    customer: {
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      billToAddress: '',
      shipToAddress: '',
      shipToSameAsBillTo: false,
      customerNumber: '',
      orderNumber: '',
    },
    lineItems: [createEmptyLineItem()],
    includeSetupFee: false,
    freightCost: 0,
    terms: {
      paymentTerms: 'Net 30 Days',
      customPaymentTerms: '',
      shippingNote: 'Stock bags ship same day. Custom printed bags ship in 3-4 weeks.',
      includeCardLateFeeNotice: true,
      cardLateFeeNoticeText: defaultCardNotice,
      includeVisaMastercardNotice: false,
    },
    internalNotes: '',
    status: 'Draft',
  }
}

function computeSubtotal(payload: AdminQuotePayload): number {
  return payload.lineItems.reduce((sum, line) => sum + line.qty * line.price, 0)
}

export default function AdminQuoteBuilder({ initialQuote, nextDocNumber }: AdminQuoteBuilderProps) {
  const router = useRouter()
  const [payload, setPayload] = useState<AdminQuotePayload>(() => toPayload(initialQuote, nextDocNumber))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const subtotal = useMemo(() => computeSubtotal(payload), [payload])
  const total = subtotal + payload.freightCost

  const setupFeeLine = useMemo(
    () =>
      ({
        id: 'setup-fee',
        qty: 1,
        item: 'SETUP',
        sizeAndPaper: 'N/A',
        description: 'New Customer Custom Artwork Setup Fee (One-Time)',
        price: 75,
        locked: true,
      }) as AdminLineItem,
    [],
  )

  const visibleLineItems = useMemo(() => {
    const base = payload.lineItems.filter((line) => line.id !== 'setup-fee')
    return payload.includeSetupFee ? [...base, setupFeeLine] : base
  }, [payload.includeSetupFee, payload.lineItems, setupFeeLine])

  const validate = (): string[] => {
    const errors: string[] = []
    if (!payload.customer.businessName.trim()) errors.push('Business Name is required.')
    if (!payload.customer.contactName.trim()) errors.push('Contact Name is required.')
    if (!payload.customer.email.trim()) errors.push('Email is required.')
    const editableItems = visibleLineItems.filter((line) => !line.locked)
    if (editableItems.length === 0) errors.push('At least one line item is required.')
    if (editableItems.some((line) => !line.description.trim())) errors.push('Every line item needs a description.')
    return errors
  }

  const updateLine = (id: string, changes: Partial<AdminLineItem>) => {
    setPayload((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((line) => (line.id === id ? { ...line, ...changes } : line)),
    }))
  }

  const addLineItem = () => {
    setPayload((prev) => ({ ...prev, lineItems: [...prev.lineItems.filter((line) => line.id !== 'setup-fee'), createEmptyLineItem()] }))
  }

  const removeLineItem = (id: string) => {
    setPayload((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((line) => line.id !== id && line.id !== 'setup-fee'),
    }))
  }

  const setShipToSame = (checked: boolean) => {
    setPayload((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        shipToSameAsBillTo: checked,
        shipToAddress: checked ? prev.customer.billToAddress : prev.customer.shipToAddress,
      },
    }))
  }

  const updateBillTo = (billToAddress: string) => {
    setPayload((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        billToAddress,
        shipToAddress: prev.customer.shipToSameAsBillTo ? billToAddress : prev.customer.shipToAddress,
      },
    }))
  }

  const save = async () => {
    const errors = validate()
    if (errors.length > 0) {
      setError(errors[0])
      return
    }

    const payloadToSave: AdminQuotePayload = {
      ...payload,
      lineItems: visibleLineItems,
      status: payload.status || 'Draft',
    }

    setSaving(true)
    setError('')
    const response = await fetch('/api/admin/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadToSave),
    })
    setSaving(false)
    if (!response.ok) {
      const data = (await response.json()) as { errors?: string[] }
      setError(data.errors?.[0] || 'Failed to save.')
      return
    }
    const data = (await response.json()) as { record: AdminQuoteRecord }
    router.replace(`/admin/quotes/new?id=${data.record.id}`)
    router.refresh()
  }

  const generatePdf = async (download: boolean) => {
    const errors = validate()
    if (errors.length > 0) {
      setError(errors[0])
      return
    }
    setError('')
    const response = await fetch('/api/admin/quotes/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, lineItems: visibleLineItems }),
    })
    if (!response.ok) {
      setError('Failed to generate PDF.')
      return
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    if (download) {
      const link = document.createElement('a')
      link.href = url
      link.download = `${payload.docNumber || 'document'}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6 pb-24">
      <header>
        <h1 className="text-3xl font-black text-[#1E4D2B]">Quote & Invoice Builder</h1>
        <p className="mt-2 text-sm text-[#5F4D33]">Build, preview, download, and save professional customer documents.</p>
      </header>

      <section className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
        <h2 className="text-xl font-black text-[#1E4D2B]">Customer Info</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Business Name (required)
            <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.businessName} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, businessName: e.target.value } }))} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Contact Name (required)
            <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.contactName} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, contactName: e.target.value } }))} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Email (required)
            <input type="email" className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.email} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, email: e.target.value } }))} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Phone (optional)
            <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.phone} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, phone: e.target.value } }))} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B] md:col-span-2">Bill To Address
            <textarea className="min-h-[86px] rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.billToAddress} onChange={(e) => updateBillTo(e.target.value)} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B] md:col-span-2">Ship To Address
            <textarea className="min-h-[86px] rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.shipToAddress} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, shipToAddress: e.target.value } }))} disabled={payload.customer.shipToSameAsBillTo} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D2B] md:col-span-2">
            <input type="checkbox" checked={payload.customer.shipToSameAsBillTo} onChange={(e) => setShipToSame(e.target.checked)} />
            Ship To same as Bill To
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Customer Number (optional)
            <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.customerNumber} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, customerNumber: e.target.value } }))} />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Your Order Number (optional)
            <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.customer.orderNumber} onChange={(e) => setPayload((p) => ({ ...p, customer: { ...p.customer, orderNumber: e.target.value } }))} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
        <h2 className="text-xl font-black text-[#1E4D2B]">Line Items</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#1E4D2B] text-white">
              <tr>
                <th className="px-2 py-2">QTY</th>
                <th className="px-2 py-2">ITEM</th>
                <th className="px-2 py-2">SIZE and PAPER</th>
                <th className="px-2 py-2">DESCRIPTION</th>
                <th className="px-2 py-2">PRICE</th>
                <th className="px-2 py-2">AMOUNT</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {visibleLineItems.map((line, index) => (
                <tr key={line.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                  <td className="px-2 py-2"><input type="number" min={1} disabled={line.locked} className="w-16 rounded border border-[#C4935A66] px-2 py-1" value={line.qty} onChange={(e) => updateLine(line.id, { qty: Number(e.target.value) || 1 })} /></td>
                  <td className="px-2 py-2"><input disabled={line.locked} className="w-28 rounded border border-[#C4935A66] px-2 py-1" value={line.item} onChange={(e) => updateLine(line.id, { item: e.target.value })} /></td>
                  <td className="px-2 py-2"><input disabled={line.locked} className="w-44 rounded border border-[#C4935A66] px-2 py-1" value={line.sizeAndPaper} onChange={(e) => updateLine(line.id, { sizeAndPaper: e.target.value })} /></td>
                  <td className="px-2 py-2"><input disabled={line.locked} className="w-72 rounded border border-[#C4935A66] px-2 py-1" value={line.description} onChange={(e) => updateLine(line.id, { description: e.target.value })} /></td>
                  <td className="px-2 py-2"><input type="number" step="0.01" min={0} disabled={line.locked} className="w-28 rounded border border-[#C4935A66] px-2 py-1" value={line.price} onChange={(e) => updateLine(line.id, { price: Number(e.target.value) || 0 })} /></td>
                  <td className="px-2 py-2 font-semibold">${(line.qty * line.price).toFixed(2)}</td>
                  <td className="px-2 py-2">{!line.locked && <button type="button" className="rounded border border-[#C0392B] px-2 py-1 text-xs font-semibold text-[#C0392B]" onClick={() => removeLineItem(line.id)}>Remove</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn-secondary mt-4" onClick={addLineItem}>+ Add Line Item</button>

        <label className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D2B]">
          <input type="checkbox" checked={payload.includeSetupFee} onChange={(e) => setPayload((p) => ({ ...p, includeSetupFee: e.target.checked }))} />
          New customer ordering custom print (+$75.00 one-time fee)
        </label>
      </section>

      <section className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
        <h2 className="text-xl font-black text-[#1E4D2B]">Totals</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="text-sm font-semibold text-[#5F4D33]">Freight Prepaid - add to invoice</div>
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">
            Cost of Freight
            <input type="number" step="0.01" min={0} className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.freightCost} onChange={(e) => setPayload((p) => ({ ...p, freightCost: Number(e.target.value) || 0 }))} />
          </label>
        </div>
        <div className="mt-4 grid gap-1 text-sm text-[#1A1A1A]">
          <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
          <p className="text-xl font-black text-[#1E4D2B]">TOTAL: ${total.toFixed(2)}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
        <h2 className="text-xl font-black text-[#1E4D2B]">Terms & Notices</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Payment Terms
            <select className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.terms.paymentTerms} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, paymentTerms: e.target.value as AdminQuotePayload['terms']['paymentTerms'] } }))}>
              <option>Net 30 Days</option>
              <option>Due on Receipt</option>
              <option>50% Deposit / 50% on Delivery</option>
              <option>Custom</option>
            </select>
          </label>
          {payload.terms.paymentTerms === 'Custom' && (
            <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B]">Custom Terms
              <input className="rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.terms.customPaymentTerms} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, customPaymentTerms: e.target.value } }))} />
            </label>
          )}
          <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B] md:col-span-2">Shipping Note
            <textarea className="min-h-[86px] rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.terms.shippingNote} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, shippingNote: e.target.value } }))} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D2B] md:col-span-2">
            <input type="checkbox" checked={payload.terms.includeCardLateFeeNotice} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, includeCardLateFeeNotice: e.target.checked } }))} />
            Include credit card / late fee notice on PDF
          </label>
          {payload.terms.includeCardLateFeeNotice && (
            <label className="grid gap-1 text-sm font-semibold text-[#1E4D2B] md:col-span-2">Notice Text
              <textarea className="min-h-[86px] rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.terms.cardLateFeeNoticeText} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, cardLateFeeNoticeText: e.target.value } }))} />
            </label>
          )}
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D2B] md:col-span-2">
            <input type="checkbox" checked={payload.terms.includeVisaMastercardNotice} onChange={(e) => setPayload((p) => ({ ...p, terms: { ...p.terms, includeVisaMastercardNotice: e.target.checked } }))} />
            Include &quot;Visa &amp; MasterCard Now Accepted&quot; on PDF
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
        <h2 className="text-xl font-black text-[#1E4D2B]">Internal Notes</h2>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#B5813A]">Internal use only - will not appear on PDF</p>
        <textarea className="mt-3 min-h-[100px] w-full rounded-lg border border-[#C4935A66] px-3 py-2" value={payload.internalNotes} onChange={(e) => setPayload((p) => ({ ...p, internalNotes: e.target.value }))} />
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#C4935A66] bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-[#1E4D2B] p-1">
            <button type="button" className={`rounded px-3 py-1 text-xs font-bold ${payload.docType === 'QUOTE' ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B]'}`} onClick={() => setPayload((p) => ({ ...p, docType: 'QUOTE' }))}>QUOTE</button>
            <button type="button" className={`rounded px-3 py-1 text-xs font-bold ${payload.docType === 'INVOICE' ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B]'}`} onClick={() => setPayload((p) => ({ ...p, docType: 'INVOICE' }))}>INVOICE</button>
          </div>

          <label className="text-xs font-semibold text-[#1E4D2B]">Document #
            <input className="ml-2 w-32 rounded border border-[#C4935A66] px-2 py-1 text-sm" value={payload.docNumber} onChange={(e) => setPayload((p) => ({ ...p, docNumber: e.target.value }))} />
          </label>
          <label className="text-xs font-semibold text-[#1E4D2B]">Date
            <input type="date" className="ml-2 rounded border border-[#C4935A66] px-2 py-1 text-sm" value={payload.date} onChange={(e) => setPayload((p) => ({ ...p, date: e.target.value }))} />
          </label>
          {payload.docType === 'QUOTE' && (
            <label className="text-xs font-semibold text-[#1E4D2B]">Valid For
              <select className="ml-2 rounded border border-[#C4935A66] px-2 py-1 text-sm" value={payload.validForDays} onChange={(e) => setPayload((p) => ({ ...p, validForDays: e.target.value as AdminQuotePayload['validForDays'] }))}>
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
              </select>
            </label>
          )}
          <button type="button" className="btn-secondary ml-auto" onClick={() => generatePdf(false)}>Preview PDF</button>
          <button type="button" className="btn-secondary" onClick={() => generatePdf(true)}>Download PDF</button>
          <button type="button" className="btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
        {error && <p className="mx-auto mt-2 w-full max-w-[1200px] text-sm font-semibold text-[#C0392B]">{error}</p>}
      </div>
    </div>
  )
}

