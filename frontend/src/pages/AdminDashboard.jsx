import { useEffect, useState } from "react"
import api from "../api/axios"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get("/admin/dashboard").then(res => setStats(res.data.data))
  }, [])

  if (!stats) return <p className="text-center">Loading...</p>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <div className="space-y-3">
        <div className="bg-gray-100 p-3 rounded">
          Users: {stats.users}
        </div>
        <div className="bg-gray-100 p-3 rounded">
          Posts: {stats.posts}
        </div>
        <div className="bg-gray-100 p-3 rounded">
          Comments: {stats.comments}
        </div>
      </div>
    </div>
  )
}
