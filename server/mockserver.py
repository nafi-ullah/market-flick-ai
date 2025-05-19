from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import time
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def data_stream():
    for i in range(1, 6):  # Simulate streaming 5 data items
        # Stream three types of data
        yield f"data: {json.dumps({'type': 'type1', 'message': f'Data for Type 1 - {i}'})}\n\n"
        time.sleep(1)
        yield f"data: {json.dumps({'type': 'type2', 'message': f'Data for Type 2 - {i}'})}\n\n"
        time.sleep(1)
        yield f"data: {json.dumps({'type': 'type3', 'message': f'Data for Type 3 - {i}'})}\n\n"
        time.sleep(1)

@app.get("/stream")
async def stream_data():
    return StreamingResponse(data_stream(), media_type="text/event-stream")


# uvicorn mockserver:app --reload


# def data_stream():
#     for i in range(1, 6):  # Simulate streaming 5 data items
#         yield f"data: Chunk {i}\n\n"  # Format required for Server-Sent Events (SSE)
#         time.sleep(1)  # Simulate delay between chunks

