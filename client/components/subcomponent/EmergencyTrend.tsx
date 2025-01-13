import React from 'react';

interface EmergingTrend {
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactNode; // For dynamic React Icons
}

interface EmergingTrendsProps {
  data: EmergingTrend[];
}

const EmergingTrends: React.FC<EmergingTrendsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg border-[1px] border-gray-200 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Emerging Trends</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center space-x-2 w-1/3">
              <span className="text-xl" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="text-gray-700 font-medium">{item.title}</span>
            </div>
            <div className="flex-1">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTrends;
