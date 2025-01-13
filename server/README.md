# Market Flick AI - Server Setup Guide

This document provides instructions for setting up and running the FastAPI server for Market Flick AI. Follow these steps to get the server up and running quickly.

## Prerequisites

Make sure you have the following installed on your system:

- Python 3.8 or later
- pip (Python package installer)
- Virtual environment support

## Setup Instructions

1. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment:**

   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - On **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

3. **Install the required dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Convert the `.env.example` file to a valid `.env` file:**
   Copy the `.env.example` file and rename it to `.env`. Then, open the `.env` file and replace the placeholder values with your actual API keys and other configuration values.

   ```bash
   cp .env.example .env
   ```

5. **Start the FastAPI server in development mode:**

   ```bash
   fastapi dev
   ```

   The server will start and run on `http://localhost:8000`.

## Testing the Market Size Analysis API

Once the server is running, you can test the Market Size Analysis API endpoint using the following `curl` command:

```bash
curl -X POST http://localhost:8000/business-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "sector": "IT",
    "idea": "Faceless youtube channel business for viral videos",
    "location": "Global"
  }'
```

This command sends a POST request to the `/business-analysis` endpoint with the required JSON payload.

## Expected Response

A successful response will stream progressively as the analysis goes on, providing real-time updates based on the provided input.

---

For further information or troubleshooting, feel free to reach out to the development team.

Thank you for using Market Flick AI!
