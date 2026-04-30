import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
      const matchedUser = registeredUsers.find(
        (u) => u.username === form.username && u.password === form.password
      )
      if (matchedUser) {
        await login(matchedUser.username, matchedUser.password)
        navigate('/')
      } else {
        await login(form.username, form.password)
        navigate('/')
      }
    } catch {
      setError('Wrong username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {[
            ['username', 'Username', 'text', 'Enter username'],
            ['password', 'Password', 'password', '••••••'],
          ].map(([name, label, type, ph]) => (
            <div key={name} className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>{label}</label>
              <input
                type={type}
                placeholder={ph}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              />
            </div>
          ))}
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            type='submit'
            disabled={loading}
            className='bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 mt-1 transition-colors'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className='text-sm text-center text-gray-500 mt-4'>
          No account?{' '}
          <Link to='/register' className='text-pink-600 hover:underline font-medium'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}