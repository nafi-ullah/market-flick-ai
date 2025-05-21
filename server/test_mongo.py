import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
print(f"Connecting to: {MONGODB_URI}")

try:
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    # Force a connection to verify it works
    client.server_info()
    print("Connection successful!")
    
    # List databases
    print("Available databases:")
    for db in client.list_databases():
        print(f" - {db['name']}")
        
    # Try to access marketflickai database
    db = client["marketflickai"]
    print("\nCollections in marketflickai:")
    for collection in db.list_collection_names():
        print(f" - {collection}")
        
except Exception as e:
    print(f"Connection failed: {e}")
