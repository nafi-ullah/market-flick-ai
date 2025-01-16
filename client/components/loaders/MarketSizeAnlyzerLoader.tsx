import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const MarketSizeAnalysisCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-7xl mx-auto animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>

      {/* Skeleton Chart */}
      <div className="mb-4">
        <div className="h-40 bg-gray-200 rounded">
          <svg className="w-full h-full">
            {/* Mimicking a line graph */}
            <polyline
              points="10,30 40,20 70,50 100,40 130,60"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            <polyline
              points="10,50 40,40 70,60 100,50 130,70"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="flex justify-end">
        <div className="flex items-center text-sm px-4 py-2 bg-gray-300 rounded-md w-24">
          <FaInfoCircle className="mr-2 text-gray-400" />
          <div className="h-4 bg-gray-400 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default MarketSizeAnalysisCardSkeleton;
