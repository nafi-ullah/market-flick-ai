import React, { useState } from 'react'
import MarketShareCard from './MarketShareCardComponent'
import { MarketSharedetails, MarketSharedsources } from "@/data/DummyData";
import PricePositioningCard from './PricePositionCard';
import FeatureComparisonCard from './FeatureComparisonCard';
import MarketPositionMappingCard from './MarketPositionMappingCard';
import { createChartData } from '@/data/GraphDataMapping';


export type CompetitiorAnalysisGraphProps = {
   data: {
    key: string;
    data: any[];
    status: string;
   }  
};

const CompetitiorAnalysisGraph: React.FC<CompetitiorAnalysisGraphProps> = ({  data }) => {
  const chartData = createChartData(data.data);
  return (
    <div className="p-4 bg-[hsl(var(--accent))] rounded-md   my-6">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis Graph</h2>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       <MarketShareCard
        title="Market Share"
        subtitle="Q4 2023"
        chartData={chartData.pieData}
        sources={chartData.pieData.soures}
        details={MarketSharedetails}
      />
      <PricePositioningCard
        title="Price Positioning"
        subtitle="Relative Index"
        chartData={chartData.barChartData}
        sources={chartData.barChartData.soures}
        details={MarketSharedetails}
      />
       <FeatureComparisonCard
        title="Feature Comparison"
        subtitle="vs Industry"
        chartData={chartData.radarChartData}
        sources={chartData.radarChartData.soures}
        details={MarketSharedetails}
      />
       <MarketPositionMappingCard
        title="Market Position Mapping"
        subtitle="Growth vs Market Share"
        chartData={chartData.bubbleChartData}
        sources={chartData.bubbleChartData.soures}
        details={MarketSharedetails}
      />
      
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraph