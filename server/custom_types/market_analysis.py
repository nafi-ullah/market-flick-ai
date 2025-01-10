from pydantic import BaseModel, Field


class BusinessAnalysisInput(BaseModel):
    """
    Input for business analysis.
    """
    sector: str = Field(description="The business sector or industry")
    idea: str = Field(description="The business idea or concept")
    location: str = Field(description="The geographical location for the business")




