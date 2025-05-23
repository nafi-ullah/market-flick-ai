from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import requests
from pymongo import MongoClient
from pymongo.collection import Collection
from bson import ObjectId
import os
from jose import jwt, JWTError
from typing import Dict, Any, Optional

from custom_types.auth import (
    UserCreate, User, UserInDB, LoginRequest, Token, ErrorResponse, 
    PasswordResetRequest, PasswordResetWithToken, SocialLoginRequest, 
    SocialProvider
)
from utils.auth_utils import (
    verify_password, get_password_hash, create_access_token, create_refresh_token,
    get_current_user, generate_verification_token, generate_password_reset_token,
    send_verification_email, send_password_reset_email
)

# Create router
router = APIRouter(prefix="/auth", tags=["authentication"])

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client["marketflickai"]
users_collection: Collection = db["users"]

# Helper function to find user by email
async def get_user_by_email(email: str) -> Optional[UserInDB]:
    user_dict = users_collection.find_one({"email": email})
    if user_dict:
        return UserInDB(**user_dict)
    return None

# Helper function to find user by ID
async def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    user_dict = users_collection.find_one({"_id": ObjectId(user_id)})
    if user_dict:
        return UserInDB(**user_dict)
    return None

# Helper function to find user by token
async def get_user_by_verification_token(token: str) -> Optional[UserInDB]:
    user_dict = users_collection.find_one({"verification_token": token})
    if user_dict:
        return UserInDB(**user_dict)
    return None

async def get_user_by_reset_token(token: str) -> Optional[UserInDB]:
    user_dict = users_collection.find_one({
        "reset_token": token,
        "reset_token_expires": {"$gt": datetime.utcnow()}
    })
    if user_dict:
        return UserInDB(**user_dict)
    return None

