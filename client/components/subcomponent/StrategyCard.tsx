// components/StrategyCard.tsx
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineMinus } from 'react-icons/ai';

interface StrategyCardProps {
  title: string;
  data: { title: string; value: string; trend: 'up' | 'neutral' }[];
  aiRecommendation: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, data, aiRecommendation }) => {
  const getTrendIcon = (trend: 'up' | 'neutral') => {
    if (trend === 'up') return <AiOutlineArrowUp className="text-green-600 inline-block ml-2" />;
    return <AiOutlineMinus className="text-yellow-600 inline-block ml-2" />;
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <FiEdit className="text-gray-500 cursor-pointer" />
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{item.title}</span>
            <span className="text-gray-800 font-medium flex items-center">
              {item.value}
              {getTrendIcon(item.trend)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-blue-50 p-3 rounded">
        <h4 className="text-sm font-bold text-blue-700">AI Recommendation</h4>
        <p className="text-sm text-blue-700 mt-1">{aiRecommendation}</p>
      </div>
    </div>
  );
};

export default StrategyCard;
