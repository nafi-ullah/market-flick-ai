
import json
from constants import RESPONSE_PATH

def load_response_from_json(file_name: str):
    try:
        with open(f"{RESPONSE_PATH}/{file_name}.json", "r") as f:
            return json.load(f)
    except Exception as e:
        return None