import React from "react";
import { FaFilePdf, FaFileExcel, FaFileCsv } from "react-icons/fa";

const CustomReports: React.FC = () => {
  const integrations = [
    { name: "Market Research Tool", status: "Connected", icon: "📊" },
    { name: "CRM Data", status: "Connected", icon: "📁" },
    { name: "Analytics Platform", status: "Connect", icon: "📈" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Custom Reports</h3>
      
      {/* File Format Selection */}
      <div className="flex space-x-4 mb-6">
        <button className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-md shadow">
          <FaFilePdf />
          <span>PDF</span>
        </button>
        <button className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-md shadow">
          <FaFileExcel />
          <span>Excel</span>
        </button>
        <button className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md shadow">
          <FaFileCsv />
          <span>CSV</span>
        </button>
      </div>

      {/* Report Customization */}
      <div className="bg-gray-50 rounded-lg shadow p-4 mb-6">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Report Customization</h4>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="form-checkbox text-black" />
              <span>Gap Analysis Summary</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="form-checkbox text-black" />
              <span>Competitive Analysis</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="form-checkbox text-black" />
              <span>Strategic Recommendations</span>
            </label>
          </li>
        </ul>
        <button className="w-full bg-black text-white py-2 px-4 rounded-lg mt-4 flex items-center justify-center">
          <span>Generate Report</span>
        </button>
      </div>

      {/* Data Integration */}
      <div className="bg-gray-50 rounded-lg shadow p-4">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Data Integration</h4>
        <ul className="space-y-4">
          {integrations.map((integration, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{integration.icon}</span>
                <span>{integration.name}</span>
              </div>
              <span
                className={`text-sm font-bold ${
                  integration.status === "Connected"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {integration.status}
              </span>
            </li>
          ))}
        </ul>
        <button className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg mt-4">
          + Add New Integration
        </button>
      </div>
    </div>
  );
};

export default CustomReports;
