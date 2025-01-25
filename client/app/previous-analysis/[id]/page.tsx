"use client";
import React, { useEffect, useState } from "react";
import CompetitiorAnalysisGraph, {
  CompetitiorAnalysisGraphProps,
} from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable, {
  CompetitorAnalysisTableProps,
} from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import MarketSizeAnalysisCard, {
  MarketSizeAnalysisCardProps,
} from "@/components/MarketSizeAnalysisCard";
import MarkdownViewer, {
  MarkdownViewerProps,
} from "@/components/MarkdownComponent";
import ResponseContentViewer from "@/components/common/ResponseContentViewer";
import ShowNothing from "@/components/common/ShowNothing";
import { useParams } from "next/navigation";
import { BACKENDURL } from "@/utils/constants";
import ArticleSkeleton from "@/components/loaders/ArticleSkeleton";
import MarketShareCardSkeleton from "@/components/loaders/MarketShareSkeleton";
import CompetitorAnalysisTableSkeleton from "@/components/loaders/CompetitorAnalysisLoader";
import { RoadmapCard, RoadmapCardProps } from "@/components/RoadmapCard";
import SWOTAnalysis, { SWOTAnalysisProps } from "@/components/SWOTAnalysisCard";
import PASTELIAnalysis, {
  PASTELIAnalysisProps,
} from "@/components/PastelAnalysis";
import { BsWechat } from "react-icons/bs";
import CascadeModal from "@/components/chat/CascadeModal";
import MarketSizeAnalysisCardSkeleton from "@/components/loaders/MarketSizeAnlyzerLoader";
import CompetitiorAnalysisGraphSkeleton from "@/components/loaders/CompetitorAnalysisGraphSkeleton";
import SWOTAnalysisSkeleton from "@/components/loaders/SwotAnalysisLoader";
import PASTELIAnalysisSkeleton from "@/components/loaders/PasteliAnalysisLoader";
import RoadmapComponentSkeleton from "@/components/loaders/RoadMapSkeleton";
import { useAnalysisDataContext } from "@/context/AnalysisContext";
import GoogleMapComponent from "@/components/features/HeatMap";

type ComponentReloaderState = {
  needReload: boolean;
  components: string[];
};

interface StreamDataMapping {
  [key: string]: {
    component: React.FC<any>;
    loader: React.FC<any>;
  };
}

