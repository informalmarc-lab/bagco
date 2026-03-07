'use client'

import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function QuickQuoteForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'Dispensary',
    quantity: '',
    message: '',
    website: '',
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('submitting')
    setError('')

    const details = [
      `Industry: ${form.industry}`,
      `Company: ${form.company || 'N/A'}`,
      `Estimated Volume: ${form.quantity || 'N/A'}`,
      `Notes: ${form.message || 'N/A'}`,
    ].join('\n')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'Homepage Quote Request',
          name: form.name,
          email: form.email,
          company: form.company,
          bagType: form.industry,
          quantity: form.quantity,
          message: details,
          website: form.website,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Could not send quote request.')
      }

      setState('success')
      setForm({
        name: '',
        email: '',
        company: '',
        industry: 'Dispensary',
        quantity: '',
        message: '',
        website: '',
      })
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Could not send quote request.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface-card rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl font-black text-[#1E4D2B]">Build a Quote</h3>
      <p className="mt-2 text-sm text-[#5F4D33]">
        Frictionless intake for retail, food service, pharmacy, and veterinary teams. We respond with a structured program recommendation.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm"
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm"
        />
        <input
          placeholder="Monthly Volume (cases)"
          value={form.quantity}
          onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm"
        />
        <select
          value={form.industry}
          onChange={(e) => setForm((prev) => ({ ...prev, industry: e.target.value }))}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm md:col-span-2"
        >
          <option>Dispensary</option>
          <option>Smoke Shop</option>
          <option>Pharmacy</option>
          <option>Veterinary Clinic</option>
          <option>Retail Store</option>
          <option>Retail Boutique</option>
          <option>Food & Beverage</option>
          <option>Multi-Location Retail</option>
        </select>
        <textarea
          placeholder="Packaging goals or requirements"
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="rounded-md border border-[#C4935A66] px-3 py-2 text-sm md:col-span-2"
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary w-full justify-center sm:w-auto" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Submitting...' : 'Build a Quote'}
        </button>
        {state === 'success' && <p className="text-sm font-semibold text-emerald-700">Quote request sent.</p>}
        {state === 'error' && <p className="text-sm font-semibold text-red-700">{error}</p>}
      </div>
    </form>
  )
}


