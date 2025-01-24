import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDetails } from "react-icons/md";
import PieChartComponent from "./charts/PieChart";
import SourcesModal from "./common/SourcesModal";
import { SiCrowdsource } from "react-icons/si";
import UrlMetadataGrid from "./common/Sources/ShowAllSources";


type MarketShareCardProps = {
  title: string;
  subtitle: string;
  chartData: {
    labels: string[];
    dataValues: number[];
    colors: string[];
  };
  sources: string[];
  details: string[];
};

const MarketShareCard: React.FC<MarketShareCardProps> = ({
  title,
  subtitle,
  chartData,
  sources,
  details,
}) => {
  console.log(sources, details);
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-[hsl(var(--background))] rounded-md shadow-md w-full mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="mb-4 min-h-[20vh]">
        <PieChartComponent
          labels={chartData.labels}
          dataValues={chartData.dataValues}
          backgroundColors={chartData.colors}
        />
      </div>

      {/* Buttons */}
       {/* Sources */}
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
  );
};

export default MarketShareCard;
