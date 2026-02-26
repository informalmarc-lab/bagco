'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/industries', label: 'Industries' },
  { href: '/catalog', label: 'Catalogs' },
  { href: '/generic-bag-quote', label: 'Quote Tool' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-[rgba(2,6,23,0.9)] backdrop-blur-xl">
      <div className="section-container">
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-100"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-300 text-lg font-black text-slate-950 shadow-md">
              BC
            </span>
            <span className="hidden sm:inline">Bag Co</span>
            <span className="sm:hidden">BagCo</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex print-hide">
            <Link href="/generic-bag-quote" className="rounded-md bg-amber-300 px-4 py-2 text-sm font-black text-slate-950 hover:bg-amber-200">
              Request a Custom Quote
            </Link>
            <Link href="/contact" className="rounded-md border border-slate-400/60 bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/20">
              Speak With Our Team
            </Link>
          </div>

          <button
            className="text-slate-300 hover:text-white md:hidden"
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

        <div className="hidden border-t border-slate-700 py-3 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-amber-300 text-slate-950'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-slate-700 pb-5 md:hidden">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-2 font-semibold ${
                    isActive(link.href)
                      ? 'bg-amber-300 text-slate-950'
                      : 'text-slate-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/generic-bag-quote" className="mt-2 rounded-md bg-amber-300 px-4 py-3 text-center font-black text-slate-950">
                Request a Custom Quote
              </Link>
              <Link href="/contact" className="rounded-md border border-slate-400/60 bg-white/10 px-4 py-3 text-center font-black text-white">
                Speak With Our Team
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
