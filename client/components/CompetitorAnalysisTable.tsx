import { parseMarketPlayerData } from '@/data/DataMapping';
import React, { useState } from 'react';



interface CompetitorAnalysisTableProps {
  content: string;

}

const CompetitorAnalysisTable: React.FC<CompetitorAnalysisTableProps> = ({ content }) => {
   const [analysis_data]= useState(parseMarketPlayerData(content));


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Competitor Analysis & Market Players</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-700 font-medium">
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Valuation</th>
              <th className="py-2 px-4">Money Raised</th>
              <th className="py-2 px-4">Key Focus</th>
            </tr>
          </thead>
          <tbody>
            {analysis_data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.valuation}</td>
                <td className="py-2 px-4">{item.money_raised}</td>
                <td className="py-2 px-4">{item.key_focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTable;
