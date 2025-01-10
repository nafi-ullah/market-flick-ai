import dotenv
dotenv.load_dotenv()
from custom_types.market_analysis import BusinessAnalysisInput
from pydantic import BaseModel, Field
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.tools import TavilySearchResults
from langchain_openai import ChatOpenAI
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from core.market_size_analysis.prompts import market_analysis_query_writer_instructions, market_size_structure, market_analysis_report_writer_instructions
from core.market_size_analysis.utils import print_stream
from core.market_size_analysis.dtypes import Queries
from langgraph.prebuilt import create_react_agent

llm = ChatNVIDIA(model="meta/llama-3.3-70b-instruct", temperature=0)

def generate_queries(business_analysis_input: BusinessAnalysisInput):

    structured_llm = llm.with_structured_output(Queries)
    system_instruction_query = market_analysis_query_writer_instructions.format(
        busines_sector=business_analysis_input.sector,
        business_idea=business_analysis_input.idea,
        business_location=business_analysis_input.location,
        market_size_structure=market_size_structure
    )
    results = structured_llm.invoke([SystemMessage(system_instruction_query)] + [HumanMessage(content="Please provide at least 5 search queries for market identifying TAM, SAM and SOM")])
    return results


search_tool = TavilySearchResults(
    max_results=1,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
)   

# ba = BusinessAnalysisInput(
#     sector="IT",
#     idea="An online AI tool which generates customised virtual gift cards and tries to sell  affiliated products on preferred choices to make money.",
#     location="United States"
# )


# queries = generate_queries(ba)

# print(queries)



def market_size_report(results: Queries):
    query_list = [query.search_query for query in results.queries]

    # convert query list to string
    query_str = "\n".join(query_list)
    
    agent = create_react_agent(llm, tools=[search_tool])

    inputs = {"messages": [SystemMessage(market_analysis_report_writer_instructions.format(
        business_sector=ba.sector,
        business_idea=ba.idea,
        business_location=ba.location,
        context=query_str
    ))]}

    print_stream(agent.stream(inputs, stream_mode="values"))
    

# market_size_report(queries)

# # Web search agent
    # query_list = [query.search_query for query in results.queries]
    # # search_docs = await tavily_search_async(query_list, "general", None)
    # search_docs = []
    # for query in query_list:
    #     search_docs.append(tavily_search(query))

    # source_str = deduplicate_and_format_sources(search_docs, 1000, include_raw_content=True)

    # print("context: " + source_str)

    # system_instructions_market_analysis = market_analysis_report_writer_instructions.format(
    #     business_sector=business_analysis_input.sector,
    #     business_idea=business_analysis_input.idea,
    #     business_location=business_analysis_input.location,
    #     context=source_str
    # )

    # result = llm.invoke([SystemMessage(system_instructions_market_analysis)] + [HumanMessage(content="Please provide a market analysis report")])