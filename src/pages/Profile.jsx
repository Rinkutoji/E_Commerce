import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 1)
    .join('')
}

function getAvatarColor(name = '') {
  const colors = [
    'bg-pink-500',
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }
  const initials = getInitials(user.username)
  const avatarColor = getAvatarColor(user.username)

  return (
    <div className='max-w-md mx-auto px-4 py-12'>
      <div className='bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center'>
        <div
          className={`w-20 h-20 ${avatarColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}
        >
          <span className='text-2xl font-bold text-white tracking-wide'>
            {initials}
          </span>
        </div>
        <h2 className='text-xl font-bold text-gray-800 capitalize'>{user.username}</h2>
        <p className='text-sm text-gray-400 mt-1 mb-6'>Member</p>
        <button
          onClick={() => { logout(); navigate('/') }}
          className='w-full border border-red-400 text-red-400 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium'
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
