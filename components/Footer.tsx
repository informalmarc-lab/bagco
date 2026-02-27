import Link from 'next/link'
import {
  contactAddress,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  pricingMailto,
} from '@/components/siteConfig'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-200/80 bg-slate-950 text-slate-300">
      <div className="section-container py-14">
        <div className="mb-10 rounded-2xl border border-slate-700/70 bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-6 md:p-8">
          <p className="kicker border-white/20 bg-white/10 text-amber-100">Operational Partnership</p>
          <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">Built for Serious Retail Operations</h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Structured support for dispensaries, smoke shops, pharmacies, and retail stores that need reliable packaging supply and professional brand presentation.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/generic-bag-quote" className="rounded-md bg-amber-200 px-4 py-2 font-bold text-slate-950 hover:bg-amber-300">
              Request a Custom Quote
            </Link>
            <Link href="/contact" className="rounded-md border border-white/25 bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20">
              Speak With Our Team
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black text-white heading-serif">Bag Supply Co</h3>
            <p className="mt-3 leading-relaxed text-slate-400">
              Factory direct manufacturer of custom and stock paper bags for independent pharmacies, retailers, and specialty businesses.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-slate-400 transition-colors hover:text-white">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/generic-bag-quote" className="text-slate-400 transition-colors hover:text-white">
                  Quote Tool
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-slate-400 transition-colors hover:text-white">
                  Catalogs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-slate-400 transition-colors hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog/pharmacy" className="text-slate-400 transition-colors hover:text-white">
                  Pharmacy Catalog
                </Link>
              </li>
              <li>
                <Link href="/catalog/veterinary" className="text-slate-400 transition-colors hover:text-white">
                  Veterinary Catalog
                </Link>
              </li>
              <li>
                <Link href="/catalog/custom" className="text-slate-400 transition-colors hover:text-white">
                  Custom 1/2/3 Color Catalog
                </Link>
              </li>
              <li>
                <Link href="/catalog/legacy" className="text-slate-400 transition-colors hover:text-white">
                  All Old Catalogs
                </Link>
              </li>
              <li>
                <Link href="/industries/dispensaries" className="text-slate-400 transition-colors hover:text-white">
                  Dispensary Programs
                </Link>
              </li>
              <li>
                <Link href="/industries/pharmacies" className="text-slate-400 transition-colors hover:text-white">
                  Pharmacy Programs
                </Link>
              </li>
              <li>
                <Link href="/industries#industry-solutions" className="text-slate-400 transition-colors hover:text-white">
                  Events & Hospitality
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href={pricingMailto} className="font-bold text-amber-200 underline decoration-amber-200/50 hover:text-amber-100">
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={contactPhoneHref} className="transition-colors hover:text-white">
                  {contactPhone}
                </a>
              </li>
              <li>
                {contactAddress[0]}
                <br />
                {contactAddress[1]}
              </li>
              <li>
                Mon-Fri: 8:00 AM - 5:00 PM ET
              </li>
              <li>
                Service Area: United States
              </li>
              <li className="pt-2">
                <Link
                  href="/privacy-policy"
                  className="inline-block rounded-md bg-white px-4 py-2 font-bold text-slate-900 hover:bg-amber-50"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500">&copy; {new Date().getFullYear()} Bag Supply Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
