import React from "react";

const PersonalizationEngine: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Personalization Engine</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>User Segments</span>
          <span className="font-bold">12</span>
        </li>
        <li className="flex justify-between">
          <span>Content Variants</span>
          <span className="font-bold">8</span>
        </li>
        <li className="flex justify-between">
          <span>Personalization Rate</span>
          <span className="text-green-600 font-bold">85%</span>
        </li>
      </ul>
      <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
        AI-Powered Recommendations Active
      </div>
    </div>
  );
};

export default PersonalizationEngine;
