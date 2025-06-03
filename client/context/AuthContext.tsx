"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import Toast from "@/components/ui/Toast";
import { useState as useToastState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  is_verified: boolean;
  social_provider: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: string, token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  socialLogin: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToastState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      document.cookie = `token=${data.access_token}; path=/;`;
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
      }

      return await res.json();
    } catch (error: any) {
      throw new Error(error.message || "Signup failed");
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    localStorage.removeItem('token');
    setToast('You have been logged out.');
    setTimeout(() => {
      setToast(null);
      window.location.href = '/';
    }, 2000);
  };

  const socialLogin = async (provider: string, token: string) => {
    try {
      const res = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, token }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Social login failed");
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
    } catch (error: any) {
      throw new Error(error.message || "Social login failed");
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Request failed");
      }

      return await res.json();
    } catch (error: any) {
      throw new Error(error.message || "Request failed");
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Reset failed");
      }

      return await res.json();
    } catch (error: any) {
      throw new Error(error.message || "Reset failed");
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch("/api/auth/me", {
        headers: token ? {
          Authorization: `Bearer ${token}`,
        } : {},
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      // Silently fail for refresh
      console.error("Failed to refresh user data:", error);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkUserAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const res = await fetch("/api/auth/me", {
          headers: token ? {
            Authorization: `Bearer ${token}`,
          } : {},
        });

        if (!res.ok) {
          // If we have a token in localStorage but the request failed, clear it
          if (token) {
            localStorage.removeItem("token");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        socialLogin,
        forgotPassword,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
      {toast && <Toast message={toast} onClose={() => setToast(null)} duration={2000} />}
    </AuthContext.Provider>
  );
};

export default AuthContext;
