'use client'

import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  bagType: '',
  quantity: '',
  message: '',
  website: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          submissionType: 'Contact Form',
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to submit the form.')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <section className="tonal-panel">
      <h2 className="text-2xl font-black text-[#1E4D2B]">Contact Us Form</h2>
      <p className="mt-2 text-sm text-[#5F4D33]">
        Send your request here and our team will follow up with pricing and lead times.
      </p>

      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Name *
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Email *
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Phone
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Company
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Bag Type
            <input
              type="text"
              placeholder="Pharmacy, Veterinary, Custom, etc."
              value={form.bagType}
              onChange={(e) => setForm((prev) => ({ ...prev, bagType: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Quantity
            <input
              type="text"
              value={form.quantity}
              onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
          Message *
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className="rounded-md border border-[#C4935A66] px-3 py-2"
          />
        </label>

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Request'}
          </button>
          {status === 'success' && (
            <p className="text-sm font-semibold text-emerald-700">Thanks. Your message was sent.</p>
          )}
          {status === 'error' && (
            <p className="text-sm font-semibold text-red-700">{errorMessage || 'Could not send request.'}</p>
          )}
        </div>
      </form>
    </section>
  )
}

