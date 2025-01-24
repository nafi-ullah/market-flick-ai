import { parseMarketPlayerData } from '@/data/DataMapping';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import SourcesModal from './common/SourcesModal';
import { SiCrowdsource } from 'react-icons/si';
import UrlMetadataGrid from './common/Sources/ShowAllSources';



export interface CompetitorAnalysisTableProps {
  data: {
    key: string;
    data: {
      competitors: {
          company_name: string;
          valuation: string;
          money_raised: string;
          key_focus: string;
      }[];
      sources: string[];
    };
    status: string;
  };
}

const CompetitorAnalysisTable: React.FC<CompetitorAnalysisTableProps> = ({ data }) => {
  const {
    competitors,
    sources
  } = parseMarketPlayerData(data.data) ?? {
    competitors: [],
    sources: []
  }
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="max-w-7xl mx-auto p-6 bg-[hsl(var(--accent))] shadow-md rounded-md mt-5">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis & Market Players</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left  text-">
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Valuation</th>
              <th className="py-2 px-4">Money Raised</th>
              <th className="py-2 px-4">Key Focus</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((item, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="py-2 px-4">{item.company}</td>
                <td className="py-2 px-4">{item.valuation}</td>
                <td className="py-2 px-4">{item.money_raised}</td>
                <td className="py-2 px-4">{item.key_focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-start">
        <div
          className="flex items-center text-lg  py-2  rounded-md "
        >
          <SiCrowdsource className="mr-2" />
          Sources
        </div>
        <UrlMetadataGrid sources={sources} />
      </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTable;
