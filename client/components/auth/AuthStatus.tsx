"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AuthStatus() {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/auth/login" 
          className="text-base font-medium hover:text-blue-500 transition"
        >
          Login
        </Link>
        <Link 
          href="/auth/signup" 
          className="text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg text-white shadow-sm transition-all"
        >
          Sign Up
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-4">
      <span className="text-base font-medium">
        {user.name}
      </span>
      <button
        onClick={logout}
        className="text-sm font-medium text-red-500 hover:text-red-600 transition bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
