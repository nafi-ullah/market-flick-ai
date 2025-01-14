"use client";
import React, { useEffect, useState } from "react";

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
import MarkdownViewer from "@/components/MarkdownComponent";
import { parseMarketSizeData } from "@/data/DataMapping";
import ResponseContentViewer from "@/components/common/ResponseContentViewer";

export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);

  const streamDataKeys = {
    "Analyzing Business Idea:": ResponseContentViewer,
    "Node: market_size_report": MarkdownViewer,
    "Node: market_size_graph": MarketSizeAnalysisCard,
    "Node: competitors_table": CompetitorAnalysisTable,
    "Node: generate_competitors_chart": CompetitiorAnalysisGraph,
    
  };
  
  function extractStreamData(inputString: string): { component: React.FC<any>, content: string } | null {
    for (const [key, component] of Object.entries(streamDataKeys)) {
      const matchIndex = inputString.indexOf(key);
      if (matchIndex !== -1) {
        // Extract content starting after the key
        const content = inputString.slice(matchIndex + key.length).trim();
        return { component, content };
      }
    }
    return null; // Return null if no match is found
  }

  useEffect(()=>{
    console.log(streamData);
  },[streamData])
  
  

  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
      <BusinessAnalysisForm setStreamData={setStreamData}/>
      {streamData.length > 0 && (
        <div className="mt-6 p-4 rounded-md ">
          
          <div className=" ml-5">
            {streamData.map((data, index) => {
              const extracted = extractStreamData(data);
              if (extracted) {
                const { component: Component, content } = extracted;
                return (
                  <div key={index} className="mb-1">
                    <Component content={content} />
                  </div>
                );
              }
              return (
                <li key={index} className="mb-1">
                  {data}
                </li>
              );
            })}
          </div>
        </div>
      )}
     
      {/* <MarketSizeAnalysisCard
      
        content={parseMarketSizeData(content)}
       
      /> */}
      {/* <CompetitorAnalysisTable analysis_data={analysis_data} /> */}
      {/* <CompetitiorAnalysisGraph/> */}
      <SWOTAnalysis swot_data={SWOTanalysisData}/>
      
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
