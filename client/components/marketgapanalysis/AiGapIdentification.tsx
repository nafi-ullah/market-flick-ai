"use client";
import React from 'react';
import { FaInfoCircle, FaSyncAlt } from 'react-icons/fa';

interface GapData {
  title: string;
  priority: string;
  color: string; // Background color
  priorityColor: string; // Text color for priority
}

interface AIGapIdentificationProps {
  data: GapData[];
  onRefresh: () => void;
}

const AIGapIdentification: React.FC<AIGapIdentificationProps> = ({ data, onRefresh }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">AI Gap Identification</h3>
        <FaInfoCircle className="text-gray-400" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg flex justify-between items-center"
            style={{ backgroundColor: item.color }}
          >
            <span className="text-gray-800 font-medium">{item.title}</span>
            <span className="font-medium" style={{ color: item.priorityColor }}>
              {item.priority}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onRefresh}
        className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-gray-800"
      >
        <FaSyncAlt className="mr-2" />
        Refresh Analysis
      </button>
    </div>
  );
};

export default AIGapIdentification;
