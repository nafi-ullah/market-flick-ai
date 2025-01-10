// components/ImpactGrid.tsx
import React from 'react';

interface ImpactItem {
  title: string;
  description: string;
  impact_level: number; // Impact level as an integer
  color: string; // Hex color string
}

interface ImpactGridProps {
  data: ImpactItem[];
}

const ImpactGrid: React.FC<ImpactGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item, index) => {
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
            style={{ backgroundColor: `${item.color}1A` }} // Transparent background
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-md font-medium" style={{ color: item.color }}>Impact Level</span>
              <span
                className="text-md font-bold"
                style={{ color: item.color }} // Apply dynamic color to the text
              >
                {impactText}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${item.impact_level}%`,
                  backgroundColor: item.color, // Dynamic progress bar color
                }}
              ></div>
            </div>

            <div className="flex items-center mt-4 text-sm " style={{ color: item.color }}>
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
