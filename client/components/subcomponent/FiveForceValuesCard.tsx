// components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  data: { title: string; value: number; color: string }[];
}

const FiveForcesBar: React.FC<ProgressBarProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg`}
          style={{ backgroundColor: `${item.color}20` }} // Light background
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-sm font-bold">{item.value}%</span>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${item.value}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveForcesBar;
