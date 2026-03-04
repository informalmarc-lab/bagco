'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { contactTextHref } from '@/components/siteConfig'

const industryLinks = [
  { href: '/industries/dispensaries', label: 'Dispensaries' },
  { href: '/industries/smoke-shops', label: 'Smoke Shops' },
  { href: '/industries/pharmacies', label: 'Pharmacies' },
  { href: '/industries/retail-stores', label: 'Retail Stores' },
]

const navLinks = [
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
    <header className="print-hide sticky top-0 z-50 border-b border-white/35 bg-[rgba(250,252,255,0.78)] backdrop-blur-xl">
      <div className="section-container">
        <nav className="flex min-h-[74px] items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white shadow-lg">
              BS
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Bag Supply Co</p>
              <p className="text-sm font-semibold text-slate-800">Packaging Partner</p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className={`nav-chip ${pathname === '/' ? 'nav-chip-active' : ''}`}
            >
              Home
            </Link>
            <div className="group relative">
              <Link
                href="/industries"
                className={`nav-chip ${pathname.startsWith('/industries') ? 'nav-chip-active' : ''}`}
              >
                Industries
              </Link>
              <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_14px_30px_rgba(15,23,42,0.14)] transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                {industryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-chip ${isActive(link.href) ? 'nav-chip-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={contactTextHref} className="btn-quiet">
              Text (252) 516-1944
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-900 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {isOpen && (
          <div id="mobile-menu" className="pb-4 lg:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <div className="grid gap-1">
                <Link
                  href="/"
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname === '/' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/industries"
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname.startsWith('/industries') ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Industries
                </Link>
                <div className="grid gap-1 border-l border-slate-200 pl-3">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      isActive(link.href) ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <a href={contactTextHref} className="btn-quiet justify-center">
                  Text (252) 516-1944
                </a>
                <Link href="/about" className="btn-secondary justify-center" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
