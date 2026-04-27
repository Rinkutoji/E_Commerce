import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
      const usernameExists = existingUsers.some((u) => u.username === form.username)
      const emailExists = existingUsers.some((u) => u.email === form.email)

      if (usernameExists) {
        setError('Username already taken. Please choose another.')
        setLoading(false)
        return
      }
      if (emailExists) {
        setError('Email already registered. Please sign in.')
        setLoading(false)
        return
      }

      const newUser = {
        id: Date.now(),
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
        createdAt: new Date().toISOString(),
      }

      const updatedUsers = [...existingUsers, newUser]
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers))
      navigate('/login')
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    ['firstname', 'First Name', 'text', 'Firstname'],
    ['lastname', 'Last Name', 'text', 'Lastname'],
    ['username', 'Username', 'text', 'Username'],
    ['email', 'Email', 'email', 'Email'],
    ['password', 'Password', 'password', 'Password'],
  ]

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10'>
      <div className='w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-1'>Create account</h1>
        <p className='text-sm text-gray-400 mb-6'>Join ShopNow today</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {fields.map(([name, label, type, ph]) => (
            <div key={name} className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>{label}</label>
              <input
                type={type}
                placeholder={ph}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400'
              />
            </div>
          ))}
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            type='submit'
            disabled={loading}
            className='bg-pink-600 text-white py-2.5 rounded-lg hover:bg-pink-700 font-medium disabled:opacity-50 mt-1 transition-colors'
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className='text-sm text-center text-gray-500 mt-5'>
          Already have an account?{' '}
          <Link to='/login' className='text-pink-600 hover:underline font-medium'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}