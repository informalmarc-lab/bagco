'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bagType: '',
    quantity: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          bagType: '',
          quantity: '',
          message: '',
        })
      }, 3000)
    } catch (err) {
      console.error(err)
      alert('Failed to send message')
    }
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-xl rounded-xl p-8">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Name *</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email *</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label htmlFor="company" className="block font-semibold mb-1">Company</label>
          <input id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label htmlFor="bagType" className="block font-semibold mb-1">Bag Type Interest</label>
          <select id="bagType" name="bagType" value={formData.bagType} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl">
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
          <label htmlFor="quantity" className="block font-semibold mb-1">Estimated Quantity</label>
          <input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g., 1000, 5000, 10000+" className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <div>
          <label htmlFor="message" className="block font-semibold mb-1">Message *</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl" rows={5}></textarea>
        </div>

        {submitted && <div className="text-green-600 font-semibold">Thank you! Your message has been sent.</div>}

        <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition">Send Message</button>
      </form>
    </div>
  )
}