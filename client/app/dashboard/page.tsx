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
import CompetitorAnalysisTableSkeleton from "@/components/loaders/CompetitorAnalysisLoader";
import CompetitiorAnalysisGraphSkeleton from "@/components/loaders/CompetitorAnalysisGraphSkeleton";
import SWOTAnalysisSkeleton from "@/components/loaders/SwotAnalysisLoader";
import PASTELIAnalysisSkeleton from "@/components/loaders/PasteliAnalysisLoader";
import RoadmapComponentSkeleton from "@/components/loaders/RoadMapSkeleton";

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
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set());

  const streamDataKeys: {
    [K in keyof Props]: {
      component: React.FC<Props[K]>;
      loader: React.FC;
    };
  } = {
    knowledge_base: { component: MarkdownViewer, loader: ArticleSkeleton },
    market_size_data_points: {
      component: MarketSizeAnalysisCard,
      loader: MarketSizeAnalysisCardSkeleton,
    },
    market_player_table_data: {
      component: CompetitorAnalysisTable,
      loader: CompetitorAnalysisTableSkeleton,
    },
    competitors_chart_data: {
      component: CompetitiorAnalysisGraph,
      loader: CompetitiorAnalysisGraphSkeleton,
    },
    swot_analysis: {
      component: SWOTAnalysis,
      loader: SWOTAnalysisSkeleton,
    },
    pestali_analysis: {
      component: PASTELIAnalysis,
      loader: PASTELIAnalysisSkeleton,
    },
    roadmap: {
      component: RoadmapCard,
      loader: RoadmapComponentSkeleton,
    },
  };

  /**
   * Extracts the component and data for a given key if available.
   */
  function extractStreamData(
    obj: any
  ): { component: React.FC<{ data: any }>; data: any } | null {
    for (const [key, { component }] of Object.entries(streamDataKeys)) {
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

      {streamData.length > 0 && (
        <div className="mt-6 p-4 rounded-md">
          <div className="ml-5">
            {Object.keys(streamDataKeys).map((key) => {
              // Check if the key is in the loaded data
              const data = streamData.find((item) => item["key"] === key);
              const { component: Component, loader: Loader } =
                streamDataKeys[key as keyof Props];

              return (
                <div key={key} className="mb-3">
                  {data ? (
                    // Render the component when data is available
                    <Component
                      data={data}
                      onLoad={() => {
                        setLoadedKeys((prev) => new Set(prev).add(key));
                      }}
                    />
                  ) : (
                    // Render the loader when data is not available
                    <Loader />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}