import React from 'react'

export default function ShippingPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Shipping Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: January 2026</p>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Processing Time</h2>
          <p>Orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Rates & Delivery</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-pink-50">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-700">Method</th>
                  <th className="text-left px-4 py-2 text-gray-700">Estimated Time</th>
                  <th className="text-left px-4 py-2 text-gray-700">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Standard</td>
                  <td className="px-4 py-2">5–7 business days</td>
                  <td className="px-4 py-2">$4.99</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-4 py-2">Express</td>
                  <td className="px-4 py-2">2–3 business days</td>
                  <td className="px-4 py-2">$12.99</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Free Shipping</td>
                  <td className="px-4 py-2">5–7 business days</td>
                  <td className="px-4 py-2">Orders over $50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">International Shipping</h2>
          <p>We currently ship to the US only. International shipping is coming soon.</p>
        </section>
      </div>
    </div>
  )
}