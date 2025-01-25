import json
from typing import List, Optional, Union, Dict, Tuple, Any
from pydantic import BaseModel, Field
from langchain.schema import SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage

from core.market_size_analysis.utils import save_response_to_json
from utils.general_utils import load_response_from_json
from core.util_agents.prompts import identifier_system_message, updater_agent_system_message
from custom_types.basetypes import Identifier, Updater


def format_chat_history(chat_history: List[Tuple[str, str]]) -> List[BaseMessage]:
    """Convert chat history tuples to BaseMessage objects."""
    formatted_history = []
    role_to_message = {
        "human": HumanMessage,
        "ai": AIMessage
    }
    
    for role, message in chat_history or []:
        message_cls = role_to_message.get(role)
        if message_cls:
            formatted_history.append(message_cls(content=message))
    
    return formatted_history


def identify_keys_and_instruction(
    input_text: str, 
    component_keys: List[str]
) -> Tuple[List[str], str]:
    """Identify keys and get instruction using LLM."""
    llm = ChatOpenAI(model="gpt-4o", temperature=0).with_structured_output(Identifier)
    
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=identifier_system_message),
        ("human", "Message: {input}\n\nKeys: {component_keys}"),
    ])
    
    chain = prompt | llm
    identifier = chain.invoke({"input": input_text, "component_keys": component_keys})
    
    return identifier.keys, identifier.instruction


def load_data_for_keys(keys: List[str], id: str) -> List[Dict[str, Any]]:
    """Load data for the given keys."""
    data_list = []
    for key in keys:
        try:
            data = load_response_from_json(f"{key}_{id}")
            data_list.append({"key": key, "data": data})
        except Exception as e:
            raise ValueError(f"Failed to load data for key: {key}. Error: {str(e)}")
    return data_list


def update_data_with_llm(
    data_list: List[Dict[str, Any]], 
    instruction: str
) -> Tuple[str, List[Dict[str, Any]]]:
    """Update data using LLM based on instruction."""
    llm = ChatOpenAI(
        model="gpt-4o", 
        temperature=0, 
        model_kwargs={"response_format": {"type": "json_object"}}
    )
    
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=updater_agent_system_message),
        HumanMessage(content=f"""
        Here is the data to update:
        {data_list}

        Here is the instruction for updating the data:
        {instruction}
        """),
    ])
    
    chain = prompt | llm
    response = chain.invoke({"data_list": data_list, "instruction": instruction})
    updater = json.loads(response.content)
    
    return updater["message"], updater["updated_data"]


def save_updated_data(updated_data: List[Dict[str, Any]], id: str) -> None:
    """Save the updated data to storage."""
    for data in updated_data:
        key = data["key"]
        save_response_to_json(data["data"], f"{key}_{id}")


def chat_write_agent(
    id: str,
    input: str,
    chat_history: Optional[List[Tuple[str, str]]] = None,
    component_keys: Optional[List[str]] = None,
    knowledge_base: Optional[str] = None
) -> Dict[str, Any]:
    """
    Main function to handle chat interactions and data updates.
    
    Args:
        id: Unique identifier for the conversation
        input: User input message
        chat_history: List of previous conversation messages
        component_keys: List of keys to consider for updates
        knowledge_base: Optional knowledge base reference
    
    Returns:
        Dict containing output message and updated chat history
    """
    formatted_chat_history = format_chat_history(chat_history)
    
    try:
        # Identify keys and get instruction
        keys, instruction = identify_keys_and_instruction(input, component_keys)
        
        # Load and update data
        data_list = load_data_for_keys(keys, id)
        final_message, updated_data = update_data_with_llm(data_list, instruction)
        
        # Save updated data
        save_updated_data(updated_data, id)
        
        # Update chat history
        formatted_chat_history.extend([
            HumanMessage(content=input),
            AIMessage(content=final_message)
        ])
        
        return {
            "output": final_message,
            "chat_history": [(msg.type, msg.content) for msg in formatted_chat_history],
        }
        
    except Exception as e:
        error_message = f"An error occurred: {str(e)}. Please try again."
        formatted_chat_history.extend([
            HumanMessage(content=input),
            AIMessage(content=error_message)
        ])
        
        return {
            "output": error_message,
            "chat_history": [(msg.type, msg.content) for msg in formatted_chat_history],
        }
