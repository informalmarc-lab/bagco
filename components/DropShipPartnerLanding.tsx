'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

type RevealHook<T extends HTMLElement> = {
  ref: RefObject<T>
  isVisible: boolean
}

function useRevealOnScroll<T extends HTMLElement>(threshold = 0.24): RevealHook<T> {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible, threshold])

  return { ref, isVisible }
}

function WordReveal({
  text,
  isVisible,
  className,
  startDelay = 0,
}: {
  text: string
  isVisible: boolean
  className: string
  startDelay?: number
}) {
  const words = text.split(' ')

  return (
    <h2 className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline transition-all duration-700 ease-out ${isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-4'}`}
          style={{ transitionDelay: `${startDelay + index * 55}ms` }}
        >
          {word}
          {' '}
        </span>
      ))}
    </h2>
  )
}

type Pillar = {
  kicker: string
  title: string
  body: string
  icon: React.ReactNode
}

const pillars: Pillar[] = [
  {
    kicker: 'Blind Shipping',
    title: 'Your Brand. Always.',
    body:
      "Every package that leaves our facility carries your name, not ours. Your customers see only you — we're the silent partner making it happen. No BagSupplyCo branding, no inserts, no indication of origin. Just your brand, delivered.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#B5813A]" aria-hidden="true">
        <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.4 12.2 11 13.8l3.8-3.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    kicker: 'Same-Day Fulfillment',
    title: 'In Stock Today. Out the Door Today.',
    body:
      "All in-stock inventory ships the same business day when orders are placed before cutoff. Your customers get fast delivery, and you get a reputation for reliability you didn't have to build from scratch. We treat your deadlines like our own.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#B5813A]" aria-hidden="true">
        <path d="M13 2 5.5 13h5l-1 9L18.5 11h-5L13 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    kicker: 'No Minimums. No Pressure.',
    title: 'Order What You Need, When You Need It.',
    body:
      "We don't lock you into rigid order minimums. Whether you're fulfilling one order or a hundred, we scale with you — no commitments, no penalties, no awkward conversations about volume. Grow at your pace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#B5813A]" aria-hidden="true">
        <path d="M7 7c-2.2 0-4 1.8-4 4s1.8 4 4 4h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        <path d="m14 12 3 3 3-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="M17 17c2.2 0 4-1.8 4-4s-1.8-4-4-4H7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        <path d="m10 12-3-3-3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    kicker: 'Custom & White-Label',
    title: 'Make It Yours, Down to the Bag.',
    body:
      'Want to offer your customers custom-printed bags under your own brand? We handle the full print production and ship directly to your customer. Custom orders are production-ready in 3–4 weeks from artwork approval. Setup fee is a one-time $50 for new accounts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#B5813A]" aria-hidden="true">
        <path d="m4 20 4.2-1 10-10a1.7 1.7 0 0 0 0-2.4l-.8-.8a1.7 1.7 0 0 0-2.4 0l-10 10L4 20Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="m13.5 6.5 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    ),
  },
]

const industries = [
  'Pharmacies',
  'Dispensaries & Smoke Shops',
  'Veterinary Clinics',
  'Wineries & Breweries',
  'Event Companies',
  'Retail Stores',
  'E-Commerce Brands',
  'Anyone who needs bags',
]

const stats = [
  {
    number: 'Same-Day',
    label: 'In-stock orders ship the day you place them',
  },
  {
    number: '3–4 Weeks',
    label: "Custom printed orders, from artwork approval to your customer's door",
  },
  {
    number: '100% Blind',
    label: 'Every shipment leaves without our name on it',
  },
]

const workflowSteps = [
  {
    title: 'Apply',
    copy:
      "Reach out and tell us about your business and what you sell. We'll confirm you're a good fit, walk you through our catalog, and get your account set up — usually within one business day.",
  },
  {
    title: 'List Our Products',
    copy:
      "Add our products to your store, your quote tool, or your sales process. We'll provide full specs, dimensions, case quantities, and product photography on request. No exclusivity requirements.",
  },
  {
    title: 'We Fulfill, You Profit',
    copy:
      'When an order comes in, forward it to us. We pick, pack, and ship it under your brand — same day for stock items, 3–4 weeks for custom. You invoice your customer at your margin. We never contact them directly.',
  },
]

const shippingCards = [
  {
    headline: "8 Cases or More? Shipping's on Us.",
    body:
      "Orders of 8 cases or more ship with only a fuel surcharge applied — no base freight charge. The surcharge is a small percentage of your order total based on UPS zone distance, keeping costs predictable no matter where your customer is.",
  },
  {
    headline: 'Zone-Based Fuel Surcharge',
    body:
      'For qualifying orders, a fuel surcharge (FSC) is calculated as a percentage of the order total based on the UPS delivery zone:',
  },
  {
    headline: 'Smaller Orders Ship UPS Ground',
    body:
      "Orders under 8 cases ship UPS Ground with actual freight added to the invoice. For most drop ship partners placing regular orders, hitting the 8-case threshold is easy — and we'll help you structure orders to get there.",
  },
  {
    headline: 'High Volume? We Handle LTL Too.',
    body:
      'For large orders shipping on pallets, flat-rate LTL freight pricing is available. Contact us directly for pallet rates. We can also ship on your existing UPS, FedEx, or preferred carrier account if that works better for your operation.',
  },
] as const

const fuelSurchargeZones = [
  { label: 'Zones 2–3', value: '5% FSC' },
  { label: 'Zones 4–6', value: '7.5% FSC' },
  { label: 'Zones 7–8', value: '10% FSC' },
] as const

const faqs = [
  {
    question: 'Will my customers ever see BagSupplyCo branding on the shipment?',
    answer:
      'Never. Every order ships completely blind — no BagSupplyCo branding, no inserts, no return address referencing us. Your customers see only your brand, start to finish.',
  },
  {
    question: 'How fast do orders ship?',
    answer:
      'All in-stock orders ship same day, Monday through Friday. Custom printed orders are ready in 3–4 weeks from artwork approval.',
  },
  {
    question: 'Is there a minimum monthly order volume to stay active as a drop ship partner?',
    answer: "No. We don't require minimum monthly volumes. Order what you need, when you need it.",
  },
  {
    question: 'Can I see the products before I start listing them?',
    answer:
      "Yes — we'll send you professional product photos and full specs for everything in our catalog so you can list accurately before your first order.",
  },
  {
    question: 'How do I get started?',
    answer:
      "Fill out our drop ship partner form and email it to dropship@bagsupplyco.com. We'll follow up within one business day to get your account set up.",
  },
] as const

