"use client";
import React, { useEffect, useState } from "react";
import CompetitiorAnalysisGraph from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import MarketSizeAnalysisCard from "@/components/MarketSizeAnalysisCard";
import MarkdownViewer from "@/components/MarkdownComponent";
import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import { useParams } from "next/navigation";
import { BACKENDURL } from "@/utils/constants";
import ArticleSkeleton from "@/components/loaders/ArticleSkeleton";
import MarketShareCardSkeleton from "@/components/loaders/MarketShareSkeleton";
import CompetitorAnalysisTableSkeleton from "@/components/loaders/CompetitorAnalysisLoader";
import { RoadmapCard } from "@/components/RoadmapCard";
import SWOTAnalysis from "@/components/SWOTAnalysisCard";
import PASTELIAnalysis from "@/components/PastelAnalysis";

type Props = {
  "Analyzing Business Idea:": { content: string };
  "Node: market_size_report": { content: string };
  "Node: market_size_graph": { content: string };
  "Node: competitors_table": { content: string };
  "Node: generate_competitors_chart": { content: string };
  "Node: swot_analysis": { content: string };
  "Node: pestali_analysis": { content: string };
  "Node: roadmap": { content: string };
  "data: [DONE]": { content: string };
};

export default function Home() {
  const { id } = useParams();
  const [streamData, setStreamData] = useState<string[]>([]);

  const streamDataKeys: {
    [K in keyof Props]: React.FC<Props[K]>;
  } = {
    "Analyzing Business Idea:": ResponseContentViewer,
    "Node: market_size_report": MarkdownViewer,
    "Node: market_size_graph": MarketSizeAnalysisCard,
    "Node: competitors_table": CompetitorAnalysisTable,
    "Node: generate_competitors_chart": CompetitiorAnalysisGraph,
    "Node: swot_analysis": SWOTAnalysis,
    "Node: pestali_analysis": PASTELIAnalysis,
    "Node: roadmap": RoadmapCard,
    "data: [DONE]": ShowNothing,
  };
  
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
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      {streamData.length > 0 ? (
        <div className="mt-6 p-4 rounded-md">
          <div className="ml-5">
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
      ) : (
        <div className="mt-6 p-4 rounded-md px-10 flex flex-col gap-4 max-w-7xl">
           <ArticleSkeleton/>
           <CompetitorAnalysisTableSkeleton/>
           <MarketShareCardSkeleton/>
        </div>
      )}
    </div>
  );
}
