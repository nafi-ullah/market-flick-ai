"use client";
import React, { useEffect, useState } from "react";
import CompetitiorAnalysisGraph, { CompetitiorAnalysisGraphProps } from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable, { CompetitorAnalysisTableProps } from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import MarketSizeAnalysisCard, { MarketSizeAnalysisCardProps } from "@/components/MarketSizeAnalysisCard";
import MarkdownViewer, { MarkdownViewerProps } from "@/components/MarkdownComponent";
import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import { useParams } from "next/navigation";
import { BACKENDURL } from "@/utils/constants";
import ArticleSkeleton from "@/components/loaders/ArticleSkeleton";
import MarketShareCardSkeleton from "@/components/loaders/MarketShareSkeleton";
import CompetitorAnalysisTableSkeleton from "@/components/loaders/CompetitorAnalysisLoader";
import { RoadmapCard, RoadmapCardProps } from "@/components/RoadmapCard";
import SWOTAnalysis, { SWOTAnalysisProps } from "@/components/SWOTAnalysisCard";
import PASTELIAnalysis, { PASTELIAnalysisProps } from "@/components/PastelAnalysis";

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
  const { id } = useParams();
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

  useEffect(() => {
    const knowledge_base_id = id;
    fetch(`${BACKENDURL}/previous-analysis/${knowledge_base_id}`, {
      method: "POST",
      body: JSON.stringify({knowledge_base_id})
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch streaming data");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const chunks: string[] = [];

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunkstr = decoder.decode(value);
        console.log("~~~ chunk", chunkstr);
        const splitted_chunkstr = chunkstr.split("}{")
        splitted_chunkstr.forEach((chunk, index) => {
          if (splitted_chunkstr.length == 1) {
            chunks.push(chunk);
            return;
          }
          if (index === 0) {
            chunks.push(`${chunk}}`);
          } else if (index === splitted_chunkstr.length - 1) {
            chunks.push(`{${chunk}`);
          } else {
            chunks.push(`{${chunk}}`);
          }
        });
      }

      const chunks_json = chunks.map(chunk => {
        try {
          return JSON.parse(chunk);
        } catch (error) {
          console.error("Error parsing JSON:", error, chunk);
          return null;
        }
      }).filter(Boolean);

      console.log("~~~ chunks_json", chunks_json);

      setStreamData(chunks_json);
    })
    .catch(error => console.error("Error streaming data:", error));
  }, [id]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-[hsl(var(--background))]">
      <Navbar />
      {streamData.length > 0 ? (
        <div className="mt-6 p-4 rounded-md">
          <div className="ml-5">
            {streamData.map((data, index) => {
              const extracted = extractStreamData(data);
              if (extracted) {
                const { component: Component, data } = extracted;
              
                return (
                  <div key={data["key"]} className="mb-1">
                    <Component data={data} />
                  </div>
                );
              }
               
            })}
          </div>
        </div>
      ) : (
        <div className="mt-6 mx-auto p-4 rounded-md px-10 flex flex-col gap-4 max-w-7xl">
           <ArticleSkeleton/>
           <CompetitorAnalysisTableSkeleton/>
           <MarketShareCardSkeleton/>
        </div>
      )}
    </div>
  );
}
