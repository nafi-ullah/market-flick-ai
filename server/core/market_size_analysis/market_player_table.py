from custom_types.market_analysis import MarketPlayerTableData
from uuid import uuid4
from constants import KNOWLEDGE_BASE_PATH
import json

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



    # save table data in a JSON format
    # f"{FIGURE_PATH}/market_projection_{unique_id}.png"

    

    with open(f"{KNOWLEDGE_BASE_PATH}/market_player_table_{table_id}.json", "w") as f:
        json.dump(table_data, f)

    print("Table data saved in JSON format:", f"{KNOWLEDGE_BASE_PATH}/market_player_table_{table_id}.json")
    
    return {
        "market_player_table_id": f"market_player_table_{table_id}.json",
        "market_player_table_data": str(table_data)
    }