const streamDataMapping: StreamDataMapping = {
  knowledge_base: {
    component: MarkdownViewer,
    loader: ArticleSkeleton,
  },
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

const important_keys = [
  { key: "knowledge_base", value: "Market Analysis Report" },
  { key: "market_size_data_points", value: "Market Size Analysis" },
  { key: "market_player_table_data", value: "Competitors Table" },
  { key: "competitors_chart_data", value: "Competitor Analysis Graph" },
  { key: "swot_analysis", value: "SWOT Analysis" },
  { key: "pestali_analysis", value: "Pestali Analysis" },
  { key: "roadmap", value: "Roadmap" },
];

export default function Home() {
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [streamData, setStreamData] = useState<any[]>([]);
  const { setCurrentBasicInfoId } = useAnalysisDataContext();
  // Which components are currently reloading
  const [loadingComponents, setLoadingComponents] = useState<string[]>([]);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [componentReloader, setComponentReloader] =
    useState<ComponentReloaderState>({
      needReload: false,
      components: [],
    });

  const [chatHistory, setChatHistory] = useState<[string, string][]>([]); // Store API response chat_history
  const [inputValues, setInputValues] = useState<string[]>([]); // Store user input strings
  const [outputValues, setOutputValues] = useState<string[]>([]);

  const [selectedTabs, setSelectedTabs] = useState<string[]>(["All"]);

  const handleTabClick = (tabKey: string) => {
    // If user clicks on "All"
    if (tabKey === "All") {
      setSelectedTabs(["All"]);
      return;
    }
    // Otherwise, remove "All" if it is currently selected
    let newSelectedTabs = [...selectedTabs];
    if (newSelectedTabs.includes("All")) {
      newSelectedTabs = [];
    }

    // Toggle the tabKey
    if (newSelectedTabs.includes(tabKey)) {
      // If it's already selected, unselect it
      newSelectedTabs = newSelectedTabs.filter((key) => key !== tabKey);
      // If this leaves no tabs selected, revert to "All"
      if (newSelectedTabs.length === 0) {
        newSelectedTabs = ["All"];
      }
    } else {
      // Otherwise, select it
      newSelectedTabs.push(tabKey);
    }

    setSelectedTabs(newSelectedTabs);
  };

  const getValueFromKey = (key: string): string | undefined => {
    const foundItem = important_keys.find((item) => item.key === key);
    return foundItem?.value;
  };
  const dataToDisplay = selectedTabs.includes("All")
    ? streamData
    : streamData.filter((d) => selectedTabs.includes(d.key));

  const dummyCoordinates = [
    { lat: 23.810331, lng: 90.412521, name: "Dhaka" }, // Dhaka Division
    { lat: 22.347536, lng: 91.812332, name: "Chattogram" }, // Chattogram Division
    { lat: 24.363589, lng: 88.624135, name: "Rajshahi" }, // Rajshahi Division
    { lat: 24.89493, lng: 91.868706, name: "Sylhet" }, // Sylhet Division
    { lat: 22.845641, lng: 89.540327, name: "Khulna" }, // Khulna Division
  ];

  const dummyDumpFills = [30, 50, 90, 70, 20];

  // Helper to extract the right component + loader + data
  function extractStreamData(obj: any): {
    component: React.FC<{ data: any }>;
    loader: React.FC;
    data: any;
  } | null {
    const mappingEntry = streamDataMapping[obj.key];
    if (mappingEntry) {
      return {
        component: mappingEntry.component,
        loader: mappingEntry.loader,
        data: obj,
      };
    }
    return null;
  }

  // 1) Initial fetch for the entire dataset
  useEffect(() => {
    if (!id) return;
    const knowledge_base_id = id;
    setCurrentBasicInfoId(id);
    fetch(`${BACKENDURL}/previous-analysis/${knowledge_base_id}`, {
      method: "POST",
      body: JSON.stringify({ knowledge_base_id }),
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
          const chunkStr = decoder.decode(value);
          console.log("~~~ chunk", chunkStr);

          // handle chunk boundaries if needed:
          const splitted = chunkStr.split("}{");
          splitted.forEach((chunk, index) => {
            if (splitted.length === 1) {
              chunks.push(chunk);
            } else if (index === 0) {
              chunks.push(`${chunk}}`);
            } else if (index === splitted.length - 1) {
              chunks.push(`{${chunk}`);
            } else {
              chunks.push(`{${chunk}}`);
            }
          });
        }

        const chunks_json = chunks
          .map((chunk) => {
            try {
              return JSON.parse(chunk);
            } catch (error) {
              console.error("Error parsing JSON:", error, chunk);
              return null;
            }
          })
          .filter(Boolean);

        setStreamData(chunks_json);
      })
      .catch((error) => console.error("Error streaming data:", error));

    // Show chat only if ID is available
    setShowChat(id && id.length > 0);
  }, [id]);

  // 2) Partial reload effect
  useEffect(() => {
    if (!componentReloader.needReload || !id) return;
    const { components: keysToReload } = componentReloader;
    if (!keysToReload || keysToReload.length === 0) return;

    async function fetchPartialData() {
      try {
        // Mark these components as reloading
        setLoadingComponents(keysToReload);

        // Example: pass the keys to your backend for partial fetch
        const response = await fetch(`${BACKENDURL}/previous-analysis/${id}`, {
          method: "POST",
          body: JSON.stringify({
            knowledge_base_id: id,
            reloadKeys: keysToReload,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to partially fetch data");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const chunks: string[] = [];

        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value);
          console.log("~~~ partial chunk", chunkStr);

          const splitted = chunkStr.split("}{");
          splitted.forEach((chunk, index) => {
            if (splitted.length === 1) {
              chunks.push(chunk);
            } else if (index === 0) {
              chunks.push(`${chunk}}`);
            } else if (index === splitted.length - 1) {
              chunks.push(`{${chunk}`);
            } else {
              chunks.push(`{${chunk}}`);
            }
          });
        }

        const chunks_json = chunks
          .map((chunk) => {
            try {
              return JSON.parse(chunk);
            } catch (error) {
              console.error("Error parsing JSON:", error, chunk);
              return null;
            }
          })
          .filter(Boolean);

        // Update only the reloaded components in existing streamData
        setStreamData((prevData) => {
          const updatedData = [...prevData];
          chunks_json.forEach((newChunk) => {
            const idx = updatedData.findIndex((d) => d.key === newChunk.key);
            if (idx !== -1) {
              updatedData[idx] = newChunk;
            } else {
              updatedData.push(newChunk);
            }
          });
          return updatedData;
        });
      } catch (error) {
        console.error("Error during partial fetch:", error);
      } finally {
        // Clear loading state and reset the reloader
        setLoadingComponents([]);
        setComponentReloader({ needReload: false, components: [] });
      }
    }

    fetchPartialData();
  }, [componentReloader, id]);

  // Toggle Chatbot
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  // Render
  return (
    <div className="relative font-[family-name:var(--font-geist-sans)] bg-[hsl(var(--background))]">
      <div className="flex w-full">
        <div
          style={{
            width: isChatbotOpen ? "75%" : "100%",
            margin: isChatbotOpen ? "0" : "auto", // Use undefined instead of an empty string
          }}
        >
          <Navbar />
          <div className="flex flex-wrap items-center gap-2 px-4 pt-4 text-lg mt-20 mx-aut justify-center">
            {/* "All" tab */}
            <button
              onClick={() => handleTabClick("All")}
              className={
                selectedTabs.includes("All")
                  ? "px-3 py-1 rounded bg-indigo-500 text-[hsl(var(--foreground))]"
                  : "px-3 py-1 rounded bg-[hsl(var(--accent))] text-indigo-500 hover:bg-indigo-700 hover:text-[hsl(var(--foreground))]"
              }
            >
              All
            </button>

            {Object.keys(streamDataMapping).map((key) => {
              const isSelected =
                selectedTabs.includes(key) || selectedTabs.includes("All");
              return (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  className={
                    isSelected
                      ? "px-3 py-1 rounded bg-indigo-500 text-[hsl(var(--foreground))]"
                      : "px-3 py-1 rounded bg-[hsl(var(--accent))] text-indigo-500 hover:bg-indigo-700 hover:text-[hsl(var(--foreground))]"
                  }
                >
                  {getValueFromKey(key)}
                </button>
              );
            })}
          </div>

          {dataToDisplay.length > 0 ? (
            <div className="mt-6 p-4 rounded-md">
              <div className="ml-5">
                {dataToDisplay.map((obj) => {
                  const extracted = extractStreamData(obj);
                  if (!extracted) return null;

                  const {
                    component: Component,
                    loader: Loader,
                    data,
                  } = extracted;
                  const thisKey = data.key;

                  // If this component is currently being reloaded, show the skeleton
                  if (loadingComponents.includes(thisKey)) {
                    return (
                      <div key={thisKey} className="mb-1 max-w-7xl mx-auto">
                        <Loader />
                      </div>
                    );
                  }
                  // Otherwise, show the actual component
                  return (
                    <div key={thisKey} className="mb-1 max-w-7xl mx-auto">
                      <Component data={data} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Initial full-page skeleton if there's no data yet */
            <div className="mt-6 mx-auto p-4 rounded-md px-10 flex flex-col gap-4 max-w-7xl">
              <ArticleSkeleton />
              <CompetitorAnalysisTableSkeleton />
              <div className="grid grid-cols-3 w-full">
                <MarketSizeAnalysisCardSkeleton />
                <MarketSizeAnalysisCardSkeleton />
                <MarketSizeAnalysisCardSkeleton />
              </div>
            </div>
          )}
        </div>

        {/* <div className="max-w-7xl mx-auto min-h-[700px]">
      <GoogleMapComponent coordinates={dummyCoordinates} dumpFills={dummyDumpFills} />
    </div> */}

        {/* Floating chat button */}
        {showChat && (
          <div
            className="fixed bottom-6 right-6 bg-indigo-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-indigo-600 transition"
            onClick={toggleChatbot}
          >
            <BsWechat size={24} />
          </div>
        )}

        {/* Conditionally render Cascade Modal */}
        {isChatbotOpen && (
          <CascadeModal
            onClose={() => {
              setIsChatbotOpen(false);
            }}
            knowledge_id={id}
            setComponentReloader={setComponentReloader}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            inputValues={inputValues}
            setInputValues={setInputValues}
            outputValues={outputValues}
            setOutputValues={setOutputValues}
          />
        )}
      </div>
    </div>
  );
}
