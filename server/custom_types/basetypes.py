from typing import List, Tuple
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


class ChatResponse(BaseModel):
    output: str = Field(..., description="The output of the agent")
    chat_history: List[Tuple[str, str]] = Field(..., description="The updated chat history")