import Link from 'next/link'
import { contactInfo } from '@/lib/products'

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/quote', label: 'Quote' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-bone">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Bud Bags home">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-leaf text-sm font-black text-white">BB</span>
          <span>
            <span className="block text-lg font-black leading-5 text-leaf">Bud Bags</span>
            <span className="block text-xs font-semibold text-mute">Paper exit bags for cannabis shops</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-ink hover:text-leaf">
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={contactInfo.textHref} className="btn-primary hidden sm:inline-flex">
          Text {contactInfo.phone}
        </a>
      </div>
      <nav className="container-page flex gap-4 overflow-x-auto border-t border-line py-3 md:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap text-sm font-bold text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
