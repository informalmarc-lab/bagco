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
    <footer className="mt-24 border-t border-[#C4935A66] bg-[#1E4D2B] text-[#F4E8D8]">
      <div className="section-container py-16">
        <div className="rounded-3xl border border-[#C4935A77] bg-[linear-gradient(135deg,#1E4D2B,#225935_55%,#1A4126)] p-8 md:p-10">
          <p className="inline-flex rounded-full border border-[#F4E8D8AA] bg-[#F4E8D822] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#F4E8D8]">
            Ready to standardize packaging?
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black text-white md:text-4xl">
            Build a predictable packaging program in one call.
          </h2>
          <p className="mt-3 max-w-3xl text-[#F4E8D8]">
            We help teams choose the right catalog, lock in repeat supply, and ship with a clear schedule.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Open Quote Tool
            </Link>
            <a href={contactTextHref} className="btn-quiet border-[#F4E8D899] text-white hover:bg-[#F4E8D822]">
              Text {contactPhone}
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-black text-white">Bag Supply Co</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#F4E8D8CC]">
              Factory-direct paper bag manufacturing and structured replenishment for retail, pharmacy, and veterinary operations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#C4935A]">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="text-[#B5813A] hover:text-white">About</Link></li>
              <li><Link href="/industries" className="text-[#B5813A] hover:text-white">Industries</Link></li>
              <li><Link href="/manufacturing" className="text-[#B5813A] hover:text-white">Manufacturing</Link></li>
              <li><Link href="/shipping" className="text-[#B5813A] hover:text-white">Shipping</Link></li>
              <li><Link href="/payments" className="text-[#B5813A] hover:text-white">Payments</Link></li>
              <li><Link href="/blog" className="text-[#B5813A] hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#C4935A]">Catalogs</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/catalog/pharmacy" className="text-[#B5813A] hover:text-white">Pharmacy</Link></li>
              <li><Link href="/catalog/veterinary" className="text-[#B5813A] hover:text-white">Veterinary</Link></li>
              <li><Link href="/catalog/custom" className="text-[#B5813A] hover:text-white">Custom 1/2/3 Color</Link></li>
              <li><Link href="/catalog/legacy" className="text-[#B5813A] hover:text-white">Legacy Collections</Link></li>
              <li><Link href="/gallery" className="text-[#B5813A] hover:text-white">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.1em] text-[#C4935A]">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={pricingMailto} className="font-semibold text-[#F4E8D8] hover:text-white">
                  {contactEmail}
                </a>
              </li>
              <li><a href={contactTextHref} className="text-[#B5813A] hover:text-white">Text {contactPhone}</a></li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61586254914821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B5813A] hover:text-[#F4E8D8]"
                >
                  Follow us on Facebook
                </a>
              </li>
              <li className="text-xs text-[#F4E8D8CC]">See our latest bag designs and client features.</li>
              <li className="text-xs text-[#F4E8D8]">ðŸ“¸ Tag us @bagsupplyco for a feature</li>
              <li>{contactAddress[0]}</li>
              <li>{contactAddress[1]}</li>
              <li>
                <Link href="/privacy-policy" className="inline-flex rounded-md border border-[#C4935A99] px-3 py-1.5 text-xs font-semibold hover:bg-[#FFFFFF14]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#C4935A55] pt-6 text-xs text-[#F4E8D8AA]">
          <p>&copy; {new Date().getFullYear()} Bag Supply Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
