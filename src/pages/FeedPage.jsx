import Navbar from '../components/Navbar.jsx'
import PostEditor from '../components/PostEditor.jsx'
import PostCard from '../components/PostCard.jsx'
import { usePosts } from '../context/PostsContext.jsx'

export default function FeedPage() {
  const { posts } = usePosts()
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <PostEditor />
        <div className="space-y-3">
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </main>
    </div>
  )
}


