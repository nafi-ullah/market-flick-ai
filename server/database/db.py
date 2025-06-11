from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

CONNECTION_STRING = os.getenv("MONGODB_URI")
client = MongoClient(CONNECTION_STRING)  

def get_database():
    # Reuse the same client for every call
    return client['marketflickai']

if __name__ == "__main__":   
    dbname = get_database()