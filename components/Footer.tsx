import Link from 'next/link'
import {
  contactAddress,
  contactPhone,
  contactTextHref,
} from '@/components/siteConfig'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#B5813A] bg-[#1E4D2B] text-[#FAF6F0]">
      <div className="section-container py-20">
        <div className="rounded-3xl border border-[#C4935A77] bg-[linear-gradient(135deg,#1E4D2B,#225935_55%,#1A4126)] p-8 md:p-10">
          <p className="inline-flex rounded-full border border-[#F4E8D8AA] bg-[#F4E8D822] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#FAF6F0]">
            Ready to standardize packaging?
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-4xl">
            Build a predictable packaging program in one call.
          </h2>
          <p className="mt-3 max-w-3xl text-[#FAF6F0]">
            We help teams choose the right catalog, lock in repeat supply, and ship with a clear schedule.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <a href={contactTextHref} className="btn-quiet border-[#F4E8D899] text-[#FAF6F0] hover:bg-[#F4E8D822]">
              Text {contactPhone}
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-black text-[#B5813A]">Bag Supply Co</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#FAF6F0CC]">
              Factory-direct paper bag manufacturing and structured replenishment for retail, pharmacy, veterinary, and distributor operations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#B5813A]">Company</h4>
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
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#B5813A]">Industries & Catalogs</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/industries/distributors" className="footer-link">Distributors</Link></li>
              <li><Link href="/catalog/pharmacy" className="footer-link">Pharmacy</Link></li>
              <li><Link href="/catalog/veterinary" className="footer-link">Veterinary</Link></li>
              <li><Link href="/catalog/custom" className="footer-link">Custom 1/2/3 Color</Link></li>
              <li><Link href="/catalog/legacy" className="footer-link">Legacy Collections</Link></li>
              <li><Link href="/gallery" className="footer-link">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#B5813A]">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/contact" className="footer-link font-semibold">Contact Form</Link></li>
              <li><a href={contactTextHref} className="footer-link">Text {contactPhone}</a></li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61586254914821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Follow us on Facebook
                </a>
              </li>
              <li className="text-xs text-[#FAF6F0CC]">See our latest bag designs and client features.</li>
              <li className="text-xs text-[#FAF6F0]">Tag us @bagsupplyco for a feature</li>
              <li>{contactAddress[0]}</li>
              <li>{contactAddress[1]}</li>
              <li>
                <Link href="/terms" className="footer-link inline-flex rounded-md border border-[#C4935A99] px-3 py-1.5 text-xs font-semibold">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="footer-link inline-flex rounded-md border border-[#C4935A99] px-3 py-1.5 text-xs font-semibold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#C4935A55] pt-6 text-xs text-[#FAF6F0AA]">
          <p>&copy; {new Date().getFullYear()} Bag Supply Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
