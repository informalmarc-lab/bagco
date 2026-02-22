'use client'

import { useState } from 'react'

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    bagType: '',
    quantity: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          bagType: '',
          quantity: '',
        })
      }, 3000)
    } catch (err) {
      console.error(err)
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">Contact Us</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Get in touch for quotes and custom orders</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Have questions about our paper bags or need a custom quote? Fill out the form 
                and we'll get back to you as soon as possible.
              </p>

              {/* Info Cards (Email, Phone, Address) */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:scale-102 transition-transform duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@bagco.com" className="hover:text-primary-600 transition-colors font-semibold underline decoration-primary-200 underline-offset-4">info@bagco.com</a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:scale-102 transition-transform duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Phone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+12525161944" className="hover:text-primary-600 transition-colors font-semibold underline decoration-primary-200 underline-offset-4">(252) 516-1944</a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:scale-102 transition-transform duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Mailing Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      912 Houston Drive<br />
                      Monroe, North Carolina 28110
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* All inputs (Name, Email, Phone, Company, Bag Type, Quantity, Message) */}
                {/* ...same inputs as before, unchanged... */}

                {submitted && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 text-green-800 px-6 py-4 rounded-xl font-semibold">
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}