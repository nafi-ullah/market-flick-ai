import React from "react";
import { FaGoogle, FaCode } from "react-icons/fa";

const IntegrationHub: React.FC = () => {
  const integrations = [
    {
      name: "Google Analytics",
      status: "Connected",
      icon: <FaGoogle className="text-gray-500" />,
      textColor: "text-green-600",
    },
    {
      name: "API Access",
      status: "v2.1 View Docs",
      icon: <FaCode className="text-gray-500" />,
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Integration Hub</h3>
      <ul className="space-y-4">
        {integrations.map((integration, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              {integration.icon}
              <span className="text-gray-800">{integration.name}</span>
            </div>
            <span className={`font-bold ${integration.textColor}`}>{integration.status}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg">
        Manage Integrations
      </button>
    </div>
  );
};

export default IntegrationHub;
