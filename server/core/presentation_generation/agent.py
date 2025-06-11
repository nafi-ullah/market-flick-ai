from langchain.schema import HumanMessage, SystemMessage
from langchain_core.prompts.chat import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from core.presentation_generation.tools.presentation import make_presentation
from custom_types.presentation_generation import SlideInput
from utils.general_utils import load_response_from_db
from core.presentation_generation.prompt import presentation_system_message, presentation_human_message


def get_presentation_agent():
    """
    Create and return a presentation agent.
    """
    
    llm = ChatOpenAI(model="gpt-4o", temperature=0)


    agent = create_react_agent(model=llm, tools=[make_presentation])

    return agent



def create_presentation(id: str, template_name: str):
    """
    Create a presentation for the given id.
    """


    market_size_report = load_response_from_db(f"market_size_report_{id}")

    inputs = {
        "messages": [
            SystemMessage(presentation_system_message),
            HumanMessage(presentation_human_message.format(
                knowledge_base=market_size_report,
                id=id,
                template_name=template_name,
            ))
        ]
    }

    agent = get_presentation_agent()
    response = agent.invoke(inputs, {"max_iter": 20})["messages"][-1].content

    return response