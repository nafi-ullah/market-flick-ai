import { RoadmapProps } from "../components/RoadmapComponent";

export function parseRoadmap(roadmap: any): RoadmapProps {
  try {
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
