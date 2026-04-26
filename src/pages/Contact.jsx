import React, { useState } from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">Have a question? We'd love to hear from you.</p>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-2xl mb-2">✅</p>
              <p className="text-green-700 font-semibold">Message sent!</p>
              <p className="text-gray-500 text-sm mt-1">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5 text-gray-600 text-sm">
          <div className="flex items-start gap-3">
            <FiMail className="text-pink-500 mt-1" size={18}/>
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p>support@shopnow.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiPhone className="text-pink-500 mt-1" size={18}/>
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p>+1 (800) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FiMapPin className="text-pink-500 mt-1" size={18}/>
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p>123 Shop Street, NY 10001</p>
            </div>
          </div>
          <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mt-4">
            <p className="font-semibold text-gray-800 mb-1">Business Hours</p>
            <p>Mon – Fri: 9am – 6pm EST</p>
            <p>Sat – Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  )
}