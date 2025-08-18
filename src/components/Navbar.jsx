import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useUI } from '../context/UIContext.jsx'

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth()
  const { openAuthModal } = useUI()
  const location = useLocation()
  const navigate = useNavigate()

  function goAuth(mode) {
    if (location.pathname === '/' || location.pathname === '') {
      openAuthModal(mode)
    } else {
      navigate(mode === 'signin' ? '/signin' : '/signup')
    }
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link to="/" className="font-semibold">Atlys</Link>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-600 sm:inline">Hi, {user.name}</span>
              <button onClick={signOut} className="rounded-full border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50">Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => goAuth('signin')} className="rounded-full border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50">Sign in</button>
              <button onClick={() => goAuth('signup')} className="rounded-full bg-gray-900 px-3 py-1 text-sm text-white hover:bg-black">Sign up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


