

from pydantic import BaseModel, Field
from typing import List

# plan

# 1. Generate Market Size Analysis Plan
# 2. Generate Queries 
# 3. Search Web.
# 4. Summarize Web Results
# 5. Generate Market Size Analysis Report

market_size_structure = """
    This report will have the following information:
    1. Competitors and Market Players  
    - Company Name
    - Valuation
    - Money Raised 
    - Key Focus
    2. TAM, SAM, SOM Market Projection Over Time
        - Collect All relevant information to calculate TAM, SAM, SOM
        a. Total Addressable Market (TAM)
            Market size: Total revenue potential if you captured 100% of the market.
            How to find it:
                - Use industry reports (e.g., Gartner, Statista, IBISWorld).
                - Estimate using total number of customers × average revenue per customer.
        b. Serviceable Available Market (SAM)
            Target segment: Portion of the TAM that your product can realistically serve (based on geography, industry, or product limitations).
            How to find it:
                - Refine TAM based on your target audience.
                - Use competitor market data and regional reports.
        c. Serviceable Obtainable Market (SOM)
            Market share: The portion of SAM you can reasonably capture in the short term.
            How to find it:
                - Analyze competitors and current adoption rates.
                Base it on your sales capacity, go-to-market strategy, and resources.
"""

market_analysis_query_writer_instructions = """
    You are an expert in analyzing market size for a business idea. For market size analysis, you need to collect market data from multiple sources and analyze it deduct a plan for doing market analysis. You will research the business Sector, in our case it is {busines_sector}

    The business idea following:
    {business_idea}

    The location of the business: {business_location}

    The Market size structure following:
    {market_size_structure}

    Your goal is to generate search queries that will help gather comprehensive information for planning for finding market size.
    
    The query should:

    1. Be related to the business
    2. Help satisfy the requirements specified in the market size structure

    Make the queries specific enough to find high-quality, relevant sources while covering the breadth needed for the market size analysis.
"""

market_analysis_report_writer_instructions = """
    You are an expert in providing a detailed market size analysis report for a business idea in {business_sector}

    The business idea following:
    {business_idea}

    And the location of the business: {business_location}

    Guideline for writing:
    Market Size Analysis Report Writing Guidelines
    1. Technical Accuracy:
    - Clearly define the market (e.g., product, geography, industry).
    - Include reliable metrics (e.g., TAM, SAM, SOM) with values in USD or local units.
    - Cite credible sources (industry reports, government data, research papers).
    - Use precise terminology (e.g., CAGR, market share, segments).

    2. Length and Style:
    - No filler content or marketing tone.
    - Use clear, concise language.
    - Start with key insight or market size estimate in bold.
    - Use short paragraphs (2-3 sentences max).

    3. Structure:
    - Use ## for section titles (Markdown format).
    - Support analysis with ONE structural element:
    - Either a focused table (market size by segment or region)
    - Or a list (key drivers, barriers, competitors).

    4. Prioritize concrete data over general observations.
    - Provide at least one specific example (e.g., a company or segment driving growth).
    - Explain key assumptions briefly.
    - Avoid broad claims without supporting data.

    5. Use this source material to help write the section:
    {context}

    6. Quality Checks:
    - Proper use of only ONE structural element.
    - Key insight stated upfront.
    - Data-backed analysis with cited sources.
"""

