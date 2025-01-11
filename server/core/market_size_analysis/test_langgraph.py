from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from custom_types.market_analysis import BusinessAnalysisInput
from langchain_openai import ChatOpenAI
from langchain_community.tools import TavilySearchResults
import uuid
from core.market_size_analysis.utils import print_and_save_stream, extract_knowledge_base, print_stream
from core.market_size_analysis.market_size_graph import plot_market_projection
from core.market_size_analysis.market_player_table import generate_market_player_table
from core.market_size_analysis.prompts import market_size_human_message, market_size_system_message, graph_and_table_generator_system_message, graph_and_table_generator_human_message, competitors_table_generator_system_message, competitors_table_generator_human_message

from typing import TypedDict, Annotated
from typing_extensions import TypeVar
import operator

# Define a proper reducer function
def messages_reducer(existing_messages, new_messages):
    if isinstance(new_messages, list):
        return existing_messages + new_messages
    return existing_messages + [new_messages]

class BusinessAnalysisState(TypedDict):
    # Use a proper reducer that takes two arguments
    messages: Annotated[list, messages_reducer]
    knowledge_base_id: str
    business_analysis_input: BusinessAnalysisInput


# Create the agents
llm = ChatOpenAI(model="gpt-4o", temperature=0)
search_tool = TavilySearchResults(
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)

def market_size_report_node(state: BusinessAnalysisState):
    """Generate market size report"""
    agent = create_react_agent(llm, tools=[search_tool])
    
    inputs = {"messages": [
        SystemMessage(market_size_system_message), 
        HumanMessage(market_size_human_message.format(
            business_sector=state['business_analysis_input'].sector,
            business_idea=state['business_analysis_input'].idea,
            business_location=state['business_analysis_input'].location,
        ))
    ]}

    # Stream and save the output
    knowledge_base_id = str(uuid.uuid4())
    print_and_save_stream(agent.stream(inputs, stream_mode="values"), knowledge_base_id)

    return {
        "knowledge_base_id": knowledge_base_id,
        "messages": [AIMessage(content=f"Market size report generated with ID: {knowledge_base_id}")],
        "business_analysis_input": state['business_analysis_input']  # preserve the input
    }

def market_size_graph_node(state: BusinessAnalysisState):
    """Generate market size graph and table"""
    knowledge_base = extract_knowledge_base(state['knowledge_base_id'])
    agent = create_react_agent(llm, tools=[search_tool, plot_market_projection])

    inputs = {"messages": [
        SystemMessage(graph_and_table_generator_system_message), 
        HumanMessage(graph_and_table_generator_human_message.format(
            knowledge_base=knowledge_base
        ))
    ]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))
    
    return {
        "messages": [AIMessage(content="Market size graph and table generated")]
    }

def competitors_table_node(state: BusinessAnalysisState):
    """Generate competitors table"""
    knowledge_base = extract_knowledge_base(state['knowledge_base_id'])
    agent = create_react_agent(llm, tools=[search_tool, generate_market_player_table])

    inputs = {"messages": [
        SystemMessage(competitors_table_generator_system_message), 
        HumanMessage(competitors_table_generator_human_message.format(
            knowledge_base=knowledge_base
        ))
    ]}
    
    print_stream(agent.stream(inputs, stream_mode="values"))
    
    return {
        "messages": [AIMessage(content="Competitors table generated")]
    }

# Build the graph
def build_business_analysis_graph():
    graph_builder = StateGraph(BusinessAnalysisState)
    
    # Add nodes
    graph_builder.add_node("market_size_report", market_size_report_node)
    graph_builder.add_node("market_size_graph", market_size_graph_node)
    graph_builder.add_node("competitors_table", competitors_table_node)
    
    # Define the flow
    graph_builder.add_edge(START, "market_size_report")
    graph_builder.add_edge("market_size_report", "market_size_graph")
    graph_builder.add_edge("market_size_graph", "competitors_table")
    graph_builder.add_edge("competitors_table", END)
    
    # Compile the graph
    return graph_builder.compile()

# Usage example
def run_business_analysis(business_analysis_input):
    # Create the graph
    graph = build_business_analysis_graph()
    
    # Initial state
    initial_state = {
        "business_analysis_input": business_analysis_input,
        "messages": [],
        "knowledge_base_id": None
    }
    
    # Stream the graph execution
    events = graph.stream(initial_state)
    
    # Process and print streaming events
    for event in events:
        for node, output in event.items():
            print(f"Node: {node}")
            if "messages" in output:
                for message in output["messages"]:
                    print(message.content)
            if "knowledge_base_id" in output:
                print(f"Knowledge Base ID: {output['knowledge_base_id']}")

# Example call

