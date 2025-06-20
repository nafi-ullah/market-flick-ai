from pydantic import BaseModel, EmailStr, Field, field_serializer, ConfigDict
from typing import Optional, List, Dict, Any, Annotated
from datetime import datetime
from bson import ObjectId
from enum import Enum

# Custom ObjectId field handling for MongoDB
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, info):
        if not v:
            return ObjectId()
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_json_schema__(cls, schema):
        return {"type": "string"}

class SocialProvider(str, Enum):
    GOOGLE = "google"
    GITHUB = "github"
    NONE = "none"

# User base model for shared properties
class UserBase(BaseModel):
    email: EmailStr
    name: str
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# User creation model (used for signup)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

# User update model (used for profile updates)
class UserUpdate(BaseModel):
    name: Optional[str] = None

# User model for database operations
class UserInDB(UserBase):
    id: Annotated[PyObjectId, Field(default_factory=PyObjectId, alias="_id")]
    hashed_password: str
    social_provider: SocialProvider = SocialProvider.NONE
    social_id: Optional[str] = None
    verification_token: Optional[str] = None
    verification_token_expires: Optional[datetime] = None
    reset_token: Optional[str] = None
    reset_token_expires: Optional[datetime] = None
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )

# User model for responses (without sensitive fields)
class User(UserBase):
    id: str = Field(alias="_id")
    social_provider: SocialProvider
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )

# Token model for JWT response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: str
    user: User

# Login request model
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Social login request
class SocialLoginRequest(BaseModel):
    provider: SocialProvider
    token: str

# Password reset request model
class PasswordResetRequest(BaseModel):
    email: EmailStr

# Password reset with token model
class PasswordResetWithToken(BaseModel):
    token: str
    password: str

# Error response model
class ErrorResponse(BaseModel):
    detail: str
