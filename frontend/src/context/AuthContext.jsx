import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/user/me")
      .then((res) => setUser(res.data.data))
      .catch(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (data) => {
    console.log(data);
    const res = await api.post("/auth/register", data);

    localStorage.setItem("accessToken", res.data.data.accessToken);
    setUser(res.data.data.user);

    return res.data;
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    setUser(res.data.data.user);
    return res.data;
  };

  const setUserFromToken = async (token) => {
    try {
      localStorage.setItem("accessToken", token);
      const res = await api.get("/user/me");
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUserFromToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
