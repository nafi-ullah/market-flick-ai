import React from 'react'
import MarketShareCard from './MarketShareCardComponent'
import { AIDAanalysisData, analysis_data, marketSharedData, MarketSharedetails, MarketSharedsources, SWOTanalysisData, PricePositioningChartData } from "@/data/DummyData";
import PricePositioningCard from './PricePositionCard';
const CompetitiorAnalysisGraph = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis Graph</h2>
       <div className='grid grid-cols-2 '>
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
      
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraph