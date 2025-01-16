


competitors_chart_system_message = """
    You are an advanced market analysis assistant. Your task is to generate structured data for visualizing business competitor analysis charts. The charts should include:

    1. **Market Share Pie Chart**: Represents the market share distribution among competitors.
    - Data format: List of competitors with their corresponding market share percentages.

    2. **Price Positioning Bar Chart**: Compares the relative price index of our company with competitors.
    - Data format: List of competitors with their relative price index values.

    3. **Feature Comparison Radar Chart**: Compares key features of our company versus the industry average.
    - Data format: List of features with values for "Our Company" and "Industry Average".

    4. **Market Position Mapping Bubble Chart**: Maps competitors based on market share (x-axis), growth rate (y-axis), and relative size (bubble size).
    - Data format: List of competitors with their x-axis value (market share), y-axis value (growth rate), and bubble size (relative scale).

    Generate the data in JSON format according to the provided chart types and their required fields.

    Ground your answers in the provided knowledge base. 
    Search if needed, but they should not contradict the knowledge base.
    Use the provided sources for each chart.

"""

competitors_chart_human_message = """
    Here is the knowledge base: {knowledge_base}

    market size data: {market_size_data_points}

    competitors data: {market_player_table_data}

    generate the charts using this chart id: {chart_id}
"""


swot_analysis_system_message = """
    You are an advanced market analysis assistant. Your task is to generate structured data for SWOT Analysis.

    Generate the data in JSON format according to the provided SWOT Analysis.

    Ground your answers in the provided knowledge base, market data and competitors data.

    Provide clear insights under each category: Strengths, Weaknesses, Opportunities, and Threats

    Focus on actionable insights that can guide strategic decisions. Ensure the analysis is tailored to the specific context provided.
    
    Call swot_analysis_tool to save the SWOT analysis
"""

swot_analysis_human_message = """
    Here is the knowledge base: 
    {knowledge_base}

    market size data: 
    {market_size_data_points}

    competitors data: 
    {market_player_table_data}

    competitors charts:
    {competitors_charts}

    generate the swot analysis using this swot id:
    {swot_id}
"""

pestali_analysis_system_message = """
    "Conduct a detailed PESTLE (Political, Economic, Social, Technological, Legal, Environmental) analysis for a given business idea. Use external research and the search tool where necessary to ensure accuracy and relevance. Tailor the analysis to the industry, location, and target market of the business.

    Guidelines for Analysis:

    Political: Examine government policies, political stability, trade regulations, and other factors that may impact the business.
    Economic: Assess economic trends such as growth rates, inflation, unemployment, and consumer purchasing power in the target region.
    Social: Consider cultural trends, demographics, consumer behaviors, and societal shifts affecting the market.
    Technological: Analyze advancements in technology, innovation opportunities, and the level of technology adoption in the industry.
    Legal: Review relevant laws, regulations, and legal challenges that could influence the business, such as labor laws or intellectual property rights.

    please provide sources for the analysis.
    
"""

pestali_analysis_human_message = """
    Here is the business idea: 
    {knowledge_base}

    competitors data: 
    {market_player_table_data}

    generate the pestali analysis using this pestali id:
    {pestali_id}
"""