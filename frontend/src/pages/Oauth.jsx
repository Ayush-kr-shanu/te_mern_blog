import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function OAuthSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setUserFromToken } = useAuth()

  useEffect(() => {
    const token = params.get("token")

    if (token) {
      localStorage.setItem("accessToken", token)
      setUserFromToken(token)
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">Logging you in...</p>
    </div>
  )
}
