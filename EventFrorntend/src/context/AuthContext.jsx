import React, { createContext, useContext, useEffect, useState } from "react";
import { api, getToken } from "../lib/index";

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [claims, setClaims] = useState(() => {
    const t = getToken();
    return t ? decodeToken(t) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("eventra_token", token);
      setClaims(decodeToken(token));
    } else {
      localStorage.removeItem("eventra_token");
      setClaims(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    setTokenState(data.access_token);
    return data;
  };

  const register = async (name, email, password) => {
    return api.register({ name, email, password });
  };

  const logout = () => setTokenState(null);

  const loginWithGoogle = () => {
    window.location.href = api.googleLoginUrl();
  };

  const captureTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("access_token");
    if (t) {
      setTokenState(t);
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  const value = {
    token,
    role: claims?.role || null,
    userId: claims?.sub || null,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    loginWithGoogle,
    captureTokenFromUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}