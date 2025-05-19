import React from "react";
import { getLowOpacityHexColor } from "@/utils/designs";

type AnalysisCardProps = {
  title: string;
  description: string;
  color: string;
};

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, description, color }) => {
  return (
    <div
      className="p-4 rounded-md"
      style={{ backgroundColor: getLowOpacityHexColor(color, 10) }}
    >
      <h3 className="text-md font-semibold" style={{ color }}>
        {title}
      </h3>
      <p className="text-sm mt-1" style={{ color }}>
        {description}
      </p>
    </div>
  );
};

export default AnalysisCard;
