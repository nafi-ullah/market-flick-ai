"use client"; 
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAnalysisDataContext } from "../context/AnalysisDataContext";
import Navbar from "../components/Navbar";
import MarkdownViewer from "../components/MarkdownViewer";
import ArticleSkeleton from "../components/skeletons/ArticleSkeleton";
import MarketSizeAnalysisCard from "../components/MarketSizeAnalysisCard";
import MarketSizeAnalysisCardSkeleton from "../components/skeletons/MarketSizeAnalysisCardSkeleton";
import CompetitorAnalysisTable from "../components/CompetitorAnalysisTable";
import CompetitorAnalysisTableSkeleton from "../components/skeletons/CompetitorAnalysisTableSkeleton";
import CompetitiorAnalysisGraph from "../components/CompetitorAnalysisGraph";
import CompetitiorAnalysisGraphSkeleton from "../components/skeletons/CompetitorAnalysisGraphSkeleton";
import SWOTAnalysis from "../components/SWOTAnalysis";
import SWOTAnalysisSkeleton from "../components/skeletons/SWOTAnalysisSkeleton";
import PASTELIAnalysis from "../components/PASTELIAnalysis";
import PASTELIAnalysisSkeleton from "../components/skeletons/PASTELIAnalysisSkeleton";
import RoadmapCard from "../components/RoadmapCard";
import RoadmapComponentSkeleton from "../components/skeletons/RoadmapComponentSkeleton";
import { useAuth } from "@/hooks/useAuth";

const BACKENDURL = "YOUR_BACKEND_URL"; // replace with your actual BACKENDURL

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

export default function Home() {
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [streamData, setStreamData] = useState<any[]>([]);
  const { setCurrentBasicInfoId } = useAnalysisDataContext();
    const { user} = useAuth();
  
  // Keep track of which components are currently being reloaded
  const [loadingComponents, setLoadingComponents] = useState<string[]>([]);
  
  // This state triggers partial reloads
  const [componentReloader, setComponentReloader] = useState<ComponentReloaderState>({
    needReload: false,
    components: [],
  });

  // ---- New: Tab selection (filtering) state ----
  // By default, "All" is selected
  const [selectedTabs, setSelectedTabs] = useState<string[]>(["All"]);

  // Helper to extract the right component + loader + data
  function extractStreamData(
    obj: any
  ): { component: React.FC<{ data: any }>; loader: React.FC; data: any } | null {
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

  // ------------------- Tab Handling Logic -------------------  
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

  // Determine which data to show
  const dataToDisplay = selectedTabs.includes("All")
    ? streamData
    : streamData.filter((d) => selectedTabs.includes(d.key));

  // 1) Initial fetch for the entire dataset
  useEffect(() => {
    if (!id || !user) return;
    setCurrentBasicInfoId(id);
    
    fetch(`${BACKENDURL}/previous-analysis/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user._id }), 
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
    setShowChat(!!id);
  }, [id, setCurrentBasicInfoId]);

  // 2) Partial reload effect
  useEffect(() => {
    if (!componentReloader.needReload || !id || !user) return;
    const { components: keysToReload } = componentReloader;
    if (!keysToReload || keysToReload.length === 0) return;

    async function fetchPartialData() {
      try {
        // Mark these components as reloading
        setLoadingComponents(keysToReload);

        const response = await fetch(`${BACKENDURL}/previous-analysis/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user?._id ?? '' }), 
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

  // Render
  return (
    <div className="relative font-[family-name:var(--font-geist-sans)] bg-[hsl(var(--background))]">
      <Navbar />

      {/* Tabs for filtering */}
      <div className="flex flex-wrap items-center gap-2 px-4 pt-4">
        {/* "All" tab */}
        <button
          onClick={() => handleTabClick("All")}
          className={
            selectedTabs.includes("All")
              ? "px-3 py-1 rounded bg-blue-500 text-white"
              : "px-3 py-1 rounded bg-white text-blue-500 hover:bg-blue-100"
          }
        >
          All
        </button>

        {/* Individual component tabs */}
        {Object.keys(streamDataMapping).map((key) => {
          const isSelected = selectedTabs.includes(key) || selectedTabs.includes("All");
          return (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={
                isSelected
                  ? "px-3 py-1 rounded bg-blue-500 text-white"
                  : "px-3 py-1 rounded bg-white text-blue-500 hover:bg-blue-100"
              }
            >
              {key}
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

              const { component: Component, loader: Loader, data } = extracted;
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
        // Initial full-page skeleton if there's no data yet OR no tabs selected
        <div className="mt-6 p-4">
          {/* You can place any full-page skeleton or message here */}
          <p className="text-gray-500">Loading or no data available...</p>
        </div>
      )}
    </div>
  );
}
