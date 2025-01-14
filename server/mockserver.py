from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with a specific domain for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

def data_stream():
    for i in range(1, 6):  # Simulate streaming 5 data items
        yield f"data: Chunk {i}\n\n"  # Format required for Server-Sent Events (SSE)
        time.sleep(1)  # Simulate delay between chunks

@app.get("/stream")
async def stream_data():
    return StreamingResponse(data_stream(), media_type="text/event-stream")
