import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()

  return (
    <div className='bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
      <Link to={'/product/' + product.id}>
        <div className='h-36 sm:h-44 bg-gray-50 flex items-center justify-center p-3 sm:p-4'>
          <img
            src={product.image}
            alt={product.title}
            className='h-full object-contain hover:scale-105 transition-transform duration-300'
          />
        </div>
      </Link>
      <div className='p-3 sm:p-4 flex flex-col gap-2'>
        <span className='text-xs text-pink-400 capitalize'>{product.category}</span>
        <Link to={'/product/' + product.id}>
          <p className='text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-pink-600'>
            {product.title}
          </p>
        </Link>
        <div className='flex items-center justify-between mt-1'>
          <span className='font-bold text-gray-900 text-sm'>${product.price.toFixed(2)}</span>
          <button
            onClick={() => add(product)}
            className='text-xs bg-pink-600 text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-pink-700 transition-colors'
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}