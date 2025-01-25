"use client";

import React from "react";

const PASTELIAnalysisSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md  my-6 animate-pulse">
      <h2 className="text-lg font-bold mb-4 bg-gray-300 h-6 w-40 rounded-md"></h2>
      
      {/* Simulated grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md bg-gray-200 h-36">
            <div className="h-4 bg-gray-300 w-24 rounded-md mb-2"></div>
            <div className="h-3 bg-gray-300 w-full rounded-md mb-2"></div>
            <div className="h-3 bg-gray-300 w-3/4 rounded-md mb-4"></div>
            <div className="h-2 bg-gray-300 w-full rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Simulated button */}
      <div className="flex justify-end mt-4">
        <div className="flex items-center bg-gray-200 h-8 w-28 rounded-md"></div>
      </div>
    </div>
  );
};

export default PASTELIAnalysisSkeleton;
