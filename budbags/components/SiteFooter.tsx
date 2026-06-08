import Link from 'next/link'
import { contactInfo } from '@/lib/products'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-leaf text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="text-xl font-black">Bud Bags</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#F4E8D8]">
            Factory-direct custom printed and stock paper bags for dispensary owners managing checkout branding, bag-law pressure, and fast reorder needs.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black">Pages</h3>
          <div className="mt-3 grid gap-2 text-sm text-[#F4E8D8]">
            <Link href="/products" className="hover:text-white">Products</Link>
            <Link href="/quote" className="hover:text-white">Quote configurator</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black">Contact</h3>
          <div className="mt-3 grid gap-2 text-sm text-[#F4E8D8]">
            <a href={contactInfo.phoneHref} className="hover:text-white">{contactInfo.phone}</a>
            <p>{contactInfo.address}</p>
            <p>{contactInfo.support}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page py-4 text-sm text-[#F4E8D8]">
          &copy; {new Date().getFullYear()} Bud Bags. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