# Authentication endpoints
@router.post("/signup", response_model=Dict[str, str], status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    # Check if user already exists
    if await get_user_by_email(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if email verification should be skipped
    from utils.auth_utils import should_skip_verification
    skip_verification = should_skip_verification()
    
    # Generate verification token
    verification_token = generate_verification_token()
    verification_token_expires = datetime.utcnow() + timedelta(hours=24)
    
    # Create user
    hashed_password = get_password_hash(user_data.password)
    user_in_db = UserInDB(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hashed_password,
        verification_token=None if skip_verification else verification_token,
        verification_token_expires=None if skip_verification else verification_token_expires,
        is_verified=skip_verification  # Auto-verify if SKIP_EMAIL_VERIFICATION is true
    )
    
    # Insert user into database
    result = users_collection.insert_one(user_in_db.dict(by_alias=True))
    
    # Send verification email (unless skipped)
    if not skip_verification:
        send_verification_email(user_data.email, verification_token, user_data.name)
        return {"message": "User created. Please check your email to verify your account."}
    else:
        return {"message": "User created and auto-verified. You can now log in."}

@router.get("/verify-email", response_model=Dict[str, str])
async def verify_email(token: str):
    # Get user by verification token
    user = await get_user_by_verification_token(token)
    if not user or user.verification_token_expires < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    # Update user
    users_collection.update_one(
        {"_id": user.id},
        {"$set": {"is_verified": True, "verification_token": None, "verification_token_expires": None}}
    )
    
    return {"message": "Email verified successfully. You can now log in."}

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    # Get user by email
    user = await get_user_by_email(login_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if email is verified, unless SKIP_EMAIL_VERIFICATION is enabled
    from utils.auth_utils import should_skip_verification
    if not user.is_verified and not should_skip_verification():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please verify your email before logging in"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.id)}
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": str(user.id)}
    )
    
    # Create user response object (without sensitive data)
    user_response = User(**{
        **user.dict(), 
        "id": str(user.id)
    })
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        refresh_token=refresh_token,
        user=user_response
    )

@router.post("/request-reset", response_model=Dict[str, str])
async def request_password_reset(request_data: PasswordResetRequest):
    # Get user by email (we don't reveal if the email exists or not for security)
    user = await get_user_by_email(request_data.email)
    if user:
        # Generate reset token
        reset_token = generate_password_reset_token()
        reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        
        # Update user
        users_collection.update_one(
            {"_id": user.id},
            {"$set": {"reset_token": reset_token, "reset_token_expires": reset_token_expires}}
        )
        
        # Send reset email with user's name if available
        send_password_reset_email(request_data.email, reset_token, user.name)
    
    return {"message": "If your email is registered, you will receive a password reset link"}

@router.post("/reset-password", response_model=Dict[str, str])
async def reset_password(reset_data: PasswordResetWithToken):
    # Get user by reset token
    user = await get_user_by_reset_token(reset_data.token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Update user with new password
    hashed_password = get_password_hash(reset_data.password)
    users_collection.update_one(
        {"_id": user.id},
        {"$set": {"hashed_password": hashed_password, "reset_token": None, "reset_token_expires": None}}
    )
    
    return {"message": "Password reset successful. You can now log in with your new password."}

@router.post("/resend-verification", response_model=Dict[str, str])
async def resend_verification(email_data: Dict[str, str]):
    email = email_data.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is required"
        )
    
    # Get user by email
    user = await get_user_by_email(email)
    if not user:
        # Don't reveal if user exists or not
        return {"message": "If your email is registered, a verification link has been sent."}
    
    # Check if already verified
    if user.is_verified:
        return {"message": "Your email is already verified. You can log in."}
    
    # Generate new verification token
    verification_token = generate_verification_token()
    verification_token_expires = datetime.utcnow() + timedelta(hours=24)
    
    # Update user with new verification token
    users_collection.update_one(
        {"_id": user.id},
        {"$set": {
            "verification_token": verification_token,
            "verification_token_expires": verification_token_expires
        }}
    )
    
    # Send verification email with user's name
    send_verification_email(email, verification_token, user.name)
    
    return {"message": "Verification link sent. Please check your email."}

@router.post("/social-login", response_model=Token)
async def social_login(social_data: SocialLoginRequest):
    user_info = None
    
    # Verify the social token and get user info
    if social_data.provider == SocialProvider.GOOGLE:
        # Verify Google token
        response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {social_data.token}"}
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google token"
            )
        user_info = response.json()
        social_id = user_info.get("sub")
        email = user_info.get("email")
        name = user_info.get("name")
        
    elif social_data.provider == SocialProvider.GITHUB:
        # Verify GitHub token
        response = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {social_data.token}"}
        )
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid GitHub token"
            )
        user_info = response.json()
        social_id = str(user_info.get("id"))
        name = user_info.get("name") or user_info.get("login")
        
        # Get email from GitHub (may require separate call)
        email_response = requests.get(
            "https://api.github.com/user/emails",
            headers={"Authorization": f"token {social_data.token}"}
        )
        if email_response.status_code == 200:
            emails = email_response.json()
            primary_email = next((e for e in emails if e.get("primary")), emails[0] if emails else None)
            email = primary_email.get("email") if primary_email else None
        else:
            email = None
            
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported social provider"
        )
    
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not retrieve email from social provider"
        )
    
    # Check if user exists
    user = await get_user_by_email(email)
    
    if not user:
        # Create a new user
        user_in_db = UserInDB(
            email=email,
            name=name,
            hashed_password=get_password_hash(generate_password_reset_token()),  # Random password that will never be used
            social_provider=social_data.provider,
            social_id=social_id,
            is_verified=True  # Social logins are automatically verified
        )
        result = users_collection.insert_one(user_in_db.dict(by_alias=True))
        user_id = result.inserted_id
    else:
        # Update existing user with social info if needed
        if user.social_provider == SocialProvider.NONE:
            users_collection.update_one(
                {"_id": user.id},
                {"$set": {"social_provider": social_data.provider, "social_id": social_id, "is_verified": True}}
            )
        user_id = user.id
    
    # Get updated user
    updated_user = await get_user_by_id(str(user_id))
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(user_id)}
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": str(user_id)}
    )
    
    # Create user response object
    user_response = User(**{
        **updated_user.dict(),
        "id": str(updated_user.id)
    })
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        refresh_token=refresh_token,
        user=user_response
    )

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: Dict[str, Any] = Depends(get_current_user)):
    user = await get_user_by_id(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return User(**{
        **user.dict(),
        "id": str(user.id)
    })

@router.post("/refresh-token", response_model=Token)
async def refresh_access_token(refresh_token: str = Body(...)):
    # JWT Configuration
    from utils.auth_utils import SECRET_KEY, ALGORITHM
    from jose import jwt, JWTError
    
    try:
        # Decode refresh token
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if token is refresh token
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )
        
        # Get user ID from token
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        # Get user by ID
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        # Check if user is active and verified
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User is inactive"
            )
        
        # Create new access token
        access_token = create_access_token(data={"sub": user_id})
        
        # Create new refresh token
        new_refresh_token = create_refresh_token(data={"sub": user_id})
        
        # Create user response object
        user_response = User(**{
            **user.dict(), 
            "id": str(user.id)
        })
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            refresh_token=new_refresh_token,
            user=user_response
        )
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
