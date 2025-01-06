import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import LineChartComponent from "./charts/LineChart";

type MarketSizeAnalysisCardProps = {
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
};

const MarketSizeAnalysisCard: React.FC<MarketSizeAnalysisCardProps> = ({ title, subtitle, chartData, sources }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <LineChartComponent labels={chartData.labels} datasets={chartData.datasets} />
      </div>

      {/* Sources */}
      <div className="flex justify-end">
        <button className="flex items-center text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          <FaInfoCircle className="mr-2" />
          Sources
        </button>
      </div>
    </div>
  );
};

export default MarketSizeAnalysisCard;
