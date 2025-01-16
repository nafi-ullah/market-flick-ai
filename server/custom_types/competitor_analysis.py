from pydantic import BaseModel, Field
from typing import List, Optional


class ChartData(BaseModel):
    """Model to represent individual data points for basic charts."""
    label: str = Field(..., description="Label for the data point (e.g., company name or category)")
    value: float = Field(..., description="Value associated with the label")


class RadarChartData(BaseModel):
    """Model to represent individual data points for radar charts."""
    attribute: str = Field(..., description="Attribute being compared (e.g., 'Quality', 'Service')")
    our_company: float = Field(..., description="Value for our company")
    industry_average: float = Field(..., description="Value for industry average")


class BubbleChartData(BaseModel):
    """Model to represent individual data points for bubble charts."""
    label: str = Field(..., description="Label for the data point (e.g., company or competitor)")
    x_value: float = Field(..., description="X-axis value (e.g., market share)")
    y_value: float = Field(..., description="Y-axis value (e.g., growth rate)")
    bubble_size: float = Field(..., description="Size of the bubble representing relative scale")


class Chart(BaseModel):
    """Model to represent a chart with its type, title, and data."""
    chartType: str = Field(..., description="Type of the chart (e.g., 'pie', 'bar', 'radar', 'bubble')")
    title: str = Field(..., description="Title of the chart")
    quarter: Optional[str] = Field(None, description="Optional quarter information (e.g., 'Q4 2023')")
    indexType: Optional[str] = Field(None, description="Optional index type for bar charts (e.g., 'Relative Index')")
    data: List[ChartData] = Field(default_factory=list, description="List of data points for basic charts")
    radarData: List[RadarChartData] = Field(default_factory=list, description="List of data points for radar charts")
    bubbleData: List[BubbleChartData] = Field(default_factory=list, description="List of data points for bubble charts")
    sources: List[str] = Field(default_factory=list, description="List of sources for the chart")



class SWOTAnalysis(BaseModel):
    strength: List[str] = Field(default_factory=list, description="List of strengths of the business")
    weakness: List[str] = Field(default_factory=list, description="List of weaknesses of the business")
    opportunity: List[str] = Field(default_factory=list, description="List of opportunities of the business")
    threat: List[str] = Field(default_factory=list, description="List of threats of the business")