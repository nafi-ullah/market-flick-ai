import React from "react";

const FeatureComparisonCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-sm mx-auto animate-pulse">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Radar Chart Placeholder */}
      <div className="mb-4 flex items-center justify-center">
        <div className="h-40 w-40 bg-gray-300 rounded-full"></div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
        <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default FeatureComparisonCardSkeleton;
