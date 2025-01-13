import React from "react";
import { BiPointer } from "react-icons/bi";
import { FaArrowUp, FaLink, FaTachometerAlt, FaMobileAlt, FaPen } from "react-icons/fa";

const ActionableInsights: React.FC = () => {
  const seoRecommendations = [
    { text: "Optimize meta descriptions for 5 key pages", icon: <FaArrowUp className="text-orange-600" /> },
    { text: "Improve internal linking structure", icon: <FaLink className="text-orange-600" /> },
    { text: "Enhance page load speed", icon: <FaTachometerAlt className="text-orange-600" /> },
  ];

  const uxImprovements = [
    { text: "Optimize mobile navigation", icon: <FaMobileAlt className="text-purple-600" /> },
    { text: "Reduce checkout form fields", icon: <BiPointer className="text-purple-600" /> },
    { text: "Update CTA button contrast", icon: <FaPen className="text-purple-600" /> },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Actionable Insights</h3>

      {/* SEO Recommendations */}
      <div className="p-4 rounded-lg bg-yellow-50 mb-4">
        <h4 className="font-bold text-yellow-700 mb-2">SEO Recommendations</h4>
        <ul className="space-y-2">
          {seoRecommendations.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.icon}
              <span className="ml-2 text-gray-800">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* UX Improvements */}
      <div className="p-4 rounded-lg bg-purple-50">
        <h4 className="font-bold text-purple-700 mb-2">UX Improvements</h4>
        <ul className="space-y-2">
          {uxImprovements.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.icon}
              <span className="ml-2 text-gray-800">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActionableInsights;
