from datetime import datetime, timedelta
from typing import Optional, Union, Dict, Any
import os
from jose import jwt, JWTError
from passlib.context import CryptContext
import uuid
import secrets
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import emails
from emails.template import JinjaTemplate

# Load environment variables
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "YOUR_SUPER_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

# Email Configuration
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "no-reply@marketflick.ai")
EMAIL_SERVER = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Development Configuration
SKIP_EMAIL_VERIFICATION = os.getenv("SKIP_EMAIL_VERIFICATION", "false").lower() == "true"

# OAuth2 scheme for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Password context for hashing and verifying passwords
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Functions for password hashing and verification
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)

# Functions for JWT token generation and verification
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: Dict[str, Any]) -> str:
    """Create a JWT refresh token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get the current user from the JWT token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if token is refresh token
        if payload.get("type") == "refresh":
            raise credentials_exception
            
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return {"user_id": user_id, "payload": payload}
    except JWTError:
        raise credentials_exception

# Functions for token generation
def generate_verification_token() -> str:
    """Generate a token for email verification."""
    return secrets.token_urlsafe(32)

def generate_password_reset_token() -> str:
    """Generate a token for password reset."""
    return secrets.token_urlsafe(32)

# Email sending functionality
def send_verification_email(email: str, token: str) -> bool:
    """Send verification email to user."""
    # If email verification is skipped, return success without sending
    if SKIP_EMAIL_VERIFICATION:
        print("Email verification is skipped in development mode.")
        return True
        
    # Check if email credentials are configured
    if not EMAIL_USERNAME or not EMAIL_PASSWORD:
        print("Email credentials are not configured. Cannot send verification email.")
        return False
        
    verification_url = f"{FRONTEND_URL}/auth/verify-email?token={token}"
    
    message = emails.Message(
        subject="Verify your email address",
        html=f"""
        <h1>Welcome to Market Flick AI!</h1>
        <p>Please click the link below to verify your email address:</p>
        <p><a href="{verification_url}">Verify Email</a></p>
        <p>If you did not sign up for Market Flick AI, please ignore this email.</p>
        """,
        mail_from=(EMAIL_SENDER, "Market Flick AI")
    )
    
    try:
        response = message.send(
            to=email,
            smtp={"host": EMAIL_SERVER, "port": EMAIL_PORT, "user": EMAIL_USERNAME, "password": EMAIL_PASSWORD, "tls": True}
        )
        return response.status_code == 250
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_password_reset_email(email: str, token: str) -> bool:
    """Send password reset email to user."""
    # If email verification is skipped, print debug info but still send email
    if SKIP_EMAIL_VERIFICATION:
        print("Email verification is skipped, but still attempting to send password reset email.")
    
    # Check if email credentials are configured
    if not EMAIL_USERNAME or not EMAIL_PASSWORD:
        print("Email credentials are not configured. Cannot send password reset email.")
        return False
        
    reset_url = f"{FRONTEND_URL}/auth/reset-password?token={token}"
    
    message = emails.Message(
        subject="Reset your password",
        html=f"""
        <h1>Market Flick AI Password Reset</h1>
        <p>You requested a password reset. Please click the link below to set a new password:</p>
        <p><a href="{reset_url}">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        """,
        mail_from=(EMAIL_SENDER, "Market Flick AI")
    )
    
    try:
        response = message.send(
            to=email,
            smtp={"host": EMAIL_SERVER, "port": EMAIL_PORT, "user": EMAIL_USERNAME, "password": EMAIL_PASSWORD, "tls": True}
        )
        return response.status_code == 250
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def should_skip_verification() -> bool:
    """Check if email verification should be skipped."""
    return SKIP_EMAIL_VERIFICATION
