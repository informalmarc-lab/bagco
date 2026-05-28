'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const CLAIMED_KEY = 'bagco_coupon_claimed'
const COUPON_DELAY_MS = 2 * 60 * 1000

type FormState = {
  name: string
  email: string
  phone: string
}

export default function CouponDropDown() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (pathname.startsWith('/makeyourquote') || pathname.startsWith('/generic-bag-quote')) {
      setOpen(false)
      return
    }
    if (window.localStorage.getItem(CLAIMED_KEY) === '1') return

    const timer = window.setTimeout(() => setOpen(true), COUPON_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [pathname])

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourcePath: window.location.pathname,
        }),
      })
      const json = await response.json().catch(() => null)
      if (!response.ok) throw new Error(json?.error || 'Could not send coupon request.')

      window.localStorage.setItem(CLAIMED_KEY, '1')
      setSent(true)
      window.setTimeout(() => setOpen(false), 2200)
    } catch (couponError) {
      setError(couponError instanceof Error ? couponError.message : 'Could not send coupon request.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#1A1A1A]/45 px-4 py-6">
      <div className="w-full max-w-[520px] rounded-lg border border-[#D8C5A7] bg-white p-5 shadow-[0_8px_24px_rgba(30,77,43,0.2)]">
        <div className="grid gap-3">
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#B5813A]"
                style={{ animationDelay: `${item * 140}ms` }}
              />
            ))}
          </div>
          <div>
            <p className="text-center text-2xl font-black leading-tight text-[#1E4D2B]">Get Employee Pricing</p>
            <p className="mt-2 text-center text-sm leading-6 text-[#5F4D33]">
              Enter your name, email, and phone number to unlock the employee price coupon.
            </p>
          </div>
        </div>

        {sent ? (
          <div className="mt-5 rounded-md border border-[#D8C5A7] bg-[#FAF6F0] p-4 text-center text-sm font-bold text-[#1E4D2B]">
            Employee pricing request sent. Our team will follow up shortly.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 grid gap-3">
            <div className="grid gap-3">
              <label className="grid gap-1 text-sm font-bold text-[#5F4D33]">
                Name
                <input
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  required
                  className="min-h-[44px] rounded-md border border-[#D8C5A7] px-3 text-base font-normal text-[#1A1A1A] outline-none focus:border-[#1E4D2B]"
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#5F4D33]">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  required
                  className="min-h-[44px] rounded-md border border-[#D8C5A7] px-3 text-base font-normal text-[#1A1A1A] outline-none focus:border-[#1E4D2B]"
                />
              </label>
              <label className="grid gap-1 text-sm font-bold text-[#5F4D33]">
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  required
                  className="min-h-[44px] rounded-md border border-[#D8C5A7] px-3 text-base font-normal text-[#1A1A1A] outline-none focus:border-[#1E4D2B]"
                />
              </label>
            </div>

            {error && (
              <p className="rounded-md border border-[#C0392B66] bg-[#C0392B12] p-2 text-sm font-bold text-[#C0392B]">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full animate-pulse disabled:pointer-events-none disabled:opacity-70">
              {submitting ? 'Sending' : 'Get Employee Pricing'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
