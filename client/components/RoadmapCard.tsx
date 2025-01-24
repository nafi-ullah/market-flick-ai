import { parseRoadmap } from "@/data/RoadmapDataMapping";
import { useState } from "react";
import RoadmapComponent from "./RoadmapComponent";




export type RoadmapCardProps = {
  data: {
    key: string;
    data: any;
    status: string;
  }
};


export const RoadmapCard: React.FC<RoadmapCardProps> = ({ data }) => {
    const roadmapData = parseRoadmap(data.data)
  return (
    <div className="p-4 bg-[hsl(var(--accent))] rounded-md shadow-md max-w-7xl mx-auto my-6">
        <RoadmapComponent title={roadmapData.title} elements={roadmapData.elements} />
    </div>
  );
};