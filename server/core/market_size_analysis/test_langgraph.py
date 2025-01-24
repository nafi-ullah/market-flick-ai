import json
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from custom_types.market_analysis import BusinessAnalysisState
from langchain_openai import ChatOpenAI
from langchain_community.tools import TavilySearchResults
import uuid
from core.market_size_analysis.utils import (
    extract_plot_data,
    extract_sources,
    extract_table_data,
    print_and_save_stream,
    extract_knowledge_base,
    print_stream,
    save_response_to_json,
    save_sources
)
from core.market_size_analysis.market_size_graph import plot_market_projection
from core.market_size_analysis.market_player_table import generate_market_player_table
from core.market_size_analysis.prompts import (
    market_size_human_message,
    market_size_system_message,
    graph_and_table_generator_system_message,
    graph_and_table_generator_human_message,
    competitors_table_generator_system_message,
    competitors_table_generator_human_message,
)
from core.competitor_analysis.agent import generate_competitors_chart_node, roadmap_node, swot_analysis_node, pestali_analysis_node
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
from constants import KNOWLEDGE_BASE_PATH, RESPONSE_PATH


# Create the agents
llm = ChatOpenAI(model="gpt-4o", temperature=0)
search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)





def market_size_report_node(state: BusinessAnalysisState):
    """Generate market size report"""
    agent = create_react_agent(
        llm,
        tools=[search_tool],
        state_schema=BusinessAnalysisState,
    )

    unique_id = state["knowledge_base_id"]

    inputs = {
        "messages": [
            SystemMessage(market_size_system_message),
            HumanMessage(
                market_size_human_message.format(
                    business_sector=state["business_analysis_input"].sector,
                    business_idea=state["business_analysis_input"].idea,
                    business_location=state["business_analysis_input"].location,
                )
            ),
        ]
    }

    print_and_save_stream(agent.stream(inputs, stream_mode="values"), unique_id)

    response = {
        "knowledge_base_id": unique_id,
        "business_analysis_input": state[
            "business_analysis_input"
        ],  # preserve the input
        "knowledge_base": extract_knowledge_base(unique_id),
    }

    responses_to_save = {
        **response,
    }
    save_response_to_json(responses_to_save, f"market_size_report_{unique_id}")

    return response


def market_size_graph_node(state: BusinessAnalysisState):
    """Generate market size graph and table"""
    knowledge_base = extract_knowledge_base(state["knowledge_base_id"])
    agent = create_react_agent(
        llm,
        tools=[search_tool, plot_market_projection],
        state_schema=BusinessAnalysisState,
    )

    unique_id = state["knowledge_base_id"]
    plot_id = unique_id

    inputs = {
        "messages": [
            SystemMessage(graph_and_table_generator_system_message),
            HumanMessage(
                graph_and_table_generator_human_message.format(
                    knowledge_base=knowledge_base, plot_id=plot_id
                )
            ),
        ]
    }

    print_stream(agent.stream(inputs, stream_mode="values"))

    data_points = extract_plot_data(plot_id)

    response = {
        "market_size_data_points": data_points,
        "market_size_plot_id": plot_id,
    }

    responses_to_save = {
        **response,
    }
 
    save_response_to_json(responses_to_save, f"market_size_graph_{unique_id}")

    return response


def competitors_table_node(state: BusinessAnalysisState):
    """Generate competitors table"""
    knowledge_base = extract_knowledge_base(state["knowledge_base_id"])
    agent = create_react_agent(
        llm,
        tools=[search_tool, generate_market_player_table],
        state_schema=BusinessAnalysisState,
    )
    table_id = state["knowledge_base_id"]

    inputs = {
        "messages": [
            SystemMessage(competitors_table_generator_system_message),
            HumanMessage(
                competitors_table_generator_human_message.format(
                    knowledge_base=knowledge_base,
                    table_id=table_id,
                )
            ),
        ]
    }

    print_stream(agent.stream(inputs, stream_mode="values"))

    response = {
        "market_player_table_id": table_id,
        "market_player_table_data": extract_table_data(table_id),
    }

    responses_to_save = {
        **response,
    }

    save_response_to_json(responses_to_save, f"competitors_table_{table_id}")

    return response


# Build the graph
def build_business_analysis_graph():
    graph_builder = StateGraph(BusinessAnalysisState)

    # Add nodes
    graph_builder.add_node("market_size_report", market_size_report_node)
    graph_builder.add_node("market_size_graph", market_size_graph_node)
    graph_builder.add_node("competitors_table", competitors_table_node)
    graph_builder.add_node("generate_competitors_chart", generate_competitors_chart_node)
    graph_builder.add_node("swot_analysis_report", swot_analysis_node)
    graph_builder.add_node("pestali_analysis_report", pestali_analysis_node)
    graph_builder.add_node("roadmap_report", roadmap_node)

    # Define the flow
    graph_builder.add_edge(START, "market_size_report")
    graph_builder.add_edge("market_size_report", "market_size_graph")
    graph_builder.add_edge("market_size_graph", "competitors_table")
    graph_builder.add_edge("competitors_table", "generate_competitors_chart")
    graph_builder.add_edge("generate_competitors_chart", "swot_analysis_report")
    graph_builder.add_edge("swot_analysis_report", "pestali_analysis_report")
    graph_builder.add_edge("pestali_analysis_report", "roadmap_report")
    graph_builder.add_edge("roadmap_report", END)

    # Compile the graph
    return graph_builder.compile()
