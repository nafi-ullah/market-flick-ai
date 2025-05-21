# Authentication System Implementation

This document provides an overview of the authentication system implemented in Market Flick AI.

## Architecture

The authentication system follows a typical client-server architecture:

1. **Frontend**: Next.js application with pages for login, signup, email verification, password reset, etc.
2. **Backend**: FastAPI server with JWT-based authentication and MongoDB user storage.

## Features

- Standard email/password authentication
- Social login (Google & GitHub)
- Email verification
- Password reset functionality
- JWT-based protected routes
- Route protection middleware

## Directory Structure

### Backend (FastAPI)

- `server/core/auth/routes.py` - Authentication endpoints
- `server/core/auth/middleware.py` - JWT verification middleware
- `server/custom_types/auth.py` - Auth-related data models
- `server/utils/auth_utils.py` - Authentication utilities (JWT, password hashing, etc.)

### Frontend (Next.js)

- `client/app/auth/*` - Authentication pages (login, signup, etc.)
- `client/components/auth/*` - Auth-related components
- `client/context/AuthContext.tsx` - Auth state management context
- `client/hooks/useAuth.ts` - Custom hook for auth context
- `client/pages/api/auth/*` - API routes for authentication
- `client/middleware.ts` - Route protection middleware

## Authentication Flow

### Email/Password Signup

1. User enters name, email, and password on signup page
2. Backend creates user with verification token and sends email
3. User clicks verification link in email
4. Backend verifies token and updates user status
5. User can now log in

### Login Process

1. User enters email and password
2. Backend verifies credentials and checks email verification status
3. Backend generates JWT token and sends it to frontend
4. Frontend stores token and user information
5. Protected routes use token for access

### Social Login

1. User clicks social login button (Google/GitHub)
2. OAuth provider returns access token
3. Backend verifies token with provider and creates/updates user
4. Backend generates JWT token and sends it to frontend
5. Frontend handles same as regular login

## Setup Instructions

1. **Backend**:
   - Install dependencies: `pip install -r auth-requirements.txt`
   - Run setup script: `./setup_auth.sh`
   - Update email configuration in `.env`

2. **Frontend**:
   - Configure OAuth credentials in `.env.local`
   - Follow instructions in `README.oauth-setup.md`

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens have a configurable expiration time
- Email verification helps prevent fake signups
- Social login tokens are validated with providers
- HTTP-only cookies for token storage
- CORS protection

## Future Improvements

- Refresh token mechanism
- Multi-factor authentication
- Account settings page
- Role-based authorization
- Session management
- OAuth token refresh
