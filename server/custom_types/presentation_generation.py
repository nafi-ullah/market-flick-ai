from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from enum import Enum

class TemplateType(str, Enum):
    TEMPLATE1 = "template1"
    TEMPLATE2 = "template2"
    TEMPLATE3 = "template3"

class Service(BaseModel):
    """Represents a service offering with its title and description.

    Used within slides to describe individual services or features.
    """
    title: str = Field(..., description="Title of the service, e.g., 'Analysis'.")
    description: str = Field(..., description="Description of the service, e.g., 'Details about the service offered.'")

class Slide(BaseModel):
    """Represents a single presentation slide with title, content, and optional services.

    Can include a list of services for service-focused slides.
    """
    title: str = Field(..., description="Title of the slide, e.g., 'OUR\nSERVICE'.")
    body: str = Field(..., description="Body content of the slide.")
    services: Optional[List[Service]] = Field(None, description="List of services provided in this slide, if applicable.")

class SlideData(BaseModel):
    """Contains the content for all slides in a business presentation.

    Includes standard sections like 'About Us', 'Main Goals', and multiple
    content slides covering case studies, products, services, and benefits.
    """
    startup_title: str = Field(..., description="Title of the business pitch deck")
    slogan: str = Field(..., description="Slogan that captures the essence of the business.")
    about_us_title: str = Field(Literal["ABOUT US"], description="Title of the 'About Us' section, must always be 'ABOUT US'.")
    about_us_text: str = Field(..., description="Content of the 'About Us' section.")
    main_goals_title: str = Field(Literal["MAIN GOALS"], description="Title of the 'Main Goals' section, must always be 'MAIN GOALS'.")
    main_goals_text: str = Field(..., description="Content of the 'Main Goals' section.")
    slide4: Slide = Field(..., description="Details for slide 4, typically a case study.")
    slide5: Slide = Field(..., description="Details for slide 5, typically about the product.")
    slide6: Slide = Field(..., description="Details for slide 6, typically about the service, with optional service list.")
    slide7: Slide = Field(..., description="Details for slide 7, typically benefits of the product/service.")

class SlideInput(BaseModel):
    """Configuration for generating a PowerPoint presentation.

    Combines presentation template selection with slide content and unique identifier.
    """
    template_name: TemplateType = Field(..., description="Name of the PowerPoint template to use (template1, template2, or template3)")
    slide_data: SlideData = Field(..., description="Data for each slide in the presentation.")
    id: str = Field(..., description="ID of the business report")