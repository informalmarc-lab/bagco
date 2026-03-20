'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CartLink from '@/components/cart/CartLink'
import { contactTextHref } from '@/components/siteConfig'

const industryLinks = [
  { href: '/industries/pharmacies', label: 'Pharmacies' },
  { href: '/industries/veterinary', label: 'Veterinary' },
  { href: '/industries/dispensary', label: 'Dispensaries' },
  { href: '/industries/smoke-shops', label: 'Smoke Shops' },
  { href: '/catalog/custom', label: 'Custom Bags' },
  { href: '/industries/distributors', label: 'Distributors' },
]

const catalogLinks = [
  { href: '/catalog', label: 'All Catalogs' },
  { href: '/catalog/pharmacy', label: 'Pharmacy' },
  { href: '/catalog/veterinary', label: 'Veterinary' },
  { href: '/catalog/custom', label: 'Custom 1/2/3 Color' },
  { href: '/catalog/mylar-bags', label: 'Mylar Bags' },
  { href: '/catalog/labels', label: 'Labels' },
]

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/generic-bag-quote', label: 'Build a Quote' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`print-hide sticky top-0 z-50 transition-all ${
        isScrolled
          ? 'border-b border-[#B5813A] bg-[#FAF6F0]/85 backdrop-blur-[12px] shadow-[0_10px_30px_rgba(30,77,43,0.12)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav className="flex min-h-[74px] items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B5813A] text-sm font-black text-white shadow-lg">
              BS
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1E4D2B]">Bag Supply Co</p>
              <p className="text-sm font-semibold text-[#1E4D2B]">Packaging Partner</p>
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
                href="/catalog"
                className={`nav-chip ${pathname.startsWith('/catalog') ? 'nav-chip-active' : ''}`}
                aria-haspopup="menu"
              >
                Catalogs
              </Link>
              <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 w-64 rounded-xl border border-[#C4935A66] bg-white p-2 opacity-0 shadow-[0_14px_30px_rgba(30,77,43,0.14)] transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                {catalogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0] focus:bg-[#FAF6F0]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="group relative">
              <Link
                href="/industries"
                className={`nav-chip ${pathname.startsWith('/industries') ? 'nav-chip-active' : ''}`}
                aria-haspopup="menu"
              >
                Industries
              </Link>
              <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-30 w-56 rounded-xl border border-[#C4935A66] bg-white p-2 opacity-0 shadow-[0_14px_30px_rgba(30,77,43,0.14)] transition-all group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                {industryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0] focus:bg-[#FAF6F0]"
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

          <div className="hidden w-full max-w-[280px] items-center gap-2 lg:flex">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitSearch()
              }}
              placeholder="Search bags, sizes, industries..."
              className="w-full rounded-md border border-[#C4935A66] bg-white px-3 py-2 text-sm text-[#1E4D2B]"
              aria-label="Search bags, sizes, industries"
            />
            <button type="button" onClick={submitSearch} className="btn-secondary px-3 py-2">
              Go
            </button>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <CartLink />
            <a href={contactTextHref} className="btn-primary">
              Text (704) 862-9256
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#B5813A] bg-[#FAF6F0] text-[#1E4D2B] lg:hidden"
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

        <div className="pb-2 lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#C4935A66] bg-white text-[#1E4D2B]"
            aria-label="Toggle search"
          >
            {'\u{1F50E}'}
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
                className="w-full rounded-md border border-[#C4935A66] bg-white px-3 py-2 text-sm text-[#1E4D2B]"
                aria-label="Search bags, sizes, industries"
              />
              <button type="button" onClick={submitSearch} className="btn-secondary px-3 py-2">
                Go
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div id="mobile-menu" className="pb-4 lg:hidden">
            <div className="rounded-2xl border border-[#C4935A66] bg-white p-3 shadow-[0_16px_40px_rgba(30,77,43,0.15)]">
              <div className="grid gap-1">
                <Link
                  href="/"
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname === '/' ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/industries"
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname.startsWith('/industries') ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Industries
                </Link>
                <Link
                  href="/catalog"
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pathname.startsWith('/catalog') ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Catalogs
                </Link>
                <div className="grid gap-1 border-l border-[#C4935A66] pl-3">
                  {catalogLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="grid gap-1 border-l border-[#C4935A66] pl-3">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
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
                      isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <CartLink mobile onClick={() => setIsOpen(false)} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <a href={contactTextHref} className="btn-secondary justify-center">
                  Text (704) 862-9256
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



