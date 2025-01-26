

from core.investor_analysis.agent import get_investor_analysis
from core.market_size_analysis.agent import market_size_report, market_size_graph_generator, competitors_table_generator
from core.market_size_analysis.utils import extract_knowledge_base, print_stream
from core.util_agents.chat_write_agent import chat_write_agent
from custom_types.market_analysis import BusinessAnalysisInput, MarketDataPoint
from core.market_size_analysis.market_size_graph import plot_market_projection
from datetime import date
from core.market_size_analysis.test_langgraph import BusinessAnalysisState
from core.util_agents.title_generator import generate_title
from utils.general_utils import get_all_saved_responses, load_response_from_json
from dotenv import load_dotenv
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()


# ba = BusinessAnalysisInput(
#     sector="IT",
#     idea="An online AI tool which generates customised virtual gift cards and tries to sell  affiliated products on preferred choices to make money.",
#     location="USA"
# )

# knowledge_base_id = market_size_report(ba)

# print(knowledge_base_id)

# knowledge_base_id="18eedc58-895b-4e84-9d2c-1c262cc4031c"

# competitors_table_generator(knowledge_base_id)

# business_input = BusinessAnalysisInput(
#     sector="Real Estate",
#     idea="An online marketplace for co-living spaces, leveraging AI to match tenants based on lifestyle preferences, promoting community engagement and sustainable living.",
#     location="USA"
# )

# response = generate_title(business_input)

# print(response)

# chat_write_agent(id = "1c61450e-0c92-4d54-b230-be36cff05349", input="I want to update the given roadmap, for step one make it \"Use our market research report\"")


# run_business_analysis(business_input)



# saved_responses = get_all_saved_responses("67ef1654-9d74-47d9-ab21-a484c1e3da13")

# print(saved_responses)

print_stream(get_investor_analysis("67ef1654-9d74-47d9-ab21-a484c1e3da13"))

# print(str("hi"))


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

