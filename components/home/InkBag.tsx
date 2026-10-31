'use client'

import { useState } from 'react'

// Approximate on-screen versions of stock uncoated inks. Real ink on white kraft paper reads slightly softer.
export const STOCK_INKS = [
  { name: 'Kelly Green 347U', hex: '#1E9A52' },
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Reflex Blue U', hex: '#2E3A93' },
  { name: 'Red 185U', hex: '#DD3B47' },
  { name: 'Purple 527U', hex: '#8550AE' },
  { name: 'Orange 158U', hex: '#EC7A34' },
  { name: 'Hunter Green 567U', hex: '#2F5D50' },
  { name: 'Process Blue U', hex: '#1689C9' },
] as const

export default function InkBag() {
  const [ink, setInk] = useState<(typeof STOCK_INKS)[number]>(STOCK_INKS[0])

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 300 420"
        className="h-auto w-[240px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.28)] sm:w-[290px]"
        role="img"
        aria-label={`White paper bag printed with a sample logo in ${ink.name}`}
      >
        {/* bag body with serrated top */}
        <path
          d="M30 22 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 l7.5 -8 l7.5 8 V404 H30 Z"
          fill="#FFFFFF"
        />
        {/* gusset shading */}
        <path d="M30 22 L52 40 V384 L30 404 Z" fill="#E9EAE6" />
        <path d="M270 22 L248 40 V384 L270 404 Z" fill="#E9EAE6" />
        <line x1="52" y1="384" x2="248" y2="384" stroke="#DADBD6" strokeWidth="1.5" />
        <line x1="30" y1="60" x2="270" y2="60" stroke="#EFEFEC" strokeWidth="1" />

        {/* sample logo: printed in the chosen ink */}
        <g style={{ transition: 'fill 220ms ease, stroke 220ms ease' }} fill={ink.hex} stroke={ink.hex}>
          <circle cx="150" cy="178" r="62" fill="none" strokeWidth="7" style={{ transition: 'stroke 220ms ease' }} />
          <path
            d="M150 136 C176 152 182 186 150 220 C118 186 124 152 150 136 Z"
            stroke="none"
            style={{ transition: 'fill 220ms ease' }}
          />
          <text
            x="150"
            y="276"
            textAnchor="middle"
            stroke="none"
            fontSize="22"
            fontWeight="800"
            letterSpacing="1"
            style={{ fontFamily: 'var(--font-display), sans-serif', transition: 'fill 220ms ease' }}
          >
            Your Dispensary
          </text>
        </g>
        <g fill="#1A1A1A" fontSize="11" textAnchor="middle" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
          <text x="150" y="306">123 Main Street, Your Town</text>
          <text x="150" y="324">License #000000</text>
        </g>
      </svg>

      <fieldset className="mt-8 w-full max-w-[340px]">
        <legend className="text-sm text-white/80">
          Try a stock ink: <span className="font-semibold text-white">{ink.name}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
          {STOCK_INKS.map((option) => {
            const selected = option.name === ink.name
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => setInk(option)}
                aria-pressed={selected}
                aria-label={option.name}
                title={option.name}
                className={`h-8 w-8 rounded-full sm:h-9 sm:w-9 border-2 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
                  selected ? 'scale-110 border-white' : 'border-white/30 hover:border-white/70'
                }`}
                style={{ backgroundColor: option.hex }}
              />
            )
          })}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Up to 3 colors on the front. Pick from 24 stock inks, or match your brand color for a one-time ink charge.
        </p>
      </fieldset>
    </div>
  )
}
