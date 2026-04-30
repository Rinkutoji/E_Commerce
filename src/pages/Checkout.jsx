import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 1,
          date: new Date().toISOString().split('T')[0],
          products: items.map((i) => ({ productId: i.id, quantity: i.qty })),
        }),
      })
      clear()
      navigate('/')
      alert('Order placed!')
    } catch {
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-10 sm:pt-28">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            ['name', 'Full Name', 'text'],
            ['email', 'Email', 'email'],
            ['address', 'Address', 'text'],
          ].map(([name, label, type]) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 mt-2"
          >
            {loading ? 'Placing...' : 'Place Order'}
          </button>
        </form>

        <div>
          <h2 className="font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600">
            Ordering as: <span className="font-semibold text-gray-800">{user.username}</span>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 truncate max-w-44">
                {item.title} ×{item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout