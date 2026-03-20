'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useCart } from '@/components/cart/CartProvider'
import { formatCartUnit, getCartLineTotal, getCartPriceUnitLabel } from '@/lib/cart'
import { money } from '@/lib/catalogProducts'
import type { OrderCustomer, PaymentPreference } from '@/lib/order'

const PAYMENT_OPTIONS: Array<{
  value: PaymentPreference
  label: string
  description: string
}> = [
  { value: 'Check', label: 'Check', description: 'We will follow up with next steps for payment by check.' },
  { value: 'Card', label: 'Card', description: 'We will email a Stripe payment link after reviewing the order.' },
  { value: 'Other', label: 'Other', description: 'Describe your preferred payment method.' },
]

const INITIAL_CUSTOMER: OrderCustomer = {
  fullName: '',
  companyName: '',
  shippingAddress: '',
  email: '',
  phone: '',
  orderNotes: '',
  paymentPreference: 'Check',
  otherPaymentMethod: '',
}

export default function CheckoutPageClient() {
  const { items, subtotal, hydrated, clearCart } = useCart()
  const router = useRouter()
  const [customer, setCustomer] = useState<OrderCustomer>(INITIAL_CUSTOMER)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const paymentDescription = useMemo(() => {
    return PAYMENT_OPTIONS.find((option) => option.value === customer.paymentPreference)?.description || ''
  }, [customer.paymentPreference])

  if (!hydrated) {
    return (
      <section className="section-container py-20">
        <div className="tonal-panel">
          <p className="text-sm font-semibold text-[#5F4D33]">Loading checkout...</p>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="section-container py-20">
        <div className="tonal-panel text-center">
          <h2 className="section-title">Your cart is empty</h2>
          <p className="mt-4 text-sm text-[#5F4D33]">
            Add items to the cart before starting checkout.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/cart" className="btn-primary">
              Back to Cart
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const updateField = <K extends keyof OrderCustomer>(key: K, value: OrderCustomer[K]) => {
    setCustomer((current) => ({ ...current, [key]: value }))
  }

  const submit = async () => {
    if (submitting) return

    if (!customer.fullName.trim()) {
      setError('Full name is required.')
      return
    }
    if (!customer.shippingAddress.trim()) {
      setError('Shipping address is required.')
      return
    }
    if (!customer.email.trim()) {
      setError('Email is required.')
      return
    }
    if (!customer.phone.trim()) {
      setError('Phone number is required.')
      return
    }
    if (customer.paymentPreference === 'Other' && !customer.otherPaymentMethod?.trim()) {
      setError('Please describe the preferred payment method.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Could not submit your order.')
      }

      clearCart()
      router.push('/order-confirmation')
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Could not submit your order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section-container py-20">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="tonal-panel">
          <h2 className="section-title">Checkout Details</h2>
          <p className="mt-3 text-sm text-[#5F4D33]">
            Submit your order and our team will follow up within 24 hours with next steps.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Full Name *
              <input
                type="text"
                value={customer.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                className="rounded-md border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Company Name
              <input
                type="text"
                value={customer.companyName}
                onChange={(event) => updateField('companyName', event.target.value)}
                className="rounded-md border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Email *
              <input
                type="email"
                value={customer.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="rounded-md border border-[#C4935A66] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Phone *
              <input
                type="tel"
                value={customer.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="rounded-md border border-[#C4935A66] px-3 py-2"
              />
            </label>
          </div>

          <label className="mt-4 grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Shipping Address *
            <textarea
              rows={4}
              value={customer.shippingAddress}
              onChange={(event) => updateField('shippingAddress', event.target.value)}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
            />
          </label>

          <div className="mt-6">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-[#1E4D2B]">Payment Preference *</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {PAYMENT_OPTIONS.map((option) => {
                const active = customer.paymentPreference === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('paymentPreference', option.value)}
                    className={`rounded-2xl border px-4 py-4 text-left ${
                      active
                        ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                        : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <p className="text-sm font-black">{option.label}</p>
                    <p className={`mt-2 text-xs ${active ? 'text-[#F7E6D1]' : 'text-[#5F4D33]'}`}>
                      {option.description}
                    </p>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-sm text-[#5F4D33]">{paymentDescription}</p>
          </div>

          {customer.paymentPreference === 'Other' && (
            <label className="mt-4 grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Preferred Payment Method *
              <input
                type="text"
                value={customer.otherPaymentMethod || ''}
                onChange={(event) => updateField('otherPaymentMethod', event.target.value)}
                className="rounded-md border border-[#C4935A66] px-3 py-2"
                placeholder="Describe your preferred payment method"
              />
            </label>
          )}

          <label className="mt-4 grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Order Notes
            <textarea
              rows={5}
              value={customer.orderNotes}
              onChange={(event) => updateField('orderNotes', event.target.value)}
              className="rounded-md border border-[#C4935A66] px-3 py-2"
              placeholder="Anything else we should know about this order?"
            />
          </label>

          {error && <p className="mt-4 text-sm font-semibold text-[#C0392B]">{error}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="btn-primary disabled:pointer-events-none disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit Order'}
            </button>
            <Link href="/cart" className="btn-secondary">
              Back to Cart
            </Link>
          </div>
        </div>

        <aside className="tonal-panel lg:sticky lg:top-24 lg:self-start">
          <h2 className="section-title text-3xl">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#C4935A66] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {item.sku}</p>
                <h3 className="mt-1 text-base font-black text-[#1E4D2B]">{item.name}</h3>
                {item.sizeLabel && <p className="mt-1 text-sm text-[#5F4D33]">{item.sizeLabel}</p>}
                <p className="mt-1 text-sm text-[#5F4D33]">{formatCartUnit(item.quantity, item.unit)}</p>
                <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">
                  {money(item.unitPrice)} / {getCartPriceUnitLabel(item)}
                </p>
                <p className="mt-1 text-lg font-black text-[#B5813A]">{money(getCartLineTotal(item))}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#C4935A66] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#1E4D2B]">Order Total</span>
              <span className="text-2xl font-black text-[#1E4D2B]">{money(subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
