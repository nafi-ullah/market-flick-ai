from pydantic import BaseModel


class BAInput(BaseModel):
    sector: str
    idea: str
    location: str