from database.db import get_database
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from controllers.analysis import get_analysis

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "https://yourfrontenddomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Python server is running..."}



