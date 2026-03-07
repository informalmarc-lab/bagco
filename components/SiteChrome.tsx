'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadDock from '@/components/LeadDock'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <main className="min-h-screen bg-[#FAF6F0]">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen site-surface">{children}</main>
      <LeadDock />
      <Footer />
    </>
  )
}
