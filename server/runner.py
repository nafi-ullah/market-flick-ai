

from core.market_size_analysis.agent import generate_queries, market_size_report
from custom_types.market_analysis import BusinessAnalysisInput
from dotenv import load_dotenv

load_dotenv()


ba = BusinessAnalysisInput(
    sector="IT",
    idea="An online AI tool which generates customised virtual gift cards and tries to sell  affiliated products on preferred choices to make money.",
    location="United States"
)

market_size_report(ba)




# result = generate_queries({"IT", "An online AI tool which generates customised virtual gift cards and tries to sell  affiliated products on preferred choices to make money.", "United States"})

