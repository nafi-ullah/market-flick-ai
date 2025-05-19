import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDetails } from "react-icons/md";
import BarChartComponent from "./charts/BarChart";
import SourcesModal from "./common/SourcesModal";
import { SiCrowdsource } from "react-icons/si";
import UrlMetadataGrid from "./common/Sources/ShowAllSources";


type PricePositioningCardProps = {
  title: string;
  subtitle: string;
  chartData: {
    labels: string[];
    dataValues: number[];
    color: string;
  };
  sources: string[];
  details: string[];
};

const PricePositioningCard: React.FC<PricePositioningCardProps> = ({
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
    <div className="p-4 bg-[hsl(var(--background))] rounded-md shadow-md w-full mx-auto flex flex-col justify-between">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="mb-4 min-h-[20vh]">
        <BarChartComponent
          labels={chartData.labels}
          dataValues={chartData.dataValues}
          backgroundColor={chartData.color}
        />
      </div>

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

export default PricePositioningCard;
