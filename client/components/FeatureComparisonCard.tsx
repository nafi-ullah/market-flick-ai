import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDetails } from "react-icons/md";
import RadarChartComponent from "./charts/RadarChart";
import SourcesModal from "./common/SourcesModal";


type FeatureComparisonCardProps = {
  title: string;
  subtitle: string;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  sources: string[];
  details: string[];
};

const FeatureComparisonCard: React.FC<FeatureComparisonCardProps> = ({
  title,
  subtitle,
  chartData,
  sources,
  details,
}) => {
  console.log(sources, details)

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    }
  return (
    <div className="p-4 bg-[hsl(var(--background))] rounded-md shadow-md w-full mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="mb-4 min-h-[10vh]">
        <RadarChartComponent
          labels={chartData.labels}
          datasets={chartData.datasets}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
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

export default FeatureComparisonCard;
