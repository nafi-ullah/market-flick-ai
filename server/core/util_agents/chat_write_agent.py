import json
from langchain.schema import SystemMessage
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from constants import important_keys
from typing import List, Optional, Union
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

from core.market_size_analysis.utils import save_response_to_json
from utils.general_utils import load_response_from_json
import re


class Identifier(BaseModel):
    keys: List[str] = Field(..., description="The list of keys for which the data should be updated")
    instruction: str = Field(..., description="The instruction for updating the data")


class Updater(BaseModel):
    message: str = Field(..., description="The message after updating the data, what was updated and why")
    updated_data: list[dict] = Field(None, description="The updated data, which must strictly follow the same format and order as the original data. You may only modify the values but not the structure, format, or order.")


    
def chat_write_agent(id: str, input: str, chat_history: list = None, component_keys: list = None, knowledge_base: str = None):

    """
    Interact with the chat agent and return its response.
    """
    if chat_history is None:
        chat_history = []

    # Convert chat history to BaseMessages if it's not already
    formatted_chat_history = []
    for role, message in chat_history:
        if role == "human":
            formatted_chat_history.append(HumanMessage(content=message))
        elif role == "ai":
            formatted_chat_history.append(AIMessage(content=message))

    
    
    llm_key_identifier = ChatOpenAI(model="gpt-4o", temperature=0).with_structured_output(Identifier)

    system_message = SystemMessage(content=f"""From the given message, you need to identify the keys for which the data should be updated and the instruction for updating the data. Give the instructions in clear manner. If there are multiple keys, give the instruction for all of them.
    The list of acceptable keys are: {important_keys}. 
    Sometimes the user provides the keys, in that case just use the keys that he provides.""")

    prompt = ChatPromptTemplate.from_messages([
        system_message,
        ("human", "Message: {input}\n\nKeys: {component_keys}"),
    ])

    chain = prompt | llm_key_identifier

    identifier = chain.invoke({"input": input, "component_keys": component_keys})

    keys = identifier.keys
    instruction = identifier.instruction

    # get the current data

    print("keys: ", keys)
    print("instruction: ", instruction)

    data_list = []

    for key in keys:
        data_list.append({"key": key, "data": load_response_from_json(f"{key}_{id}")})


    print("data list: ", data_list)


    llm_updater = ChatOpenAI(model="gpt-4o", temperature=0, model_kwargs={ "response_format": { "type": "json_object" } })



    updater_system_message = SystemMessage(content=f"""
    You are a very careful data updater. You need to update some given data in the same format and in the same order as the original data. If the data cannot be updated, just leave it unchanged. Do not make up any data, just use the original data.

    The output should be in the following json format:
    {{
        "message": str,
        "updated_data": list[dict | str]
    }}

    Here message means: The message after updating the data, what was updated and why
    and The updated data, which must strictly follow the same format and order as the original data. You may only modify the values but not the structure, format, or order.
    """)

    updater_human_message = HumanMessage(content=f"""
    Here is the data to update:
    {data_list}

    Here is the instruction for updating the data:
    {instruction}
    """)


    updater_prompt = ChatPromptTemplate.from_messages([
        updater_system_message,
        updater_human_message,
    ])

    updater_chain = updater_prompt | llm_updater

    ai_msg = updater_chain.invoke({"data_list": data_list, "instruction": instruction})


    updater = json.loads(ai_msg.content)


    final_message = updater["message"]

    updated_data = updater["updated_data"]

    print("final message: ", final_message)

    print("updated data: ", updated_data)

    for data in updated_data:
        key = data["key"]
        save_response_to_json(data["data"], f"{key}_{id}")

    print("updated data successfully")

    
    # Now just need to finish the chat agent

    # Update chat history
    formatted_chat_history.append(HumanMessage(content=input))
    formatted_chat_history.append(AIMessage(content=final_message))


    return {
        "output": final_message,
        "chat_history": [(msg.type, msg.content) for msg in formatted_chat_history]
    }