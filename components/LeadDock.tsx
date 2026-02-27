import Link from 'next/link'
import { contactPhone, contactTextHref } from '@/components/siteConfig'

export default function LeadDock() {
  return (
    <div className="lead-dock print-hide" aria-label="Quick contact actions">
      <div className="lead-dock-inner">
        <p className="lead-dock-copy">Need pricing fast? Get a structured quote today.</p>
        <div className="lead-dock-actions">
          <a href={contactTextHref} className="lead-dock-btn lead-dock-btn-secondary">
            Text {contactPhone}
          </a>
          <Link href="/generic-bag-quote" className="lead-dock-btn lead-dock-btn-primary">
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
