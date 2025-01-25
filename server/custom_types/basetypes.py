from typing import List, Tuple, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class ChatType(Enum):
    """Enum class defining the types of chat interactions available in the system.
    
    Attributes:
        WRITE: Represents a write operation in the chat
        CHAT: Represents a regular chat message
    """
    WRITE = "write"
    CHAT = "chat"

class ChatRequest(BaseModel):
    id: str = Field(..., description="The id of the request")
    type: ChatType = Field(..., description="The type of request")
    message: str = Field(..., description="The message to be sent")
    chat_history: List[Tuple[str, str]] = Field(None, description="The chat history")
    component_keys: List[str] = Field(None, description="The keys of the components to be sent")
    chat_model: str = Field("gpt-4o", description="The chat model to be used")


class ChatResponse(BaseModel):
    output: str = Field(..., description="The output of the agent")
    chat_history: List[Tuple[str, str]] = Field(..., description="The updated chat history")


class Identifier(BaseModel):
    """Model for identifying keys and instructions for data updates."""
    keys: List[str] = Field(..., description="The list of keys for which the data should be updated")
    instruction: str = Field(..., description="The instruction for updating the data")



class UpdaterInput(BaseModel):
    keys: List[str] = Field(..., description="The list of keys to update")
    instruction: str = Field(..., description="The instruction for updating the data")
    id: str = Field(..., description="The id of the conversation")

class Updater(BaseModel):
    """Model for the update response containing message and updated data."""
    message: str = Field(..., description="The message after updating the data, what was updated and why")
    updated_data: List[Dict[str, Any]] = Field(
        None, 
        description="The updated data, which must strictly follow the same format and order as the original data"
    )