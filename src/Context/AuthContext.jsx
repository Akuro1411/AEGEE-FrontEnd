// AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import useApi from "../hooks/useApi";
import { API_ENDPOINTS, STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const { post, loading } = useApi();

  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem("userEmail");
  });

  // 🔹 REGISTER = register + log in
  const register = async (formData) => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // try to get email from response, fall back to formData
      const emailFromResponse =
        response?.email || response?.Email || response?.user?.email;
      const emailFromForm =
        formData.get("Email") || formData.get("email") || null;

      const email = emailFromResponse || emailFromForm || null;

      // build a minimal user object so the app has something
      const authUser = {
        ...(response?.user || response),
        ...(email ? { email } : {}),
      };

      setUser(authUser);
      setIsAuthenticated(true);

      // persist to sessionStorage for refresh/ProfileContext/Header
      sessionStorage.setItem("user", JSON.stringify(authUser));
      if (email) {
        sessionStorage.setItem("userEmail", email);
      }

      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // you can keep login if you have a separate /login later
  const login = async (credentials) => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        const authUser = response.user || response;
        setUser(authUser);
        setIsAuthenticated(true);

        sessionStorage.setItem("user", JSON.stringify(authUser));
        if (authUser.email) {
          sessionStorage.setItem("userEmail", authUser.email);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
