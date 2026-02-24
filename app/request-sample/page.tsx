import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export default function RequestSamplePage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-8">
        <h1 className="text-4xl font-black text-slate-900">Sample Requests by Email</h1>
        <p className="mt-4 text-slate-700">
          We handle sample requests through email so we can confirm size, print colors, and timing in one thread.
        </p>
        <a href={pricingMailto} className="mt-6 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">
          Email {contactEmail}
        </a>
        <p className="mt-3 text-sm text-slate-600">
          Include your bag type, target size, quantity, and shipping city/state.
        </p>
        <Link href="/contact" className="mt-6 inline-block text-sm font-semibold underline">
          Go to Contact Page
        </Link>
      </div>
    </div>
  )
}
