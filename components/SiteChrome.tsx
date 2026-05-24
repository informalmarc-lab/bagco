'use client'

import { usePathname } from 'next/navigation'
import { CartProvider } from '@/components/cart/CartProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AccessibilityControls from '@/components/AccessibilityControls'
import CouponDropDown from '@/components/CouponDropDown'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <main className="min-h-screen bg-[#FAF6F0]">{children}</main>
  }

  return (
    <CartProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <CouponDropDown />
      <main id="main-content" className="min-h-screen site-surface" tabIndex={-1}>
        {children}
      </main>
      <AccessibilityControls />
      <Footer />
    </CartProvider>
  )
}
