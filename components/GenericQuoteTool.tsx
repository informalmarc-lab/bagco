'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type Step = 1 | 2 | 3 | 4 | 5

type BagType =
  | 'Flat Paper Bags'
  | 'Handled Paper Bags (Twisted Handle)'
  | 'Pharmacy Bags'
  | 'Veterinary Bags'
  | 'Custom Printed Bags'
  | 'Stock / Plain Bags'

type SizeOption = 'Small (4x2x8)' | 'Medium (6x3x11)' | 'Large (8x4x14)' | 'Extra Large (10x5x16)' | 'Custom Size'

type PrintOption =
  | 'No Print - Plain stock bags'
  | '1-Color Print'
  | '2-Color Print'
  | '3-Color Print'
  | "Not sure yet - I'll decide later"

type ShippingType =
  | 'Ship to My Business (standard)'
  | 'Drop Ship to My Customers (distributor)'
  | 'Blind Ship - No Bag Supply Co branding on package (distributor)'
  | 'Set Up Recurring Reorder Program'

type ArtworkReady = 'Yes' | 'No' | 'Need help with design'

type SizeState = {
  cases: string
  customSize: string
}

type SizesByBagType = Partial<Record<BagType, Partial<Record<SizeOption, SizeState>>>>

const BUSINESS_TYPES = [
  { label: 'Pharmacy', icon: '🏥' },
  { label: 'Dispensary', icon: '🌿' },
  { label: 'Veterinary Clinic', icon: '🐾' },
  { label: 'Smoke Shop', icon: '🚬' },
  { label: 'Distributor', icon: '📦' },
  { label: 'Other', icon: '🏢' },
]

const BAG_TYPES: Array<{ label: BagType; icon: string }> = [
  { label: 'Flat Paper Bags', icon: '📄' },
  { label: 'Handled Paper Bags (Twisted Handle)', icon: '🛍️' },
  { label: 'Pharmacy Bags', icon: '🧴' },
  { label: 'Veterinary Bags', icon: '🐶' },
  { label: 'Custom Printed Bags', icon: '🎨' },
  { label: 'Stock / Plain Bags', icon: '📦' },
]

const SIZE_OPTIONS: SizeOption[] = [
  'Small (4x2x8)',
  'Medium (6x3x11)',
  'Large (8x4x14)',
  'Extra Large (10x5x16)',
  'Custom Size',
]

const PRINT_OPTIONS: Array<{ label: PrintOption; icon: string }> = [
  { label: 'No Print - Plain stock bags', icon: '⬜' },
  { label: '1-Color Print', icon: '1️⃣' },
  { label: '2-Color Print', icon: '2️⃣' },
  { label: '3-Color Print', icon: '🎨' },
  { label: "Not sure yet - I'll decide later", icon: '❓' },
]

const SHIPPING_OPTIONS: Array<{ label: ShippingType; icon: string }> = [
  { label: 'Ship to My Business (standard)', icon: '🏢' },
  { label: 'Drop Ship to My Customers (distributor)', icon: '📦' },
  { label: 'Blind Ship - No Bag Supply Co branding on package (distributor)', icon: '👻' },
  { label: 'Set Up Recurring Reorder Program', icon: '🔁' },
]

const BEST_TIMES = ['Morning', 'Afternoon', 'Evening', 'Anytime'] as const

function isPrintDetailsRequired(printOption: PrintOption | ''): boolean {
  return (
    printOption !== '' &&
    printOption !== 'No Print - Plain stock bags' &&
    printOption !== "Not sure yet - I'll decide later"
  )
}

