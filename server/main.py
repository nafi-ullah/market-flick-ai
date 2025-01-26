from datetime import datetime
import json
import uuid
from constants import BASE_URL, RESPONSE_PATH, important_keys
from core.presentation_generation.agent import create_presentation
from core.util_agents.chat_agent import chat_with_agent
from core.util_agents.chat_write_agent import chat_write_agent
from core.util_agents.title_generator import generate_title
from utils.general_utils import load_response_from_json, get_all_saved_responses
from database.db import get_database
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse, FileResponse
import asyncio
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware
from custom_types.market_analysis import BusinessAnalysisInput
from custom_types.basetypes import ChatRequest, ChatType, PresentationInput
from langchain_core.caches import InMemoryCache
from langchain_core.globals import set_llm_cache

from core.market_size_analysis.test_langgraph import build_business_analysis_graph
import os


from core.market_size_analysis.utils import extract_knowledge_base, get_serializable_response, save_response_to_json


# # Load .env file
# load_dotenv()

# # Access environment variables
# mongodb_uri = os.getenv("MONGODB_URI")
# openai_api_key = os.getenv("OPENAI_API_KEY")
# pplx_api_key = os.getenv("PPLX_API_KEY")
# tavily_api_key = os.getenv("TAVILY_API_KEY")
# nvidia_api_key = os.getenv("NVIDIA_API_KEY")

# # Print (for debugging purposes)
# print("tavily_api_key:", tavily_api_key)
# print("OPENAI_API_KEY:", openai_api_key)

# set_llm_cache(InMemoryCache())


app = FastAPI()




origins = [
    "http://localhost:3000",
    "http://192.168.8.169:3000",
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
            "analyses": [
                analyse_obj for analyse_obj in analyses if analyse_obj is not None
            ]
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
        response = chat_write_agent(id=chat_request.id, input=chat_request.message, chat_history=chat_request.chat_history, component_keys=chat_request.component_keys, knowledge_base=knowledge_base)
    return response



@app.post("/generate-presentation")
async def generate_presentation(presentation_input: PresentationInput):
    id = presentation_input.id
    template_name = presentation_input.template_name
    response = create_presentation(id=id, template_name=template_name)

    return {
        "message": "Presentation generated successfully",
        "file_link": f"{BASE_URL}/download-presentation/{id}.pptx"
    }


@app.get("/download-presentation/{id}.pptx")
async def download_file(id: str):
    file_path = f"{RESPONSE_PATH}/presentation_{id}.pptx"
    print(file_path)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=f"presentation_{id}.pptx",
        media_type="application/octet-stream"
    )