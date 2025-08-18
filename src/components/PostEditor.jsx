import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import { usePosts } from '../context/PostsContext.jsx'

export default function PostEditor() {
  const { isAuthenticated } = useAuth()
  const { openAuthModal } = useUI()
  const { publishPost } = usePosts()
  const [text, setText] = useState('')

  function onPublish() {
    if (!isAuthenticated) {
      openAuthModal('signin')
      return
    }
    if (!text.trim()) return
    publishPost(text)
    setText('')
  }

  function onStub() {
    alert('function not implemented')
  }

  function onFocusGuard() {
    if (!isAuthenticated) openAuthModal('signin')
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={onFocusGuard}
        placeholder={isAuthenticated ? 'Share something…' : 'Sign in to post…'}
        className="w-full resize-none rounded-lg border border-gray-200 p-3 outline-none focus:border-gray-300"
        rows={3}
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <IconButton onClick={onStub} label="Media" />
          <IconButton onClick={onStub} label="GIF" />
          <IconButton onClick={onStub} label="Poll" />
        </div>
        <button onClick={onPublish} className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black">Publish</button>
      </div>
    </div>
  )
}

function IconButton({ onClick, label }) {
  return (
    <button onClick={onClick} type="button" className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50">
      {label}
    </button>
  )
}


