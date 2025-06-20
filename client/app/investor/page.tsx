"use client";
import { useEffect, useState } from "react";
 // Assuming this is your custom hook
import { BACKENDURL } from "@/utils/constants";
import { useAnalysisDataContext } from "@/context/AnalysisContext";
import { Typography } from "@mui/material";
import TypingDisplay from "@/components/features/TypingDisplay";
import Navbar from "@/components/core/Navbar";
import { useAuth } from "@/hooks/useAuth";

interface InvestorData {
    name: string;
    type: string;
    linkedin: string;
    email: string;
    investments: number;
    sector: string;
    match_percentage: number;
    funding_range: string;
    investment_proposal: string;
  }



export default function Home() {
  const [streamData, setStreamData] = useState<string[]>([]);
  const [investors, setInvestors] = useState<InvestorData[] | null>(null);
  const [analyseId, setAnalyseId] = useState("");
  const [showLog, setShowLog] = useState(false);
const [showInvestors, setShowInvestors] = useState(false);
const [showLoader, setShowLoaders]= useState(false);
  const { analysisData, setAnalysisData } = useAnalysisDataContext();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
const {user} = useAuth();
 // Replace with your backend URL
 const fetchInvestorData = async (getid: string) => {
    try {
      const response = await fetch(`${BACKENDURL}/investor-profiles/${getid}`);
      const data: InvestorData[] = await response.json();
      setInvestors(data.investors); // Assuming the first object is the one we need
    } catch (error) {
      console.error("Error fetching investor data:", error);
    }
  };
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  useEffect(() => {
    fetch(`${BACKENDURL}/analyses?user_id=${user?._id ?? ''}`)
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
        setInvestors([]);
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
                    setShowInvestors(true);
                    fetchInvestorData(investorid); // Log when streaming ends
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

  const sendProposal = (email: string, proposal: string) => {
    const mailtoLink = `mailto:${email}?subject=Investment Proposal&body=${encodeURIComponent(proposal)}`;
    window.location.href = mailtoLink;
  };


    


  return (
    <div className="font-[family-name:var(--font-geist-sans)] pt-24 w-full bg-[hsl(var(--background))]">
        <Navbar/>
      {!showLog && (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4 max-w-6xl mx-auto text-center">
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

{showInvestors && investors && investors?.length > 0 && <>
    <div className="max-w-4xl text-4xl mx-auto text-center my-4">Suggested Investors</div>
    <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto my-10">
      {investors?.map((investor, index) => (
        <div key={index} className="bg-[hsl(var(--accent))] text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{investor.name}</h2>
              <p className="text-sm text-gray-400">{investor.type}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{investor.match_percentage}% Match</p>
              <p className="text-sm text-gray-400">{investor.funding_range}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href={investor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${investor.email}`}
              className="text-indigo-300 hover:underline"
            >
              Email
            </a>
          </div>

          <p className="mt-4 text-gray-300">
            {investor.investments} investments in {investor.sector} sector
          </p>

          <button
            onClick={() => sendProposal(investor.email, investor.investment_proposal)}
            className="mt-6 bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            Send Proposal
          </button>
        </div>
      ))}
    </div>
      <div className="w-full text-lg my-3 text-center">Want to find more investors?</div>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto my-10">
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
</>}

    </div>
  );
}
