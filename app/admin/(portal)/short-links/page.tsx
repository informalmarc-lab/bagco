import type { Metadata } from 'next'
import AdminShortLinkManager from '@/components/admin/AdminShortLinkManager'
import { listShortLinks } from '@/lib/admin/shortLinks'
import { getSiteUrl } from '@/lib/seo/site'

export const metadata: Metadata = {
  title: 'Short Links | BagSupplyCo Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminShortLinksPage() {
  const links = await listShortLinks()
  const siteUrl = getSiteUrl()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-serif text-4xl font-black text-[#1E4D2B]">BagSupplyCo Link Shortener</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#5F4D33]">
          Create branded short links for catalogs, landing pages, promotions, and distributor outreach without exposing the tool publicly.
        </p>
      </header>

      <AdminShortLinkManager initialLinks={links} siteUrl={siteUrl} />
    </div>
  )
}
