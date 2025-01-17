import { RoadmapProps } from "../components/RoadmapComponent";

export function parseRoadmap(content: string): RoadmapProps {
  // Extract the JSON part from the string
  const roadmapMatch = content.match(/roadmap:\s*(\{.*\})/);
  if (!roadmapMatch) {
    console.log("Roadmap not found in content.");
    return {
      title: "Not Found",
      elements: [],
    };
  }

  const roadmapJson = roadmapMatch[1];
  //   console.log("Roadmap JSON:", roadmapJson);

  try {
    // Parse the JSON string into a RoadmapProps object
    const jsonString = roadmapJson.replace(/'/g, '"').replace(/"(?=s\b)/g, "'");

    // console.log("Parsed JSON:", jsonString);
    const roadmap = JSON.parse(jsonString);
    return {
      title: roadmap.title,
      elements: roadmap.elements.map((element: any) => ({
        title: element.title,
        description: element.description,
      })),
    };
  } catch (error) {
    console.log("Error parsing roadmap JSON:", error);
  }

  return {
    title: "Not found",
    elements: [],
  };
}
