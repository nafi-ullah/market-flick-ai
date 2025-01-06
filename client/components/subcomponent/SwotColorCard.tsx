import { getLowOpacityHexColor } from "@/utils/designs";
import React from "react";

type SWOTAnalysisCardProps = {
  title: string;
  key_points: string[];
  color: string; // Hex color for text and background
};


const SWOTAnalysisCard: React.FC<SWOTAnalysisCardProps> = ({ title, key_points, color }) => {
  return (
    <div
      className="p-4 rounded-md"
      style={{ backgroundColor: getLowOpacityHexColor(color, 10) }}
    >
      <h3 className="text-md font-semibold" style={{ color }}>
        {title}
      </h3>
      <ul className="mt-2 space-y-1">
        {key_points.map((point, index) => (
          <li key={index} className="text-sm" style={{ color }}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SWOTAnalysisCard;
