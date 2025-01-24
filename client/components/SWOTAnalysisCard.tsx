"use client"

import React from "react";
import SWOTAnalysisCard from "./subcomponent/SwotColorCard";
import { parseSwotData } from "@/data/SwotMapping";


type SWOTItem = {
  title: string;
  key_points: string[];
  color: string;
};

export type SWOTAnalysisProps = {
  data: {
    key: string;
    data: string;
    status: string;
  }
};

const SWOTAnalysis: React.FC<SWOTAnalysisProps> = ({ data }) => {
  const swot_data = parseSwotData(data.data)

  const lightColors = ["#E0FFFF", "#E6E6FA", "#FFD700", "#FFC0CB"]; 

  return (
    <div className="p-4 bg-[hsl(var(--accent))] rounded-md shadow-md max-w-7xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">SWOT Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swot_data.map((item, index) => (
          <SWOTAnalysisCard
            key={index}
            title={item.title}
            key_points={item.values}
            color={lightColors[index % lightColors.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default SWOTAnalysis;
