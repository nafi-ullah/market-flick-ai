import json
from typing import List, Optional, Union, Dict, Tuple, Any
from langchain_community.tools import TavilySearchResults
from langgraph.prebuilt import create_react_agent
from pydantic import BaseModel, Field
from langchain.schema import SystemMessage
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage

from core.market_size_analysis.utils import print_stream, save_response_to_db
from utils.general_utils import clean_for_json, get_all_saved_responses, load_response_from_db
from core.util_agents.prompts import identifier_system_message, updater_agent_system_message, write_react_system_message, write_react_human_message
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



def get_react_agent(id: str, input: str, component_keys: Optional[List[str]] = None, formatted_chat_history: List[BaseMessage] = None, user_id: str = ''):

    search_tool = TavilySearchResults(
        include_answer=True,
    )

    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    agent = create_react_agent(model=llm, tools=[
        update_data_with_llm, search_tool
    ])
    business_context = clean_for_json(get_all_saved_responses(knowledge_base_id=id, user_id=user_id))

    inputs = {
        "messages": [
            SystemMessage(write_react_system_message),
            HumanMessage(write_react_human_message.format(business_context=business_context))
        ]
    }
    
    # Safely extend chat history if provided
    if formatted_chat_history:
        inputs["messages"].extend(formatted_chat_history)

    inputs["messages"].append(HumanMessage(f"{input}\n\n\nComponent Keys: {component_keys}"))

    response = agent.invoke(inputs)

    # print_stream(agent.stream(inputs, stream_mode="values"))

    # return "WIP"
    
    # Extract the last message's content as the output
    # This assumes the last message in the response is the agent's final response
    if "messages" in response:
        final_message = response["messages"][-1]
        return final_message.content if hasattr(final_message, 'content') else str(final_message)
    
    return "No response generated"




def load_data_for_keys(keys: List[str], id: str) -> List[Dict[str, Any]]:
    """Load data for the given keys."""
    data_list = []
    for key in keys:
        try:
            data = load_response_from_db(f"{key}_{id}")
            data_list.append({"key": key, "data": data})
        except Exception as e:
            raise ValueError(f"Failed to load data for key: {key}. Error: {str(e)}")
    return data_list


def update_data_with_llm(
    keys: List[str], 
    instruction: str,
    id: str
) -> Dict[str, Any]:
    """
    This tool will import data from the keys and update it using the instruction.

    Args:
        keys: List of keys to import data from
        instruction: Instruction for updating the data
        id: Unique identifier for the conversation

    Returns:
        The message and updated data
    """
    llm = ChatOpenAI(
        model="gpt-4o", 
        temperature=0, 
        model_kwargs={"response_format": {"type": "json_object"}}
    )

    data_list = load_data_for_keys(keys, id)
    
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

    save_updated_data(updater["updated_data"], id)
    
    return {
        "message": updater["message"],
        "updated_data": updater["updated_data"]
    }


def save_updated_data(updated_data: List[Dict[str, Any]], id: str) -> None:
    """Save the updated data to storage."""
    for data in updated_data:
        key = data["key"]
        save_response_to_db(data["data"], f"{key}_{id}")


def chat_write_agent(
    id: str,
    input: str,
    chat_history: Optional[List[Tuple[str, str]]] = None,
    component_keys: Optional[List[str]] = None,
    knowledge_base: Optional[str] = None,
    user_id: str = ''
    
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

    try:
        formatted_chat_history = format_chat_history(chat_history or [])

        # Use the modified get_react_agent method
        final_message = get_react_agent(id, input, component_keys, formatted_chat_history, user_id)

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
        print(e)
        error_message = f"An error occurred: {str(e)}"
        
        # Ensure chat_history is initialized
        formatted_chat_history = formatted_chat_history or []
        
        formatted_chat_history.extend([
            HumanMessage(content=input),
            AIMessage(content=error_message)
        ])
        
        return {
            "output": error_message,
            "chat_history": [(msg.type, msg.content) for msg in formatted_chat_history],
        }
