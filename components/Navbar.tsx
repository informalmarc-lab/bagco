'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/pharmacy-bags', label: 'Pharmacy Bags' },
  { href: '/catalog', label: 'Catalogs' },
  { href: '/custom-printing', label: 'Custom Printing' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-200/80 bg-[rgba(255,251,244,0.92)] backdrop-blur-xl">
      <div className="section-container">
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-lg font-black text-amber-100 shadow-md">
              BS
            </span>
            <span className="hidden sm:inline">Bag Supply Co</span>
            <span className="sm:hidden">BagCo</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={pricingMailto}
              className="rounded-md border border-amber-900/20 bg-amber-50 px-3 py-2 text-sm font-bold text-slate-900 hover:bg-amber-100"
            >
              {contactEmail}
            </a>
            <a
              href={pricingMailto}
              className="btn-primary px-4 py-2 text-sm"
            >
              Email Us for Pricing
            </a>
          </div>

          <button
            className="text-slate-700 hover:text-slate-900 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden border-t border-amber-200 py-3 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                  pathname === link.href || (link.href === '/catalog' && pathname.startsWith('/catalog'))
                    ? 'bg-slate-900 text-amber-50'
                    : 'text-slate-700 hover:bg-amber-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-amber-200 pb-5 md:hidden">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-2 font-semibold ${
                    pathname === link.href || (link.href === '/catalog' && pathname.startsWith('/catalog'))
                      ? 'bg-slate-900 text-amber-50'
                      : 'text-slate-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={pricingMailto}
                className="mt-2 rounded-md border border-amber-900/20 bg-amber-50 px-3 py-2 font-bold text-slate-900"
              >
                {contactEmail}
              </a>
              <a
                href={pricingMailto}
                className="btn-primary w-full text-center"
              >
                Email Us for Pricing
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
