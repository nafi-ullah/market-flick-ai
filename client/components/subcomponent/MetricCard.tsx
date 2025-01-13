import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

interface MetricCardProps {
  data: {
    title: string;
    description: string;
    value: string;
    trend: 'up' | 'down';
    color: string;
  }[];
}

const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg flex justify-between items-center"
          style={{ backgroundColor: item.color }}
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <div
            className={`flex items-center font-medium ${
              item.trend === 'up' ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {item.trend === 'up' ? (
              <AiOutlineArrowUp className="mr-1" />
            ) : (
              <AiOutlineArrowDown className="mr-1" />
            )}
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCard;
