import os
from constants import KNOWLEDGE_BASE_PATH, RESPONSE_PATH
from constants import FIGURE_PATH
import json

from database.db import get_database

db = get_database()

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

    # Save to MongoDB only
    db[KNOWLEDGE_BASE_PATH].insert_one({
        "knowledge_base_id": id,
        "final_message": final_message
    })


def extract_knowledge_base(id):
    doc = db[KNOWLEDGE_BASE_PATH].find_one({"knowledge_base_id": id})
    return doc["final_message"] if doc else None


def extract_plot_data(plot_id):
    doc = db["market_projection"].find_one({"plot_id": plot_id})
    return doc if doc else None


def extract_table_data(table_id):
    doc = db["market_player_table"].find_one({"table_id": table_id})
    return doc if doc else None

def save_search_queries(queries: list[str], search_id: str):
    db["search_queries"].insert_one({
        "search_id": search_id,
        "queries": queries
    })
    print(f"Search queries saved to MongoDB with search_id={search_id}")

def extract_search_queries(search_id: str):
    doc = db["search_queries"].find_one({"search_id": search_id})
    return doc["queries"] if doc else None

def save_sources(sources: list[str], prefix: str, source_id: str):
    db["sources"].insert_one({
        "prefix": prefix,
        "source_id": source_id,
        "sources": sources
    })
    print(f"Sources saved to MongoDB with prefix={prefix} and source_id={source_id}")

def extract_sources(prefix: str, source_id: str):
    doc = db["sources"].find_one({"prefix": prefix, "source_id": source_id})
    return doc["sources"] if doc else None

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
def save_response_to_db(response: dict, knowledge_base_id: str, user_id: str, collection_name: str):
    """
    Save response to a JSON file after ensuring all values are JSON serializable.
    Also save the response in MongoDB with userId for retrieval.

    Args:
        response (dict): Response dictionary to save
        knowledge_base_id (str): Unique identifier for the knowledge base
        userId (str): User identifier for MongoDB
        collection_name (str): MongoDB collection name
    """
    
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
