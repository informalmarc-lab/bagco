'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type FocusEvent, useEffect, useState } from 'react'
import CartLink from '@/components/cart/CartLink'
import { contactTextHref } from '@/components/siteConfig'

const industryLinks = [
  { href: '/industries/pharmacies', label: 'Pharmacies' },
  { href: '/industries/veterinary', label: 'Veterinary' },
  { href: '/industries/dispensary', label: 'Dispensaries' },
  { href: '/industries/smoke-shops', label: 'Smoke Shops' },
  { href: '/industries/cigar-shops', label: 'Cigar Shops' },
  { href: '/catalog/custom', label: 'Custom Bags' },
  { href: '/distributors', label: 'Distributors' },
]

const catalogLinks = [
  { href: '/catalog', label: 'All Catalogs' },
  { href: '/catalog/pharmacy', label: 'Pharmacy' },
  { href: '/catalog/veterinary', label: 'Veterinary' },
  { href: '/catalog/retail-bags', label: 'Retail Bags' },
  { href: '/catalog/cigar-bags', label: 'Cigar Bags' },
  { href: '/catalog/custom', label: 'Custom 1/2/3 Color' },
  { href: '/catalog/mylar-bags', label: 'Mylar Bags' },
  { href: '/catalog/labels', label: 'Labels' },
]

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<'catalog' | 'industries' | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const submitSearch = () => {
    const term = search.trim()
    if (!term) return
    router.push(`/catalog?search=${encodeURIComponent(term)}`)
    setIsOpen(false)
    setShowMobileSearch(false)
  }

  useEffect(() => {
    setOpenDesktopMenu(null)
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDesktopMenu(null)
        setShowMobileSearch(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeDesktopMenu = () => setOpenDesktopMenu(null)

  const handleDesktopMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeDesktopMenu()
    }
  }

  return (
    <header className="print-hide sticky top-0 z-50 border-b border-kraft-300/50 bg-cream/95 backdrop-blur">
      <div className="section-container">
        <nav className="flex min-h-[80px] items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 pr-2">
            <svg viewBox="0 0 22 26" className="h-8 w-7 flex-shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 9V7a4 4 0 018 0v2" />
              <rect x="2" y="9" width="18" height="15" rx="2" />
              <line x1="7" y1="14" x2="15" y2="14" strokeWidth="1.2" strokeOpacity="0.45" />
            </svg>
            <div>
              <p className="font-serif text-[17px] leading-tight tracking-[-0.01em] text-brand-600">Bag Supply Co</p>
              <p className="text-xs font-medium text-muted">Wholesale bags</p>
            </div>
          </Link>

          <div className="hidden items-stretch gap-1 xl:flex">
            <Link
              href="/"
              className={`nav-chip ${pathname === '/' ? 'nav-chip-active' : ''}`}
              onClick={closeDesktopMenu}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <div
              className="relative flex items-stretch"
              onMouseEnter={() => setOpenDesktopMenu('catalog')}
              onMouseLeave={closeDesktopMenu}
              onFocus={() => setOpenDesktopMenu('catalog')}
              onBlur={handleDesktopMenuBlur}
            >
              <Link
                href="/catalog"
                className={`nav-chip ${pathname.startsWith('/catalog') ? 'nav-chip-active' : ''}`}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === 'catalog'}
                onClick={closeDesktopMenu}
                aria-current={pathname.startsWith('/catalog') ? 'page' : undefined}
              >
                Catalogs
              </Link>
              <div
                className={`absolute left-0 top-[calc(100%-1px)] z-30 w-64 rounded-2xl border border-kraft-300/50 bg-white p-2 pt-3 shadow-[var(--shadow-pop)] transition-all ${
                  openDesktopMenu === 'catalog' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {catalogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-cream focus:bg-cream"
                    onClick={closeDesktopMenu}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="relative flex items-stretch"
              onMouseEnter={() => setOpenDesktopMenu('industries')}
              onMouseLeave={closeDesktopMenu}
              onFocus={() => setOpenDesktopMenu('industries')}
              onBlur={handleDesktopMenuBlur}
            >
              <Link
                href="/industries"
                className={`nav-chip ${pathname.startsWith('/industries') ? 'nav-chip-active' : ''}`}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === 'industries'}
                onClick={closeDesktopMenu}
                aria-current={pathname.startsWith('/industries') ? 'page' : undefined}
              >
                Industries
              </Link>
              <div
                className={`absolute left-0 top-[calc(100%-1px)] z-30 w-56 rounded-2xl border border-kraft-300/50 bg-white p-2 pt-3 shadow-[var(--shadow-pop)] transition-all ${
                  openDesktopMenu === 'industries'
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
              >
                {industryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-cream focus:bg-cream"
                    onClick={closeDesktopMenu}
                    aria-current={isActive(link.href) ? 'page' : undefined}
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
                onClick={closeDesktopMenu}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden w-full max-w-[220px] items-center gap-2 2xl:max-w-[280px] xl:flex">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitSearch()
              }}
              placeholder="Search catalog..."
              className="h-10 w-full rounded-full border border-kraft-300/70 bg-white px-4 text-sm text-brand-600"
              aria-label="Search bags, sizes, industries"
            />
            <button type="button" onClick={submitSearch} className="btn-secondary h-10 min-w-10 px-3">
              Go
            </button>
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <CartLink />
            <Link href="/makeyourquote" className="btn-secondary min-h-[44px] px-4">
              Quote
            </Link>
            <a href={contactTextHref} className="btn-primary min-h-[44px] px-4">
              <span className="2xl:hidden">Text Us</span>
              <span className="hidden 2xl:inline">Text (704) 862-9256</span>
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-kraft-300/70 bg-white text-brand-600 xl:hidden"
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

        <div className="pb-2 xl:hidden">
          <button
            type="button"
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-kraft-300/70 bg-white text-brand-600"
            aria-label="Toggle search"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <line x1="13" y1="13" x2="18" y2="18" />
            </svg>
          </button>
          {showMobileSearch && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submitSearch()
                }}
                placeholder="Search bags, sizes, industries..."
                className="h-10 w-full rounded-full border border-kraft-300/70 bg-white px-4 text-sm text-brand-600"
                aria-label="Search bags, sizes, industries"
              />
              <button type="button" onClick={submitSearch} className="btn-secondary h-10 min-w-10 px-3">
                Go
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div id="mobile-menu" className="pb-4 xl:hidden">
            <div className="rounded-2xl border border-kraft-300/50 bg-white p-3 shadow-[var(--shadow-pop)]">
              <div className="grid gap-1">
                <Link
                  href="/"
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                    pathname === '/' ? 'bg-brand-600 text-white' : 'text-brand-600 hover:bg-cream'
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === '/' ? 'page' : undefined}
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      isActive(link.href) ? 'bg-brand-600 text-white' : 'text-brand-600 hover:bg-cream'
                    }`}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3 px-1">
                  <p className="text-sm font-semibold text-muted">Catalogs</p>
                  <Link
                    href="/catalog"
                    className="text-xs font-bold text-brand-600 underline-offset-2 hover:text-accent-500 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Open All
                  </Link>
                </div>
                <div className="mt-2 grid gap-1 border-l border-kraft-400/40 pl-3">
                  {catalogLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-brand-600 text-white' : 'text-brand-600 hover:bg-cream'
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3 px-1">
                  <p className="text-sm font-semibold text-muted">Industries</p>
                  <Link
                    href="/industries"
                    className="text-xs font-bold text-brand-600 underline-offset-2 hover:text-accent-500 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Open All
                  </Link>
                </div>
                <div className="mt-2 grid gap-1 border-l border-kraft-400/40 pl-3">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-brand-600 text-white' : 'text-brand-600 hover:bg-cream'
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <CartLink mobile onClick={() => setIsOpen(false)} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <Link href="/makeyourquote" className="btn-primary min-h-[44px] justify-center" onClick={() => setIsOpen(false)}>
                  Build a Quote
                </Link>
                <a href={contactTextHref} className="btn-secondary min-h-[44px] justify-center">
                  Text (704) 862-9256
                </a>
                <Link href="/about" className="btn-secondary min-h-[44px] justify-center" onClick={() => setIsOpen(false)}>
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



