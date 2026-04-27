import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className='sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='text-xl font-bold text-pink-600'>
          ShopNow
        </Link>
        <div className='hidden md:flex items-center gap-4'>
          <Link to='/shop' className='text-sm text-gray-600 hover:text-pink-600'>
            Shop
          </Link>
          <Link to='/cart' className='relative text-gray-700 hover:text-pink-600'>
            <span className='text-xl'>🛒</span>
            {count > 0 && (
              <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to='/profile' className='text-sm text-gray-600 hover:text-pink-600'>
                {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className='text-sm text-red-400 hover:text-red-600'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className='text-sm bg-pink-600 text-white px-4 py-1.5 rounded-lg hover:bg-pink-700'
            >
              Login
            </Link>
          )}
        </div>
        <div className='flex md:hidden items-center gap-3'>
          <Link to='/cart' className='relative text-gray-700'>
            <span className='text-xl'>🛒</span>
            {count > 0 && (
              <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors'
            aria-label='Toggle menu'
          >
            {menuOpen ? (
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-md'>
          <Link
            to='/shop'
            onClick={() => setMenuOpen(false)}
            className='text-sm text-gray-700 hover:text-pink-600 py-1'
          >
            Shop
          </Link>
          {user ? (
            <>
              <Link
                to='/profile'
                onClick={() => setMenuOpen(false)}
                className='text-sm text-gray-700 hover:text-pink-600 py-1'
              >
                Profile ({user.username})
              </Link>
              <button
                onClick={handleLogout}
                className='text-sm text-left text-red-400 hover:text-red-600 py-1'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                onClick={() => setMenuOpen(false)}
                className='text-sm text-gray-700 hover:text-blue-600 py-1'
              >
                Login
              </Link>
              <Link
                to='/register'
                onClick={() => setMenuOpen(false)}
                className='text-sm bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 text-center'
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}