# Market Flick AI 🚀

Market Flick AI is a comprehensive business analysis platform that helps entrepreneurs and businesses make data-driven decisions through AI-powered market analysis. The platform provides real-time market insights, competitor analysis, and strategic recommendations using advanced AI models.

## Features

### 1. Real-time Market Analysis
- **Business Sector Analysis**: In-depth analysis of 20+ business sectors
- **Location-based Insights**: Global market analysis with local market focus
- **Competitor Landscape**: Detailed competitor profiling and market positioning
- **Market Size Estimation**: TAM, SAM, and SOM calculations with projections

### 2. Strategic Analysis Tools
- **SWOT Analysis**: Comprehensive strengths, weaknesses, opportunities, and threats analysis
- **PESTLE Analysis**: Political, Economic, Social, Technological, Legal, and Environmental factor analysis
- **Porter's Five Forces**: Industry competition and market attractiveness assessment
- **Market Gap Analysis**: AI-powered identification of market opportunities

### 3. Advanced Analytics
- **Market Trends**: Real-time trend analysis and future projections
- **Competitive Intelligence**: Detailed competitor profiling and benchmarking
- **Strategic Recommendations**: AI-generated actionable insights
- **Custom Reports**: Exportable reports in multiple formats (PDF, Excel, CSV)

## Tech Stack

### Frontend
- **Framework**: Next.js 15.1.3
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React Hooks
- **Data Visualization**: Chart.js, Recharts
- **Styling**: Tailwind CSS, Emotion

### Backend
- **Framework**: FastAPI
- **AI Integration**: OpenAI GPT-4, LangChain
- **Database**: MongoDB
- **Data Processing**: LangGraph
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- MongoDB
- OpenAI API key

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Initialize required directories
./init.sh

# Start server
uvicorn main:app --reload
```

### Environment Variables

#### Frontend (.env)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

#### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_uri
```

## Project Structure

```
market-flick-ai/
├── client/                # Frontend application
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   │   ├── core/        # Core UI components
│   │   ├── charts/      # Data visualization
│   │   └── loaders/     # Loading animations
│   └── utils/           # Utility functions
└── server/              # Backend application
    ├── core/            # Core business logic
    ├── database/        # Database connections
    ├── responses/       # Analysis results
    └── knowledge_base/  # Stored analyses
```

## API Endpoints

### Business Analysis
```http
POST /business-analysis
Content-Type: application/json

{
  "sector": "string",
  "idea": "string",
  "location": "string"
}
```

### Previous Analysis
```http
POST /previous-analysis/{knowledge_base_id}
```

### Analysis History
```http
GET /analyses
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Guidelines

### Code Style
- Use TypeScript for frontend development
- Follow PEP 8 guidelines for Python code
- Use meaningful variable and function names
- Add comments for complex logic
- Write unit tests for critical functions

### Component Structure
- Create reusable components
- Follow atomic design principles
- Implement proper error handling
- Use proper type definitions
- Follow Material-UI best practices

## Deployment

### Frontend
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Backend
```bash
# Start production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@marketflickai.com or join our Slack channel.

## Acknowledgments

- OpenAI for GPT-4 API
- Material-UI team for the component library
- FastAPI team for the backend framework
- All contributors who have helped shape Market Flick AI

---

Made with ❤️ by the Market Flick AI Team
