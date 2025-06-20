from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "YOUR_SUPER_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

async def verify_jwt_token(request: Request, call_next):
    """
    Middleware to verify JWT token for protected routes.
    Bypasses verification for authentication endpoints and public routes.
    """
    # Routes that don't require authentication
    public_paths = [
        "/auth/login",
        "/auth/signup",
        "/auth/verify-email",
        "/auth/social-login", 
        "/auth/refresh-token",
        "/docs",
        "/redoc",
        "/openapi.json",
        "/"
    ]
    
    # Check if the route is public
    path = request.url.path
    if any(path.startswith(public_path) for public_path in public_paths):
        return await call_next(request)
    
    # Check for Authorization header
    authorization: str = request.headers.get("Authorization")
    if not authorization:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Authorization header missing"},
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify token format
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid authentication scheme"},
                headers={"WWW-Authenticate": "Bearer"},
            )
    except ValueError:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid token format"},
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if token is access token
        if payload.get("type") != "access":
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid token type"},
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Check if token is expired
        if payload.get("exp") < time.time():
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Token has expired"},
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Add user info to request state
        request.state.user_id = payload.get("sub")
        
    except JWTError:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid authentication token"},
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Continue with the request
    return await call_next(request)
