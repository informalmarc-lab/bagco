import Link from 'next/link'
import { getDashboardStats } from '@/lib/admin/quoteStore'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-[#1E4D2B]">Welcome back, Bag Supply Co.</h1>
        <p className="mt-2 text-sm text-[#5F4D33]">Track quote activity and move quickly into new document creation.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">Total Quotes Created</p>
          <p className="mt-3 text-3xl font-black text-[#1E4D2B]">{stats.totalQuotes}</p>
        </article>
        <article className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">Quotes This Month</p>
          <p className="mt-3 text-3xl font-black text-[#1E4D2B]">{stats.quotesThisMonth}</p>
        </article>
        <article className="rounded-2xl border border-[#C4935A66] border-t-4 border-t-[#1E4D2B] bg-white p-5 shadow-[0_12px_28px_rgba(30,77,43,0.1)]">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">Most Recent Quote</p>
          {stats.mostRecentQuote ? (
            <div className="mt-2">
              <p className="text-lg font-black text-[#1E4D2B]">{stats.mostRecentQuote.customer.businessName}</p>
              <p className="text-sm text-[#5F4D33]">{new Date(stats.mostRecentQuote.updatedAt).toLocaleDateString('en-US')}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#5F4D33]">No quotes yet.</p>
          )}
        </article>
      </section>

      <section>
        <Link href="/admin/quotes/new" className="inline-flex items-center justify-center rounded-xl bg-[#B5813A] px-6 py-3 text-sm font-black text-white hover:bg-[#C4935A]">
          Create New Quote
        </Link>
      </section>
    </div>
  )
}
