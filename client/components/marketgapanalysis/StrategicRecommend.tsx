"use client";
import React from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa';

interface Recommendation {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

interface StrategicRecommendationsProps {
  data: Recommendation[];
}

const StrategicRecommendations: React.FC<StrategicRecommendationsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Strategic Recommendations</h3>
      <div className="space-y-4">
        {data.map((recommendation, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <h4 className="text-sm font-bold text-gray-800 mb-2">
              {recommendation.title}
            </h4>
            <ul className="space-y-2">
              {recommendation.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center">
                  <span className="mr-2 text-green-500">{recommendation.icon}</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicRecommendations;
