import React from "react";
import AnalysisCard from "./subcomponent/AnalysisColorCard";
 // Import the new component

type AnalysisItem = {
  title: string;
  description: string;
  color: string; // Color should be in hex format (e.g., #FF5733)
};

type AIDAAnalysisProps = {
  analysis_data: AnalysisItem[];
};

const AIDAAnalysis: React.FC<AIDAAnalysisProps> = ({ analysis_data }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">AIDA Model Analysis</h2>
      <div className="space-y-4">
        {analysis_data.map((item, index) => (
          <AnalysisCard
            key={index}
            title={item.title}
            description={item.description}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AIDAAnalysis;
