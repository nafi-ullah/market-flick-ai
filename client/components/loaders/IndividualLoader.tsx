import React from "react";
import MarketSizeAnalysisCardSkeleton from "./MarketSizeAnlyzerLoader";
import ArticleSkeleton from "./ArticleSkeleton";
import CompetitorAnalysisTableSkeleton from "./CompetitorAnalysisLoader";
import CompetitiorAnalysisGraphSkeleton from "./CompetitorAnalysisGraphSkeleton";

// Define the type for props
type LoaderProps = {
  label?: string;
};

// Import the loader components (ensure these are correct)


export default function IndividualLoader({ label }: LoaderProps) {
  // Map labels to components
  const componentKeys: { [key: string]: React.ElementType } = {
    "Analyzing Business Ideasss:": ArticleSkeleton,
    "Node: market_size_report": ArticleSkeleton,
    "Node: market_size_graph": MarketSizeAnalysisCardSkeleton,
    "Node: competitors_table": CompetitorAnalysisTableSkeleton,
    "Node: generate_competitors_chart": CompetitiorAnalysisGraphSkeleton,
  };

  // Determine the appropriate loader component
  const LoaderComponent = label ? componentKeys[label] : null;

  return (
    <div className="py-2 px-4 border border-gray-200 rounded bg-gray-50 ">
      
      {LoaderComponent ? (
        <LoaderComponent />
      ) : (
        // Fallback content if no matching loader is found
        <div className="spinner">Loading...</div>
      )}
    </div>
  );
}
