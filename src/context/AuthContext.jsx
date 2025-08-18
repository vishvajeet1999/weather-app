import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_ACCOUNTS = [
  { email: 'demo@example.com', password: 'password123', name: 'Demo User' },
  { email: 'test@user.com', password: 'testpass', name: 'Test User' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('auth:user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem('auth:user', JSON.stringify(user))
    else localStorage.removeItem('auth:user')
  }, [user])

  const signIn = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 400))
    const found = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === password)
    if (!found) throw new Error('Invalid credentials')
    setUser({ email: found.email, name: found.name })
    return true
  }, [])

  const signUp = useCallback(async (name, email, password) => {
    await new Promise(r => setTimeout(r, 500))
    setUser({ name, email })
    return true
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    signIn,
    signUp,
    signOut,
  }), [user, signIn, signUp, signOut])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


