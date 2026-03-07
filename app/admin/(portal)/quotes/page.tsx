import AdminQuotesTable from '@/components/admin/AdminQuotesTable'
import { listQuotes } from '@/lib/admin/quoteStore'

export default async function AdminQuotesPage() {
  const quotes = await listQuotes()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-[#1E4D2B]">All Quotes</h1>
        <p className="mt-2 text-sm text-[#5F4D33]">
          Manage saved quote and invoice records, update status, and download PDFs.
        </p>
      </header>
      <AdminQuotesTable initialQuotes={quotes} />
    </div>
  )
}
