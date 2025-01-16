import json
from database.db import get_database
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse
import asyncio
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware
from custom_types.market_analysis import BusinessAnalysisInput
from core.market_size_analysis.test_langgraph import build_business_analysis_graph


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


@app.get("/test")
async def test():
    return generate_queries()


@app.post("/business-analysis")
async def business_analysis_stream(
    business_input: BusinessAnalysisInput,
) -> StreamingResponse:
    async def generate_stream() -> AsyncGenerator[str, None]:
        try:
            # Create the graph
            graph = build_business_analysis_graph()

            # Initial state
            initial_state = {
                "business_analysis_input": business_input,
                "messages": "",
                "knowledge_base_id": "",
                "knowledge_base": "",
                "market_size_data_points": "",
                "market_size_plot_id": "",
                "market_player_table_data": "",
                "market_player_table_id": "",
                "search_queries": "",
                "competitors_chart_id": "",
                "competitors_chart_data": "",
                "is_last_step": False,
            }

            yield "Analyzing Business Idea: {}\n".format(business_input.idea)

            yield "Generating market size report...\n"

            # Stream the graph execution
            async for event in graph.astream(initial_state):
                try:
                    output_str = ""
                    for node, output in event.items():

                        output_str += f"Node: {node}\n"

                        # Handle messages
                        if "messages" in output:
                            for message in output["messages"]:
                                # check if message has content
                                output_str += f"{message}\n"

                        # Handle knowledge base ID
                        for key in [
                            "messages",
                            "knowledge_base_id",
                            "knowledge_base",
                            "market_size_data_points",
                            "market_size_plot_id",
                            "market_player_table_data",
                            "market_player_table_id",
                            "search_queries",
                            "explanation",
                            "competitors_chart_id",
                            "competitors_chart_data",
                        ]:
                            if key in output:
                                output_str += f"{key}: {output[key]}\n"

                    # Yield the output as a server-sent event
                    if output_str:
                        yield f"{output_str}\n\n"

                    # Optional: add a small delay to prevent overwhelming the client
                    await asyncio.sleep(0.1)

                except Exception as e:
                    yield f"data: Error: {str(e)}\n\n"
                    continue

            # Final event to indicate stream completion
            yield "data: [DONE]\n\n"

        except Exception as e:
            yield f"data: Error: {str(e)}\n\n"

    # Return a StreamingResponse with the async generator
    return StreamingResponse(generate_stream(), media_type="text/event-stream")


def load_response_from_json(file_name: str):
    with open(f"responses/{file_name}.json", "r") as f:
        return json.load(f)


def get_all_saved_responses(knowledge_base_id: str):
    return {
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
    }


@app.post("/previous-analysis/{knowledge_base_id}")
async def previous_analysis_stream(
    knowledge_base_id: str,
) -> StreamingResponse:
    async def generate_stream() -> AsyncGenerator[str, None]:
        try:
            # Create the graph
            saved_responses = get_all_saved_responses(knowledge_base_id)
            yield "Generating market size report...\n"

            # Stream the graph execution
            for key, response in saved_responses.items():
                try:
                    output_str = ""

                    output_str += f"Node: {key}\n"

                    print("!!! ", output_str)
                    # Handle knowledge base ID
                    for key in [
                        "messages",
                        "knowledge_base_id",
                        "knowledge_base",
                        "market_size_data_points",
                        "market_size_plot_id",
                        "market_player_table_data",
                        "market_player_table_id",
                        "search_queries",
                        "explanation",
                        "competitors_chart_id",
                        "competitors_chart_data",
                    ]:
                        if key in response:
                            output_str += f"{key}: {json.dumps(response[key])}\n"

                    # Yield the output as a server-sent event
                    if output_str:
                        yield f"{output_str}\n\n"

                    # Optional: add a small delay to prevent overwhelming the client
                    await asyncio.sleep(0.1)

                except Exception as e:
                    yield f"data: Error: {str(e)}\n\n"
                    continue

            # Final event to indicate stream completion
            yield "data: [DONE]\n\n"

        except Exception as e:
            yield f"data: Error: {str(e)}\n\n"

    # Return a StreamingResponse with the async generator
    return StreamingResponse(generate_stream(), media_type="text/event-stream")
