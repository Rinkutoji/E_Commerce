import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productsService'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { add } = useCart()

  useEffect(() => {
    getProduct(id).then(setProduct).finally(() => setLoading(false))
  }, [id])

  if (loading)
    return (
      <div className='flex justify-center py-20'>
        <div className='w-10 h-10 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin' />
      </div>
    )

  if (!product)
    return <p className='text-center py-20 text-gray-400'>Product not found.</p>

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 sm:py-12'>
      <div className='grid md:grid-cols-2 gap-6 sm:gap-10'>
        <div className='bg-gray-50 rounded-2xl flex items-center justify-center p-8 sm:p-10 min-h-56'>
          <img
            src={product.image}
            alt={product.title}
            className='max-h-48 sm:max-h-64 object-contain'
          />
        </div>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <span className='text-xs text-pink-400 capitalize'>{product.category}</span>
          <h1 className='text-lg sm:text-xl font-bold text-gray-900'>{product.title}</h1>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span className='text-yellow-400'>★</span>
            {product.rating?.rate} ({product.rating?.count} reviews)
          </div>
          <p className='text-xl sm:text-2xl font-bold text-pink-600'>
            ${product.price.toFixed(2)}
          </p>
          <p className='text-sm text-gray-500 leading-relaxed'>{product.description}</p>
          <button
            onClick={() => add(product)}
            className='mt-2 bg-pink-600 text-white py-3 rounded-xl hover:bg-skyp-700 transition-colors font-medium'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}