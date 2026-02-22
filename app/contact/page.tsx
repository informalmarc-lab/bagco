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
              {/* ... contact info cards here ... */}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                <div>
                  <label htmlFor="bagType" className="block text-sm font-semibold text-gray-700 mb-2">Bag Type Interest</label>
                  <select id="bagType" name="bagType" value={formData.bagType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                    <option value="">Select a type</option>
                    <option value="custom">Custom Printed Bags</option>
                    <option value="dispensary">Dispensary Bags</option>
                    <option value="faith">Faith & Religion Bags</option>
                    <option value="holiday">Holiday Bags</option>
                    <option value="pharmacy">Pharmacy Bags</option>
                    <option value="pride">Pride Bags</option>
                    <option value="usa">USA Bags</option>
                    <option value="veterinary">Veterinary Bags</option>
                    <option value="winery">Winery Bags</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">Estimated Quantity</label>
                  <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g., 1000, 5000, 10000+" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" />
                </div>

                {submitted && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 text-green-800 px-6 py-4 rounded-xl font-semibold">
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </div>
                )}

                <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
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