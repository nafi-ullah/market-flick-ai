

from custom_types.competitor_analysis import RoadMap
from constants import KNOWLEDGE_BASE_PATH
import json


def roadmap_tool(roadmap: RoadMap, roadmap_id: str) -> None:
    """
    Generate a roadmap for a business idea.

    Args:
        roadmap: RoadMap object containing the roadmap elements.
        roadmap_id: Unique identifier for the roadmap.
    
    """

    with open(f"{KNOWLEDGE_BASE_PATH}/roadmap_{roadmap_id}.json", "w") as file:
        json.dump(roadmap.dict(), file)
    print(f"Roadmap saved to {KNOWLEDGE_BASE_PATH}/roadmap_{roadmap_id}.json")
    return

def extract_roadmap(roadmap_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/roadmap_{roadmap_id}.json", "r") as f:
        return json.load(f)
        

