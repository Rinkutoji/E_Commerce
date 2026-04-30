import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, remove, updateQty, total } = useCart()

  if (items.length === 0)
    return (
      <div className='text-center py-20 px-4'>
        <p className='text-5xl mb-4'>🛒</p>
        <p className='text-gray-500 mb-6'>Your cart is empty</p>
        <Link
          to='/shop'
          className='bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700'
        >
          Go Shopping
        </Link>
      </div>
    )

  return (
    <div className='max-w-2xl mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:py-10'>
      <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8'>Your Cart</h1>

      <div className='space-y-4'>
        {items.map((item) => (
          <div key={item.id} className='flex gap-3 sm:gap-4 border-b border-gray-100 pb-4'>
            <img
              src={item.image}
              alt={item.title}
              className='w-14 h-14 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded-lg flex-shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <p className='text-xs sm:text-sm font-medium text-gray-800 line-clamp-2'>
                {item.title}
              </p>
              <p className='text-sm text-pink-600 font-semibold mt-0.5'>
                ${item.price.toFixed(2)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className='w-6 h-6 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center justify-center'
                >
                  −
                </button>
                <span className='text-sm w-4 text-center'>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className='w-6 h-6 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center justify-center'
                >
                  +
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className='ml-auto text-xs text-red-400 hover:text-red-600'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <span className='text-lg font-bold text-gray-800'>
          Total: ${total.toFixed(2)}
        </span>
        <Link
          to='/checkout'
          className='w-full sm:w-auto text-center bg-pink-600 text-white px-6 py-2.5 rounded-xl hover:bg-pink-700 transition-colors'
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}