'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import InkBag from '@/components/home/InkBag'
import SizeLineup, { type LineupBag } from '@/components/home/SizeLineup'
import { contactPhone, contactTextHref } from '@/components/siteConfig'

type AudienceKey = 'dispensary' | 'pharmacy' | 'vet'

type Audience = {
  key: AudienceKey
  tab: string
  intro: string
  bagName: string
  bagLines: [string, string]
  mark: 'leaf' | 'cross' | 'paw'
  sizesTitle: string
  moreHref: string
  moreLabel: string
  lineup: LineupBag[]
}

const AUDIENCES: Audience[] = [
  {
    key: 'dispensary',
    tab: 'Dispensaries',
    intro: 'Opaque white paper exit bags, printed with your logo, license number, and required warnings.',
    bagName: 'Your Dispensary',
    mark: 'leaf',
    bagLines: ['123 Main Street, Your Town', 'License #000000'],
    sizesTitle: 'Three sizes cover most dispensaries.',
    moreHref: '/dispensaries',
    moreLabel: 'More about dispensary bags',
    lineup: [
      { item: '#23', label: 'Pinch bottom', w: 5, d: 2, h: 10, minimum: 12000, note: 'Pre-rolls, carts, edibles' },
      { item: '#25', label: 'Square bottom', w: 6, d: 3.5, h: 11, minimum: 6000, note: 'Most popular exit bag' },
      { item: '#26', label: 'Square bottom', w: 6.5, d: 4, h: 13.5, minimum: 4000, note: 'Bigger baskets and jars' },
    ],
  },
  {
    key: 'pharmacy',
    tab: 'Pharmacies',
    intro: 'Prescription bags with your pharmacy name and logo, or stock Rx designs with no minimum.',
    bagName: 'Your Pharmacy',
    mark: 'cross',
    bagLines: ['123 Main Street, Your Town', '(555) 555-0100'],
    sizesTitle: 'Three prescription bag sizes.',
    moreHref: '/catalog/pharmacy',
    moreLabel: 'See stock pharmacy bags',
    lineup: [
      { item: '#21', label: 'Pinch bottom', w: 3.5, d: 1.5, h: 10, minimum: 12000, note: 'Single scripts' },
      { item: '#22', label: 'Pinch bottom', w: 4.5, d: 2.25, h: 11, minimum: 12000, note: 'Two or three scripts' },
      { item: '#23', label: 'Pinch bottom', w: 5, d: 2, h: 10, minimum: 12000, note: 'Boxes and bigger fills' },
    ],
  },
  {
    key: 'vet',
    tab: 'Vet clinics',
    intro: 'Medication and carryout bags printed with your clinic name, phone, and logo.',
    bagName: 'Your Clinic',
    mark: 'paw',
    bagLines: ['123 Main Street, Your Town', '(555) 555-0100'],
    sizesTitle: 'Three sizes most clinics use.',
    moreHref: '/catalog/veterinary',
    moreLabel: 'See stock vet bags',
    lineup: [
      { item: '#22', label: 'Pinch bottom', w: 4.5, d: 2.25, h: 11, minimum: 12000, note: 'Pills and liquids' },
      { item: '#12', label: 'Flat', w: 7, d: 0, h: 10, minimum: 12000, note: 'Flea, tick, and boxed meds' },
      { item: '#25', label: 'Square bottom', w: 6, d: 3.5, h: 11, minimum: 6000, note: 'Food samples and supplies' },
    ],
  },
]

function isAudienceKey(value: string | null): value is AudienceKey {
  return value === 'dispensary' || value === 'pharmacy' || value === 'vet'
}

export default function AudienceHome() {
  const [key, setKey] = useState<AudienceKey>('dispensary')
  const audience = AUDIENCES.find((item) => item.key === key) ?? AUDIENCES[0]

  // Mailers and ads can link to /?for=pharmacy, /?for=vet, or /?for=dispensary.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('for')
    if (isAudienceKey(requested)) setKey(requested)
  }, [])

  function choose(next: AudienceKey) {
    setKey(next)
    const url = new URL(window.location.href)
    url.searchParams.set('for', next)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      <section className="bg-[#1E4D2B] text-white">
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 md:pt-14">
          <div role="group" aria-label="Show bags for" className="inline-flex gap-1 rounded-lg bg-black/20 p-1">
            {AUDIENCES.map((item) => {
              const selected = item.key === key
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(item.key)}
                  className={`min-h-[44px] whitespace-nowrap rounded-md px-3 text-sm font-bold sm:px-5 sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    selected ? 'bg-white text-[#1E4D2B]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.tab}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-10 sm:px-8 md:pb-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1
              className="font-display text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
              style={{ fontStretch: '78%', color: '#FFFFFF' }}
            >
              Your logo on every bag that leaves the counter.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-white/85" aria-live="polite">
              {audience.intro} Made in Monroe, North Carolina by a family that has been making bags since 1955.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/makeyourquote"
                className="inline-flex min-h-[52px] items-center rounded-md bg-white px-7 text-base font-bold text-[#1E4D2B] hover:bg-[#F1F1EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get a price
              </Link>
              <a
                href={contactTextHref}
                className="inline-flex min-h-[52px] items-center rounded-md border-2 border-white/60 px-7 text-base font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Text {contactPhone}
              </a>
            </div>
            <p className="mt-5 text-sm text-white/70">Prices online, no sales call needed. Most quotes take 2 minutes.</p>
          </div>
          <InkBag name={audience.bagName} lines={audience.bagLines} mark={audience.mark} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2
          className="font-display text-4xl font-extrabold tracking-[-0.01em] text-[#1A1A1A] sm:text-5xl"
          style={{ fontStretch: '78%' }}
        >
          {audience.sizesTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#3D3D39]">
          Drawn to scale, so you can see what fits your counter.{' '}
          <Link
            href={audience.moreHref}
            className="font-semibold text-[#1E4D2B] underline decoration-1 underline-offset-4 hover:text-[#1A1A1A]"
          >
            {audience.moreLabel}
          </Link>
        </p>
        <div className="mt-12">
          <SizeLineup lineup={audience.lineup} />
        </div>
      </section>
    </>
  )
}
