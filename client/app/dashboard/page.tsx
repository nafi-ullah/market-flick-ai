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
import { AIDAanalysisData,  SWOTanalysisData, sevenSData, streamDummyData } from "@/data/DummyData";
import MarkdownViewer from "@/components/MarkdownComponent";

import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import MarketSizeAnalysisCardSkeleton from "@/components/loaders/MarketSizeAnlyzerLoader";
import IndividualLoader from "@/components/loaders/IndividualLoader";
import ArticleSkeleton from "@/components/loaders/ArticleSkeleton";
import StackedAnimatedLoader from "@/components/loaders/AiLoader";
import { RoadmapCard } from "@/components/RoadmapCard";


type Props = {
  "Analyzing Business Idea:": { content: string };
  "Node: market_size_report": { content: string };
  "Node: market_size_graph": { content: string };
  "Node: competitors_table": { content: string };
  "Node: generate_competitors_chart": { content: string };
  "Node: swot_analysis_report": { content: string };
  "Node: pestali_analysis_report": { content: string };
  "Node: roadmap": { content: string };
  "data: [DONE]": { content: string };
};

export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);

  const streamDataKeys: {
    [K in keyof Props]: React.FC<Props[K]>;
  } = {
    "Node: market_size_report": MarkdownViewer,
    "Node: market_size_graph": MarketSizeAnalysisCard,
    "Node: competitors_table": CompetitorAnalysisTable,
    "Node: generate_competitors_chart": CompetitiorAnalysisGraph,
    "Node: swot_analysis_report": ResponseContentViewer,
    "Node: pestali_analysis_report": ResponseContentViewer,
    "Node: roadmap": RoadmapCard,
    "data: [DONE]": ShowNothing,
  };

  /**
   * Given the entire chunk string, checks if it includes a known key
   * and if so, extracts the content that comes after the key.
   */
  function extractStreamData(
    inputString: string
  ): { component: React.FC<{ content: string }>; content: string } | null {
    for (const [key, component] of Object.entries(streamDataKeys)) {
      const matchIndex = inputString.indexOf(key);
      if (matchIndex !== -1) {
        const content = inputString.slice(matchIndex + key.length).trim();
        return { component, content };
      }
    }
    return null; // Return null if no match is found
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
            {Object.entries(streamDataKeys).map(([key, Component]) => {
              // Find the first string in streamData that contains this key:
              const matchedString = streamData.find((chunk) =>
                chunk.includes(key)
              );

              if (matchedString) {
                // Extract that chunk's content
                const extracted = extractStreamData(matchedString);
                if (extracted) {
                  return (
                    <div key={key} className="mb-3">
                      <extracted.component content={extracted.content} />
                    </div>
                  );
                }
              }

              // If we reach here, we did not find content for this key => show loader
              return (
                <div key={key} className="mb-3">
                  <IndividualLoader label={key} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    
    </div>
  );
}