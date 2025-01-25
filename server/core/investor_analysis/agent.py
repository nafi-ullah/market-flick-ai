

from langchain.schema import HumanMessage, SystemMessage
from langchain_community.tools import TavilySearchResults
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from core.investor_analysis.prompts import investor_finder_system_message, investor_finder_human_message

from core.investor_analysis.tools.investor_finder import save_investors_data
from utils.general_utils import load_response_from_json

def get_investor_analysis(id: str):
    
    search_tool = TavilySearchResults(
        search_depth="advanced",
        include_answer=True,
        include_raw_content=True,
    )

    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    agent = create_react_agent(model=llm, tools=[
        search_tool, save_investors_data
    ])

    basic_info = load_response_from_json(f"basic_info_{id}")["basic_info"]
    knowledge_base = load_response_from_json(f"market_size_report_{id}")["knowledge_base"]

    inputs = {
        "messages": [
            SystemMessage(investor_finder_system_message),
            HumanMessage(investor_finder_human_message.format(
                basic_info=basic_info,
                knowledge_base=knowledge_base,
                id=id
            ))
        ]
    }
    
    agent.invoke(inputs, stream_mode="updates")

    

