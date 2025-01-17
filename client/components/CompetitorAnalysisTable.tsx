import { parseMarketPlayerData } from '@/data/DataMapping';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import SourcesModal from './common/SourcesModal';



interface CompetitorAnalysisTableProps {
  content: string;

}

const CompetitorAnalysisTable: React.FC<CompetitorAnalysisTableProps> = ({ content }) => {
   const [analysis_data]= useState(parseMarketPlayerData(content));
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
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
            {analysis_data.competitors.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.valuation}</td>
                <td className="py-2 px-4">{item.money_raised}</td>
                <td className="py-2 px-4">{item.key_focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button 
          onClick={handleOpenModal}
          className="flex items-center text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <FaInfoCircle className="mr-2" />
            Sources
          </button>
        </div>
        {isModalOpen && <SourcesModal handleClose={handleCloseModal} sources={analysis_data.sources} />}
      </div>
    </div>
  );
};

export default CompetitorAnalysisTable;
