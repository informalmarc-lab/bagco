import type { ReactNode } from 'react'
import { requireAdminSession } from '@/lib/admin/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminSessionHeartbeat from '@/components/admin/AdminSessionHeartbeat'

export default function AdminPortalLayout({ children }: { children: ReactNode }) {
  requireAdminSession()

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1A1A1A]">
      <AdminSessionHeartbeat />
      <div className="grid min-h-screen lg:grid-cols-[250px_1fr]">
        <AdminSidebar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
