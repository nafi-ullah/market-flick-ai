import React from "react";

const AutomatedReporting: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Automated Reporting</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Report Templates</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg">15</span>
        </li>
        <li className="flex justify-between">
          <span>Custom KPIs</span>
          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg">24</span>
        </li>
        <li className="flex justify-between">
          <span>Export Formats</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-lg">PDF, CSV, API</span>
        </li>
      </ul>
      <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg">
        Generate Report
      </button>
    </div>
  );
};

export default AutomatedReporting;
