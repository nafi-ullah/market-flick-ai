

from custom_types.competitor_analysis import PESTLEAnalysis
from constants import KNOWLEDGE_BASE_PATH
import json


def pestali_analysis_tool(analysis: PESTLEAnalysis, pestali_id: str) -> None:
    """
    Represents a PESTLE analysis with categories for Political, Economic, Social, 
    Technological, Legal, and Environmental factors. Each category contains a list 
    of analysis entries with a description and impact level.
    Args:
        analysis (PESTLEAnalysis): PESTLE analysis to be saved.
        pestali_id (str): Unique identifier for the PESTLE analysis.

    Returns:
        None
    """

    with open(f"{KNOWLEDGE_BASE_PATH}/pestali_analysis_{pestali_id}.json", "w") as file:
        json.dump(analysis.dict(), file)

    print(f"PESTLE Analysis saved to {KNOWLEDGE_BASE_PATH}/pestali_analysis_{pestali_id}.json")

    return


def extract_pestali_analysis(pestali_id: str):
    with open(f"{KNOWLEDGE_BASE_PATH}/pestali_analysis_{pestali_id}.json", "r") as f:
        return json.load(f)
