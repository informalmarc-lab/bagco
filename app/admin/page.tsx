import { redirect } from 'next/navigation'
import { getAdminSessionFromCookies } from '@/lib/admin/auth'

export default function AdminRootPage() {
  const session = getAdminSessionFromCookies()
  if (!session) redirect('/admin/login')
  redirect('/admin/dashboard')
}
