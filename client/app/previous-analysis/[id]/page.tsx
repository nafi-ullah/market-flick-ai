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
import { AIDAanalysisData,  SWOTanalysisData, sevenSData } from "@/data/DummyData";
import MarkdownViewer from "@/components/MarkdownComponent";

import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import { useParams } from "next/navigation";
import { BACKENDURL } from "@/utils/constants";

type Props = {
  "Analyzing Business Idea:": { content: string };
  "Node: market_size_report": { content: string };
  "Node: market_size_graph": { content: string };
  "Node: competitors_table": { content: string };
  "Node: generate_competitors_chart": { content: string };
  "data: [DONE]": { content: string };
};

export default function Home() {
  const { id } = useParams();
  console.log(id);
  const streamDataKeys: {
    [K in keyof Props]: React.FC<Props[K]>;
  } = {
    "Analyzing Business Idea:": ResponseContentViewer,
    "Node: market_size_report": MarkdownViewer,
    "Node: market_size_graph": MarketSizeAnalysisCard,
    "Node: competitors_table": CompetitorAnalysisTable,
    "Node: generate_competitors_chart": CompetitiorAnalysisGraph,
    "data: [DONE]": ShowNothing
  };
  
  function extractStreamData(
    inputString: string
  ): { component: React.FC<{ content: string }>; content: string } | null {
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


  // useEffect(()=>{
  //   console.log(streamData);
  // },[streamData])
  
 const [streamData, setStreamData] = useState<string[]>([]);

 useEffect(()=>{
  const knowledge_base_id = id;
  fetch(`${BACKENDURL}/previous-analysis/${knowledge_base_id}`, {
    method: "POST",
    body: JSON.stringify({knowledge_base_id})
  })
  .then(async (response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch streaming data");
    }

    console.log({response});
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    const chunks: string[] = [];

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      console.log('~~~', chunk)
      chunks.push(chunk);
    }

    setStreamData(chunks);
  })
  .catch(error => console.error("Error streaming data:", error))
 },[id])

  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
      {streamData.length > 0 && (
        <div className="mt-6 p-4 rounded-md ">
          
          <div className=" ml-5">
            {streamData.map((data, index) => {
              const extracted = extractStreamData(data);
              if (extracted) {
                const { component: Component, content } = extracted;
                console.log({content});
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
      {/* <SWOTAnalysis swot_data={SWOTanalysisData}/>
      
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
      <StrategicInsigtsCard/>
      <PASTELIAnalysis/>
      <SWOTfullComponent/>
      <FiveForceAnalysis/>
      <MarketMixAnalysis/>
      <MarketTrends/>
      <SevenSModel data={sevenSData} />
      <MarketGapAnalysis/>
      <AdvancedWebAnalyticsSuite/> */}
    </div>
  );
}
