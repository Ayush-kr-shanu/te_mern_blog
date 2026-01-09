import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./pages/Navbar"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Posts from "./pages/Posts"
import CreatePost from "./pages/CreatePost"
import PostDetails from "./pages/PostDetails"
import EditPost from "./pages/EditPost"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import OAuthSuccess from "./pages/Oauth"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* ✅ HOME PAGE */}
          <Route path="/" element={<Posts />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/post/edit/:id" element={<EditPost />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
