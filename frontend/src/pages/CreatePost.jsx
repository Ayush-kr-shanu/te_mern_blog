import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function CreatePost() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "published",
  })

  const submit = async (e) => {
    e.preventDefault()

    await api.post("/post", form)
    navigate("/")
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

      <form onSubmit={submit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Post title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Create Post
        </button>
      </form>
    </div>
  )
}
