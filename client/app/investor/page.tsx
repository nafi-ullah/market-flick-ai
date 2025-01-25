"use client";
import { useEffect, useState } from "react";
 // Assuming this is your custom hook
import { BACKENDURL } from "@/utils/constants";
import { useAnalysisDataContext } from "@/context/AnalysisContext";
import { Typography } from "@mui/material";
import TypingDisplay from "@/components/features/TypingDisplay";

export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);
  
  const [analyseId, setAnalyseId] = useState("");
  const [showLog, setShowLog] = useState(false);

  const { analysisData, setAnalysisData } = useAnalysisDataContext();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

 // Replace with your backend URL

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  useEffect(() => {
    fetch(`${BACKENDURL}/analyses`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.analyses
          .filter((analysis: any) => analysis && analysis["basic_info"])
          .map((analysis: any) => ({
            basic_info_id: analysis.basic_info_id,
            basic_info: analysis.basic_info,
          }));
        setAnalysisData(filteredData);
      })
      .catch((error) => console.error("Error fetching analyses:", error));
  }, [setAnalysisData]);

  const handleGetInvestorData = (investorid: string) => {
    if (investorid) {
      setShowLog(true);
          fetch(`${BACKENDURL}/investor-analysis/${investorid}`, {
            method: "POST",
            body: JSON.stringify({ investorid }),
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
                if (done) {
                    console.log("I am finished"); // Log when streaming ends
                    break;
                  }
                const chunkStr = decoder.decode(value);
                // console.log("~~~ chunk", chunkStr);
                setStreamData((prev) => [...prev, chunkStr]);
      
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
            })}
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] pt-24 w-full">
      {!showLog && (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4 max-w-7xl mx-auto text-center">
            Analysis Investor
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {analysisData.map(({ basic_info_id, basic_info }) => (
              <div
                onClick={() => {
                  handleGetInvestorData(basic_info_id);
                }}
                key={basic_info_id}
                className="border rounded-lg p-4 shadow-md bg-[hsl(var(--accent))] hover:bg-indigo-950 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {truncateText(basic_info.title, 30)}
                </h2>
                <p className="text-gray-400 mb-1">
                  <strong>Idea:</strong>{" "}
                  {truncateText(basic_info.business_idea, 30)}
                </p>
                <p className="text-gray-400 mb-1">
                  <strong>Sector:</strong>{" "}
                  {truncateText(basic_info.business_sector, 30)}
                </p>
                <p className="text-gray-400">
                  <strong>Location:</strong>{" "}
                  {truncateText(basic_info.business_location, 30)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
     {showLog && (
  <div className="p-4 max-w-7xl mx-auto">
    {streamData.length === 0 ? (
      <p>No data yet...</p>
    ) : (
      <div
      className="border-l-2 border-gray-400 text-gray-400"
        style={{
          maxHeight: "600px", // Set the fixed height for the container
          overflowY: "auto", // Enable vertical scrolling
         
          padding: "1rem", // Optional: Add some padding inside the scrollable area
        
        }}
        ref={(el) => {
          if (el) {
            // Auto-scroll to the bottom as new data arrives
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {streamData.map((chunk, idx) => (
          <div key={idx}>{chunk}</div> // Display each chunk
        ))}
      </div>
    )}
  </div>
)}

    </div>
  );
}
