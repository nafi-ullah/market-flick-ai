from constants import KNOWLEDGE_BASE_PATH
from constants import FIGURE_PATH
import json

def print_stream(stream):
    for s in stream:
        message = s["messages"][-1]
        if isinstance(message, tuple):
            print(message)
        else:
            message.pretty_print()

def print_and_save_stream(stream, id):
    final_message = ""
    for s in stream:
        message = s["messages"][-1]
        if isinstance(message, tuple):
            final_message = message.content
            print(message)
        else:
            final_message = message.content
            message.pretty_print()
            
    with open(f"{KNOWLEDGE_BASE_PATH}/{id}.txt", "w") as f:
        f.write(final_message)


def extract_knowledge_base(id):
    with open(f"{KNOWLEDGE_BASE_PATH}/{id}.txt", "r") as f:
        return f.read()

def extract_plot_data(plot_id):
    with open(f"{FIGURE_PATH}/market_projection_{plot_id}.json", "r") as f:
        return json.load(f)

def extract_table_data(table_id):
    with open(f"{KNOWLEDGE_BASE_PATH}/market_player_table_{table_id}.json", "r") as f:
        return f.read()

def save_search_queries(queries: list[str], search_id: str):
    """
    Save search queries to a JSON file.

    Args:
        queries (list[str]): A list of search queries.
        search_id (str): A unique identifier for the search queries.
    """
    with open(f"{KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json", "w") as f:
        json.dump(queries, f)
    print(f"Search queries saved to {KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json")

def extract_search_queries(search_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json", "r") as f:
        return json.load(f) 

