import { redirect } from 'next/navigation'
import AdminLogo from '@/components/admin/AdminLogo'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { getAdminSessionFromCookies } from '@/lib/admin/auth'

export default function AdminLoginPage() {
  const session = getAdminSessionFromCookies()
  if (session) redirect('/admin/dashboard')

  return (
    <div className="min-h-screen bg-[#FAF6F0] px-5 py-10">
      <div className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-[#C4935A66] bg-white p-6 shadow-[0_16px_40px_rgba(30,77,43,0.12)] md:p-8">
        <div className="mb-6 flex justify-center">
          <AdminLogo />
        </div>
        <h1 className="text-center text-2xl font-black text-[#1E4D2B]">Admin Login</h1>
        <p className="mt-2 text-center text-sm text-[#5F4D33]">Sign in to manage quotes, invoices, and short links.</p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
