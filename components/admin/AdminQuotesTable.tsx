'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type AdminQuoteRecord, type AdminQuoteStatus } from '@/lib/admin/types'

type AdminQuotesTableProps = {
  initialQuotes: AdminQuoteRecord[]
}

const statusOptions: AdminQuoteStatus[] = ['Draft', 'Sent', 'Accepted', 'Declined']

const statusClasses: Record<AdminQuoteStatus, string> = {
  Draft: 'bg-[#EEE7DC] text-[#5F4D33]',
  Sent: 'bg-[#B5813A22] text-[#8B5F22]',
  Accepted: 'bg-[#1E4D2B22] text-[#1E4D2B]',
  Declined: 'bg-[#C0392B22] text-[#C0392B]',
}

function fmtMoney(value: number): string {
  return `$${value.toFixed(2)}`
}

function quoteTotal(quote: AdminQuoteRecord): number {
  const subtotal = quote.lineItems.reduce((sum, line) => sum + line.qty * line.price, 0)
  return subtotal + quote.freightCost
}

export default function AdminQuotesTable({ initialQuotes }: AdminQuotesTableProps) {
  const router = useRouter()
  const [quotes, setQuotes] = useState(initialQuotes)
  const sorted = useMemo(
    () => [...quotes].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
    [quotes],
  )

  const updateStatus = async (id: string, status: AdminQuoteStatus) => {
    const response = await fetch(`/api/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) return
    setQuotes((prev) => prev.map((quote) => (quote.id === id ? { ...quote, status } : quote)))
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this record?')) return
    const response = await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' })
    if (!response.ok) return
    setQuotes((prev) => prev.filter((quote) => quote.id !== id))
  }

  const duplicate = async (id: string) => {
    const response = await fetch(`/api/admin/quotes/${id}/duplicate`, { method: 'POST' })
    if (!response.ok) return
    const data = (await response.json()) as { record?: AdminQuoteRecord }
    if (!data.record) return
    setQuotes((prev) => [data.record as AdminQuoteRecord, ...prev])
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#C4935A66] bg-white shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#1E4D2B] text-white">
          <tr>
            <th className="px-3 py-3">Doc #</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Customer Business Name</th>
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3">Total</th>
            <th className="px-3 py-3">Terms</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((quote, index) => (
            <tr
              key={quote.id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'} cursor-pointer hover:bg-[#F4E8D8]`}
              onClick={() => router.push(`/admin/quotes/new?id=${quote.id}`)}
            >
              <td className="px-3 py-3 font-semibold text-[#1E4D2B]">{quote.docNumber}</td>
              <td className="px-3 py-3">
                <span className="rounded-full bg-[#1E4D2B1A] px-2 py-1 text-xs font-black text-[#1E4D2B]">
                  {quote.docType}
                </span>
              </td>
              <td className="px-3 py-3">{quote.customer.businessName}</td>
              <td className="px-3 py-3">{quote.date}</td>
              <td className="px-3 py-3 font-semibold">{fmtMoney(quoteTotal(quote))}</td>
              <td className="px-3 py-3">
                {quote.terms.paymentTerms === 'Custom' ? quote.terms.customPaymentTerms || 'Custom' : quote.terms.paymentTerms}
              </td>
              <td className="px-3 py-3">
                <select
                  value={quote.status}
                  onChange={(event) => updateStatus(quote.id, event.target.value as AdminQuoteStatus)}
                  onClick={(event) => event.stopPropagation()}
                  className={`rounded-full px-2 py-1 text-xs font-bold ${statusClasses[quote.status]}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      router.push(`/admin/quotes/new?id=${quote.id}`)
                    }}
                    className="rounded-md border border-[#1E4D2B] px-2 py-1 text-xs font-semibold text-[#1E4D2B]"
                  >
                    View
                  </button>
                  <a
                    href={`/api/admin/quotes/${quote.id}/pdf?download=1`}
                    onClick={(event) => event.stopPropagation()}
                    className="rounded-md border border-[#1E4D2B] px-2 py-1 text-xs font-semibold text-[#1E4D2B]"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      duplicate(quote.id)
                    }}
                    className="rounded-md border border-[#B5813A] px-2 py-1 text-xs font-semibold text-[#8B5F22]"
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      remove(quote.id)
                    }}
                    className="rounded-md border border-[#C0392B] px-2 py-1 text-xs font-semibold text-[#C0392B]"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={8} className="px-3 py-8 text-center text-sm text-[#5F4D33]">
                No quotes saved yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

