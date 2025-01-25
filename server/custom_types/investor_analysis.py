from pydantic import BaseModel, Field
from typing import List


class Investor(BaseModel):
    name: str 
    type: str 
    linkedin: str 
    email: str 
    investments: int 
    sector: str 
    match_percentage: int 
    funding_range: str 
    investment_proposal: str 


class InvestorsAndCompanies(BaseModel):
    investors: List[Investor] = Field(..., description="List of investors and their details.")
