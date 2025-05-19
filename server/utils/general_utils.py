
import json
from constants import RESPONSE_PATH

def load_response_from_json(file_name: str):
    try:
        with open(f"{RESPONSE_PATH}/{file_name}.json", "r") as f:
            return json.load(f)
    except Exception as e:
        return None

def get_all_saved_responses(knowledge_base_id: str):
    return {
        "basic_info": load_response_from_json(
            f"basic_info_{knowledge_base_id}"
        ),
        "market_size_report": load_response_from_json(
            f"market_size_report_{knowledge_base_id}"
        ),
        "market_size_graph": load_response_from_json(
            f"market_size_graph_{knowledge_base_id}"
        ),
        "competitors_table": load_response_from_json(
            f"competitors_table_{knowledge_base_id}"
        ),
        "generate_competitors_chart": load_response_from_json(
            f"competitors_chart_{knowledge_base_id}"
        ),
        "swot_analysis": load_response_from_json(
            f"swot_analysis_{knowledge_base_id}"
        ),
        "pestali_analysis": load_response_from_json(
            f"pestali_analysis_{knowledge_base_id}"
        ),
        "roadmap": load_response_from_json(
            f"roadmap_{knowledge_base_id}"
        ),
    }