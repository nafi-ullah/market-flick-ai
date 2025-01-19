import React, {  useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import LineChartComponent from "./charts/LineChart";
import { parseMarketSizeData } from "@/data/DataMapping";
import SourcesModal from "./common/SourcesModal";

export type MarketSizeAnalysisCardProps = {
  data: {
    key: string;
    data: {
      sources: string[];
      data_points: {
        point_date: string;
        tam: number;
        sam: number;
        som: number;
      }[];
    };
    status: string;
  };
};

const MarketSizeAnalysisCard: React.FC<MarketSizeAnalysisCardProps> = ({ data }) => {
  const {
    chartData,
    sources
  } = parseMarketSizeData(data.data) ?? {
    chartData: {
      labels: [],
      datasets: []
    },
    sources: []
  }

  console.log({chartData, sources});

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-7xl mx-auto">
      Header
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Market Size Analysis</h2>
        <p className="text-sm text-gray-500">TAM, SAM, SOM</p>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <LineChartComponent labels={chartData.labels} datasets={chartData.datasets} />
      </div>

      {/* Sources */}
      <div className="flex justify-end">
        <button 
         onClick={handleOpenModal}
        className="flex items-center text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          <FaInfoCircle className="mr-2" />
          Sources
        </button>
      </div>
      {isModalOpen && <SourcesModal handleClose={handleCloseModal} sources={sources} />}
    </div>
  );
};

export default MarketSizeAnalysisCard;
