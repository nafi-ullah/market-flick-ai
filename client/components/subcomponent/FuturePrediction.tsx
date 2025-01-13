import React from 'react';

interface Prediction {
  quarter: string;
  growth: string;
  description: string;
  color: string;
}

interface FuturePredictionsProps {
  data: Prediction[];
}

const FuturePredictions: React.FC<FuturePredictionsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Future Predictions</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-gray-500 text-sm">{item.quarter}</span>
            <span className="text-xl font-bold" style={{ color: item.color }}>
              {item.growth}
            </span>
            <span className="text-gray-500 text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuturePredictions;
