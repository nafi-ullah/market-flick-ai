from custom_types.market_analysis import MarketDataPoint
from typing import List
from constants import FIGURE_PATH
import json
from database.db import get_database

# Function to plot TAM, SAM, SOM and save the figure
def plot_market_projection(data_points: List[MarketDataPoint], sources: list[str], plot_id: str):
    """
    Plot TAM, SAM, SOM and save the figure.

    Args:
        data_points (List[MarketDataPoint]): List of market data points.
        each data point contains date, TAM, SAM, SOM

        sources: reference sources links for the data

        plot_id (str): Unique id for the plot


    Returns:
        dict: Dictionary containing the plot id and data points.
    """


    print(f"Figure saved as market_projection_{plot_id}.png")

    json_output = {
        "plot_id": plot_id,
        "sources": sources,
        "data_points": [data_point.model_dump(mode='json') for data_point in data_points]
    }

    # Save the data points in MongoDB
    db = get_database()
    db["market_projection"].insert_one(json_output)

    print(f"Data points saved in MongoDB collection 'market_projection' with plot_id={plot_id}")

    return {
        "market_size_plot_id": plot_id,
        "market_size_data_points": str(json_output)
    }