export default function DropShipPartnerLanding() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [timelineStep, setTimelineStep] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  const sectionPromise = useRevealOnScroll<HTMLElement>()
  const sectionPillars = useRevealOnScroll<HTMLElement>()
  const sectionIndustries = useRevealOnScroll<HTMLElement>()
  const sectionTimeline = useRevealOnScroll<HTMLElement>()
  const sectionShipping = useRevealOnScroll<HTMLElement>()
  const sectionTrust = useRevealOnScroll<HTMLElement>()
  const sectionFaq = useRevealOnScroll<HTMLElement>()
  const sectionCta = useRevealOnScroll<HTMLElement>()

  useEffect(() => {
    const id = window.setTimeout(() => setHeroVisible(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!sectionTimeline.isVisible || timelineStep > 0) return
    const timers = [
      window.setTimeout(() => setTimelineStep(1), 120),
      window.setTimeout(() => setTimelineStep(2), 560),
      window.setTimeout(() => setTimelineStep(3), 1020),
    ]
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [sectionTimeline.isVisible, timelineStep])

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pb-20">
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(181,129,58,0.2),transparent_62%),radial-gradient(620px_360px_at_90%_85%,rgba(196,147,90,0.17),transparent_70%)]" />
        <div className="relative z-10 section-container flex flex-col items-center text-center">
          <WordReveal
            text="You Sell. We Ship. Your Brand Gets the Credit."
            isVisible={heroVisible}
            className="heading-serif max-w-5xl text-4xl font-black tracking-[-0.038em] text-[#1E4D2B] sm:text-5xl lg:text-7xl"
          />
          <p
            className={`mt-7 max-w-4xl text-base font-semibold tracking-[0.02em] text-[#B5813A] transition-all duration-700 ease-out md:text-2xl ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '620ms' }}
          >
            BagSupplyCo powers drop ship programs for pharmacies, dispensaries, veterinary clinics, wineries, event
            companies, and retailers of every kind — completely behind the scenes.
          </p>
          <p
            className={`mt-4 max-w-3xl text-sm font-semibold tracking-[0.02em] text-[#B5813A] transition-all duration-700 ease-out md:text-base ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '880ms' }}
          >
            Trusted by pharmacies, dispensaries, veterinary clinics, and retailers across 40+ states.
          </p>
          <p
            className={`mt-4 max-w-3xl text-sm leading-7 text-[#5F4D33] transition-all duration-700 ease-out md:text-base ${heroVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1040ms' }}
          >
            No contracts. No minimums. No complexity. Just a supplier that shows up for you every time.
          </p>
        </div>
        <div
          className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center transition-opacity duration-300 ${hasScrolled ? 'pointer-events-none opacity-0' : 'opacity-100 animate-bounce'}`}
        >
          <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#7A6548]">Scroll</p>
          <div className="mx-auto mt-1 h-8 w-5 rounded-full border border-[#C4935A99] p-1">
            <span className="block h-2 w-2 rounded-full bg-[#B5813A]" />
          </div>
        </div>
      </section>

      <section
        ref={sectionPromise.ref}
        className={`py-20 transition-all duration-700 ease-out md:py-24 ${sectionPromise.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <div className="grid gap-8 border-y border-[#C4935A66] bg-[#FFFCF8] py-10 md:grid-cols-2 md:gap-14 md:py-14">
            <WordReveal
              text="We handle everything. You stay focused on growth."
              isVisible={sectionPromise.isVisible}
              className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
            />
            <div>
              <p className="text-base leading-8 text-[#3E3427] md:text-lg md:leading-9">
                When you partner with BagSupplyCo as a drop shipper, your customers never know we exist. Every order
                ships in your name, under your brand, with zero fulfillment overhead on your end. We've built our
                entire operation around making our partners look exceptional.
              </p>
              <p className="mt-4 text-base leading-8 text-[#3E3427] md:text-lg md:leading-9">
                Most suppliers make you chase them. We built our fulfillment process specifically for resellers who
                need speed, consistency, and zero drama. Same-day shipping on stock. Blind labels on every box. A
                real person on the other end of the phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={sectionPillars.ref}
        className={`bg-[#FAF6F0] py-20 transition-all duration-700 ease-out md:py-24 ${sectionPillars.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <div className="mb-8 md:mb-10">
            <WordReveal
              text="Four Pillars"
              isVisible={sectionPillars.isVisible}
              className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
            />
            <div
              className={`mt-4 h-[2px] w-full max-w-[220px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionPillars.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`rounded-3xl border border-[#C4935A99] bg-[#FFFBF4] p-6 shadow-[0_12px_28px_rgba(30,77,43,0.1)] transition-all duration-700 ease-out md:p-7 ${sectionPillars.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C4935A99] bg-white">
                  {pillar.icon}
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">{pillar.kicker}</p>
                <h3 className="mt-3 text-2xl font-black text-[#1E4D2B]">{pillar.title}</h3>
                <p className="mt-3 text-base leading-8 text-[#4B3E2E]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={sectionIndustries.ref}
        className={`bg-[#FFFDF9] py-20 transition-all duration-700 ease-out md:py-24 ${sectionIndustries.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <WordReveal
            text="Built for the industries that need it most."
            isVisible={sectionIndustries.isVisible}
            className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
          />
          <p className="mt-4 text-lg font-semibold tracking-[0.02em] text-[#B5813A]">
            If your customers carry things out, we have a bag for them.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#4B3E2E] md:text-lg">
            We've fulfilled orders for some of the most regulated and detail-oriented industries in the country. If
            presentation matters to your customers, it matters to us.
          </p>
          <div
            className={`mt-7 h-[2px] w-full max-w-[320px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionIndustries.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <div className="mt-8">
            <div className="flex flex-wrap gap-3">
              {industries.map((industry, index) => (
                <span
                  key={industry}
                  className={`inline-flex rounded-full border px-4 py-2.5 text-sm font-bold tracking-[0.02em] transition-all duration-700 ease-out md:text-base ${
                    industry === 'Anyone who needs bags'
                      ? 'border-[#B5813A] bg-[#FFF8EA] italic text-[#5F4D33]'
                      : 'border-[#C4935A99] bg-[#FFFDF9] text-[#1E4D2B]'
                  } ${sectionIndustries.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-6'}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={sectionTimeline.ref}
        className={`bg-[#FAF6F0] py-20 transition-all duration-700 ease-out md:py-24 ${sectionTimeline.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <WordReveal
            text="Simple by design."
            isVisible={sectionTimeline.isVisible}
            className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
          />
          <div
            className={`mt-4 h-[2px] w-full max-w-[170px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionTimeline.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />

          <div className="mt-10 hidden items-start md:flex">
            {workflowSteps.map((step, index) => (
              <div key={`desktop-step-${step.title}`} className="flex flex-1 items-start">
                <article
                  className={`w-full rounded-3xl border border-[#C4935A99] bg-[#FFFDF9] p-6 shadow-[0_10px_25px_rgba(30,77,43,0.08)] transition-all duration-700 ease-out ${timelineStep >= index + 1 ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">Step {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-black text-[#1E4D2B]">{step.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[#4B3E2E]">{step.copy}</p>
                </article>
                {index < workflowSteps.length - 1 && (
                  <div className="px-4 pt-16">
                    <div
                      className={`h-[2px] w-16 origin-left bg-[#C4935A] transition-transform duration-500 ease-out ${timelineStep >= index + 2 ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:hidden">
            {workflowSteps.map((step, index) => (
              <div key={`mobile-step-${step.title}`} className="relative pl-6">
                {index < workflowSteps.length - 1 && (
                  <span
                    className={`absolute left-[11px] top-8 h-16 w-[2px] origin-top bg-[#C4935A] transition-transform duration-500 ease-out ${timelineStep >= index + 2 ? 'scale-y-100' : 'scale-y-0'}`}
                  />
                )}
                <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border border-[#B5813A] bg-white" />
                <article
                  className={`rounded-2xl border border-[#C4935A99] bg-[#FFFDF9] p-5 transition-opacity duration-700 ease-out ${timelineStep >= index + 1 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">Step {index + 1}</p>
                  <h3 className="mt-1.5 text-xl font-black text-[#1E4D2B]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4B3E2E]">{step.copy}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={sectionShipping.ref}
        className={`bg-[#FFFDF9] py-20 transition-all duration-700 ease-out md:py-24 ${sectionShipping.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#B5813A]">
            Shipping That Works Around Your Business
          </p>
          <WordReveal
            text="Transparent shipping. No surprises on your invoice."
            isVisible={sectionShipping.isVisible}
            className="heading-serif mt-3 text-3xl font-black text-[#1E4D2B] md:text-5xl"
          />
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#4B3E2E] md:text-lg">
            We keep our shipping simple and predictable so you can build accurate margins into every drop ship order
            before you ever send it to us.
          </p>
          <div
            className={`mt-7 h-[2px] w-full max-w-[320px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionShipping.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {shippingCards.map((card, index) => (
              <article
                key={card.headline}
                className={`rounded-3xl border border-[#C4935A99] bg-[#FFFBF4] p-6 shadow-[0_12px_28px_rgba(30,77,43,0.1)] transition-all duration-700 ease-out md:p-7 ${sectionShipping.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-black text-[#1E4D2B]">{card.headline}</h3>
                <p className="mt-3 text-base leading-8 text-[#4B3E2E]">{card.body}</p>

                {card.headline === 'Zone-Based Fuel Surcharge' && (
                  <>
                    <div className="mt-5 grid gap-2">
                      {fuelSurchargeZones.map((zone) => (
                        <div key={zone.label} className="surface-card rounded-xl px-4 py-3">
                          <p className="text-xs font-black uppercase tracking-[0.1em] text-[#7A6548]">{zone.label}</p>
                          <p className="mt-1 text-lg font-black text-[#1E4D2B]">{zone.value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#5F4D33]">
                      FSC rates reflect UPS pricing and are subject to change based on current fuel indexes.
                    </p>
                  </>
                )}
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-base italic text-[#B5813A] md:text-lg">
            We can ship on your UPS, FedEx, or preferred carrier account — just let us know when you set up your
            partner account.
          </p>
        </div>
      </section>

      <section
        ref={sectionTrust.ref}
        className={`bg-[#FAF6F0] py-20 transition-all duration-700 ease-out md:py-24 ${sectionTrust.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <WordReveal
            text="A supplier worth trusting."
            isVisible={sectionTrust.isVisible}
            className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
          />
          <div
            className={`mt-4 h-[2px] w-full max-w-[230px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionTrust.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <article
                key={stat.number}
                className={`rounded-3xl border border-[#C4935A99] bg-[#FFFDF9] p-6 text-center transition-all duration-700 ease-out ${sectionTrust.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
                style={{ transitionDelay: `${index * 160}ms` }}
              >
                <p className="heading-serif text-4xl font-black text-[#1E4D2B] md:text-5xl">{stat.number}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">{stat.label}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-base leading-8 text-[#4B3E2E] md:text-lg">
            We're a family-owned supplier. We don't treat partners like ticket numbers. When you reach out, you talk
            to a real person who knows your account, knows your products, and is invested in making your program
            succeed.
          </p>
          <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-8 text-[#4B3E2E] md:text-lg">
            We've shipped for pharmacies across the Southeast, dispensaries from coast to coast, veterinary groups,
            event production companies, and boutique retailers who needed a quiet, reliable partner. We don't compete
            with our resellers. We exist to make them look good.
          </p>
        </div>
      </section>

      <section
        ref={sectionFaq.ref}
        className={`bg-[#FFFDF9] py-20 transition-all duration-700 ease-out md:py-24 ${sectionFaq.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
      >
        <div className="section-container">
          <WordReveal
            text="Common Questions"
            isVisible={sectionFaq.isVisible}
            className="heading-serif text-3xl font-black text-[#1E4D2B] md:text-5xl"
          />
          <div
            className={`mt-4 h-[2px] w-full max-w-[220px] origin-left bg-[#C4935A] transition-transform duration-700 ease-out ${sectionFaq.isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <div className="mt-8 grid gap-4">
            {faqs.map((item, index) => (
              <article
                key={item.question}
                className={`rounded-2xl border border-[#C4935A99] bg-[#FFFBF4] p-5 transition-all duration-700 ease-out md:p-6 ${sectionFaq.isVisible ? 'opacity-100 md:translate-y-0' : 'opacity-0 md:translate-y-8'}`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <h3 className="text-xl font-black text-[#1E4D2B]">{item.question}</h3>
                <p className="mt-3 text-base leading-8 text-[#4B3E2E]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={sectionCta.ref}
        className={`py-20 transition-all duration-700 ease-out md:py-24 ${sectionCta.isVisible ? 'opacity-100 md:scale-100' : 'opacity-0 md:scale-[0.98]'}`}
      >
        <div className="section-container">
          <div
            className={`rounded-[2rem] border border-[#C4935A99] bg-[#1E4D2B] p-7 text-[#FAF6F0] shadow-[0_24px_48px_rgba(30,77,43,0.3)] transition-all duration-1000 ease-out md:p-12 ${sectionCta.isVisible ? 'animate-[pulse_4s_ease-in-out_infinite] shadow-[0_0_56px_rgba(181,129,58,0.24)]' : ''}`}
          >
            <WordReveal
              text="Ready to start shipping under your brand?"
              isVisible={sectionCta.isVisible}
              className="heading-serif text-3xl font-black text-[#FAF6F0] md:text-5xl"
            />
            <p className="mt-5 text-lg font-semibold tracking-[0.02em] text-[#C4935A]">
              Reach out to our drop ship team and let's talk about what a partnership looks like for your business.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#F4E8D8] md:text-base">
              Most partners are up and running within 48 hours of their first conversation. There's no lengthy
              approval process — just a quick call or email to make sure we're aligned.
            </p>
            <p className="mt-3 text-sm italic leading-7 text-[#FAF6F0] md:text-base">
              We onboard new drop ship partners on a rolling basis — reach out early to get your account set up
              before your next selling season.
            </p>
            <a href="/api/partners/dropship-application" className="btn-secondary-inverse mt-6">
              Download Partner Application
            </a>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-[#C4935A99] bg-[#FAF6F0] p-5 text-[#1E4D2B]">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">General Inquiries</p>
                <p className="mt-3 text-sm font-semibold text-[#5F4D33]">Drop Ship Team</p>
                <a
                  href="mailto:dropship@bagsupplyco.com"
                  className="mt-1 inline-block text-lg font-black text-[#1E4D2B] underline"
                >
                  dropship@bagsupplyco.com
                </a>
              </article>
              <article className="rounded-2xl border border-[#C4935A99] bg-[#FAF6F0] p-5 text-[#1E4D2B]">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B5813A]">Direct Contact</p>
                <p className="mt-3 text-sm font-semibold text-[#5F4D33]">Marc Castella, BagSupplyCo</p>
                <a
                  href="mailto:Marc.Castella@bagsupplyco.com"
                  className="mt-1 block text-lg font-black text-[#1E4D2B] underline"
                >
                  Marc.Castella@bagsupplyco.com
                </a>
                <a href="tel:+17048629256" className="mt-1 block text-base font-bold text-[#1E4D2B] underline">
                  (704) 862-9256
                </a>
              </article>
            </div>
            <p className="mt-7 text-sm text-[#F4E8D8]">
              Serving pharmacies, dispensaries, vet clinics, wineries, event companies, and retailers nationwide from
              Monroe, NC.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
