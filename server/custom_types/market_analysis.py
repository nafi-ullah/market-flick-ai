from pydantic import BaseModel, Field
from datetime import date


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