'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DropShipPartnerLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('dropship-partner-page')
    return () => document.body.classList.remove('dropship-partner-page')
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#C4935A66] bg-[#1E4D2B]">
        <div className="section-container">
          <div className="flex min-h-[74px] items-center">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Bag Supply Co">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B5813A] text-sm font-black text-white shadow-lg">
                BS
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F4E8D8]">Bag Supply Co</p>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <style jsx global>{`
        body.dropship-partner-page > header.print-hide {
          display: none;
        }

        body.dropship-partner-page footer .section-container > .rounded-3xl {
          display: none;
        }

        body.dropship-partner-page .lead-dock,
        body.dropship-partner-page .mobile-sticky-cta {
          display: none;
        }
      `}</style>
    </>
  )
}
