import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(name, email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-sm p-4">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Create your account</h1>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="space-y-2">
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black disabled:opacity-50">
            {loading ? 'Creating…' : 'Create account'}
          </button>
          <p className="text-sm">Already have an account? <Link to="/signin" className="text-gray-900 underline">Sign in</Link></p>
        </form>
      </main>
    </div>
  )
}


