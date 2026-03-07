'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import AdminLogo from '@/components/admin/AdminLogo'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/quotes/new', label: 'New Quote' },
  { href: '/admin/quotes', label: 'All Quotes' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <aside className="flex h-full min-h-[calc(100vh-1px)] flex-col bg-[#1E4D2B] px-4 py-5 text-white lg:sticky lg:top-0 lg:h-screen">
      <div className="mb-8">
        <AdminLogo light />
      </div>

      <nav className="grid gap-2">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                active
                  ? 'border-l-4 border-[#B5813A] bg-[#FFFFFF1A] text-white'
                  : 'border-l-4 border-transparent text-[#F4E8D8] hover:bg-[#FFFFFF14]'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-auto inline-flex items-center justify-center rounded-lg border border-[#B5813A] px-3 py-2 text-sm font-bold text-[#F4E8D8] hover:bg-[#B5813A22]"
      >
        Logout
      </button>
    </aside>
  )
}
