from pydantic import BaseModel, Field
from datetime import date
from typing import Annotated, Sequence, TypedDict
from langchain.schema import BaseMessage
from langgraph.graph.message import add_messages

from langgraph.managed import IsLastStep




class BusinessAnalysisInput(BaseModel):
    """
    Input for business analysis.
    """
    sector: str = Field(description="The business sector or industry")
    idea: str = Field(description="The business idea or concept")
    location: str = Field(description="The geographical location for the business")


# Pydantic Model for Market Data
class MarketDataPoint(BaseModel):
    """
    Represents a market data point containing the date, TAM, SAM, and SOM.
    """
    point_date: date = Field(description="The date of the market data point")
    tam: float = Field(description="Total Addressable Market ($M)")
    sam: float = Field(description="Serviceable Available Market ($M)")
    som: float = Field(description="Serviceable Obtainable Market ($M)")


class MarketPlayerTableData(BaseModel):

    """
    Represents the data for a market player or competitor in the market analysis.
    """

    company_name: str = Field(description="The name of the company")
    valuation: str = Field(description="The valuation of the company")
    money_raised: str = Field(description="The amount of money raised by the company")
    key_focus: str = Field(description="The key focus of the company")

class BusinessAnalysisState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    knowledge_base_id: str
    knowledge_base: str = ""
    market_size_data_points: str =""
    market_size_plot_id: str = ""
    market_player_table_data: str = ""
    market_player_table_id: str = ""
    search_queries: str = ""
    competitors_chart_id: str = ""
    competitors_chart_data: str = ""
    sources: str = ""
    business_analysis_input: BusinessAnalysisInput
    is_last_step: IsLastStep = False