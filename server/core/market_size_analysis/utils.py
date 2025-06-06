import os
from constants import KNOWLEDGE_BASE_PATH, RESPONSE_PATH
from constants import FIGURE_PATH
import json

from database.db import get_database


def print_stream(stream):
    for s in stream:
        message = s["messages"][-1]
        if isinstance(message, tuple):
            print(message)
        else:
            print(message.pretty_repr())
            # message.pretty_print()


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
        return json.load(f)


def save_search_queries(queries: list[str], search_id: str):
    """
    Save search queries to a JSON file.

    Args:
        queries (list[str]): A list of search queries.
        search_id (str): A unique identifier for the search queries.
    """
    with open(f"{KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json", "w") as f:
        json.dump(queries, f)
    print(
        f"Search queries saved to {KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json"
    )

def save_sources(sources: list[str], prefix: str,source_id: str):
    """
    save sources links to a JSON file.

    Args:
        sources (list[str]): A list of sources links.
        prefix (str): A unique identifier for the sources links. 
        source_id (str): A unique identifier for the sources links. 

    """
    with open(f"{KNOWLEDGE_BASE_PATH}/sources_{prefix}_{source_id}.json", "w") as f:
        json.dump(sources, f)
    print(f"Sources saved to {KNOWLEDGE_BASE_PATH}/sources_{prefix}_{source_id}.json")


def extract_sources(prefix: str,source_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/sources_{prefix}_{source_id}.json", "r") as f:
        return json.load(f)
def get_serializable_response(response: dict):
    # Convert any non-serializable values to strings
    serializable_response = {}
    for key, value in response.items():
        if isinstance(value, str) and value.startswith("[{") and value.endswith("}]"):
            # Try to parse JSON string and re-serialize it
            try:
                parsed_value = json.loads(value)
                serializable_response[key] = parsed_value
            except json.JSONDecodeError:
                serializable_response[key] = value
        elif isinstance(value, (str, int, float, bool, list, dict, type(None))):
            serializable_response[key] = value
        elif hasattr(value, 'content'):  # Handle AIMessage objects
            serializable_response[key] = value.content
        else:
            serializable_response[key] = str(value)
    return serializable_response

# change the function name a refactor
def save_response_to_json(response: dict, knowledge_base_id: str, user_id: str, collection_name: str):
    """
    Save response to a JSON file after ensuring all values are JSON serializable.
    Also save the response in MongoDB with userId for retrieval.

    Args:
        response (dict): Response dictionary to save
        knowledge_base_id (str): Unique identifier for the knowledge base
        userId (str): User identifier for MongoDB
        collection_name (str): MongoDB collection name
    """
    db = get_database()
    collection = db[collection_name]
    # Convert any non-serializable values to strings
    serializable_response = get_serializable_response(response)

    # Save to file as before
    # os.makedirs(RESPONSE_PATH, exist_ok=True)
    # with open(f"{RESPONSE_PATH}/{unique_id}.json", "w") as f:
    #     json.dump(serializable_response, f)

    # Save to MongoDB with userId and unique_id
    mongo_doc = {
        **serializable_response,
        "user_id": user_id,
        "knowledge_base_id": knowledge_base_id,
        
    }
    collection.insert_one(mongo_doc)


def extract_search_queries(search_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/search_queries_{search_id}.json", "r") as f:
        return json.load(f)
