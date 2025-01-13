import React from "react";
import SWOTAnalysisCard from "./subcomponent/SwotColorCard";


type SWOTItem = {
  title: string;
  key_points: string[];
  color: string;
};

type SWOTAnalysisProps = {
  swot_data: SWOTItem[];
};

const SWOTAnalysis: React.FC<SWOTAnalysisProps> = ({ swot_data }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">SWOT Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swot_data.map((item, index) => (
          <SWOTAnalysisCard
            key={index}
            title={item.title}
            key_points={item.key_points}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default SWOTAnalysis;
