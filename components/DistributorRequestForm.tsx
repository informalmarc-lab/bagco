'use client'

import { FormEvent, useMemo, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'fallback'

const VOLUME_OPTIONS = [
  'Less than 5 cases',
  '5-20 cases',
  '20-50 cases',
  '50+ cases',
  'Pallet quantities',
] as const

const PRODUCT_OPTIONS = [
  'white paper bags',
  'kraft paper bags',
  'custom printed bags',
  'plastic bags',
  'dispensary bags',
  'vet bags',
] as const

type DistributorFormState = {
  name: string
  company: string
  email: string
  phone: string
  monthlyVolume: (typeof VOLUME_OPTIONS)[number]
  interestedProducts: string[]
  message: string
  website: string
}

const initialForm: DistributorFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  monthlyVolume: VOLUME_OPTIONS[0],
  interestedProducts: [] as string[],
  message: '',
  website: '',
}

function buildMailto(form: typeof initialForm): string {
  const productList = form.interestedProducts.length > 0 ? form.interestedProducts.join(', ') : 'Not specified'
  const body = [
    'Distributor Program Request',
    '',
    `Name: ${form.name || 'N/A'}`,
    `Company: ${form.company || 'N/A'}`,
    `Email: ${form.email || 'N/A'}`,
    `Phone: ${form.phone || 'N/A'}`,
    `Estimated Monthly Volume: ${form.monthlyVolume || 'N/A'}`,
    `Interested Products: ${productList}`,
    '',
    'Message:',
    form.message || 'N/A',
  ].join('\n')

  return `mailto:info@bagsupplyco.com?subject=${encodeURIComponent('Distributor Pricing Sheet Request')}&body=${encodeURIComponent(body)}`
}

export default function DistributorRequestForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fallbackHref, setFallbackHref] = useState('')

  const selectedProductsLabel = useMemo(
    () =>
      form.interestedProducts.length > 0
        ? form.interestedProducts.join(', ')
        : 'Choose any that apply',
    [form.interestedProducts],
  )

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      setStatus('error')
      setErrorMessage('Please complete Name, Company, and Email.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    setFallbackHref('')

    try {
      const response = await fetch('/api/distributors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/distributors',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setStatus('success')
        setForm(initialForm)
        return
      }

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; fallbackMailto?: string }
        | null

      if (payload?.fallbackMailto) {
        setFallbackHref(payload.fallbackMailto)
        setStatus('fallback')
        if (typeof window !== 'undefined') {
          window.location.href = payload.fallbackMailto
        }
        return
      }

      setStatus('error')
      setErrorMessage(payload?.error || 'We could not submit your request online.')
    } catch {
      const fallbackMailto = buildMailto(form)
      setFallbackHref(fallbackMailto)
      setStatus('fallback')
      if (typeof window !== 'undefined') {
        window.location.href = fallbackMailto
      }
    }
  }

  if (status === 'success') {
    return (
      <section className="tonal-panel text-center">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">Request Received</p>
        <h3 className="mt-4 text-3xl font-black text-[#1E4D2B]">Your pricing request was sent.</h3>
        <p className="mt-3 text-sm leading-7 text-[#5F4D33]">
          Thanks for reaching out. We will review your distributor requirements and follow up with the right
          pricing sheet and next steps.
        </p>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => {
            setStatus('idle')
            setForm(initialForm)
          }}
        >
          Submit Another Request
        </button>
      </section>
    )
  }

  if (status === 'fallback') {
    return (
      <section className="tonal-panel">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">Email Fallback</p>
        <h3 className="mt-4 text-3xl font-black text-[#1E4D2B]">We could not submit online.</h3>
        <p className="mt-3 text-sm leading-7 text-[#5F4D33]">
          Your email app should open with a prefilled request to
          {' '}
          <span className="font-semibold text-[#1E4D2B]">info@bagsupplyco.com</span>
          . If it does not, use the button below.
        </p>
        <a href={fallbackHref || buildMailto(form)} className="btn-primary mt-6">
          Email info@bagsupplyco.com
        </a>
      </section>
    )
  }

  return (
    <section className="tonal-panel">
      <h3 className="text-2xl font-black text-[#1E4D2B]">Request a Pricing Sheet</h3>
      <p className="mt-2 text-sm leading-7 text-[#5F4D33]">
        Share your company details and the product categories you want to source.
      </p>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Name *
            <input
              required
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Company *
            <input
              required
              type="text"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Email *
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Phone
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
            />
          </label>
        </div>

        <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
          Estimated monthly volume
          <select
            value={form.monthlyVolume}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                monthlyVolume: event.target.value as DistributorFormState['monthlyVolume'],
              }))
            }
            className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
          >
            {VOLUME_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="grid gap-3 text-sm font-semibold text-[#5F4D33]">
          <legend>What products are you interested in?</legend>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#B5813A]">{selectedProductsLabel}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRODUCT_OPTIONS.map((option) => {
              const checked = form.interestedProducts.includes(option)
              return (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-2xl border border-[#C4935A66] bg-white px-4 py-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      setForm((prev) => ({
                        ...prev,
                        interestedProducts: event.target.checked
                          ? [...prev.interestedProducts, option]
                          : prev.interestedProducts.filter((item) => item !== option),
                      }))
                    }}
                  />
                  <span className="capitalize">{option}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
          Message
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="rounded-md border border-[#C4935A66] bg-white px-3 py-2"
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

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </span>
          ) : (
            'Request a Pricing Sheet'
          )}
        </button>

        {status === 'error' && (
          <p className="text-sm font-semibold text-red-700" role="status" aria-live="polite">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  )
}
