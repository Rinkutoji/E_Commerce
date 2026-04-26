import React from 'react'
import { Link } from 'react-router-dom'

export default function Returns() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Returns & Refunds</h1>
      <p className="text-gray-500 mb-8">We want you to love your purchase. Here's our policy.</p>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Return Window</h2>
          <p>Items may be returned within <strong>30 days</strong> of delivery for a full refund.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Conditions</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Item must be unused and in original packaging</li>
            <li>Tags must still be attached</li>
            <li>Sale items are final sale and non-returnable</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">How to Return</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Contact our support team</li>
            <li>Receive a return shipping label via email</li>
            <li>Drop off the package at any post office</li>
            <li>Refund processed within 5–7 business days</li>
          </ol>
        </section>
        <div className="mt-6">
          <Link to="/contact" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors text-sm">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}