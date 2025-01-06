import React from 'react'
import MarketShareCard from './MarketShareCardComponent'
import { MarketPositionMappingCardchartData, analysis_data, marketSharedData, MarketSharedetails, MarketSharedsources, SWOTanalysisData, PricePositioningChartData, FeatureComparisonChartData } from "@/data/DummyData";
import PricePositioningCard from './PricePositionCard';
import FeatureComparisonCard from './FeatureComparisonCard';
import MarketPositionMappingCard from './MarketPositionMappingCard';
const CompetitiorAnalysisGraph = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis Graph</h2>
       <div className='grid grid-cols-2 gap-4'>
       <MarketShareCard
        title="Market Share"
        subtitle="Q4 2023"
        chartData={marketSharedData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
      <PricePositioningCard
        title="Price Positioning"
        subtitle="Relative Index"
        chartData={PricePositioningChartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
       <FeatureComparisonCard
        title="Feature Comparison"
        subtitle="vs Industry"
        chartData={FeatureComparisonChartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
       <MarketPositionMappingCard
        title="Market Position Mapping"
        subtitle="Growth vs Market Share"
        chartData={MarketPositionMappingCardchartData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
      
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraph