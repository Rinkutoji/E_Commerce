import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from 'react-icons/fi'

export default function Footer() {
  const navigate = useNavigate()

  const socialLinks = [
    { icon: <FiInstagram size={18} />, href: 'https://instagram.com', label: 'Instagram', hoverClass: 'hover:text-pink-400' },
    { icon: <FiTwitter size={18} />, href: 'https://twitter.com', label: 'Twitter', hoverClass: 'hover:text-sky-400' },
    { icon: <FiFacebook size={18} />, href: 'https://facebook.com', label: 'Facebook', hoverClass: 'hover:text-blue-500' },
    { icon: <FiMail size={18} />, href: 'mailto:support@shopnow.com', label: 'Email', hoverClass: 'hover:text-red-400' },
  ]

  const shopLinks = [
    { label: 'All Products', filter: null },
    { label: 'New Arrivals', filter: 'new' },
    { label: 'Best Sellers', filter: 'best' },
    { label: 'Sale', filter: 'sale' },
  ]

  const handleShopLink = (filter) => {
    navigate(filter ? `/shop?filter=${filter}` : '/shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-slate-950 text-gray-300 mt-auto'>
      <div className='max-w-5xl mx-auto px-4 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-8'>
        <div className='col-span-2 md:col-span-1'>
          <p className='text-xl font-bold text-pink-500 mb-3'>ShopNow</p>
          <p className='text-sm text-gray-400 leading-relaxed'>
            Quality products at great prices. Shop with confidence every day.
          </p>
          <div className='flex gap-3 mt-4'>
            {socialLinks.map(({ icon, href, label, hoverClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className={`transition-colors duration-200 ${hoverClass}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className='text-sm font-semibold text-white mb-3 uppercase tracking-wide'>Shop</p>
          <ul className='space-y-2 text-sm'>
            {shopLinks.map(({ label, filter }) => (
              <li key={label}>
                <button
                  onClick={() => handleShopLink(filter)}
                  className='hover:text-pink-400 transition-colors duration-200 text-left'
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='text-sm font-semibold text-white mb-3 uppercase tracking-wide'>Account</p>
          <ul className='space-y-2 text-sm'>
            <li><Link to='/login' className='hover:text-pink-400 transition-colors duration-200'>Sign In</Link></li>
            <li><Link to='/register' className='hover:text-pink-400 transition-colors duration-200'>Register</Link></li>
            <li><Link to='/profile' className='hover:text-pink-400 transition-colors duration-200'>My Profile</Link></li>
            <li><Link to='/cart' className='hover:text-pink-400 transition-colors duration-200'>My Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className='text-sm font-semibold text-white mb-3 uppercase tracking-wide'>Support</p>
          <ul className='space-y-2 text-sm'>
            <li><Link to='/faq' className='hover:text-sky-400 transition-colors duration-200'>FAQ</Link></li>
            <li><Link to='/shipping-policy' className='hover:text-sky-400 transition-colors duration-200'>Shipping Policy</Link></li>
            <li><Link to='/returns' className='hover:text-sky-400 transition-colors duration-200'>Returns</Link></li>
            <li><Link to='/contact' className='hover:text-sky-400 transition-colors duration-200'>Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className='border-t border-gray-800'>
        <div className='max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500'>
          <p>© {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='#' className='hover:text-pink-400 transition-colors duration-200'>Privacy Policy</a>
            <a href='#' className='hover:text-pink-400 transition-colors duration-200'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}