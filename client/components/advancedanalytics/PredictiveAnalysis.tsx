import React from "react";

const PredictiveAnalytics: React.FC = () => {
  const predictions = [
    {
      title: "Forecasted Traffic",
      value: "+25%",
      description: "Next 30 days",
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Content Optimization",
      value: "75%",
      description: "",
      color: "bg-purple-50",
      barColor: "bg-purple-600",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Predictive Analytics</h3>
      <div className="space-y-4">
        {predictions.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg ${item.color}`}>
            <div className="flex justify-between">
              <span className="font-medium">{item.title}</span>
              <span className={`font-bold ${item.textColor || "text-gray-800"}`}>{item.value}</span>
            </div>
            {item.description && (
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            )}
            {!item.description && (
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className={`h-full rounded-full ${item.barColor}`}
                  style={{ width: item.value }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
