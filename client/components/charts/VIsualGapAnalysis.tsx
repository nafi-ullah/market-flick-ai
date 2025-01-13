"use client";

import React from "react";
import BarSingleLineChart from "./BarSingleLineChart";


interface Metric {
  value: string;
  description: string;
}

interface ChartProps {
    data: {
      category: string;
      value: number;
      lineValue: number;
    }[];
  }

const VisualGapAnalysis: React.FC = () => {
    const chartData: ChartProps["data"] = [
        { category: "Product", value: 60, lineValue: 80 },
        { category: "Service", value: 90, lineValue: 85 },
        { category: "Market", value: 50, lineValue: 70 },
        { category: "Digital", value: 80, lineValue: 88 },
      ];

  const metrics: Metric[] = [
    { value: "85%", description: "Market Coverage" },
    { value: "15%", description: "Growth Potential" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Visual Gap Analysis</h3>
      <BarSingleLineChart data={chartData} />
      <div className="flex justify-between mt-6 space-x-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex-1 bg-gray-50 rounded-lg shadow p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualGapAnalysis;
