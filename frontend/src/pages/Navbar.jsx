import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-4 items-center">
        <Link to="/" className="font-bold text-lg">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/create">Create</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button
              onClick={logout}
              className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
