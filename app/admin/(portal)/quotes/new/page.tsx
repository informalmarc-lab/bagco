import AdminQuoteBuilder from '@/components/admin/AdminQuoteBuilder'
import { getNextDocNumber, getQuoteById } from '@/lib/admin/quoteStore'

export default async function AdminNewQuotePage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const id = searchParams.id
  const [nextDocNumber, initialQuote] = await Promise.all([
    getNextDocNumber(),
    id ? getQuoteById(id) : Promise.resolve(null),
  ])

  return <AdminQuoteBuilder initialQuote={initialQuote} nextDocNumber={nextDocNumber} />
}
