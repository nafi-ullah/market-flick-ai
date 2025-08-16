"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { GoogleLoginButton, GitHubLoginButton } from "@/components/auth/SocialLoginButtons";

// Separate component for the login form that uses useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      const callbackUrl = searchParams?.get("callbackUrl");
      if (callbackUrl) {
        // Always use router.push for relative paths, window.location.assign for absolute URLs
        if (callbackUrl.startsWith("/")) {
          router.push(callbackUrl);
        } else if (callbackUrl.startsWith("http")) {
          window.location.assign(callbackUrl);
        } else {
          // fallback: treat as relative
          router.push(`/${callbackUrl.replace(/^\/*/, "")}`);
        }
      } else {
        router.push("/analyze");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Sign in to your Market Flick AI account
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
            
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-800 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium text-base shadow-sm transition-all"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          
          <div className="mt-6 flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-600 font-medium">OR</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          
          <div className="mt-6 space-y-3">
            <GoogleLoginButton onError={(error) => setError(error.message)} />
            <GitHubLoginButton onError={(error) => setError(error.message)} />
          </div>
          
          <div className="mt-6 text-center">
            <a href="/auth/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
              Forgot your password?
            </a>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-gray-700">Don't have an account? </span>
            <a href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}