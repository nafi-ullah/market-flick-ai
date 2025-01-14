"use client";
import React, { useState } from "react";

import AdvancedWebAnalyticsSuite from "@/components/advancedanalytics/AdvancedWebAnalyticsSuite";
import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitiorAnalysisGraph from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import FiveForceAnalysis from "@/components/FiveForceAnalysis";
import MarketGapAnalysis from "@/components/MarketGapAnalysis";
import MarketMixAnalysis from "@/components/MarketMixAnalysis";
import MarketSizeAnalysisCard from "@/components/MarketSizeAnalysisCard";
import MarketTrends from "@/components/MarketTrends";
import PASTELIAnalysis from "@/components/PastelAnalysis";
import SevenSModel from "@/components/SevenModelComponent";
import StrategicInsigtsCard from "@/components/StrategicInsigts";
import SWOTAnalysis from "@/components/SWOTAnalysisCard";
import SWOTfullComponent from "@/components/SWOTfullComponent";
import { AIDAanalysisData, analysis_data, MarketSizeAnalysisCardchartData, MarketSharedsources, SWOTanalysisData, sevenSData } from "@/data/DummyData";

export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);


  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
      {streamData.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">Analysis Results:</h2>
          <ul className="list-disc ml-5">
            {streamData.map((data, index) => (
              <li key={index} className="mb-1">
                {data}
              </li>
            ))}
          </ul>
        </div>
      )}
      <BusinessAnalysisForm setStreamData={setStreamData}/>
      <MarketSizeAnalysisCard
        title="Market Size Analysis"
        subtitle="TAM, SAM, SOM"
        chartData={MarketSizeAnalysisCardchartData}
        sources={MarketSharedsources}
      />
      <CompetitorAnalysisTable analysis_data={analysis_data} />
      <SWOTAnalysis swot_data={SWOTanalysisData}/>
      <CompetitiorAnalysisGraph/>
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
      <StrategicInsigtsCard/>
      <PASTELIAnalysis/>
      <SWOTfullComponent/>
      <FiveForceAnalysis/>
      <MarketMixAnalysis/>
      <MarketTrends/>
      <SevenSModel data={sevenSData} />
      <MarketGapAnalysis/>
      <AdvancedWebAnalyticsSuite/>
    </div>
  );
}
