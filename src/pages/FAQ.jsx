import React, { useState } from 'react'

const faqs = [
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number." },
  { q: "Can I change my order after placing it?", a: "Orders can be modified within 1 hour of placement. Contact us immediately." },
  { q: "What payment methods do you accept?", a: "We accept Visa, MasterCard, PayPal, and more." },
  { q: "Is my personal information secure?", a: "Yes, we use industry-standard SSL encryption to protect your data." },
  { q: "How do I return an item?", a: "Visit our Returns page or contact support within 30 days of purchase." },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-8">Find answers to common questions below.</p>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{item.q}</span>
              <span className="text-pink-500 text-xl">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-5 py-3 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}