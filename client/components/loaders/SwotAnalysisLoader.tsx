"use client";

import React from "react";

const SWOTAnalysisSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-7xl mx-auto my-6 animate-pulse">
      <h2 className="text-lg font-bold mb-4 bg-gray-300 h-6 w-32 rounded-md"></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-md bg-gray-200 h-36"
          >
            <div className="h-4 bg-gray-300 w-20 rounded-md mb-2"></div>
            <ul className="mt-2 space-y-1">
              {Array.from({ length: 3 }).map((_, subIndex) => (
                <li
                  key={subIndex}
                  className="h-3 bg-gray-300 w-full rounded-md"
                ></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SWOTAnalysisSkeleton;
