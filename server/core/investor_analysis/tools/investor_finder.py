import json
from constants import RESPONSE_PATH
from custom_types.investor_analysis import InvestorsAndCompanies


def save_investors_data(investors_and_companies: InvestorsAndCompanies, id: str):
    """
    Finds and filters a list of investors based on specific criteria.
    This function takes an `InvestorsAndCompanies` object containing a list of investors, 
    and saves the data.
    Args:
        investors_and_companies (InvestorsAndCompanies): 
            A data model containing a list of investors, with details such as name, 
            type, LinkedIn profile, email, number of investments, sector, match percentage, 
            and typical funding range.

        id (str): An identifier for the saved data.
    """
    try:
        with open(f"{RESPONSE_PATH}/investors_and_companies_{id}.json", "w") as file:
            json.dump(investors_and_companies.model_dump(), file)
        
        return {
            "status": "success",
            "message": "Investors and companies data saved successfully."
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to save investors data: {str(e)}"
        }
