import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import {
  contactAddress,
  contactEmail,
  contactEmailHref,
  contactHours,
  contactPhone,
  contactPhoneHref,
  contactTextHref,
} from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bag Supply Co for catalog guidance, quote requests, and production timeline support.',
}

export default function ContactPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Contact</p>
          <h1 className="heading-display mt-5">Talk to the Packaging Team</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Whether you&apos;re a retailer, pharmacy, distributor, or just getting started, tell us what you need and we will help you map the right next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact-form" className="btn-primary">Send a Message</a>
            <a href={contactTextHref} className="btn-secondary">Text Our Team</a>
          </div>
        </div>
      </section>

      <section id="contact-form" className="section-container py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <aside className="tonal-panel">
            <h2 className="text-2xl font-black text-[#1E4D2B]">Direct Contact</h2>
            <p className="mt-3 text-sm text-[#5F4D33]">
              Reach out the way that works best for your team. We use this page for general questions, reorder support,
              and program planning conversations.
            </p>

            <dl className="mt-6 grid gap-3 text-sm text-[#5F4D33]">
              <div className="surface-card rounded-2xl p-4">
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Phone</dt>
                <dd className="mt-2">
                  <a href={contactPhoneHref} className="font-semibold text-[#1E4D2B] underline">{contactPhone}</a>
                </dd>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Text</dt>
                <dd className="mt-2">
                  <a href={contactTextHref} className="font-semibold text-[#1E4D2B] underline">{contactPhone}</a>
                </dd>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Email</dt>
                <dd className="mt-2">
                  <a href={contactEmailHref} className="font-semibold text-[#1E4D2B] underline">{contactEmail}</a>
                </dd>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Location</dt>
                <dd className="mt-2">
                  {contactAddress[0]}
                  <br />
                  {contactAddress[1]}
                </dd>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Hours</dt>
                <dd className="mt-2">{contactHours[0]}</dd>
                <dd className="mt-1 text-xs text-[#7A6548]">{contactHours[1]}</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href={contactTextHref} className="btn-secondary justify-center">Text Us</a>
              <a href={contactEmailHref} className="btn-secondary justify-center">Email Us</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
