import dotenv
dotenv.load_dotenv()
import uuid
from custom_types.market_analysis import BusinessAnalysisInput
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.tools import TavilySearchResults
from langchain_openai import ChatOpenAI
from core.market_size_analysis.prompts import market_size_system_message, market_size_human_message, graph_and_table_generator_system_message, graph_and_table_generator_human_message, competitors_table_generator_system_message, competitors_table_generator_human_message
from core.market_size_analysis.utils import print_and_save_stream, extract_knowledge_base, print_stream
from core.market_size_analysis.market_size_graph import plot_market_projection
from core.market_size_analysis.market_player_table import generate_market_player_table
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-4o", temperature=0)
search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)   


def market_size_report(business_analysis_input: BusinessAnalysisInput) -> str:
    """ 
    Generate a market size report for a business idea.

    Args:
        business_analysis_input (BusinessAnalysisInput): The business analysis input object containing the business sector, idea, and location.
    
    Returns:
        str: The AI generated market size report. This will be used as a knowledge base for other agents.
    """
    agent = create_react_agent(llm, tools=[search_tool])
    inputs = {"messages": [SystemMessage(market_size_system_message), HumanMessage(market_size_human_message.format(
        business_sector=business_analysis_input.sector,
        business_idea=business_analysis_input.idea,
        business_location=business_analysis_input.location,
    ))]}

    knowledge_base_id = str(uuid.uuid4())

    print_and_save_stream(agent.stream(inputs, stream_mode="values"), knowledge_base_id)

    return knowledge_base_id

def market_size_graph_generator(knowledge_base_id: str):

    """
    Generate a market size graph and table for a business idea.

    Args:
        knowledge_base_id (str): The ID of the knowledge base to generate the graph and table for.
    """


    knowledge_base = extract_knowledge_base(knowledge_base_id)
    agent = create_react_agent(llm, tools=[search_tool, plot_market_projection])


    inputs = {"messages": [SystemMessage(graph_and_table_generator_system_message), HumanMessage(graph_and_table_generator_human_message.format(
        knowledge_base=knowledge_base
    ))]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))


def competitors_table_generator(knowledge_base_id: str):
    knowledge_base = extract_knowledge_base(knowledge_base_id)
    agent = create_react_agent(llm, tools=[search_tool, generate_market_player_table])

    inputs = {"messages": [SystemMessage(competitors_table_generator_system_message), HumanMessage(competitors_table_generator_human_message.format(
        knowledge_base=knowledge_base
    ))]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))

    

