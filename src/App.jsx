import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { UIProvider, useUI } from './context/UIContext.jsx'
import { PostsProvider } from './context/PostsContext.jsx'
import FeedPage from './pages/FeedPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import AuthModal from './components/AuthModal.jsx'

function GuestOnly({ children }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

function ModalLayer() {
  const { authModalOpen } = useUI()
  return authModalOpen ? <AuthModal /> : null
}

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <PostsProvider>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route element={<Layout />}> 
                  <Route index element={<FeedPage />} />
                  <Route path="/signin" element={<GuestOnly><SignInPage /></GuestOnly>} />
                  <Route path="/signup" element={<GuestOnly><SignUpPage /></GuestOnly>} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ModalLayer />
            </Suspense>
          </BrowserRouter>
        </PostsProvider>
      </UIProvider>
    </AuthProvider>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Outlet />
    </div>
  )
}
