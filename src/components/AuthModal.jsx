import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useUI } from '../context/UIContext.jsx'

export default function AuthModal() {
  const { authModalMode, closeAuthModal } = useUI()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={closeAuthModal} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl fade-in">
        {authModalMode === 'signin' ? <SigninForm /> : <SignupForm />}
      </div>
    </div>
  )
}

function SigninForm() {
  const { signIn } = useAuth()
  const { closeAuthModal } = useUI()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      closeAuthModal()
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Sign in</h2>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-2">
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black disabled:opacity-50">
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-xs text-gray-500">Try demo@example.com / password123</p>
    </form>
  )
}

function SignupForm() {
  const { signUp } = useAuth()
  const { closeAuthModal } = useUI()
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
      closeAuthModal()
    } catch (err) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create your account</h2>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-2">
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={loading} className="w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black disabled:opacity-50">
        {loading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}


