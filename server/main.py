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
    business_input: BusinessAnalysisInput
) -> StreamingResponse:
    async def generate_stream() -> AsyncGenerator[str, None]:
        try:
            # Create the graph
            graph = build_business_analysis_graph()
            
            # Initial state
            initial_state = {
                "business_analysis_input": business_input,
                "messages": [],
                "knowledge_base_id": None
            }
            
            # Stream the graph execution
            async for event in graph.astream(initial_state):
                output_str = ""
                for node, output in event.items():
                    output_str += f"Node: {node}\n"
                    
                    # Handle messages
                    if "messages" in output:
                        for message in output["messages"]:
                            output_str += f"{message.content}\n"
                    
                    # Handle knowledge base ID
                    if "knowledge_base_id" in output:
                        output_str += f"Knowledge Base ID: {output['knowledge_base_id']}\n"
                
                # Yield the output as a server-sent event
                if output_str:
                    yield f"data: {output_str}\n\n"
                
                # Optional: add a small delay to prevent overwhelming the client
                await asyncio.sleep(0.1)
            
            # Final event to indicate stream completion
            yield "data: [DONE]\n\n"
        
        except Exception as e:
            yield f"data: Error: {str(e)}\n\n"

    # Return a StreamingResponse with the async generator
    return StreamingResponse(
        generate_stream(), 
        media_type="text/event-stream"
    )