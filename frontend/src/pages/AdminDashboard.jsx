import { useEffect, useState } from "react"
import api from "../api/axios"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/user"),
        ])

        setStats(statsRes.data.data)
        setUsers(usersRes.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* DASHBOARD STATS */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Users" value={stats.users} />
          <StatCard label="Posts" value={stats.posts} />
          <StatCard label="Comments" value={stats.comments} />
        </div>
      </div>

      {/* USERS LIST */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">All Users</h3>

        {users.length === 0 && (
          <p className="text-gray-500">No users found</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border rounded p-4 bg-gray-50"
            >
              <h4 className="font-semibold text-lg">
                {user.name}
              </h4>

              <p className="text-sm text-gray-600">
                {user.email}
              </p>

              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role.toUpperCase()}
              </span>

              <p className="text-xs text-gray-500 mt-2">
                Joined: {new Date(user.createdAt).toDateString()}
              </p>

              {/* FUTURE ACTIONS */}
              {/* 
              <div className="flex gap-3 mt-3 text-sm">
                <button className="text-blue-600">Change Role</button>
                <button className="text-red-600">Deactivate</button>
              </div>
              */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Reusable Stat Card */
function StatCard({ label, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded text-center">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
