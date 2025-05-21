"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export default function VerifyPromptPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || user?.email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to resend verification email");
      } else {
        setMessage("Verification email has been sent. Please check your inbox.");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Email Verification Required
          </h1>
        </div>
        
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          
          <p className="mb-6 text-lg text-gray-700 font-medium">
            Your account needs to be verified before you can access all features.
            Please check your email for a verification link, or request a new one below.
          </p>

          {!user && (
            <div className="mb-6">
              <label htmlFor="email" className="block text-base font-medium text-gray-800 mb-1 text-left">
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
                required
              />
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
              {error}
            </div>
          )}
          
          {message && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 font-medium">
              {message}
            </div>
          )}

          <button
            onClick={handleResendVerification}
            disabled={loading || (!user && !email)}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium text-base shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>

          <div className="mt-6">
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
