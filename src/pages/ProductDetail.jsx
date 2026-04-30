import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/productsService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { add } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    getProduct(id).then(setProduct).finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (loading)
    return (
      <div className='flex justify-center pt-32'>
        <div className='w-10 h-10 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin' />
      </div>
    )

  if (!product)
    return <p className='text-center pt-32 text-gray-400'>Product not found.</p>

  const wishlisted = isInWishlist(product.id)
  const stars = Math.round(product.rating?.rate || 4)

  return (
    <div className='max-w-4xl mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12'>
      <div className='grid md:grid-cols-2 gap-6 sm:gap-10'>

        {/* Image */}
        <div className='bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center p-8 sm:p-10 min-h-56 relative'>
          <img
            src={product.image}
            alt={product.title}
            className='max-h-48 sm:max-h-64 object-contain'
          />
          {/* Wishlist button on image */}
          <button
            onClick={() => toggleWishlist(product)}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: 'none',
              background: wishlisted ? '#fce4f3' : 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              transform: wishlisted ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <svg
              width='18' height='18' viewBox='0 0 24 24'
              fill={wishlisted ? '#e91e8c' : 'none'}
              stroke={wishlisted ? '#e91e8c' : '#9ca3af'}
              strokeWidth='2'
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className='flex flex-col gap-3 sm:gap-4'>
          <span className='text-xs text-pink-400 capitalize font-semibold'>{product.category}</span>
          <h1 className='text-lg sm:text-xl font-bold text-gray-900'>{product.title}</h1>

          {/* Stars */}
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width='14' height='14' fill={i < stars ? '#f59e0b' : '#e5e7eb'} viewBox='0 0 24 24'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
            ))}
            <span className='text-sm text-gray-500 ml-1'>
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <p className='text-2xl sm:text-3xl font-bold text-pink-600'>
            ${product.price.toFixed(2)}
          </p>

          <p className='text-sm text-gray-500 leading-relaxed'>{product.description}</p>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: 8,
              padding: '14px 0',
              borderRadius: 12,
              border: 'none',
              background: added
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: added
                ? '0 4px 14px rgba(16,185,129,0.35)'
                : '0 4px 14px rgba(59,130,246,0.35)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {added ? (
              <>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <path d='M16 10a4 4 0 0 1-8 0' />
                </svg>
                Add to Cart
              </>
            )}
          </button>

          {/* Wishlist text button */}
          <button
            onClick={() => toggleWishlist(product)}
            style={{
              padding: '11px 0',
              borderRadius: 12,
              border: `1.5px solid ${wishlisted ? '#7c3aed' : '#ede9fe'}`,
              background: wishlisted ? '#ede9fe' : '#fff',
              color: wishlisted ? '#7c3aed' : '#6b7280',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <svg width='15' height='15' viewBox='0 0 24 24'
              fill={wishlisted ? '#7c3aed' : 'none'}
              stroke={wishlisted ? '#7c3aed' : '#6b7280'}
              strokeWidth='2'
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
            </svg>
            {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  )
}