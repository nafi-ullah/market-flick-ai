import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the paths that require authentication
const protectedPaths = ["/analyze", "/investor", "/previous-analysis"];

// Define the authentication-related paths
const authPaths = ["/auth/login", "/auth/signup", "/auth/verify-email", "/auth/forgot-password", "/auth/reset-password"];

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Check if token exists in cookies
  const token = request.cookies.get("token")?.value;

  // For protected routes, check if user is authenticated
  const isProtectedPath = protectedPaths.some((protectedPath) => 
    path.startsWith(protectedPath)
  );
  const isAuthPath = authPaths.some((authPath) => 
    path.startsWith(authPath)
  );

  // Redirect unauthenticated users to login
  if (isProtectedPath && !token) {
    const url = new URL("/auth/login", request.url);
    // Use the pathname and search for callbackUrl, not the full origin (for relative redirect)
    url.searchParams.set("callbackUrl", path + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from auth pages to home
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedPaths.map(path => `${path}/:path*`), ...authPaths],
};
