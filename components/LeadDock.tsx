import Link from 'next/link'
import { contactPhone, contactTextHref } from '@/components/siteConfig'

export default function LeadDock() {
  return (
    <>
      <div className="lead-dock lead-dock-desktop print-hide" role="complementary" aria-label="Quick contact actions">
        <div className="lead-dock-inner">
          <p className="lead-dock-copy">Need pricing quickly?</p>
          <a href={contactTextHref} className="lead-dock-btn lead-dock-btn-secondary">
            Text {contactPhone}
          </a>
          <Link href="/generic-bag-quote" className="lead-dock-btn lead-dock-btn-primary">
            Build a Quote
          </Link>
        </div>
      </div>
      <div className="mobile-sticky-cta print-hide" role="complementary" aria-label="Quick contact actions">
        <Link href="/generic-bag-quote" className="mobile-sticky-cta-link mobile-sticky-cta-primary">
          Build a Quote
        </Link>
        <a href={contactTextHref} className="mobile-sticky-cta-link mobile-sticky-cta-secondary">
          Text Us
        </a>
      </div>
    </>
  )
}
