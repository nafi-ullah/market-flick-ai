// components/ImpactGrid.tsx
import { parsePestaliData } from '@/data/PasteliDataMapping';
import React, { useState } from 'react';

interface ImpactItem {
  title: string;
  description: string;
  impact_level: number; // Impact level as an integer
  color: string; // Hex color string
}

interface ImpactGridProps {
  pestali_data: {
    pestaliData: any[];
    sources: any[];
  };
}

const ImpactGrid: React.FC<ImpactGridProps> = ({ pestali_data }) => {
  const pestaliData = pestali_data.pestaliData

  const lightColors = ["#E0FFFF", "#FFD700",  "#ADD8E6", "#FFC0CB", "#F0E68C", "#FFB6C1", "#D8BFD8", "#FAFAD2",  "#E6E6FA", "#F5DEB3"]; 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {pestaliData.map((item, index) => {
        const impactText =
          item.impact_level >= 75
            ? 'Very High'
            : item.impact_level >= 50
            ? 'High'
            : item.impact_level >= 25
            ? 'Medium'
            : 'Low';

        return (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md"
            style={{ backgroundColor: `${lightColors[index % lightColors.length]}1A` }} // Transparent background
          >
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">{item.title}</h3>
            <p className="text-sm text-[hsl(var(--foreground))] mt-2">{item.description}</p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-md font-medium" style={{ color: lightColors[index % lightColors.length] }}>Impact Level</span>
              <span
                className="text-md font-bold"
                style={{ color: lightColors[index % lightColors.length] }} // Apply dynamic color to the text
              >
                {impactText}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${item.impact_level}%`,
                  backgroundColor: lightColors[index % lightColors.length], // Dynamic progress bar color
                }}
              ></div>
            </div>

            <div className="flex items-center mt-4 text-sm " style={{ color: lightColors[index % lightColors.length] }}>
              <span className="mr-2">&#x21bb;</span>
              <span>Real-time updates</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImpactGrid;
