'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DISCLAIMER,
  getFreight,
  getLeadTime,
  getPlateFees,
  getSubtotal,
  money,
  quantityTiers,
  quoteCategories,
  quoteProducts,
} from '@/lib/makeYourQuote/calculate'
import { trackQuoteEvent } from '@/lib/makeYourQuote/analytics'
import { type PrintSides, type QuoteCategory, type QuoteProduct } from '@/lib/makeYourQuote/types'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

const stepLabels = ['Category', 'Product', 'Quantity', 'Print', 'Contact', 'Review']
const stepDescriptions = [
  'Choose the bag family that matches the order.',
  'Pick the exact item and size.',
  'Select the run size and case count.',
  'Confirm print colors and sides.',
  'Add contact and delivery details.',
  'Review the estimate before sending.',
]
const categoryDescriptions: Record<QuoteCategory, string> = {
  'Prescription Bags': 'Compact paper bags for pharmacy counters and medication handoff.',
  'Flat & Gusset Bags': 'Reliable everyday paper formats for retail, pharmacy, and service counters.',
  'SOS Grocery Bags': 'Heavy paper bags with more depth for larger counter orders.',
  'Plastic Bags': 'Stock poly options for quick replenishment and straightforward ordering.',
}

const screenVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 22 : -22 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -18 : 18 }),
}

const itemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
}

const trustItems = [
  'Made in the USA',
  'Fast Turnaround',
  'Custom Printed Packaging',
  'Packaging Supplier',
]

const heroMockups = ['#25', '#22', '#12']
  .map((itemNumber) => quoteProducts.find((product) => product.item === itemNumber))
  .filter(Boolean) as QuoteProduct[]
const customRenderItems = new Set(['12', '14', '15', '21', '22', '23', '25', '26', '28'])

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function getConfiguredImage(product: QuoteProduct, colorCount: 1 | 2 | 3): string {
  const itemNumber = product.item.replace(/\D/g, '')
  if (product.customPrintable && customRenderItems.has(itemNumber)) {
    return `/catalog/custom/${colorCount}-color/CBC-${itemNumber}-FC${colorCount}C.webp`
  }
  return product.image
}

function getConfiguredProduct(product: QuoteProduct, colorCount: 1 | 2 | 3): QuoteProduct {
  return {
    ...product,
    image: getConfiguredImage(product, colorCount),
  }
}

function TrustIcon({ index }: { index: number }) {
  const icons = [
    <path key="usa" d="M4 7h16M4 12h16M4 17h16M7 4v16" />,
    <path key="speed" d="M12 7v5l3 2M5 12a7 7 0 1 0 2.1-5" />,
    <path key="print" d="M7 8V5h10v3M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v5H7z" />,
    <path key="trusted" d="M12 3 5 6v5c0 4.1 2.8 7.9 7 9 4.2-1.1 7-4.9 7-9V6zM9 12l2 2 4-5" />,
  ]

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[index]}
    </svg>
  )
}

function AmbientLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(95,77,51,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(95,77,51,0.22) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.78),rgba(250,246,240,0.96))]"
      />
    </div>
  )
}

function HeroMockups({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="relative hidden min-h-[300px] overflow-hidden lg:block">
      <motion.div
        className="absolute right-6 top-8 w-48 rounded-2xl border border-kraft-400/30 bg-white/90 p-3 shadow-[0_8px_24px_rgba(30,77,43,0.09)]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <ProductVisual product={heroMockups[0]} priority reduceMotion={reduceMotion} compact />
      </motion.div>
      <motion.div
        className="absolute right-44 top-24 w-40 rounded-2xl border border-kraft-300/60 bg-[#FFFDF8]/95 p-3 shadow-[0_6px_18px_rgba(30,77,43,0.08)]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.06 }}
      >
        <ProductVisual product={heroMockups[1]} reduceMotion={reduceMotion} compact />
      </motion.div>
      <motion.div
        className="absolute bottom-6 right-20 w-36 rounded-2xl border border-kraft-300/60 bg-white/90 p-3 shadow-[0_6px_18px_rgba(30,77,43,0.08)]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.12 }}
      >
        <ProductVisual product={heroMockups[2]} reduceMotion={reduceMotion} compact />
      </motion.div>
    </div>
  )
}

