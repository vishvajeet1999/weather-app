import { useAuth } from '../context/AuthContext.jsx'
import { useUI } from '../context/UIContext.jsx'

export default function PostCard({ post }) {
  const { isAuthenticated } = useAuth()
  const { openAuthModal } = useUI()

  function onInteract() {
    if (!isAuthenticated) {
      openAuthModal('signin')
      return
    }
    alert('function not implemented')
  }

  return (
    <article className="fade-in rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <header className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{post.author.name}</h3>
          <p className="text-xs text-gray-500">{post.author.handle}</p>
        </div>
        <button onClick={onInteract} className="rounded-full px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">•••</button>
      </header>
      <p className="whitespace-pre-wrap text-sm text-gray-800">{post.content}</p>
      <footer className="mt-3 flex gap-4 text-xs text-gray-500">
        <button onClick={onInteract} className="transition hover:text-gray-900">❤ {post.likes}</button>
        <button onClick={onInteract} className="transition hover:text-gray-900">💬 {post.comments}</button>
        <button onClick={onInteract} className="transition hover:text-gray-900">↗ Share</button>
      </footer>
    </article>
  )
}


