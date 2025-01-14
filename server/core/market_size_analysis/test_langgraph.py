from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from custom_types.market_analysis import BusinessAnalysisInput, BusinessAnalysisState
from langchain_openai import ChatOpenAI
from langchain_community.tools import TavilySearchResults
import uuid
from core.market_size_analysis.utils import extract_plot_data, extract_search_queries, extract_table_data, print_and_save_stream, extract_knowledge_base, print_stream, save_search_queries
from core.market_size_analysis.market_size_graph import plot_market_projection
from core.market_size_analysis.market_player_table import generate_market_player_table
from core.market_size_analysis.prompts import market_size_human_message, market_size_system_message, graph_and_table_generator_system_message, graph_and_table_generator_human_message, competitors_table_generator_system_message, competitors_table_generator_human_message
from core.competitor_analysis.agent import generate_competitors_chart
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





# Create the agents
llm = ChatOpenAI(model="gpt-4o", temperature=0)
search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)

def market_size_report_node(state: BusinessAnalysisState):
    """Generate market size report"""
    agent = create_react_agent(llm, tools=[search_tool, save_search_queries], state_schema=BusinessAnalysisState)


    search_id = str(uuid.uuid4())
    
    inputs = {"messages": [
        SystemMessage(market_size_system_message), 
        HumanMessage(market_size_human_message.format(
            business_sector=state['business_analysis_input'].sector,
            business_idea=state['business_analysis_input'].idea,
            business_location=state['business_analysis_input'].location,
            search_id=search_id
        ))
    ]}

    # Stream and save the output
    knowledge_base_id = str(uuid.uuid4())
    print_and_save_stream(agent.stream(inputs, stream_mode="values"), knowledge_base_id)

    return {
        "knowledge_base_id": knowledge_base_id,
        "messages": [AIMessage(content=f"Market size report generated with ID: {knowledge_base_id}")],
        "business_analysis_input": state['business_analysis_input'],  # preserve the input
        "search_queries": extract_search_queries(search_id),
        "knowledge_base": extract_knowledge_base(knowledge_base_id)
    }

def market_size_graph_node(state: BusinessAnalysisState):
    """Generate market size graph and table"""
    knowledge_base = extract_knowledge_base(state['knowledge_base_id'])
    agent = create_react_agent(llm, tools=[search_tool, plot_market_projection, save_search_queries], state_schema=BusinessAnalysisState)

    plot_id = str(uuid.uuid4())
    search_id = str(uuid.uuid4())

    inputs = {"messages": [
        SystemMessage(graph_and_table_generator_system_message), 
        HumanMessage(graph_and_table_generator_human_message.format(
            knowledge_base=knowledge_base,
            plot_id=plot_id,
            search_id=search_id
        ))
    ]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))

    data_points = extract_plot_data(plot_id)
    
    return {
        "messages": state['messages'][-1],
        "search_queries": extract_search_queries(search_id),
        "market_size_data_points": data_points,
        "market_size_plot_id": plot_id,
    }

def competitors_table_node(state: BusinessAnalysisState):
    """Generate competitors table"""
    knowledge_base = extract_knowledge_base(state['knowledge_base_id'])
    agent = create_react_agent(llm, tools=[search_tool, generate_market_player_table, save_search_queries], state_schema=BusinessAnalysisState)
    table_id = str(uuid.uuid4())
    search_id = str(uuid.uuid4())

    inputs = {"messages": [
        SystemMessage(competitors_table_generator_system_message), 
        HumanMessage(competitors_table_generator_human_message.format(
            knowledge_base=knowledge_base,
            table_id=table_id,
            search_id=search_id
        ))
    ]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))
    
    return {
        "messages": state['messages'][-1],
        "search_queries": extract_search_queries(search_id),
        "market_player_table_id": table_id,
        "market_player_table_data": extract_table_data(table_id),
    }

# Build the graph
def build_business_analysis_graph():
    graph_builder = StateGraph(BusinessAnalysisState)
    
    # Add nodes
    graph_builder.add_node("market_size_report", market_size_report_node)
    graph_builder.add_node("market_size_graph", market_size_graph_node)
    graph_builder.add_node("competitors_table", competitors_table_node)
    graph_builder.add_node("generate_competitors_chart", generate_competitors_chart)
    
    # Define the flow
    graph_builder.add_edge(START, "market_size_report")
    graph_builder.add_edge("market_size_report", "market_size_graph")
    graph_builder.add_edge("market_size_graph", "competitors_table")
    graph_builder.add_edge("competitors_table", "generate_competitors_chart")
    graph_builder.add_edge("generate_competitors_chart", END)
    
    # Compile the graph
    return graph_builder.compile()




