
import json
from constants import RESPONSE_PATH
from database.db import get_database
# may we need to refactor this in the future to use a more generic function

def load_response_from_db(collection: str, knowledge_base_id: str, user_id: str):
    db = get_database()
    collection_name = collection
    collection = db[collection]
    query = {
        "knowledge_base_id": knowledge_base_id,
        "user_id": user_id
    }
    response = collection.find(query, {"_id": 0})
    

    response_list = list(response)
    if response_list:
        return response_list[0]
    else:
        return {}

def get_all_saved_responses(knowledge_base_id: str, user_id: str):
    return {
        "basic_info": load_response_from_db(
            collection="basic_info",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "market_size_report": load_response_from_db(
            collection="market_size_report",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "market_size_graph": load_response_from_db(
            collection="market_size_graph",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "competitors_table": load_response_from_db(
            collection="competitors_table",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "generate_competitors_chart": load_response_from_db(
            collection="competitors_chart",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "swot_analysis": load_response_from_db(
            collection="swot_analysis",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "pestali_analysis": load_response_from_db(
            collection="pestali_analysis",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
        "roadmap": load_response_from_db(
            collection="roadmap",
            knowledge_base_id=knowledge_base_id,
            user_id=user_id
        ),
    }

def clean_for_json(data):
    # Recursively remove or convert non-serializable fields
    if isinstance(data, dict):
        return {k: clean_for_json(v) for k, v in data.items() if k != '_id'}
    elif isinstance(data, list):
        return [clean_for_json(i) for i in data]
    else:
        return data