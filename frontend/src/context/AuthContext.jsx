"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // load from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });
    const { token, username, role } = res.data;
    setToken(token);
    setUser({ username, role });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ username, role }));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
