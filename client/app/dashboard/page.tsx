"use client";
import React, { useState } from "react";

import AdvancedWebAnalyticsSuite from "@/components/advancedanalytics/AdvancedWebAnalyticsSuite";
import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitiorAnalysisGraph, { CompetitiorAnalysisGraphProps } from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable, { CompetitorAnalysisTableProps } from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import FiveForceAnalysis from "@/components/FiveForceAnalysis";
import MarketGapAnalysis from "@/components/MarketGapAnalysis";
import MarketMixAnalysis from "@/components/MarketMixAnalysis";
import MarketSizeAnalysisCard, { MarketSizeAnalysisCardProps } from "@/components/MarketSizeAnalysisCard";
import MarketTrends from "@/components/MarketTrends";
import PASTELIAnalysis, { PASTELIAnalysisProps } from "@/components/PastelAnalysis";
import SevenSModel from "@/components/SevenModelComponent";
import StrategicInsigtsCard from "@/components/StrategicInsigts";
import SWOTAnalysis, { SWOTAnalysisProps } from "@/components/SWOTAnalysisCard";
import SWOTfullComponent from "@/components/SWOTfullComponent";
import { AIDAanalysisData,  SWOTanalysisData, sevenSData, streamDummyData } from "@/data/DummyData";
import MarkdownViewer, { MarkdownViewerProps } from "@/components/MarkdownComponent";

import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import MarketSizeAnalysisCardSkeleton from "@/components/loaders/MarketSizeAnlyzerLoader";
import IndividualLoader from "@/components/loaders/IndividualLoader";
import ArticleSkeleton from "@/components/loaders/ArticleSkeleton";
import StackedAnimatedLoader from "@/components/loaders/AiLoader";
import { RoadmapCard, RoadmapCardProps } from "@/components/RoadmapCard";

type Props = {
  "knowledge_base": MarkdownViewerProps;
  "market_size_data_points": MarketSizeAnalysisCardProps;
  "market_player_table_data": CompetitorAnalysisTableProps;
  "competitors_chart_data": CompetitiorAnalysisGraphProps;
  "swot_analysis": SWOTAnalysisProps;
  "pestali_analysis": PASTELIAnalysisProps;
  "roadmap": RoadmapCardProps;
};


export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);

  const streamDataKeys: {
    [K in keyof Props]: React.FC<Props[K]>;
  } = {
    "knowledge_base": MarkdownViewer,
    "market_size_data_points": MarketSizeAnalysisCard,
    "market_player_table_data": CompetitorAnalysisTable,
    "competitors_chart_data": CompetitiorAnalysisGraph,
    "swot_analysis": SWOTAnalysis,
    "pestali_analysis": PASTELIAnalysis,
    "roadmap": RoadmapCard,
  };

  /**
   * Given the entire chunk string, checks if it includes a known key
   * and if so, extracts the content that comes after the key.
   */
  function extractStreamData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): { component: React.FC<{ data: any }>; data: any } | null {
      for (const [key, component] of Object.entries(streamDataKeys)) {
        if (key === obj["key"]) { 
          return { component, data: obj };
        }
      }
      return null;
    }
  

  return (
    <div className="font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
      
      {/* Form that updates streamData */}
      <BusinessAnalysisForm setStreamData={setStreamData} />

      {/* We only show the container if there's at least one piece of data,
          but you can remove this check if you want to show loaders from the start */}
      {streamData.length > 0 && (
        <div className="mt-6 p-4 rounded-md">
          <div className="ml-5">
            {/* 
              1) We iterate over each key in `streamDataKeys`.
              2) Check if that key exists in `streamData`.
              3) If it exists, render the extracted content. Otherwise show a loader.
            */}
            {streamData.map((data) => {
                // Extract that chunk's content
                const extracted = extractStreamData(data);
                if (extracted) {
                  return (
                    <div key={data["key"]} className="mb-3">
                      <extracted.component data={extracted.data} />
                    </div>
                  );
                }
            })}
          </div>
        </div>
      )}
    
    </div>
  );
}