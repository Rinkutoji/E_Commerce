import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getByCategory, getCategories } from '../services/productsService'
import ProductCard from '../components/ProductCard'

const FILTER_LABELS = {
  new: 'New Arrivals',
  best: 'Best Sellers',
  sale: 'Sale',
}

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter')

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    const promise = category ? getByCategory(category) : getProducts()
    promise.then(setProducts).finally(() => setLoading(false))
  }, [category])

  const filteredProducts = useMemo(() => {
    let result = products
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (activeFilter === 'new') {
      result = [...result].sort((a, b) => b.id - a.id).slice(0, 10)
    } else if (activeFilter === 'best') {
      result = result.filter((p) => p.rating?.rate >= 4.0)
    } else if (activeFilter === 'sale') {
      result = result.filter((p) => p.price < 30)
    }
    return result
  }, [products, search, activeFilter])

  const filterTabs = [
    { key: null, label: 'All' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'best', label: 'Best Sellers' },
    { key: 'sale', label: 'Sale' },
  ]

  const handleFilterTab = (key) => {
    if (key) {
      setSearchParams({ filter: key })
    } else {
      setSearchParams({})
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-8 sm:py-10'>
      <div className='flex flex-col sm:flex-row gap-3 mb-4'>
        <input
          type='text'
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-pink-400'
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 text-sm sm:flex-1 focus:outline-none focus:ring-2 focus:ring-pink-400'
        >
          <option value=''>All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c} className='capitalize'>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap gap-2 mb-6'>
        {filterTabs.map(({ key, label }) => (
          <button
            key={label}
            onClick={() => handleFilterTab(key)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeFilter === key
                ? 'bg-pink-500 text-white shadow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-400 hover:text-pink-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeFilter && (
        <div className='mb-4 flex items-center gap-2'>
          <span className='text-sm text-gray-500'>
            Showing:{' '}
            <span className='font-semibold text-pink-500'>{FILTER_LABELS[activeFilter]}</span>
          </span>
          <button
            onClick={() => handleFilterTab(null)}
            className='text-xs text-gray-400 hover:text-red-400 transition-colors underline'
          >
            Clear
          </button>
        </div>
      )}
      {loading ? (
        <div className='flex justify-center py-10'>
          <div className='w-8 h-8 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin' />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className='text-center py-16 text-gray-400'>
          <p className='text-lg'>No products found.</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4'>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}