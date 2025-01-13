import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const CompetitorBenchmarking: React.FC = () => {
  const benchmarks = [
    { title: "Market Position", value: "+12%", trend: "up" },
    { title: "Traffic Share", value: "+8%", trend: "up" },
    { title: "Conversion Rate", value: "-2%", trend: "down" },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <AiOutlineArrowUp className="text-green-500" />
    ) : (
      <AiOutlineArrowDown className="text-red-500" />
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Competitor Benchmarking</h3>
      <ul className="space-y-2">
        {benchmarks.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.title}</span>
            <span className="flex items-center">
              <span className={`font-bold ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {item.value}
              </span>
              {getTrendIcon(item.trend)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompetitorBenchmarking;
