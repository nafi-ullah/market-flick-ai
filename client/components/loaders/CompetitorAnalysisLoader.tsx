import React from "react";

const CompetitorAnalysisTableSkeleton: React.FC = () => {
  return (
    <div className=" p-6 bg-white shadow-md rounded-md animate-pulse">
      <h2 className="text-xl font-bold mb-4 bg-gray-300 rounded h-6 w-2/3"></h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-700 border-white border-4 font-medium">
              <th className="py-2 my-2 px-4 bg-gray-300 border-white border-4 h-4 w-32 rounded"></th>
              <th className="py-2 my-2 px-4 bg-gray-300 border-white border-4 h-4 w-32 rounded"></th>
              <th className="py-2 my-2 px-4 bg-gray-300 border-white border-4 h-4 w-32 rounded"></th>
              <th className="py-2 my-2 px-4 bg-gray-300 border-white border-4 h-4 w-32 rounded"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-white border-4 my-2">
                <td className="py-2 my-2 border-white border-4 px-4 bg-gray-300 h-4 w-40 rounded"></td>
                <td className="py-2 my-2 px-4 border-white border-4 border-white border-4 bg-gray-300 h-4 w-32 rounded"></td>
                <td className="py-2 my-2 px-4 border-white border-4 bg-gray-300 h-4 w-32 rounded"></td>
                <td className="py-2 my-2 px-4 border-white border-4 bg-gray-300 h-4 w-48 rounded"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTableSkeleton;
