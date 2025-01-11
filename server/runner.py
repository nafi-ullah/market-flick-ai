

from core.market_size_analysis.agent import market_size_report, market_size_graph_and_table_generator
from core.market_size_analysis.utils import extract_knowledge_base
from custom_types.market_analysis import BusinessAnalysisInput, MarketDataPoint
from core.market_size_analysis.market_size_graph import plot_market_projection
from datetime import date
from dotenv import load_dotenv

load_dotenv()


# ba = BusinessAnalysisInput(
#     sector="IT",
#     idea="An online tool to generate reel videos on any story from prompt.",
#     location="Global"
# )

# knowledge_base_id = market_size_report(ba)

# print(knowledge_base_id)

knowledge_base_id="7f629d9a-5156-4729-a4ba-63e68555f170"

market_size_graph_and_table_generator(knowledge_base_id)



# Example usage
# if __name__ == "__main__":
#     # Sample data
#     data_points = [
#         MarketDataPoint(point_date=date(2025, 1, 1), tam=1000, sam=600, som=150),
#         MarketDataPoint(point_date=date(2025, 6, 1), tam=1100, sam=650, som=180),
#         MarketDataPoint(point_date=date(2026, 1, 1), tam=1200, sam=700, som=210),
#         MarketDataPoint(point_date=date(2026, 6, 1), tam=1300, sam=750, som=250),
#         MarketDataPoint(point_date=date(2027, 1, 1), tam=1400, sam=800, som=300)
#     ]

#     # Call the function and save the figure
#     plot_market_projection(data_points, "market_projection.png")
#     print("Graph saved as 'market_projection.png'")






# result = generate_queries({"IT", "An online AI tool which generates customised virtual gift cards and tries to sell  affiliated products on preferred choices to make money.", "United States"})

