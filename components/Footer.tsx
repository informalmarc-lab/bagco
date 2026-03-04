import Link from 'next/link'
import {
  contactAddress,
  contactEmail,
  contactPhone,
  contactTextHref,
  pricingMailto,
} from '@/components/siteConfig'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="section-container py-16">
        <div className="rounded-3xl border border-slate-700 bg-[linear-gradient(135deg,#111827,#1f2937_55%,#0b1220)] p-8 md:p-10">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-200">
            Ready to standardize packaging?
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-4xl">
            Build a predictable packaging program in one call.
          </h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            We help teams choose the right catalog, lock in repeat supply, and ship with a clear schedule.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Open Quote Tool
            </Link>
            <a href={contactTextHref} className="btn-quiet border-white/30 text-white hover:bg-white/15">
              Text {contactPhone}
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-black text-white">Bag Supply Co</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Factory-direct paper bag manufacturing and structured replenishment for retail, pharmacy, and veterinary operations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-slate-400">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link href="/manufacturing" className="hover:text-white">Manufacturing</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
              <li><Link href="/payments" className="hover:text-white">Payments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-slate-400">Catalogs</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/catalog/pharmacy" className="hover:text-white">Pharmacy</Link></li>
              <li><Link href="/catalog/veterinary" className="hover:text-white">Veterinary</Link></li>
              <li><Link href="/catalog/custom" className="hover:text-white">Custom 1/2/3 Color</Link></li>
              <li><Link href="/catalog/legacy" className="hover:text-white">Legacy Collections</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-slate-400">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={pricingMailto} className="font-semibold text-slate-100 hover:text-white">
                  {contactEmail}
                </a>
              </li>
              <li><a href={contactTextHref} className="hover:text-white">Text {contactPhone}</a></li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61586254914821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>{contactAddress[0]}</li>
              <li>{contactAddress[1]}</li>
              <li>
                <Link href="/privacy-policy" className="inline-flex rounded-md border border-slate-600 px-3 py-1.5 text-xs font-semibold hover:bg-slate-800">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Bag Supply Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
