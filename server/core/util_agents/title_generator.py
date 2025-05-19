



from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from custom_types.market_analysis import BusinessAnalysisInput
from langchain_core.messages import SystemMessage, HumanMessage



from core.util_agents.prompts import title_generator_system_message, title_generator_human_message
from custom_types.market_analysis import BusinessAnalysisInput



llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)


class TitleOutput(BaseModel):
    title: str = Field(..., description="Generated title")


def generate_title(business_analysis_input: BusinessAnalysisInput):
    prompt = ChatPromptTemplate.from_messages([
        ("system", title_generator_system_message),
        ("human", title_generator_human_message)
    ])

    
    
    chain = prompt | llm.with_structured_output(TitleOutput)

    response = chain.invoke({
        "business_idea": business_analysis_input.idea,
        "business_sector": business_analysis_input.sector,
        "business_location": business_analysis_input.location,
    })

    return response.title





