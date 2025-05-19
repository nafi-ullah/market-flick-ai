# MarketFlick AI - Technical Documentation

## Overview

MarketFlick AI is an AI-powered business analysis platform designed to assist businesses in estimating market sizes and conducting competitive analyses. With the integration of advanced AI agents, MarketFlick AI provides insights into:

- Market Report Generation
- TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) Estimations
- Competitor Analysis and Comparisons
- Graphs and Charts on Competitors
- SWOT Analysis
- PESTALI Analysis
- Business Roadmap Generation

By leveraging recent and relevant data, MarketFlick AI ensures grounded and actionable business insights for its users.

---

## Technology Stack

### Backend:

- **Language**: Python
- **Framework**: FastAPI

### Frontend:

- **Framework**: Next.js
- **Language**: TypeScript

### AI Orchestration:

- **Frameworks**: LangGraph, LangChain

---

## AI Agent Framework

MarketFlick AI employs a modular agent-based architecture using the LangGraph and LangChain ecosystem. These frameworks enable seamless orchestration and communication between AI agents. Each agent follows the ReAct (Reasoning and Action) model, which integrates reasoning capabilities with actionable steps to:

1. Understand and process information.
2. Evaluate scenarios and take appropriate actions.
3. Communicate results effectively.
4. Track ongoing progress for consistent outcomes.

### Key AI Agents

1. **Market Report Generation Agent**: Aggregates and summarizes data for comprehensive market reports.
2. **TAM, SAM, SOM Estimation Agent**: Calculates market size metrics for precise business targeting.
3. **Competitor Analysis Agent**: Analyzes competitor data, identifies strengths, and highlights opportunities.
4. **Graph and Chart Generation Agent**: Visualizes competitor data in graphs and charts for enhanced understanding.
5. **SWOT Analysis Agent**: Performs Strengths, Weaknesses, Opportunities, and Threats analysis.
6. **PESTALI Analysis Agent**: Evaluates Political, Economic, Social, Technological, Legal, and Industry-specific factors.
7. **Roadmap Generation Agent**: Creates strategic roadmaps for business planning.

### Agent Tools Integration

Each agent is equipped with specialized tools for specific tasks, such as:

- **Search Tools**: For real-time data collection.
- **Report Generation Tools**: For creating detailed documents.
- **Graph and Chart Generation Tools**: For visual representation of data.

### Data Grounding

All AI-generated information is validated with source links to ensure transparency and reliability.

---

## Backend Folder Structure

```plaintext
server/
├── main.py               # API entry point with endpoint definitions
├── custom_types/         # Custom Pydantic classes for input validation
│   └── competitor_analysis.py
│   └── market_analysis.py
├── core/
│   ├── competitor_analysis/
│   │   ├── agents.py     # Agent logic for competitor analysis
│   │   ├── prompts.py    # Prompt templates for competitor analysis
│   │   ├── tool_a.py     # Specific tool implementation
│   │   ├── tool_b.py     # Additional tool implementation
│   ├── market_analysis/
│   │   ├── agents.py     # Agent logic for market analysis
│   │   ├── prompts.py    # Prompt templates for market analysis
│   │   ├── tool_x.py     # Specific tool implementation
│   │   ├── tool_y.py     # Additional tool implementation
│   │   ├── test_langgraph.py # LangGraph orchestration and compilation
```

---

## API Documentation

### Base URL

`http://<your-server-domain>:<port>`

### Endpoints

#### 1. `GET /`

- **Description**: Health check for the server.
- **Response**:

```json
{
  "message": "Python server is running..."
}
```

#### 2. `GET /test`

- **Description**: Test endpoint for generating queries.
- **Response**: Custom query generation output.

#### 3. `POST /business-analysis`

- **Description**: Streams the results of a business analysis in real-time.
- **Request Body**:
  ```json
  {
    "sector": "string",
    "idea": "string",
    "location": "string"
  }
  ```
- **Response**: Server-Sent Events (SSE) streaming analysis progress and results.

#### 4. `POST /previous-analysis/{knowledge_base_id}`

- **Description**: Streams saved analysis data for a given knowledge base ID.
- **Path Parameter**:
  - `knowledge_base_id` (string): Identifier for the saved analysis.
- **Response**: SSE streaming saved analysis data.

#### 5. `GET /analyses`

- **Description**: Lists all saved analysis files in the knowledge base.
- **Response**: Array of saved analyses with metadata.

---

## Deployment

For deployment, both the frontend and backend are hosted on an Amazon EC2 instance. This setup ensures scalability and reliability for handling user requests.

---

## Conclusion

MarketFlick AI combines advanced AI agents with a robust backend and intuitive frontend to deliver cutting-edge market analysis and competitor insights. Its modular design allows for flexibility and continuous enhancement, making it a powerful tool for businesses looking to stay ahead in competitive markets.
