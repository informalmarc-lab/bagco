'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const INDUSTRY_OPTIONS = [
  'Pharmacy',
  'Dispensary',
  'Veterinary',
  'Smoke Shop',
  'Distributor',
  'Other',
] as const

const SHIPPING_OPTIONS = ['Standard', 'Drop Ship', 'Blind Ship', 'Not Sure'] as const

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  bagType: '',
  quantity: '',
  industry: 'Pharmacy',
  shippingPreference: 'Standard',
  existingCustomer: 'No',
  message: '',
  website: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage('Please complete Name, Email, and Message.')
      return
    }

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
          submitted_at: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to submit the form.')
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(
        'Something went wrong sending your request. Please try again or text us at (704) 862-9256.',
      )
    }
  }

  if (status === 'success') {
    return (
      <section className="tonal-panel text-center">
        <p className="text-5xl">{'\u2705'}</p>
        <h2 className="mt-4 font-serif text-3xl text-brand-600">Message sent. We&apos;ll be in touch soon.</h2>
        <p className="mt-3 text-sm text-muted">
          Thanks for reaching out. We&apos;ll review your details and follow up shortly. You can also text us directly at
          {' '}
          (704) 862-9256 for a faster response.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back to Home
        </Link>
      </section>
    )
  }

  return (
    <section className="tonal-panel">
      <h2 className="font-serif text-2xl text-brand-600">Contact Us</h2>
      <p className="mt-2 text-sm text-muted">
        Tell us your requirements and we&apos;ll respond with a structured recommendation.
      </p>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Full Name *
            <input
              required
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Email Address *
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Phone Number
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Company Name
            <input
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Industry
            <select
              value={form.industry}
              onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Shipping Preference
            <select
              value={form.shippingPreference}
              onChange={(event) => setForm((prev) => ({ ...prev, shippingPreference: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            >
              {SHIPPING_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Bag Type
            <input
              type="text"
              placeholder="Pharmacy, Veterinary, Custom, etc."
              value={form.bagType}
              onChange={(event) => setForm((prev) => ({ ...prev, bagType: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-muted">
            Quantity
            <input
              type="text"
              value={form.quantity}
              onChange={(event) => setForm((prev) => ({ ...prev, quantity: event.target.value }))}
              className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
            />
          </label>
        </div>

        <fieldset className="grid gap-2 text-sm font-semibold text-muted">
          <legend className="text-sm font-semibold text-muted">Existing customer?</legend>
          <div className="flex flex-wrap gap-4">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="existingCustomer"
                  value={option}
                  checked={form.existingCustomer === option}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, existingCustomer: event.target.value }))
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-1 text-sm font-semibold text-muted">
          Message *
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="rounded-xl border border-kraft-400/30 px-3.5 py-2.5"
          />
        </label>

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
          className="hidden"
          aria-hidden="true"
        />

        <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-70">
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        {status === 'error' && (
          <p className="text-sm font-semibold text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  )
}

