import React, { useState } from 'react'
import MarketShareCard from './MarketShareCardComponent'
import { MarketPositionMappingCardchartData, marketSharedData, MarketSharedetails, MarketSharedsources, PricePositioningChartData, FeatureComparisonChartData } from "@/data/DummyData";
import PricePositioningCard from './PricePositionCard';
import FeatureComparisonCard from './FeatureComparisonCard';
import MarketPositionMappingCard from './MarketPositionMappingCard';
import { createChartData } from '@/data/GraphDataMapping';


type MarketSizeAnalysisCardProps = {

  content: string;
  
};

const CompetitiorAnalysisGraph: React.FC<MarketSizeAnalysisCardProps> = ({  content }) => {
   const [chartData, setChartData]= useState(createChartData(content));
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis Graph</h2>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       <MarketShareCard
        title="Market Share"
        subtitle="Q4 2023"
        chartData={chartData.pieData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
      <PricePositioningCard
        title="Price Positioning"
        subtitle="Relative Index"
        chartData={chartData.barChartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
       <FeatureComparisonCard
        title="Feature Comparison"
        subtitle="vs Industry"
        chartData={chartData.radarChartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
       <MarketPositionMappingCard
        title="Market Position Mapping"
        subtitle="Growth vs Market Share"
        chartData={chartData.bubbleChartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
      
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraph