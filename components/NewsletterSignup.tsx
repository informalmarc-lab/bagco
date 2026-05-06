'use client'

import { FormEvent, useState } from 'react'

type NewsletterSignupProps = {
  heading: string
  subheading: string
  microcopy: string
  source: string
  compact?: boolean
}

export default function NewsletterSignup({
  heading,
  subheading,
  microcopy,
  source,
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter an email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setStatus('error')
        setMessage(payload?.error || 'Unable to subscribe right now. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Subscribed. You are on the list.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe right now. Please try again.')
    }
  }

  return (
    <div className="tonal-panel">
      <h2 className={`${compact ? 'text-xl md:text-2xl' : 'section-title'} font-black text-[#1E4D2B]`}>{heading}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5F4D33] md:text-base">{subheading}</p>

      <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="grid w-full gap-1 text-sm font-semibold text-[#5F4D33]">
          Email address
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-[#D8C5A7] bg-white px-3 py-2 text-sm text-[#1E4D2B]"
            required
          />
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap disabled:pointer-events-none disabled:opacity-70"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="mt-3 text-xs text-[#5F4D33]">{microcopy}</p>
      {message && (
        <p
          className={`mt-2 text-xs font-semibold ${status === 'success' ? 'text-[#1E4D2B]' : 'text-[#A44A3F]'}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  )
}

