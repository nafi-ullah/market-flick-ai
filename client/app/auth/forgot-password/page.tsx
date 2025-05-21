"use client";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to send reset email");
      } else {
        setMessage("If your email is registered, a reset link has been sent.");
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
            Forgot Password
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Enter your email to receive a password reset link
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-800 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
                {error}
              </div>
            )}
            
            {message && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 font-medium">
                {message}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium text-base shadow-sm transition-all"
              disabled={loading}
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
