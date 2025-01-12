from custom_types.market_analysis import MarketDataPoint
import matplotlib.pyplot as plt
from typing import List
from constants import FIGURE_PATH
from uuid import uuid4

# Set Matplotlib to use the Agg backend to avoid GUI issues
plt.switch_backend('Agg')

# Function to plot TAM, SAM, SOM and save the figure
def plot_market_projection(data_points: List[MarketDataPoint]):
    """
    Plot TAM, SAM, SOM and save the figure.

    Args:
        data_points (List[MarketDataPoint]): List of market data points.
        each data point contains date, TAM, SAM, SOM

    Returns:
        dict: Dictionary containing the plot id and data points.
    """

    unique_id = str(uuid4())

    # Extracting data for plotting
    dates = [point.point_date for point in data_points]
    tam_values = [point.tam for point in data_points]
    sam_values = [point.sam for point in data_points]
    som_values = [point.som for point in data_points]

    # Plotting the graph
    plt.figure(figsize=(10, 6))
    plt.plot(dates, tam_values, label="TAM ($M)", marker='o')
    plt.plot(dates, sam_values, label="SAM ($M)", marker='o')
    plt.plot(dates, som_values, label="SOM ($M)", marker='o')

    # Formatting the graph
    plt.title("TAM, SAM, SOM Market Projection Over Time")
    plt.xlabel("Timeline")
    plt.ylabel("Market Size ($M)")
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the figure
    plt.savefig(f"{FIGURE_PATH}/market_projection_{unique_id}.png")
    plt.close()  # Close the plot to free up memory

    print(f"Figure saved as market_projection_{unique_id}.png")

    return {
        "market_size_plot_id": unique_id,
        "market_size_data_points": str(data_points)
    }
