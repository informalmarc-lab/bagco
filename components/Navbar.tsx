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
  const [isScrolled, setIsScrolled] = useState(false)
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
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

          <div className="hidden items-center gap-1 xl:gap-2 xl:flex">
            <Link
              href="/"
              className={`nav-chip ${pathname === '/' ? 'nav-chip-active' : ''}`}
              onClick={closeDesktopMenu}
            >
              Home
            </Link>
            <div
              className="relative flex h-11 items-center"
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
              >
                Catalogs
              </Link>
              <div
                className={`absolute left-0 top-full z-30 w-64 translate-y-2 rounded-xl border border-[#C4935A66] bg-white p-2 shadow-[0_14px_30px_rgba(30,77,43,0.14)] transition-all ${
                  openDesktopMenu === 'catalog' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {catalogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-4 py-2.5 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0] focus:bg-[#FAF6F0]"
                    onClick={closeDesktopMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="relative flex h-11 items-center"
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
              >
                Industries
              </Link>
              <div
                className={`absolute left-0 top-full z-30 w-56 translate-y-2 rounded-xl border border-[#C4935A66] bg-white p-2 shadow-[0_14px_30px_rgba(30,77,43,0.14)] transition-all ${
                  openDesktopMenu === 'industries'
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
              >
                {industryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-4 py-2.5 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0] focus:bg-[#FAF6F0]"
                    onClick={closeDesktopMenu}
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
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden w-full max-w-[200px] items-center gap-2 2xl:max-w-[260px] xl:flex">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitSearch()
              }}
              placeholder="Search catalog..."
              className="h-11 w-full rounded-md border border-[#C4935A66] bg-white px-3 text-sm text-[#1E4D2B]"
              aria-label="Search bags, sizes, industries"
            />
            <button type="button" onClick={submitSearch} className="btn-secondary h-11 min-w-11 px-4">
              Go
            </button>
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <CartLink />
            <Link href="/generic-bag-quote" className="btn-secondary min-h-[44px] px-4">
              Quote
            </Link>
            <a href={contactTextHref} className="btn-primary min-h-[44px] px-4">
              <span className="2xl:hidden">Text Us</span>
              <span className="hidden 2xl:inline">Text (704) 862-9256</span>
            </a>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#B5813A] bg-[#FAF6F0] text-[#1E4D2B] xl:hidden"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#C4935A66] bg-white text-[#1E4D2B]"
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
                className="h-11 w-full rounded-md border border-[#C4935A66] bg-white px-3 text-sm text-[#1E4D2B]"
                aria-label="Search bags, sizes, industries"
              />
              <button type="button" onClick={submitSearch} className="btn-secondary h-11 min-w-11 px-4">
                Go
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div id="mobile-menu" className="pb-4 xl:hidden">
            <div className="rounded-2xl border border-[#C4935A66] bg-white p-3 shadow-[0_16px_40px_rgba(30,77,43,0.15)]">
              <div className="grid gap-1">
                <Link
                  href="/"
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                    pathname === '/' ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                      isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3 px-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#7A6548]">Catalogs</p>
                  <Link
                    href="/catalog"
                    className="text-xs font-bold text-[#1E4D2B] underline-offset-2 hover:text-[#B5813A] hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Open All
                  </Link>
                </div>
                <div className="mt-2 grid gap-1 border-l border-[#C4935A66] pl-3">
                  {catalogLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3 px-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#7A6548]">Industries</p>
                  <Link
                    href="/industries"
                    className="text-xs font-bold text-[#1E4D2B] underline-offset-2 hover:text-[#B5813A] hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Open All
                  </Link>
                </div>
                <div className="mt-2 grid gap-1 border-l border-[#C4935A66] pl-3">
                  {industryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                        isActive(link.href) ? 'bg-[#1E4D2B] text-white' : 'text-[#1E4D2B] hover:bg-[#FAF6F0]'
                      }`}
                      onClick={() => setIsOpen(false)}
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
                <Link href="/generic-bag-quote" className="btn-primary min-h-[44px] justify-center" onClick={() => setIsOpen(false)}>
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



