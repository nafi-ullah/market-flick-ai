



from custom_types.competitor_analysis import SWOTAnalysis
from constants import KNOWLEDGE_BASE_PATH
import json


def swot_analysis_tool(analysis: SWOTAnalysis, swot_id: str) -> None:
    """
    Save SWOT analysis to a JSON file.

    Args:
        analysis (SWOTAnalysis): SWOT analysis to be saved.
        Here SWOTAnalysis contains the following fields:
            strength: List[str] = Field(description="List of strengths of the business")
            weakness: List[str] = Field(description="List of weaknesses of the business")
            opportunity: List[str] = Field(description="List of opportunities of the business")
            threat: List[str] = Field(description="List of threats of the business")

        swot_id (str): Unique identifier for the SWOT analysis.

    Returns:
        None
    """

    with open(f"{KNOWLEDGE_BASE_PATH}/swot_analysis_{swot_id}.json", "w") as file:
        json.dump(analysis.dict(), file)
    print(f"SWOT Analysis saved to {KNOWLEDGE_BASE_PATH}/swot_analysis_{swot_id}.json")
    return


def extract_swot_analysis(swot_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/swot_analysis_{swot_id}.json", "r") as f:
        return json.load(f)