import dotenv
dotenv.load_dotenv()
from custom_types.market_analysis import BusinessAnalysisInput
from pydantic import BaseModel, Field
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.tools import TavilySearchResults
from langchain_openai import ChatOpenAI
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from core.market_size_analysis.prompts import market_size_system_message, market_size_human_message
from core.market_size_analysis.utils import print_stream
from core.market_size_analysis.dtypes import Queries
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

def generate_queries(business_analysis_input: BusinessAnalysisInput):

    structured_llm = llm.with_structured_output(Queries)
    system_instruction_query = market_analysis_query_writer_instructions.format(
        busines_sector=business_analysis_input.sector,
        business_idea=business_analysis_input.idea,
        business_location=business_analysis_input.location,
        market_size_structure=market_size_structure
    )
    results = structured_llm.invoke([SystemMessage(system_instruction_query)] + [HumanMessage(content="Please provide at least 5 search queries for market identifying TAM, SAM and SOM")])
    return results


search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)   



def market_size_report(business_analysis_input: BusinessAnalysisInput):
    agent = create_react_agent(llm, tools=[search_tool])
    inputs = {"messages": [SystemMessage(market_size_system_message), HumanMessage(market_size_human_message.format(
        business_sector=business_analysis_input.sector,
        business_idea=business_analysis_input.idea,
        business_location=business_analysis_input.location,
    ))]}

    print_stream(agent.stream(inputs, stream_mode="values"))
    