export default function GenericQuoteTool() {
  const [step, setStep] = useState<Step>(1)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  const [businessType, setBusinessType] = useState('')
  const [bagTypes, setBagTypes] = useState<BagType[]>([])
  const [sizesByType, setSizesByType] = useState<SizesByBagType>({})
  const [printOption, setPrintOption] = useState<PrintOption | ''>('')
  const [artworkReady, setArtworkReady] = useState<ArtworkReady | ''>('')
  const [printColors, setPrintColors] = useState('')
  const [shippingType, setShippingType] = useState<ShippingType | ''>('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [bestTime, setBestTime] = useState<(typeof BEST_TIMES)[number]>('Anytime')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const sizeRows = useMemo(() => {
    const rows: Array<{ type: BagType; size: string; cases: number }> = []
    for (const type of bagTypes) {
      const selections = sizesByType[type]
      if (!selections) continue

      for (const [sizeKey, state] of Object.entries(selections) as Array<[SizeOption, SizeState]>) {
        const parsed = Number.parseInt(state.cases || '0', 10)
        const cases = Number.isFinite(parsed) && parsed > 0 ? parsed : 0
        const label = sizeKey === 'Custom Size' ? (state.customSize.trim() || 'Custom Size') : sizeKey
        rows.push({ type, size: label, cases })
      }
    }
    return rows
  }, [bagTypes, sizesByType])

  const payload = useMemo(() => {
    return {
      business_type: businessType,
      bag_types: bagTypes,
      sizes: sizeRows,
      print_option: printOption,
      artwork_ready: artworkReady,
      print_colors: printColors,
      shipping_type: shippingType,
      name,
      email,
      phone,
      company,
      best_time: bestTime,
      notes,
      submitted_at: new Date().toISOString(),
    }
  }, [
    artworkReady,
    bagTypes,
    bestTime,
    businessType,
    company,
    email,
    name,
    notes,
    phone,
    printColors,
    printOption,
    shippingType,
    sizeRows,
  ])

  const validateStep = (targetStep: Step): string | null => {
    if (targetStep === 1 && !businessType) return 'Please choose your business type.'
    if (targetStep === 2) {
      if (bagTypes.length === 0) return 'Please select at least one bag type.'
      if (sizeRows.length === 0) return 'Please select at least one bag size and case quantity.'
      const invalid = sizeRows.find((row) => row.cases <= 0 || !row.size.trim())
      if (invalid) return 'Please enter valid size details and case counts.'
    }
    if (targetStep === 3 && !printOption) return 'Please choose a print option.'
    if (targetStep === 4 && !shippingType) return 'Please choose a shipping type.'
    if (targetStep === 5) {
      if (!name.trim()) return 'Full Name is required.'
      if (!email.trim()) return 'Email Address is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.'
      if (isPrintDetailsRequired(printOption) && !artworkReady) return 'Please tell us if artwork is ready.'
    }
    return null
  }

  const goNext = () => {
    const err = validateStep(step)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setStep((prev) => (prev === 5 ? 5 : ((prev + 1) as Step)))
  }

  const goBack = () => {
    setError('')
    setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as Step)))
  }

  const toggleBagType = (type: BagType) => {
    setBagTypes((prev) => {
      if (prev.includes(type)) {
        const next = prev.filter((item) => item !== type)
        setSizesByType((current) => {
          const clone = { ...current }
          delete clone[type]
          return clone
        })
        return next
      }
      return [...prev, type]
    })
  }

  const toggleSize = (type: BagType, size: SizeOption) => {
    setSizesByType((prev) => {
      const forType = { ...(prev[type] || {}) }
      if (forType[size]) {
        delete forType[size]
      } else {
        forType[size] = { cases: '1', customSize: '' }
      }
      return { ...prev, [type]: forType }
    })
  }

  const updateSizeCases = (type: BagType, size: SizeOption, value: string) => {
    setSizesByType((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        [size]: {
          ...(prev[type]?.[size] || { cases: '1', customSize: '' }),
          cases: value,
        },
      },
    }))
  }

  const updateCustomSize = (type: BagType, value: string) => {
    setSizesByType((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        'Custom Size': {
          ...(prev[type]?.['Custom Size'] || { cases: '1', customSize: '' }),
          customSize: value,
        },
      },
    }))
  }

  const submit = async () => {
    const err = validateStep(5)
    if (err) {
      setError(err)
      return
    }

    if (submitting) return
    setSubmitting(true)
    setError('')

    try {
      // WEBHOOK SETUP: Submissions post directly to the configured Bag Supply Co webhook endpoint.
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'quote',
          payload,
        }),
      })

      if (!response.ok) {
        const json = await response.json().catch(() => null)
        throw new Error(json?.error || 'Submission failed.')
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong sending your request. Please try again or text us at (704) 862-9256.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="section-container py-20">
        <div className="mx-auto max-w-2xl tonal-panel text-center">
          <p className="text-5xl">✅</p>
          <h1 className="mt-4 text-4xl font-black text-[#1E4D2B]">Your quote request is on its way!</h1>
          <p className="mt-4 text-base text-[#5F4D33]">
            We&apos;ll review your details and follow up with pricing and lead times. You can also text us directly at
            {' '}
            (704) 862-9256 for a faster response.
          </p>
          <Link href="/" className="btn-primary mt-8">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Quote Tool</p>
          <h1 className="heading-display mt-5">Build Your Custom Bag Quote</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Takes about 2 minutes. We&apos;ll respond with a structured program recommendation.
          </p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="rounded-2xl border border-[#C4935A66] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-[#5F4D33]">Step {step} of 5</p>
            <p className="text-sm font-semibold text-[#7A6548]">{Math.round((step / 5) * 100)}%</p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-[#F0E4D3]">
            <div
              className="h-2 rounded-full bg-[#1E4D2B] transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="section-container pb-4 lg:hidden">
        <div className="rounded-2xl border border-[#C4935A66] bg-white p-4">
          <button
            type="button"
            onClick={() => setIsSummaryOpen((prev) => !prev)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-black uppercase tracking-[0.08em] text-[#1E4D2B]">Summary</span>
            <span className="text-xs font-semibold text-[#7A6548]">{isSummaryOpen ? 'Hide' : 'Show'}</span>
          </button>
          {isSummaryOpen && (
            <div className="mt-3 space-y-3 text-sm text-[#5F4D33]">
              <p><span className="font-semibold text-[#1E4D2B]">Business:</span> {businessType || 'Not selected'}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Bag Types:</span> {bagTypes.length ? bagTypes.join(', ') : 'None yet'}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Print:</span> {printOption || 'Not selected'}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Shipping:</span> {shippingType || 'Not selected'}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-container pb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="tonal-panel transition-all duration-300">
            {step === 1 && (
              <div className="reveal-up">
                <h2 className="text-2xl font-black text-[#1E4D2B]">
                  Let&apos;s build your quote. First, what type of business are you?
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BUSINESS_TYPES.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setBusinessType(item.label)}
                      className={`rounded-2xl border px-4 py-4 text-left ${
                        businessType === item.label
                          ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                          : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <p className="text-2xl">{item.icon}</p>
                      <p className="mt-2 text-sm font-black">{item.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="reveal-up">
                <h2 className="text-2xl font-black text-[#1E4D2B]">What type of bags do you need?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BAG_TYPES.map((item) => {
                    const active = bagTypes.includes(item.label)
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => toggleBagType(item.label)}
                        className={`rounded-2xl border px-4 py-4 text-left ${
                          active
                            ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                            : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                        }`}
                      >
                        <p className="text-2xl">{item.icon}</p>
                        <p className="mt-2 text-sm font-black">{item.label}</p>
                      </button>
                    )
                  })}
                </div>

                {bagTypes.length > 0 && (
                  <div className="mt-8 space-y-6">
                    {bagTypes.map((type) => (
                      <div key={type} className="rounded-2xl border border-[#C4935A66] bg-white p-4">
                        <h3 className="text-lg font-black text-[#1E4D2B]">{type}</h3>
                        <p className="mt-1 text-sm text-[#5F4D33]">Select one or more sizes.</p>

                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {SIZE_OPTIONS.map((size) => {
                            const selected = Boolean(sizesByType[type]?.[size])
                            return (
                              <button
                                key={`${type}-${size}`}
                                type="button"
                                onClick={() => toggleSize(type, size)}
                                className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
                                  selected
                                    ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                                    : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                                }`}
                              >
                                {size}
                              </button>
                            )
                          })}
                        </div>

                        {Object.entries(sizesByType[type] || {}).length > 0 && (
                          <div className="mt-4 space-y-3">
                            {Object.entries(sizesByType[type] || {}).map(([size, state]) => (
                              <div key={`${type}-${size}`} className="rounded-xl border border-[#C4935A66] p-3">
                                <p className="text-sm font-bold text-[#1E4D2B]">{size}</p>
                                {size === 'Custom Size' && (
                                  <input
                                    type="text"
                                    placeholder="Width x Depth x Height in inches"
                                    value={state.customSize}
                                    onChange={(event) => updateCustomSize(type, event.target.value)}
                                    className="mt-2 w-full rounded-lg border border-[#C4935A66] px-3 py-2 text-sm"
                                  />
                                )}
                                <label className="mt-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">
                                  How many cases of this size?
                                </label>
                                <input
                                  type="number"
                                  min={1}
                                  value={state.cases}
                                  onChange={(event) => updateSizeCases(type, size as SizeOption, event.target.value)}
                                  className="mt-1 w-full rounded-lg border border-[#C4935A66] px-3 py-2 text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="reveal-up">
                <h2 className="text-2xl font-black text-[#1E4D2B]">Do you need custom printing?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {PRINT_OPTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setPrintOption(item.label)}
                      className={`rounded-2xl border px-4 py-4 text-left ${
                        printOption === item.label
                          ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                          : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <p className="text-2xl">{item.icon}</p>
                      <p className="mt-2 text-sm font-black">{item.label}</p>
                    </button>
                  ))}
                </div>

                {isPrintDetailsRequired(printOption) && (
                  <div className="mt-6 space-y-4 rounded-2xl border border-[#C4935A66] bg-white p-4">
                    <div>
                      <p className="text-sm font-black text-[#1E4D2B]">Do you have artwork ready?</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(['Yes', 'No', 'Need help with design'] as ArtworkReady[]).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setArtworkReady(option)}
                            className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${
                              artworkReady === option
                                ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                                : 'border-[#C4935A66] bg-white text-[#1E4D2B]'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block text-sm font-black text-[#1E4D2B]">
                      What color(s) do you want?
                      <input
                        type="text"
                        value={printColors}
                        onChange={(event) => setPrintColors(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-[#C4935A66] px-3 py-2 text-sm font-medium"
                        placeholder="Example: Blue and white"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="reveal-up">
                <h2 className="text-2xl font-black text-[#1E4D2B]">How should we ship your order?</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {SHIPPING_OPTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setShippingType(item.label)}
                      className={`rounded-2xl border px-4 py-4 text-left ${
                        shippingType === item.label
                          ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                          : 'border-[#C4935A66] bg-white text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <p className="text-2xl">{item.icon}</p>
                      <p className="mt-2 text-sm font-black">{item.label}</p>
                    </button>
                  ))}
                </div>

                {(shippingType === 'Drop Ship to My Customers (distributor)' ||
                  shippingType === 'Blind Ship - No Bag Supply Co branding on package (distributor)') && (
                  <div className="mt-6 rounded-2xl border border-[#1E4D2B66] bg-[#1E4D2B14] p-4 text-sm text-[#1E4D2B]">
                    Great - we support distributor blind ship and drop ship programs. Include any notes about your
                    customers or delivery requirements in the message field on the next step.
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="reveal-up">
                <h2 className="text-2xl font-black text-[#1E4D2B]">Almost done - where should we send your quote?</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
                    Full Name *
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="rounded-lg border border-[#C4935A66] px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
                    Email Address *
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="rounded-lg border border-[#C4935A66] px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
                    Phone Number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="rounded-lg border border-[#C4935A66] px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
                    Company Name
                    <input
                      type="text"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      className="rounded-lg border border-[#C4935A66] px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
                    Best time to reach you
                    <select
                      value={bestTime}
                      onChange={(event) => setBestTime(event.target.value as (typeof BEST_TIMES)[number])}
                      className="rounded-lg border border-[#C4935A66] px-3 py-2"
                    >
                      {BEST_TIMES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="mt-4 grid gap-1 text-sm font-semibold text-[#5F4D33]">
                  Additional notes
                  <textarea
                    rows={5}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Anything else we should know about your order?"
                    className="rounded-lg border border-[#C4935A66] px-3 py-2"
                  />
                </label>
              </div>
            )}

            {error && <p className="mt-5 text-sm font-semibold text-[#C0392B]">{error}</p>}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {step > 1 && (
                <button type="button" onClick={goBack} className="btn-secondary">
                  Back
                </button>
              )}

              {step < 5 ? (
                <button type="button" onClick={goNext} className="btn-primary">
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-70"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    'Send My Quote Request'
                  )}
                </button>
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-[#C4935A66] bg-white p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.08em] text-[#1E4D2B]">Live Summary</h3>
              <div className="mt-3 space-y-3 text-sm text-[#5F4D33]">
                <p><span className="font-semibold text-[#1E4D2B]">Business:</span> {businessType || 'Not selected'}</p>
                <p><span className="font-semibold text-[#1E4D2B]">Bag Types:</span> {bagTypes.length ? bagTypes.join(', ') : 'None yet'}</p>
                <div>
                  <p className="font-semibold text-[#1E4D2B]">Sizes:</p>
                  {sizeRows.length === 0 ? (
                    <p className="text-[#7A6548]">None yet</p>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {sizeRows.map((row, idx) => (
                        <li key={`${row.type}-${row.size}-${idx}`}>{row.type}: {row.size} ({row.cases} case{row.cases === 1 ? '' : 's'})</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p><span className="font-semibold text-[#1E4D2B]">Print:</span> {printOption || 'Not selected'}</p>
                <p><span className="font-semibold text-[#1E4D2B]">Shipping:</span> {shippingType || 'Not selected'}</p>
                <p><span className="font-semibold text-[#1E4D2B]">Contact:</span> {name || 'N/A'} {email ? `(${email})` : ''}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
