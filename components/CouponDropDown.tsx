'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const CLAIMED_KEY = 'bagco_coupon_claimed'
const COUPON_DELAY_MS = 2 * 60 * 1000
const POPUP_OPEN_TIMEOUT_MS = 1200

type FormState = {
  name: string
  email: string
  phone: string
}

export default function CouponDropDown() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [opening, setOpening] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' })
  const [error, setError] = useState('')
  const [openError, setOpenError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const autoOpenTimerRef = useRef<number | null>(null)
  const openTimeoutRef = useRef<number | null>(null)

  const isSuppressedPath = pathname.startsWith('/makeyourquote') || pathname.startsWith('/generic-bag-quote')
  const isPricingPath =
    pathname.startsWith('/catalog') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/custom-printing') ||
    pathname.startsWith('/custom-pharmacy-paper-bags') ||
    pathname.startsWith('/dispensaries') ||
    pathname.startsWith('/dispensary-bags') ||
    pathname.startsWith('/pharmacy-bags') ||
    pathname.startsWith('/veterinary-bags') ||
    pathname.startsWith('/smoke-shop-bags')

  const hasClaimed = useCallback(() => {
    try {
      return window.localStorage.getItem(CLAIMED_KEY) === '1'
    } catch {
      return false
    }
  }, [])

  const clearOpenTimeout = useCallback(() => {
    if (openTimeoutRef.current) {
      window.clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
  }, [])

  const openCoupon = useCallback(() => {
    if (open || opening || hasClaimed()) return

    clearOpenTimeout()
    setOpenError('')
    setOpening(true)
    setOpen(true)

    openTimeoutRef.current = window.setTimeout(() => {
      if (!dialogRef.current) {
        setOpen(false)
        setOpenError('Employee pricing did not open. Please try again.')
      }
      setOpening(false)
      openTimeoutRef.current = null
    }, POPUP_OPEN_TIMEOUT_MS)
  }, [clearOpenTimeout, hasClaimed, open, opening])

  useEffect(() => {
    if (isSuppressedPath) {
      setOpen(false)
      setOpening(false)
      return
    }
    if (hasClaimed()) return

    if (autoOpenTimerRef.current) {
      window.clearTimeout(autoOpenTimerRef.current)
      autoOpenTimerRef.current = null
    }

    autoOpenTimerRef.current = window.setTimeout(openCoupon, COUPON_DELAY_MS)

    return () => {
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current)
        autoOpenTimerRef.current = null
      }
    }
  }, [hasClaimed, isSuppressedPath, openCoupon, pathname])

  useEffect(() => {
    if (!open) return

    const frame = window.requestAnimationFrame(() => {
      if (dialogRef.current) {
        clearOpenTimeout()
        setOpening(false)
        setOpenError('')
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [clearOpenTimeout, open])

  useEffect(() => {
    return () => {
      if (autoOpenTimerRef.current) window.clearTimeout(autoOpenTimerRef.current)
      clearOpenTimeout()
    }
  }, [clearOpenTimeout])

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
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

  if (!open) {
    if (isSuppressedPath || !isPricingPath || sent || hasClaimed()) return null

    return (
      <div className="fixed bottom-20 right-4 z-[85] grid max-w-[calc(100vw-2rem)] gap-2 md:bottom-5">
        {openError && (
          <p className="rounded-md border border-[#C0392B66] bg-white px-3 py-2 text-sm font-bold text-[#C0392B] shadow-[0_8px_24px_rgba(30,77,43,0.14)]">
            {openError}
          </p>
        )}
        <button
          type="button"
          onClick={openCoupon}
          disabled={opening}
          aria-busy={opening}
          className="btn-primary min-w-[190px] shadow-[0_8px_24px_rgba(30,77,43,0.18)] disabled:pointer-events-none disabled:opacity-75"
        >
          {opening ? 'Loading...' : 'Get Employee Pricing'}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-[#1A1A1A]/45 px-4 py-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-pricing-title"
        className="w-full max-w-[520px] rounded-lg border border-[#D8C5A7] bg-white p-5 shadow-[0_8px_24px_rgba(30,77,43,0.2)]"
      >
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
            <p id="employee-pricing-title" className="text-center text-2xl font-black leading-tight text-[#1E4D2B]">
              Get Employee Pricing
            </p>
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

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="btn-primary w-full disabled:pointer-events-none disabled:opacity-75"
            >
              {submitting ? 'Loading...' : 'Get Employee Pricing'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
