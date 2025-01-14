
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from custom_types.market_analysis import BusinessAnalysisInput
from langchain_openai import ChatOpenAI
from langchain_community.tools import TavilySearchResults
import uuid
from core.market_size_analysis.utils import extract_plot_data, extract_search_queries, extract_table_data, print_and_save_stream, extract_knowledge_base, print_stream, save_search_queries
from core.market_size_analysis.market_size_graph import plot_market_projection
from core.market_size_analysis.market_player_table import generate_market_player_table
from core.competitor_analysis.prompts import competitors_chart_system_message, competitors_chart_human_message
import operator
from typing import (
    Annotated,
    Sequence,
    TypedDict,
)
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages
from langgraph.managed import IsLastStep
import operator
from core.competitor_analysis.competitors_chart import export_business_analysis_charts, extract_competitors_chart_data
from custom_types.market_analysis import BusinessAnalysisState

llm = ChatOpenAI(model="gpt-4o", temperature=0)
search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)



def generate_competitors_chart(state: BusinessAnalysisState):
    """Generate competitors table"""
    knowledge_base = state['knowledge_base']
    market_size_data_points = state['market_size_data_points']
    market_player_table_data = state['market_player_table_data']
                              
    agent = create_react_agent(llm, tools=[search_tool, export_business_analysis_charts], state_schema=BusinessAnalysisState)
    
    chart_id = str(uuid.uuid4())

    inputs = {"messages": [
        SystemMessage(competitors_chart_system_message), 
        HumanMessage(competitors_chart_human_message.format(
            knowledge_base=knowledge_base,
            market_size_data_points = market_size_data_points,
            market_player_table_data = market_player_table_data,
            chart_id=chart_id,
        ))
    ]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))
    
    return {
        "messages": state['messages'][-1],
        "competitors_chart_id": chart_id,
        "competitors_chart_data": extract_competitors_chart_data(chart_id),
    }

