import React from "react";

const Trends: React.FC = () => {
  const trendData = [
    { title: "Growth MoM", value: "+15%", color: "text-green-600" },
    { title: "Mobile Traffic", value: "68%", color: "text-black" },
    { title: "New Users", value: "+22%", color: "text-green-600" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Trends</h3>
      <ul className="space-y-2">
        {trendData.map((trend, index) => (
          <li key={index} className="flex justify-between">
            <span>{trend.title}</span>
            <span className={`font-bold ${trend.color}`}>{trend.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trends;
