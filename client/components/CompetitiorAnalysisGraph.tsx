import React from 'react'
import MarketShareCard from './MarketShareCardComponent'
import { AIDAanalysisData, analysis_data, marketSharedData, MarketSharedetails, MarketSharedsources, SWOTanalysisData } from "@/data/DummyData";
const CompetitiorAnalysisGraph = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Competitor Analysis Graph</h2>
       <div>
       <MarketShareCard
        title="Market Share"
        subtitle="Q4 2023"
        chartData={marketSharedData}
        sources={MarketSharedsources}
        details={MarketSharedetails}
      />
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraph