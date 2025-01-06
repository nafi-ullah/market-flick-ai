import { getLowOpacityHexColor } from "@/utils/designs";
import React from "react";

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
          <div
            key={index}
            className="p-4 rounded-md"
            style={{ backgroundColor: getLowOpacityHexColor(item.color, 10) }}
          >
            <h3
              className="text-md font-semibold"
              style={{ color: item.color }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: item.color }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIDAAnalysis;
