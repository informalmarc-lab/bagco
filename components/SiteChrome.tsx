'use client'

import { usePathname } from 'next/navigation'
import { CartProvider } from '@/components/cart/CartProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <main className="min-h-screen bg-[#FAF6F0]">{children}</main>
  }

  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen site-surface">{children}</main>
      <Footer />
    </CartProvider>
  )
}
