
from constants import KNOWLEDGE_BASE_PATH

from custom_types.competitor_analysis import Chart


import json
from typing import List

def export_business_analysis_charts(charts: List[Chart], chart_id: str) -> None:
    """
    Exports business analysis charts data to a JSON file.

    This function takes a list of business analysis charts, including various types 
    such as pie charts, bar charts, radar charts, and bubble charts, and saves the 
    structured data into a specified JSON file for future visualization

    Args:
        charts (List[Chart]): List of chart objects to be saved.
        filename (str): Name of the JSON file to save the data.
    """

    
    with open(f"{KNOWLEDGE_BASE_PATH}/competitor_analysis_charts_{chart_id}.json", "w") as file:
        json.dump([chart.dict() for chart in charts], file)
    
    print(f"Charts saved to {KNOWLEDGE_BASE_PATH}/competitor_analysis_charts_{chart_id}.json")


def extract_competitors_chart_data(chart_id):
    with open(f"{KNOWLEDGE_BASE_PATH}/competitor_analysis_charts_{chart_id}.json", "r") as f:
        return json.load(f)
    
