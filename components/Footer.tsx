import Link from 'next/link'
import {
  contactAddress,
  contactEmail,
  contactEmailHref,
  contactHours,
  contactPhone,
  contactTextHref,
} from '@/components/siteConfig'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-kraft-300/30 bg-brand-600 text-cream">
      <div className="section-container py-16 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/15 pb-10">
          <div>
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-white md:text-3xl">Need pricing or reorder help?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#E9DFD0]">
              Talk to our team about stock programs, custom print, and distributor fulfillment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">
              Build a Quote
            </Link>
            <a href={contactTextHref} className="btn-secondary-inverse">
              Text {contactPhone}
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr_1fr_1.05fr]">
          <div>
            <h3 className="font-serif text-xl tracking-[-0.01em] text-cream">Bag Supply Co</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#FAF6F0CC]">
              Factory-direct paper bag manufacturing and structured replenishment for pharmacy, veterinary, dispensary, smoke shop, and distributor operations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-accent-300">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/industries" className="footer-link">Industries</Link></li>
              <li><Link href="/manufacturing" className="footer-link">Manufacturing</Link></li>
              <li><Link href="/shipping" className="footer-link">Shipping</Link></li>
              <li><Link href="/payments" className="footer-link">Payments</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-accent-300">Industries & Catalogs</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/distributors" className="footer-link">Distributors</Link></li>
              <li><Link href="/catalog/pharmacy" className="footer-link">Pharmacy</Link></li>
              <li><Link href="/catalog/veterinary" className="footer-link">Veterinary</Link></li>
              <li><Link href="/industries/dispensary" className="footer-link">Dispensaries</Link></li>
              <li><Link href="/industries/smoke-shops" className="footer-link">Smoke Shops</Link></li>
              <li><Link href="/catalog/mylar-bags" className="footer-link">Mylar Bags</Link></li>
              <li><Link href="/catalog/custom" className="footer-link">Custom 1/2/3 Color</Link></li>
              <li><Link href="/gallery" className="footer-link">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.08em] text-accent-300">Contact</h4>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-brand-700/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-300">Reach us</p>
                <div className="mt-3 space-y-2">
                  <div><Link href="/contact" className="footer-link font-semibold">Contact Form</Link></div>
                  <div><a href={contactTextHref} className="footer-link">Text {contactPhone}</a></div>
                  <div><a href={contactEmailHref} className="footer-link">{contactEmail}</a></div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-brand-700/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-300">Location & Hours</p>
                <div className="mt-3 space-y-1 text-sm text-[#FAF6F0CC]">
                  {contactAddress.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p className="pt-2 text-[#FAF6F0]">{contactHours[0]}</p>
                  <p className="text-xs text-[#FAF6F0B3]">{contactHours[1]}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-brand-700/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-300">Follow along</p>
                <div className="mt-3 space-y-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61586254914821"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Follow us on Facebook
                  </a>
                  <p className="text-xs text-[#FAF6F0CC]">See our latest bag designs and client features.</p>
                  <p className="text-sm text-[#FAF6F0]">Tag us @bagsupplyco for a feature</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link href="/terms" className="footer-link inline-flex rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold">
                  Terms &amp; Conditions
                </Link>
                <Link href="/privacy-policy" className="footer-link inline-flex rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold">
                  Privacy Policy
                </Link>
                <Link href="/sitemap.xml" className="footer-link inline-flex rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold">
                  Sitemap XML
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 text-xs text-[#FAF6F0AA]">
          <p>&copy; {new Date().getFullYear()} Bag Supply Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
