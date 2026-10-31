'use client'

import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const SAMPLE_SIZES = [
  '#21 (3½×1½×10")',
  '#23 (5×2×10")',
  '#25 (6×3½×11")',
  '#26 (6½×4×13½")',
  '#28 (8×5×16½")',
] as const

const initialForm = {
  name: '',
  dispensary: '',
  street: '',
  city: '',
  state: 'CO',
  zip: '',
  phone: '',
  email: '',
  notes: '',
  website: '',
}

type FormKey = keyof typeof initialForm

const inputClass = 'min-h-12 w-full rounded-xl border border-kraft-400/30 bg-white px-3.5 py-3 text-base font-normal'
const labelClass = 'grid gap-1.5 text-base font-semibold text-muted'

export default function SampleRequestForm() {
  const [form, setForm] = useState(initialForm)
  const [sizes, setSizes] = useState<string[]>([])
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const update = (key: FormKey) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const toggleSize = (size: string) =>
    setSizes((prev) => (prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return
    if (!form.phone.trim() && !form.email.trim()) {
      setStatus('error')
      setErrorMessage('Please give us a phone number or email so we can reach you.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sizes,
          source: new URLSearchParams(window.location.search).get('src') || 'direct',
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        if (response.status === 400 && payload?.error) {
          setStatus('error')
          setErrorMessage(payload.error)
          return
        }
        throw new Error('Failed to submit the form.')
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong sending your request. Please text us at 704-862-9256.')
    }
  }

  if (status === 'success') {
    return (
      <section className="tonal-panel text-center" role="status">
        <h2 className="font-serif text-2xl text-brand-600 md:text-3xl">Thank you!</h2>
        <p className="mt-3 text-base text-muted">
          Got it — Marc will reach out to confirm and get your samples in the mail.
        </p>
      </section>
    )
  }

  return (
    <section className="tonal-panel">
      <form onSubmit={submit} className="grid gap-5">
        <label className={labelClass}>
          Your name *
          <input required type="text" autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} />
        </label>
        <label className={labelClass}>
          Dispensary *
          <input required type="text" autoComplete="organization" value={form.dispensary} onChange={update('dispensary')} className={inputClass} />
        </label>
        <label className={labelClass}>
          Street address *
          <input required type="text" autoComplete="street-address" value={form.street} onChange={update('street')} className={inputClass} />
        </label>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-[1fr_6rem_8rem]">
          <label className={`${labelClass} col-span-2 sm:col-span-1`}>
            City *
            <input required type="text" autoComplete="address-level2" value={form.city} onChange={update('city')} className={inputClass} />
          </label>
          <label className={labelClass}>
            State *
            <input
              required
              type="text"
              maxLength={2}
              autoComplete="address-level1"
              value={form.state}
              onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value.toUpperCase() }))}
              className={`${inputClass} uppercase`}
            />
          </label>
          <label className={labelClass}>
            ZIP *
            <input required type="text" inputMode="numeric" autoComplete="postal-code" value={form.zip} onChange={update('zip')} className={inputClass} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Phone
            <input type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={inputClass} />
          </label>
          <label className={labelClass}>
            Email
            <input type="email" autoComplete="email" value={form.email} onChange={update('email')} className={inputClass} />
          </label>
        </div>
        <p className="-mt-2 text-sm text-muted">Phone or email required.</p>

        <fieldset className="grid gap-2">
          <legend className="mb-2 text-base font-semibold text-muted">Which sizes would you like?</legend>
          {SAMPLE_SIZES.map((size) => (
            <label
              key={size}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-kraft-400/30 bg-white px-4 py-3 text-base"
            >
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={() => toggleSize(size)}
                className="h-5 w-5 shrink-0"
              />
              {size}
            </label>
          ))}
        </fieldset>

        <label className={labelClass}>
          Notes
          <textarea rows={4} value={form.notes} onChange={update('notes')} className={inputClass} />
        </label>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update('website')}
          className="hidden"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary min-h-12 w-full justify-center text-base disabled:pointer-events-none disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending...' : 'Send me samples'}
        </button>

        {status === 'error' && (
          <p className="text-base font-semibold text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  )
}
