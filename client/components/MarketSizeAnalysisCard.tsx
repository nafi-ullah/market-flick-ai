import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import LineChartComponent from "./charts/LineChart";
import { parseMarketSizeData } from "@/data/DataMapping";
import SourcesModal from "./common/SourcesModal";
import UrlMetadataGrid from "./common/Sources/ShowAllSources";
import { SiCrowdsource } from "react-icons/si";

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
  const { chartData, sources } = parseMarketSizeData(data.data) ?? {
    chartData: {
      labels: [],
      datasets: [],
    },
    sources: [],
  };

  console.log({ chartData, sources });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="p-6 bg-[hsl(var(--accent))] rounded-md shadow-md max-w-7xl mx-auto"
      initial={{ x: "50%", opacity: 0 }} // Start off-screen to the left
      animate={{ x: 0, opacity: 1 }} // Move into view
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Market Size Analysis</h2>
        <p className="text-sm text-[hsl(var(--foreground))]">TAM, SAM, SOM</p>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <LineChartComponent labels={chartData.labels} datasets={chartData.datasets} />
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
      
    </motion.div>
  );
};

export default MarketSizeAnalysisCard;
