import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import useAuth from "../hooks/useAuth"

export default function Posts() {
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const observerRef = useRef(null)
  const limit = 50

  const fetchPosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const res = await api.get(
      `/post?page=${page}&limit=${limit}`
    )

    const newPosts = res.data.data

    if (newPosts.length < limit) {
      setHasMore(false)
    }

    setPosts(prev => [...prev, ...newPosts])
    setPage(prev => prev + 1)
    setLoading(false)
  }

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPosts()
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading])

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        {user && (
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Post
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div
            key={post._id}
            className="bg-white p-5 rounded shadow"
          >
            <h3 className="text-xl font-semibold">
              {post.title}
            </h3>
            <p className="text-gray-600 mt-2">
              {post.content.slice(0, 120)}...
            </p>
            <Link
              to={`/post/${post._id}`}
              className="text-blue-600 mt-3 inline-block"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div
          ref={observerRef}
          className="text-center py-6 text-gray-500"
        >
          {loading ? "Loading more posts..." : "Scroll for more"}
        </div>
      )}

      {!hasMore && (
        <p className="text-center py-6 text-gray-400">
          You’ve reached the end 🚀
        </p>
      )}
    </div>
  )
}
