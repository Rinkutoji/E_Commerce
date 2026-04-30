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
    <div className='max-w-5xl mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-10'>

      {/* Search + Category */}
      <div className='flex flex-col sm:flex-row gap-3 mb-4 items-stretch'>
        <div className='relative flex-1 flex items-center'>
          {/* Search Icon */}
          <svg
            className='absolute left-3 text-gray-400 pointer-events-none'
            width='16' height='16' fill='none' stroke='currentColor'
            strokeWidth='2' viewBox='0 0 24 24'
          >
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
          </svg>
          <input
            type='text'
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full h-11 border border-gray-300 rounded-lg pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent'
          />
        </div>

        <div className='relative sm:w-52 flex items-center'>
          {/* Chevron Icon */}
          <svg
            className='absolute right-3 text-gray-400 pointer-events-none'
            width='14' height='14' fill='none' stroke='currentColor'
            strokeWidth='2' viewBox='0 0 24 24'
          >
            <polyline points='6 9 12 15 18 9' />
          </svg>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full h-11 border border-gray-300 rounded-lg pl-4 pr-9 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white'
          >
            <option value=''>All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className='capitalize'>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
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