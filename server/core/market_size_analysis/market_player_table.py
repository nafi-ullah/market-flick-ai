from custom_types.market_analysis import MarketPlayerTableData
from uuid import uuid4
from constants import KNOWLEDGE_BASE_PATH
import json
from database.db import get_database

def generate_market_player_table(competitors: list[MarketPlayerTableData], sources: list[str], table_id: str):
    """
    Generate a table of market players or competitors.

    Args:
        competitors (list[MarketPlayerTableData]): List of market players or competitors.
        sources: reference sources links for the data
        table_id (str): Unique id for the table

    Here MarketPlayerTableData contains the following fields:
        company_name (str): The name of the company.
        valuation (str): The valuation of the company.
        money_raised (str): The amount of money raised by the company.
        key_focus (str): The key focus of the company.
    """

    table_data = {
        "table_id": table_id,
        "competitors": [
            {
                "company_name": competitor.company_name,
                "valuation": competitor.valuation,
                "money_raised": competitor.money_raised,
                "key_focus": competitor.key_focus,
            }
            for competitor in competitors
        ],
        "sources": sources,
    }

    # Save table data in MongoDB
    db = get_database()
    db["market_player_table"].insert_one(table_data)

    print(f"Table data saved in MongoDB collection 'market_player_table' with table_id={table_id}")
    
    return {
        "market_player_table_id": table_id,
        "market_player_table_data": str(table_data)
    }