function CountUpMoney({ value, fallback, className }: { value: number | null; fallback: string; className?: string }) {
  const [display, setDisplay] = useState(value ?? 0)
  const previousValue = useRef(value ?? 0)

  useEffect(() => {
    if (value === null) return
    const from = previousValue.current
    const to = value
    const startedAt = performance.now()
    const duration = 720
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (to - from) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
      else previousValue.current = to
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  if (value === null) return <span className={className}>{fallback}</span>
  return <span className={className}>{money(display)}</span>
}

function ProductVisual({
  product,
  priority = false,
  reduceMotion = false,
  compact = false,
}: {
  product: QuoteProduct
  priority?: boolean
  reduceMotion?: boolean | null
  compact?: boolean
}) {
  if (product.image) {
    return (
      <motion.div
        layout
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        className={classNames('relative w-full overflow-hidden rounded-2xl bg-[#F6EFE5]', compact ? 'h-36 md:h-40' : 'h-52 md:h-64')}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={product.image}
            className="absolute inset-0"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02, y: -8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={product.image} alt={`${product.item} ${product.category}`} fill priority={priority} sizes="(max-width: 768px) 100vw, 420px" className={classNames('object-contain', compact ? 'p-3' : 'p-5')} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      className={classNames('grid place-items-center rounded-2xl border border-dashed border-kraft-300/60 bg-[#FFFDF8] p-5 text-center text-accent-600', compact ? 'h-36 md:h-40' : 'h-52 md:h-64')}
    >
      <div>
        <p className="text-sm font-black text-accent-500">Image needed</p>
        <p className="mt-2 text-sm leading-6">
          Add a product image for {product.item} to show this bag here.
        </p>
      </div>
    </motion.div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-kraft-300/40 py-3 text-sm last:border-b-0">
      <span className="text-accent-600">{label}</span>
      <span className="max-w-[180px] text-right font-semibold text-brand-600">{value}</span>
    </div>
  )
}

function MiniSummary({
  product,
  quantity,
  caseCount,
  estimatedTotal,
}: {
  product: QuoteProduct | null
  quantity: number | null
  caseCount: number
  estimatedTotal: number | null
}) {
  const rows = [
    { label: 'Bag', value: product ? `${product.item} ${product.size}` : 'Select a product' },
    { label: 'Qty', value: quantity ? quantity.toLocaleString() : 'Choose tier' },
    { label: 'Cases', value: caseCount ? String(caseCount) : '0' },
    { label: 'Total', value: estimatedTotal === null ? 'Select quantity' : money(estimatedTotal) },
  ]

  return (
    <motion.div
      className="hidden rounded-2xl border border-kraft-300/60 bg-white p-3 lg:grid lg:grid-cols-4 lg:gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      {rows.map((row) => (
        <div key={row.label} className="rounded-xl border border-kraft-300/30 bg-[#FFFDF8] px-3 py-2">
          <p className="text-[11px] font-black uppercase text-accent-600">{row.label}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={row.value}
              className={classNames('mt-1 truncate text-sm font-black', row.label === 'Total' ? 'text-accent-500' : 'text-brand-600')}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.16 }}
            >
              {row.value}
            </motion.p>
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  )
}

export default function MakeYourQuoteConfigurator() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState<Step>(0)
  const [category, setCategory] = useState<QuoteCategory | ''>('')
  const [productItem, setProductItem] = useState('')
  const [quantity, setQuantity] = useState<number | null>(null)
  const [printColors, setPrintColors] = useState<1 | 2 | 3>(1)
  const [printSides, setPrintSides] = useState<PrintSides>('Front only')
  const [customer, setCustomer] = useState({ name: '', company: '', email: '', phone: '', zip: '' })
  const [error, setError] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [stepDirection, setStepDirection] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const flowPanelRef = useRef<HTMLDivElement | null>(null)

  const product = useMemo(() => quoteProducts.find((item) => item.item === productItem) || null, [productItem])
  const configuredProduct = useMemo(
    () => (product ? getConfiguredProduct(product, printColors) : null),
    [printColors, product],
  )
  const productsForCategory = useMemo(
    () => quoteProducts.filter((item) => item.category === category),
    [category],
  )

  const caseCount = product && quantity ? Math.ceil(quantity / product.pack) : 0
  const subtotal = product && quantity ? getSubtotal(product, quantity) : 0
  const plateFees = product ? getPlateFees(product, printSides) : 0
  const freight = product && quantity ? getFreight(product, quantity, customer.zip, subtotal) : null
  const estimatedTotal = product && quantity ? subtotal + plateFees + (freight?.fsc ?? 0) : null
  const totalIncludesShipping = Boolean(freight && freight.fsc !== null)
  const isPaperCustomUnderMinimum = Boolean(product?.customPrintable && quantity && caseCount < 4)
  const progress = step === 0 ? 0 : Math.round((step / 6) * 100)
  const activeStepLabel = step > 0 ? stepLabels[step - 1] : 'Start'
  const activeStepDescription = step > 0 ? stepDescriptions[step - 1] : 'Start your quote.'

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(category)
    if (step === 2) return Boolean(product)
    if (step === 3) return Boolean(product && quantity && !isPaperCustomUnderMinimum)
    if (step === 4) return Boolean(product && (!product.customPrintable || (printColors && printSides)))
    if (step === 5) return Boolean(customer.name.trim() && customer.email.trim() && customer.zip.trim())
    return true
  }, [category, customer.email, customer.name, customer.zip, isPaperCustomUnderMinimum, printColors, printSides, product, quantity, step])

  const goToStep = (nextStep: Step) => {
    if (isTransitioning || nextStep === step) return
    setError('')
    setStepDirection(nextStep >= step ? 1 : -1)
    if (reduceMotion) {
      setStep(nextStep)
      window.requestAnimationFrame(() => {
        flowPanelRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
      trackQuoteEvent('quote_step_view', { step: nextStep })
      return
    }
    setIsTransitioning(true)
    window.setTimeout(() => {
      setStep(nextStep)
      setIsTransitioning(false)
      window.requestAnimationFrame(() => {
        flowPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, 120)
    trackQuoteEvent('quote_step_view', { step: nextStep })
  }

  const goBack = () => {
    if (step <= 1 || isTransitioning) return
    goToStep((step - 1) as Step)
  }

  const continueFromStep = () => {
    if (!canContinue) {
      setError(isPaperCustomUnderMinimum ? 'Custom printed bags require a minimum order of 4 cases.' : 'Please complete this step before continuing.')
      return
    }
    goToStep((step + 1) as Step)
  }

  const selectCategory = (nextCategory: QuoteCategory) => {
    setCategory(nextCategory)
    setProductItem('')
    setQuantity(null)
    trackQuoteEvent('quote_category_selected', { category: nextCategory })
  }

  const selectProduct = (nextProduct: QuoteProduct) => {
    setProductItem(nextProduct.item)
    setQuantity(null)
    setPrintColors(1)
    setPrintSides('Front only')
    trackQuoteEvent('quote_product_selected', { item: nextProduct.item })
  }

  const submit = async () => {
    if (submitting) return
    if (!product || !quantity) return
    if (!canContinue) {
      setError('Name, email, and ZIP code are required.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/makeyourquote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: product.item,
          quantity,
          printColors: product.customPrintable ? printColors : 0,
          printSides: product.customPrintable ? printSides : 'Stock only',
          customer,
          sourcePath: window.location.pathname,
        }),
      })

      const json = await response.json().catch(() => null)
      if (!response.ok) throw new Error(json?.error || 'Quote submission failed.')

      trackQuoteEvent('quote_submitted', { item: product.item, quantity, estimatedTotal })
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong sending your quote.')
    } finally {
      setSubmitting(false)
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        variants: screenVariants,
        custom: stepDirection,
        initial: 'initial',
        animate: 'animate',
        exit: 'exit',
        transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <motion.div
      className="quote-web relative min-h-screen overflow-hidden bg-[#FAF8F3] text-[#1A1A1A] transition-colors duration-300"
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <AmbientLayer />
      <section className="relative overflow-hidden border-b border-kraft-300/60">
        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
            <div>
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.04 }}
              >
                <h1 className="text-balance font-serif text-4xl tracking-[-0.01em] text-brand-600 md:text-6xl">
                  Build Your Custom Bag Quote
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
                  Instant estimates for custom paper bag orders.
                </p>
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {step === 0 && (
                  <motion.button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="btn-primary"
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  >
                    Start Your Quote
                  </motion.button>
                )}
              </div>
            </div>

            <HeroMockups reduceMotion={reduceMotion} />
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={item}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.22 }}
                className={classNames(
                  'min-w-0 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold sm:flex',
                  'border-kraft-300/40 bg-white text-brand-600',
                )}
              >
                <span className="mb-2 block shrink-0 text-accent-500 sm:mb-0">
                  <TrustIcon index={index} />
                </span>
                <span className="block min-w-0 leading-5">{item}</span>
              </motion.div>
            ))}
          </div>

          {step > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between gap-4 text-sm font-bold">
                <span className="text-muted">Step {step} of 6</span>
                <span className="text-brand-600">{progress}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E9DFD0]">
                <motion.div className="h-full bg-[#B5813A]" animate={{ width: `${progress}%` }} transition={{ duration: 0.28 }} />
              </div>
              <div className="mt-3 hidden grid-cols-6 gap-2 text-xs font-bold lg:grid">
                {stepLabels.map((label, index) => (
                  <span key={label} className={index + 1 <= step ? 'text-accent-500' : 'text-accent-600'}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1440px] px-4 py-5 md:px-8 md:py-8">
        {step > 0 && !submitted && (
          <div className="mb-4">
            <MiniSummary product={product} quantity={quantity} caseCount={caseCount} estimatedTotal={estimatedTotal} />
          </div>
        )}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div
            ref={flowPanelRef}
            className="relative min-h-[600px] scroll-mt-24 rounded-2xl border border-kraft-300/40 bg-white p-4 pb-28 md:p-8 md:pb-8 xl:p-10"
          >
            {!submitted && step > 0 && (
              <div className="mb-8 border-b border-kraft-300/40 pb-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-accent-500">Step {step} of 6</p>
                    <h2 className="mt-1 font-serif text-2xl tracking-[-0.01em] text-brand-600 md:text-3xl">
                      {activeStepLabel}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted">{activeStepDescription}</p>
                  </div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isTransitioning}
                      className="btn-secondary min-h-[44px] disabled:pointer-events-none disabled:opacity-50"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#E9DFD0]">
                  <motion.div
                    className="h-full bg-[#B5813A]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-6 gap-1 text-[11px] font-bold md:gap-2 md:text-xs">
                  {stepLabels.map((label, index) => {
                    const state = index + 1 === step ? 'active' : index + 1 < step ? 'done' : 'upcoming'
                    return (
                      <span
                        key={label}
                        className={classNames(
                          'truncate',
                          state === 'active' && 'text-brand-600',
                          state === 'done' && 'text-accent-500',
                          state === 'upcoming' && 'text-[#A08B6D]',
                        )}
                      >
                        {label}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
            <AnimatePresence>
              {isTransitioning && (
                <motion.div
                  className="absolute inset-0 z-20 grid place-items-center rounded-2xl bg-white/88"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  <div className="grid gap-3 text-center text-sm font-black text-accent-500">
                    <span className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-accent-500 border-t-transparent" />
                    <span>Preparing step</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" {...motionProps} className="relative grid min-h-[500px] place-items-center overflow-hidden text-center">
                  {!reduceMotion && (
                    <div className="pointer-events-none absolute inset-0">
                        {Array.from({ length: 10 }).map((_, index) => (
                        <motion.span
                          key={index}
                          className="absolute h-1.5 w-1.5 rounded-full bg-[#B5813A]"
                          style={{ left: `${15 + ((index * 37) % 70)}%`, top: `${18 + ((index * 23) % 58)}%` }}
                          initial={{ opacity: 0, scale: 0.4, y: 0 }}
                          animate={{ opacity: [0, 0.85, 0], scale: [0.4, 1, 0.6], y: [-4, -38, -62] }}
                          transition={{ duration: 1.35, delay: index * 0.035, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                  )}
                  <div className="relative max-w-xl">
                    <motion.div
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-brand-600 bg-brand-600 text-white shadow-[0_8px_24px_rgba(30,77,43,0.14)]"
                      initial={reduceMotion ? undefined : { scale: 0.72, opacity: 0 }}
                      animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    >
                      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="3">
                        <motion.path
                          d="M5 12.5 10 17l9-10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={reduceMotion ? undefined : { pathLength: 0 }}
                          animate={reduceMotion ? undefined : { pathLength: 1 }}
                          transition={{ duration: 0.48, delay: 0.18, ease: 'easeOut' }}
                        />
                      </svg>
                    </motion.div>
                    <h2 className="mt-7 font-serif text-4xl tracking-[-0.01em] text-brand-600 md:text-5xl">Quote request received.</h2>
                    <p className="mt-4 text-lg leading-8 text-muted">Thank you. We will contact you shortly with the next step.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setStep(1)
                        setCategory('')
                        setProductItem('')
                        setQuantity(null)
                        setCustomer({ name: '', company: '', email: '', phone: '', zip: '' })
                      }}
                      className="btn-primary mt-8"
                    >
                      Restart Quote
                    </button>
                  </div>
                </motion.div>
              ) : step === 0 ? (
                <motion.div key="intro" {...motionProps} className="grid min-h-[500px] content-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className={classNames('text-sm font-semibold text-accent-600')}>Built for fast wholesale decisions</p>
                    <h2 className="mt-4 font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Choose a bag, set the run, see the estimate.</h2>
                    <p className="mt-5 text-base leading-7 text-muted">
                      One focused question at a time, with product pricing, plate fees, case count, and freight policy handled in the background.
                    </p>
                    <button type="button" onClick={() => goToStep(1)} className="btn-primary mt-7">
                      Start Your Quote
                    </button>
                  </div>
                  <motion.div
                    className="rounded-2xl border border-kraft-300/60 bg-cream p-4"
                    animate={reduceMotion ? undefined : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductVisual product={quoteProducts[7]} priority reduceMotion={reduceMotion} />
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {['Case pricing', 'Plate fees', 'FSC rules'].map((item) => (
                        <div key={item} className="rounded-xl border border-kraft-300/60 p-3 text-sm font-bold text-brand-600">
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : step === 1 ? (
                <motion.div key="category" {...motionProps}>
                  <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Select Bag Category</h2>
                  <div className="mt-8 grid gap-3 md:grid-cols-2">
                    {quoteCategories.map((item, index) => {
                      const active = category === item
                      return (
                        <motion.button
                          key={item}
                          type="button"
                          variants={itemVariants}
                          initial={reduceMotion ? undefined : 'initial'}
                          animate={reduceMotion ? undefined : 'animate'}
                          transition={{ delay: index * 0.04 }}
                          onClick={() => selectCategory(item)}
                           whileHover={reduceMotion ? undefined : { y: -2 }}
                           whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                           className={classNames(
                             'min-h-[150px] rounded-2xl border p-5 text-left transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(30,77,43,0.07)]',
                             active ? 'border-accent-500 bg-brand-600 text-white' : 'border-kraft-300/40 bg-[#FFFDF8] text-brand-600 hover:border-accent-500',
                          )}
                        >
                          <span className="text-2xl font-black">{item}</span>
                          <span className={classNames('mt-3 block text-sm leading-6', active ? 'text-[#F4E8D8]' : 'text-muted')}>{categoryDescriptions[item]}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="product" {...motionProps}>
                  <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Select Product</h2>
                  <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {productsForCategory.map((item) => {
                      const active = productItem === item.item
                      return (
                        <motion.button
                          key={item.item}
                          type="button"
                          onClick={() => selectProduct(item)}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                          className={classNames('rounded-2xl border p-4 text-left transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(30,77,43,0.07)]', active ? 'border-accent-500 bg-brand-600 text-white shadow-[0_0_0_2px_rgba(181,129,58,0.18),0_8px_24px_rgba(30,77,43,0.12)]' : 'border-kraft-300/40 bg-[#FFFDF8] text-brand-600 hover:border-accent-500')}
                        >
                          <ProductVisual product={getConfiguredProduct(item, printColors)} reduceMotion={reduceMotion} />
                          <div className="mt-4 flex items-start justify-between gap-4">
                            <div>
                              <p className="text-2xl font-black">{item.item}</p>
                              <p className={classNames('mt-1 text-sm', active ? 'text-[#F4E8D8]' : 'text-muted')}>{item.size}</p>
                            </div>
                            <p className={classNames('text-right text-sm font-bold', active ? 'text-[#F4E8D8]' : 'text-accent-500')}>{item.pack.toLocaleString()} / case</p>
                          </div>
                          <p className={classNames('mt-3 text-sm', active ? 'text-[#F4E8D8]' : 'text-muted')}>{item.material}</p>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ) : step === 3 && product ? (
                <motion.div key="quantity" {...motionProps}>
                  <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Select Quantity</h2>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {quantityTiers(product).map((tier) => {
                      const active = quantity === tier
                      const cases = Math.ceil(tier / product.pack)
                      return (
                        <motion.button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setQuantity(tier)
                            trackQuoteEvent('quote_quantity_selected', { quantity: tier })
                          }}
                           whileHover={reduceMotion ? undefined : { y: -2 }}
                           whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                           className={classNames(
                             'relative rounded-2xl border p-5 text-left transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(30,77,43,0.07)]',
                             active
                               ? 'border-accent-500 bg-brand-600 text-white shadow-[0_0_0_2px_rgba(181,129,58,0.18),0_8px_24px_rgba(30,77,43,0.12)]'
                               : 'border-kraft-300/40 bg-[#FFFDF8] text-brand-600 hover:border-accent-500',
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="selected-quantity"
                              className="absolute right-4 top-4 rounded-xl border border-[#F4E8D880] px-2 py-1 text-xs font-semibold text-[#F4E8D8]"
                              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                            >
                              Selected
                            </motion.span>
                          )}
                          <p className="text-3xl font-black">{tier.toLocaleString()}</p>
                          <p className={classNames('mt-2 text-sm', active ? 'text-[#F4E8D8]' : 'text-muted')}>{cases} case{cases === 1 ? '' : 's'} estimated</p>
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={`${tier}-${active}`}
                              className={classNames('mt-4 text-sm font-black', active ? 'text-[#F4E8D8]' : 'text-accent-500')}
                              initial={reduceMotion ? undefined : { opacity: 0, y: 5 }}
                              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                              transition={{ duration: 0.16 }}
                            >
                              {money(getSubtotal(product, tier))}
                            </motion.p>
                          </AnimatePresence>
                        </motion.button>
                      )
                    })}
                  </div>
                  {isPaperCustomUnderMinimum && (
                    <p className="mt-5 rounded-xl border border-[#C0392B66] bg-[#C0392B12] p-4 text-sm font-bold text-[#C0392B]">
                      Custom printed bags require a minimum order of 4 cases.
                    </p>
                  )}
                </motion.div>
              ) : step === 4 && product ? (
                <motion.div key="print" {...motionProps}>
                  <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Printing Options</h2>
                  {!product.customPrintable ? (
                    <div className="mt-8 rounded-2xl border border-kraft-300/60 bg-[#FFFDF8] p-6">
                      <p className="text-2xl font-black text-accent-500">Stock only</p>
                      <p className="mt-3 leading-7 text-muted">Plastic bags do not use custom print options, plate fees, or print configuration.</p>
                    </div>
                  ) : (
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-black text-brand-600">How many print colors?</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((colorCount) => (
                            <button
                              key={colorCount}
                              type="button"
                              onClick={() => setPrintColors(colorCount as 1 | 2 | 3)}
                              className={classNames('min-h-[92px] rounded-2xl border text-3xl font-black hover:border-accent-500', printColors === colorCount ? 'border-accent-500 bg-brand-600 text-white' : 'border-kraft-300/40 bg-[#FFFDF8] text-brand-600')}
                            >
                              {colorCount}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-brand-600">Print sides?</p>
                        <div className="mt-3 grid gap-2">
                          {(['Front only', 'Front + back'] as PrintSides[]).map((side) => (
                            <button
                              key={side}
                              type="button"
                              onClick={() => setPrintSides(side)}
                              className={classNames('min-h-[92px] rounded-2xl border px-4 text-left text-xl font-black hover:border-accent-500', printSides === side ? 'border-accent-500 bg-brand-600 text-white' : 'border-kraft-300/40 bg-[#FFFDF8] text-brand-600')}
                            >
                              {side}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : step === 5 ? (
                <motion.div key="contact" {...motionProps}>
                  <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Customer Information</h2>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                      ['name', 'Name', true],
                      ['company', 'Company Name', false],
                      ['email', 'Email', true],
                      ['phone', 'Phone', false],
                      ['zip', 'ZIP Code', true],
                    ].map(([key, label, required]) => (
                      <label key={String(key)} className="grid gap-2 text-sm font-bold text-muted">
                        {label}{required ? ' *' : ''}
                        <input
                          type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                          value={customer[key as keyof typeof customer]}
                          onChange={(event) => setCustomer((current) => ({ ...current, [key as string]: event.target.value }))}
                          className="min-h-[48px] rounded-xl border border-kraft-300/60 bg-white px-3 text-base text-[#1A1A1A] outline-none focus:border-brand-600"
                        />
                      </label>
                    ))}
                  </div>
                </motion.div>
              ) : step === 6 && product && quantity ? (
                <motion.div key="results" {...motionProps}>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl tracking-[-0.01em] text-brand-600 md:text-5xl">Quote Results</h2>
                      <p className="mt-3 text-base leading-7 text-muted">Review the estimate, then send it to our team.</p>
                    </div>
                    <p className="text-sm font-black text-accent-500">{product.item} / {quantity.toLocaleString()} bags</p>
                  </div>

                  <div className="mt-8 grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
                    {configuredProduct && (
                      <motion.div
                        className="rounded-2xl border border-kraft-300/60 bg-white p-4"
                        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.26 }}
                      >
                        <ProductVisual product={configuredProduct} reduceMotion={reduceMotion} />
                        <p className="mt-3 text-sm font-black text-brand-600">
                          {product.customPrintable ? `${printColors}-color custom render` : 'Stock render'}
                        </p>
                      </motion.div>
                    )}
                    <motion.div
                    className="relative overflow-hidden rounded-2xl border border-kraft-400 bg-[#FFFDF8] p-6 shadow-[0_8px_24px_rgba(30,77,43,0.08)] md:p-8"
                    initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
                    animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-px bg-[#B5813A]"
                      initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0 }}
                      animate={reduceMotion ? undefined : { scaleX: 1, opacity: 0.8 }}
                      transition={{ duration: 0.7, delay: 0.12 }}
                    />
                    <p className="text-sm font-black text-accent-600">{totalIncludesShipping ? 'Estimated total' : 'Estimated before shipping'}</p>
                    <motion.p
                      className="mt-3 font-serif text-4xl tracking-[-0.01em] text-brand-600 md:text-6xl"
                      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.32 }}
                    >
                      <CountUpMoney value={estimatedTotal} fallback="Select quantity" />
                    </motion.p>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                      {freight?.fsc === null ? `${freight.message}. Product subtotal and plate fees are shown above.` : 'Includes product subtotal, plate fees, and estimated fuel surcharge.'}
                    </p>
                    </motion.div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                      ['Product subtotal', money(subtotal)],
                      ['Plate fees', money(product.customPrintable ? plateFees : 0)],
                      ['Estimated shipping', freight?.fsc === null ? freight.message : money(freight?.fsc || 0)],
                      ['Estimated case count', `${caseCount} case${caseCount === 1 ? '' : 's'}`],
                      ['Lead time estimate', getLeadTime(product)],
                    ].map(([label, value], index) => (
                      <motion.div
                        key={label}
                        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 + index * 0.035 }}
                        className="rounded-2xl border border-kraft-300/40 bg-white p-4"
                      >
                        <p className="text-sm font-bold text-accent-600">{label}</p>
                        <p className="mt-2 text-lg font-black text-brand-600">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-6 rounded-xl border border-kraft-300/60 bg-cream p-4 text-sm leading-6 text-muted">
                    {DISCLAIMER}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {error && <p className="mt-6 rounded-xl border border-[#C0392B66] bg-[#C0392B12] p-3 text-sm font-bold text-[#C0392B]">{error}</p>}

            {!submitted && step > 0 && (
              <div className="mt-8 hidden flex-wrap items-center justify-between gap-3 md:flex">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isTransitioning}
                    className="btn-secondary disabled:pointer-events-none disabled:opacity-50"
                  >
                    Back
                  </button>
                ) : (
                  <span aria-hidden="true" />
                )}
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={continueFromStep}
                    disabled={!canContinue || isTransitioning}
                    className="btn-primary disabled:pointer-events-none disabled:opacity-50"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting || isTransitioning}
                    className="btn-primary min-w-[210px] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting
                      </span>
                    ) : (
                      'Submit Quote Request'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div
              className="rounded-2xl border border-kraft-300/40 bg-white p-5 shadow-[0_8px_24px_rgba(30,77,43,0.08)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-brand-600">Quote Summary</h3>
                <span className="text-sm font-black text-accent-500">{estimatedTotal === null ? 'Live' : money(estimatedTotal)}</span>
              </div>
              <AnimatePresence mode="wait">
                {configuredProduct && (
                  <motion.div
                    key={`${configuredProduct.item}-${configuredProduct.image}`}
                    className="mt-4"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductVisual product={configuredProduct} reduceMotion={reduceMotion} />
                  </motion.div>
                )}
              </AnimatePresence>
              {!product && (
                <div className="mt-4 rounded-2xl border border-dashed border-kraft-300/60 p-5 text-sm leading-6 text-accent-600">
                  Your selected product image and estimate will appear here as you build the quote.
                </div>
              )}
              <div className="mt-4">
                <SummaryRow label="Category" value={category || 'Not selected'} />
                <SummaryRow label="Product" value={product ? `${product.item} ${product.size}` : 'Not selected'} />
                <SummaryRow label="Quantity" value={quantity ? quantity.toLocaleString() : 'Not selected'} />
                <SummaryRow label="Cases" value={caseCount ? String(caseCount) : '0'} />
                <SummaryRow label="Print" value={product?.customPrintable ? `${printColors} color, ${printSides}` : product ? 'Stock only' : 'Not selected'} />
                <SummaryRow label="Subtotal" value={subtotal ? money(subtotal) : '$0.00'} />
                <SummaryRow label="Estimated shipping" value={freight ? (freight.fsc === null ? freight.message : money(freight.fsc)) : 'ZIP needed'} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-28 pt-2 md:px-8 md:pb-16">
        <motion.div
          className="overflow-hidden rounded-2xl border border-kraft-300/40 bg-white p-5 md:p-6"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="font-serif text-2xl tracking-[-0.01em] text-brand-600 md:text-3xl">Ready to build your custom quote?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Choose a bag style, confirm the run size, and send a structured estimate to the Bag Supply Co team.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={() => {
                setSubmitted(false)
                goToStep(1)
              }}
              className="btn-primary"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              Start Your Quote
            </motion.button>
          </div>
        </motion.div>
      </section>

      {!submitted && step > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-kraft-300/60 bg-white/96 p-3 md:hidden">
          <div className={classNames('mx-auto grid max-w-xl gap-2', step > 1 ? 'grid-cols-[0.65fr_1fr]' : 'grid-cols-1')}>
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                disabled={isTransitioning}
                className="btn-secondary min-h-[52px] disabled:pointer-events-none disabled:opacity-50"
              >
                Back
              </button>
            )}
            {step < 6 ? (
              <button
                type="button"
                onClick={continueFromStep}
                disabled={!canContinue || isTransitioning}
                className="btn-primary min-h-[52px] disabled:pointer-events-none disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting || isTransitioning}
                className="btn-primary min-h-[52px] disabled:pointer-events-none disabled:opacity-70"
              >
                {submitting ? 'Submitting' : 'Submit Quote'}
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
