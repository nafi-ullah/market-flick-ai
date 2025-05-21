# Auth System Specification

## Overview

Implement a full-featured authentication system for Market Flick AI, supporting both email/password and social logins (Google, GitHub). The system must work across the FastAPI backend and Next.js frontend, using MongoDB for user data, JWT for API security, email verification, and password reset functionality.

---

## Requirements

1. **Frontend (Next.js)**
   - Signup, Login, Email Verification, Forgot Password, and Reset Password pages.
   - Social login integration (Google, GitHub).
   - API calls to backend for all auth actions.
   - Store JWT securely (prefer HTTP-only cookies).
   - Protect routes and manage user state.

2. **Backend (FastAPI)**
   - User model in MongoDB: email, hashed_password, name, is_verified, social_provider, etc.
   - Endpoints:
     - `POST /auth/signup` (email/password)
     - `POST /auth/login` (email/password)
     - `POST /auth/social-login` (OAuth tokens)
     - `GET /auth/verify-email?token=...`
     - `POST /auth/request-reset`
     - `POST /auth/reset-password`
   - Password hashing (bcrypt).
   - JWT token generation and verification.
   - Email sending for verification and password reset (e.g., SendGrid).
   - Middleware for JWT-protected routes.

3. **Social Login**
   - Frontend obtains OAuth token from Google/GitHub.
   - Sends token to backend for verification and user creation/login.
   - Backend verifies token with provider, issues JWT.

4. **Email Verification**
   - On signup, send verification email with unique token.
   - Endpoint to verify token and activate account.

5. **Password Reset**
   - Request reset: send email with token.
   - Reset password: verify token, update password.

6. **Testing**
   - Unit and integration tests for all endpoints and flows.

---

## Implementation Steps

1. Design user schema and set up MongoDB.
2. Implement backend endpoints and JWT logic.
3. Integrate email service for verification and reset.
4. Build frontend pages and API integration.
5. Add social login using OAuth.
6. Protect frontend routes and manage user state.
7. Test all flows end-to-end.

---