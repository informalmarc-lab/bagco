'use client'

import { useState } from 'react'
import { states } from '@/lib/products'

export default function ContactForm() {
  const [form, setForm] = useState({
    dispensaryName: '',
    name: '',
    email: '',
    phone: '',
    state: 'CA',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', contact: form }),
    })
    setStatus(response.ok ? 'sent' : 'error')
  }

  return (
    <form className="card p-5 md:p-6" onSubmit={submit}>
      <h1 className="text-2xl font-black text-leaf">Contact Bud Bags</h1>
      <p className="mt-2 text-sm leading-6 text-mute">
        Tell us what your dispensary needs at the counter right now: stock bags, custom print, or both. We will follow up within 24 hours.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Dispensary name" value={form.dispensaryName} onChange={(value) => setForm({ ...form, dispensaryName: value })} />
        <Field label="Your name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <label className="field-label">
          State
          <select className="field-input" value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })}>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field-label mt-4">
        What does your store need?
        <textarea
          className="field-input min-h-32"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
      </label>
      <button className="btn-primary mt-5" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'sent' ? <p className="mt-3 text-sm font-bold text-leaf">Message sent.</p> : null}
      {status === 'error' ? <p className="mt-3 text-sm font-bold text-red-700">Message could not be sent. Please call or text.</p> : null}
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="field-label">
      {label}
      <input required className="field-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
