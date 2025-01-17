import { parseRoadmap } from "@/data/RoadmapDataMapping";
import { useState } from "react";
import RoadmapComponent from "./RoadmapComponent";




export type RoadmapCardProps = {
  content: string;
};


export const RoadmapCard: React.FC<RoadmapCardProps> = ({ content }) => {
    const [roadmapData]= useState(parseRoadmap(content));
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-7xl mx-auto my-6">
        <RoadmapComponent title={roadmapData.title} elements={roadmapData.elements} />
    </div>
  );
};