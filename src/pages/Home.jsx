import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productsService'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 8)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className='bg-pink-50 py-14 md:py-20 px-4 text-center'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
          Shop the latest trends
        </h1>
        <p className='text-gray-500 mb-8 text-sm sm:text-base'>
          Quality products at great prices
        </p>
        <Link
          to='/shop'
          className='inline-block bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-pink-700 transition-colors text-sm sm:text-base'
        >
          Shop Now
        </Link>
      </section>
      <section className='max-w-5xl mx-auto px-4 py-10 md:py-14'>
        <h2 className='text-lg sm:text-xl font-bold text-gray-800 mb-6'>Featured</h2>
        {loading ? (
          <div className='flex justify-center py-10'>
            <div className='w-8 h-8 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin' />
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}