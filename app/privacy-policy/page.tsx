import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Bag Supply Co website inquiries, quote requests, and communication handling.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <p className="kicker">Legal</p>
      <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-slate-700">
        We collect contact details you submit through quote and contact forms to respond to your requests, provide operational updates, and support business communication.
      </p>

      <div className="mt-8 grid gap-4">
        <section className="surface-card rounded-xl p-5">
          <h2 className="text-2xl font-black text-slate-900">Information We Collect</h2>
          <p className="mt-2 text-slate-700">Name, company, email, phone, and order-related details submitted through our website forms.</p>
        </section>
        <section className="surface-card rounded-xl p-5">
          <h2 className="text-2xl font-black text-slate-900">How We Use Information</h2>
          <p className="mt-2 text-slate-700">To prepare quotes, coordinate packaging programs, and maintain communication for active or potential client relationships.</p>
        </section>
        <section className="surface-card rounded-xl p-5">
          <h2 className="text-2xl font-black text-slate-900">Data Handling</h2>
          <p className="mt-2 text-slate-700">We do not sell submitted information. Data is used solely for business operations, support, and service follow-up.</p>
        </section>
      </div>
    </div>
  )
}

