import { createContext, useContext, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const { user } = useAuth() || {}
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      author: { name: 'Alice Johnson', handle: '@alice' },
      content: 'Welcome to the Atlys feed! This is a sample post. Interactions are stubbed.',
      createdAt: Date.now() - 1000 * 60 * 60,
      likes: 12,
      comments: 3,
    },
    {
      id: 'p2',
      author: { name: 'Bob Smith', handle: '@bob' },
      content: 'Try creating a new post above. Sign in to publish.',
      createdAt: Date.now() - 1000 * 60 * 5,
      likes: 4,
      comments: 0,
    },
  ])

  function publishPost(text) {
    if (!text?.trim()) return
    setPosts(prev => [{
      id: String(Math.random()).slice(2),
      author: { name: user?.name ?? 'You', handle: user ? `@${user.name?.split(' ')[0].toLowerCase()}` : '@you' },
      content: text.trim(),
      createdAt: Date.now(),
      likes: 0,
      comments: 0,
    }, ...prev])
  }

  const value = useMemo(() => ({ posts, publishPost }), [posts])
  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('usePosts must be used within PostsProvider')
  return ctx
}


