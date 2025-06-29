import json
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_core.runnables import RunnablePassthrough
from core.util_agents.prompts import chat_system_message
from utils.general_utils import clean_for_json, get_all_saved_responses

def create_chat_agent(knowledge_base: str = None, knowledge_base_id: str = None, user_id: str = '') :
    """
    Create and return a chat agent.
    """
    # Initialize the chat model
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

    # Define a system message to set the agent's behavior
    business_context = knowledge_base + '\n\n' + json.dumps(clean_for_json(get_all_saved_responses(knowledge_base_id, user_id)))
    system_message = SystemMessage(content=chat_system_message.format(business_context=business_context))

    # Create a prompt template with conversation history
    prompt = ChatPromptTemplate.from_messages([
        system_message,
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])

    # Create a chain that properly handles the input
    chain = (
        RunnablePassthrough.assign(
            chat_history=lambda x: x["chat_history"]
        )
        | prompt
        | llm
    )

    return chain

def chat_with_agent(input_text: str, chat_history: list = None, knowledge_base: str = None, knowledge_base_id: str = None, user_id: str = '') -> dict:
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

    # Get the chat agent
    chat_agent = create_chat_agent(knowledge_base, knowledge_base_id, user_id)

    # Invoke the agent with the correct input format
    response = chat_agent.invoke({
        "input": input_text,
        "chat_history": formatted_chat_history
    })

    # Extract the agent's output
    agent_output = response.content

    # Update chat history
    formatted_chat_history.append(HumanMessage(content=input_text))
    formatted_chat_history.append(AIMessage(content=agent_output))

    return {
        "output": agent_output,
        "chat_history": [(msg.type, msg.content) for msg in formatted_chat_history]
    }