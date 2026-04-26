import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
    const {count} = useCart()
    const {user,logout} = useAuth()
    const navigate = useNavigate()
  return (
      <nav className='sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to="/" className='text-xl font-bold text-pink-600'>ShopNow</Link>
        <div className='flex items-center gap-4'>
         <Link to="/" className='text-sm text-pink-600 hover:text-pink-600'>ShopNow</Link>
         <Link to="/cart" className='relative text-gray-700 hover:text-pink-600'>
         <span className='text-xl'>🛒</span>
         {count> 0&&(
            <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
                {count}
            </span>
         )}
         </Link>
         {user ?(
            <>
            <Link to="/profile" className='text-sm text-gray-600 hover:text-pink-600'>{user.username}</Link>
            <button onClick={()=>{logout(); navigate('/')}} className='text-sm text-red-400 hover:text-red-600'>Logout</button>
            </>
         ) : (
            <Link to="/login" className='text-sm bg-pink-600 text-white px-4 py-1.5 rounded-lg hover:bg-pink-700'>
                Login
            </Link>
         )}
        </div>
      </div>

      </nav>
  )
}
