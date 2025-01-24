from datetime import datetime
import json
import uuid
from constants import RESPONSE_PATH, important_keys
from core.util_agents.chat_agent import chat_with_agent
from core.util_agents.title_generator import generate_title
from database.db import get_database
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse
import asyncio
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware
from custom_types.market_analysis import BusinessAnalysisInput
from custom_types.basetypes import ChatRequest, ChatType
from langchain_core.caches import InMemoryCache
from langchain_core.globals import set_llm_cache

from core.market_size_analysis.test_langgraph import build_business_analysis_graph
import os

from core.market_size_analysis.utils import extract_knowledge_base, get_serializable_response, save_response_to_json


set_llm_cache(InMemoryCache())


app = FastAPI()




origins = [
    "http://localhost:3000",
    "https://yourfrontenddomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Python server is running..."}


@app.post("/business-analysis")
async def business_analysis_stream(
    business_input: BusinessAnalysisInput,
) -> StreamingResponse:
    async def generate_stream() -> AsyncGenerator[str, None]:
        try:
            
            yield json.dumps({
                "key": "start",
                "data": "Waaassuupp?",
                "status": "success"
            })


            # basic info from the idea
            title = generate_title(business_input)
            knowledge_base_id = str(uuid.uuid4())
            current_date_time = datetime.now().isoformat()
            basic_info = {
                "basic_info_id": knowledge_base_id,
                "basic_info": {
                    "title": title, 
                    "date": current_date_time,
                    "business_idea": business_input.idea,
                    "business_sector": business_input.sector,
                    "business_location": business_input.location
                }
            }

            yield json.dumps({
                "key": "basic_info",
                "data": basic_info,
                "status": "success"
            })

            save_response_to_json(basic_info, f"basic_info_{knowledge_base_id}")


            # Create the graph
            graph = build_business_analysis_graph()

            

            # Initial state
            initial_state = {
                "business_analysis_input": business_input,
                "knowledge_base_id": knowledge_base_id,
                "knowledge_base": "",
                "market_size_data_points": "",
                "market_size_plot_id": "",
                "market_player_table_data": "",
                "market_player_table_id": "",
                "search_queries": "",
                "sources": "",
                "competitors_chart_id": "",
                "competitors_chart_data": "",
                "swot_analysis": "",
                "pestali_analysis": "",
                "roadmap": "",
                "is_last_step": False,
            }

            # Stream the graph execution
            async for event in graph.astream(initial_state):
                try:
                    output_str = ""
                    for node, output in event.items():
                        # Handle knowledge base ID
                        
                        print("streaming", "-"*100)
                        print(output)
                        for key in important_keys:
                            if key in output:
                                try:
                                    yield json.dumps({
                                        "key": key,
                                        "data": get_serializable_response(output[key]),
                                        "status": "success"
                                    })
                                except Exception as e:
                                    yield json.dumps({
                                        "key": key,
                                        "data": output[key],
                                        "status": "error"
                                    })

                    # Optional: add a small delay to prevent overwhelming the client
                    await asyncio.sleep(0.1)

                except Exception as e:
                    yield json.dumps({
                        "key": "error",
                        "data": str(e),
                        "status": "error"
                    })
                    continue

            # Final event to indicate stream completion
            yield json.dumps({
                "key": "data",
                "data": "[DONE]",
                "status": "success"
            })

        except Exception as e:
            yield json.dumps({
                "key": "error",
                "data": str(e),
                "status": "error"
            })

    # Return a StreamingResponse with the async generator
    return StreamingResponse(generate_stream(), media_type="application/json")


def load_response_from_json(file_name: str):
    try:
        with open(f"responses/{file_name}.json", "r") as f:
            return json.load(f)
    except Exception as e:
        return None


def get_all_saved_responses(knowledge_base_id: str):
    return {
        "basic_info": load_response_from_json(
            f"basic_info_{knowledge_base_id}"
        ),
        "market_size_report": load_response_from_json(
            f"market_size_report_{knowledge_base_id}"
        ),
        "market_size_graph": load_response_from_json(
            f"market_size_graph_{knowledge_base_id}"
        ),
        "competitors_table": load_response_from_json(
            f"competitors_table_{knowledge_base_id}"
        ),
        "generate_competitors_chart": load_response_from_json(
            f"competitors_chart_{knowledge_base_id}"
        ),
        "swot_analysis": load_response_from_json(
            f"swot_analysis_{knowledge_base_id}"
        ),
        "pestali_analysis": load_response_from_json(
            f"pestali_analysis_{knowledge_base_id}"
        ),
        "roadmap": load_response_from_json(
            f"roadmap_{knowledge_base_id}"
        ),
    }


@app.post("/previous-analysis/{knowledge_base_id}")
async def previous_analysis_stream(
    knowledge_base_id: str,
) -> StreamingResponse:
    async def generate_stream() -> AsyncGenerator[str, None]:
        try:
            yield json.dumps({
                "key": "start",
                "data": "Waaassuupp?",
                "status": "success"
            })
            # Create the graph
            saved_responses = get_all_saved_responses(knowledge_base_id)

            print("keys of saved responses", saved_responses.keys())
            print("keys of important keys", important_keys)

            # Stream the graph execution
            for key, response in saved_responses.items():
                try:
                    for key in important_keys:
                        if key in response:
                            yield json.dumps({
                                "key": key,
                                "data": response[key],
                                "status": "success"
                            })

                    # Optional: add a small delay to prevent overwhelming the client
                    await asyncio.sleep(0.1)

                except Exception as e:
                    yield json.dumps({
                        "key": "error",
                        "data": str(e),
                        "status": "error"
                    })
                    continue

            # Final event to indicate stream completion
            yield json.dumps({
                "key": "data",
                "data": "[DONE]",
                "status": "success"
            })

        except Exception as e:
            yield json.dumps({
                "key": "error",
                "data": str(e),
                "status": "error"
            })

    # Return a StreamingResponse with the async generator
    return StreamingResponse(generate_stream(), media_type="application/json")


@app.get("/analyses")
async def get_analyses():
    """
    Endpoint to list all file names in the KNOWLEDGEBASE_PATH.

    Returns:
        List[str]: A list of file names in the knowledge base directory.
    """
    try:
        # Get a list of files in the knowledge base directory
        file_names = os.listdir(RESPONSE_PATH)

        # Filter only files (exclude directories)
        file_names = [file for file in file_names if os.path.isfile(os.path.join(RESPONSE_PATH, file))]

        filtered_files = [
            file.split("market_size_report_")[1].replace(".json", "") for file in file_names
            if os.path.isfile(os.path.join(RESPONSE_PATH, file)) and "market_size_report" in file.lower()
        ]

        analyses = []

        for id in filtered_files:
            basic_info = load_response_from_json(f"basic_info_{id}")
            analyses.append(basic_info)


        return {
            "analyses": analyses
        }

    except FileNotFoundError:
        return {"error": "PATH not found"}
    except Exception as e:
        return {"error": str(e)}

    
@app.post("/chat")
async def chat(chat_request: ChatRequest):
    knowledge_base_id = chat_request.id
    knowledge_base = extract_knowledge_base(knowledge_base_id)

    if chat_request.type == ChatType.CHAT:
        response = chat_with_agent(input_text=chat_request.message, chat_history=chat_request.chat_history, knowledge_base=knowledge_base)
    elif chat_request.type == ChatType.WRITE:
        response = {
            "message": "work in progress"
        }
    return response