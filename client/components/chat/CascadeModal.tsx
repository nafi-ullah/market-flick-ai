"use client";
import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FileUpload from "./FileUpload";
import axios from "axios";
import { BACKENDURL } from "@/utils/constants";
import { MdSend } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaHistory } from "react-icons/fa";
import {
  FaChartBar,
  FaTable,
  FaClipboardList,
  FaProjectDiagram,
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { GiRoad } from "react-icons/gi";
import MarkdownChat from "../MarkdownChat";
import { useAuth } from "@/hooks/useAuth";
type ComponentReloaderState = {
  needReload: boolean;
  components: string[];
};
interface CascadeModalProps {
  onClose: () => void;
  knowledge_id: string;
  setComponentReloader: Dispatch<SetStateAction<ComponentReloaderState>>;

  chatHistory: [string, string][];
  setChatHistory: React.Dispatch<React.SetStateAction<[string, string][]>>;
  inputValues: string[];
  setInputValues: React.Dispatch<React.SetStateAction<string[]>>;
  outputValues: string[];
  setOutputValues: React.Dispatch<React.SetStateAction<string[]>>;
}

interface KeyValueMap {
  key: string;
  value: string;
}

const importantKeysMap: KeyValueMap[] = [
  { value: "knowledge_base", key: "market_size_report" },
  { value: "market_size_data_points", key: "market_size_graph" },
  { value: "market_player_table_data", key: "competitors_table" },
  { value: "competitors_chart_data", key: "competitors_chart" },
  { value: "swot_analysis", key: "swot_analysis" },
  { value: "pestali_analysis", key: "pestali_analysis" },
  { value: "roadmap", key: "roadmap" },
];

const CascadeModal: React.FC<CascadeModalProps> = ({
  onClose,
  knowledge_id,
  setComponentReloader,
  chatHistory,
  setChatHistory,
  inputValues,
  setInputValues,
  outputValues,
  setOutputValues,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [mode, setMode] = useState<"write" | "chat">("chat");

  const [isLoading, setIsLoading] = useState(false);
  const [showFullChat, setShowFullChat] = useState(inputValues.length > 0);
  const { user} = useAuth();
  
  const inputRef = useRef<HTMLInputElement>(null);

  const pastWorkflows = [
    { title: "Enhancing TAM SAM SOM ", time: "3d" },
    { title: "Redesigning Roadmap", time: "4d" },
    { title: "Redesigning Competitor Analysis", time: "4d" },
  ];

  const important_keys = [
    {
      key: "market_size_report",
      value: "Market Analysis Report",
      icon: <FaClipboardList />,
    },
    {
      key: "market_size_graph",
      value: "Market Size Analysis",
      icon: <BsGraphUp />,
    },
    { key: "competitors_table", value: "Market Players", icon: <FaTable /> },
    {
      key: "competitors_chart",
      value: "Competitor Analysis Graph",
      icon: <FaChartBar />,
    },
    { key: "swot_analysis", value: "SWOT Analysis", icon: <FaClipboardList /> },
    {
      key: "pestali_analysis",
      value: "Pestali Analysis",
      icon: <FaClipboardList />,
    },
    { key: "roadmap", value: "Roadmap", icon: <GiRoad /> },
  ];

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "write" ? "chat" : "write"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Detect if "@" is typed
    if (value.endsWith("@")) {
      setDialogVisible(true);
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setCursorPosition({ x: rect.left, y: rect.bottom });
      }
    } else {
      setDialogVisible(false);
    }

    // Remove key if its associated value is deleted
    selectedKeys.forEach((key) => {
      const item = important_keys.find((i) => i.key === key);
      if (item && !value.includes(item.value)) {
        setSelectedKeys((prev) => prev.filter((k) => k !== key));
      }
    });
    console.log(inputValue);
    console.log(selectedKeys);

    setInputValue(value);
  };

  const handleKeyClick = (item: { key: string; value: string }) => {
    setInputValue((prev) => `${prev}${item.value}`);
    setSelectedKeys((prev) => [...prev, item.key]);

    if (
      item.key == "competitors_table" &&
      !selectedKeys.includes("competitors_chart")
    ) {
      setSelectedKeys((prev) => [...prev, "competitors_chart"]);
    }
    if (
      item.key == "competitors_chart" &&
      !selectedKeys.includes("competitors_table")
    ) {
      setSelectedKeys((prev) => [...prev, "competitors_table"]);
    }

    setDialogVisible(false);
  };

  const getValueFromKey = (key: string): string | undefined => {
    const foundItem = importantKeysMap.find((item) => item.key === key);
    return foundItem?.value;
  };
  const mapKeysToValues = (keys: string[]): string[] => {
    return keys
      .map((key) => getValueFromKey(key)) // Map keys to values
      .filter((value): value is string => !!value); // Filter out undefined values
  };
  const handleClickReloader = (selected_comps: string[]) => {
    const mappedComponents = mapKeysToValues(selected_comps);
    setComponentReloader({
      needReload: true,
      components: mappedComponents,
    });
  };

  const handleSendMessage = async () => {
    if (!showFullChat) {
      setShowFullChat(true);
    }
    if (!inputValue.trim()) return;

    // Push input value to inputValues array
    setInputValues((prev) => [...prev, inputValue]);

    setInputValue("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKENDURL}/chat`, {
        id: knowledge_id,
        type: mode,
        message: inputValue,
        chat_history: chatHistory, // Send existing chatHistory to backend
        component_keys: selectedKeys,
        user_id: user?._id ?? '', // Pass user ID if available
      });

      const { output, chat_history: newChatHistory } = response.data;

      if (response.data && mode == "write") {
        handleClickReloader(selectedKeys);
      }

      // Update chatHistory with API response (store only, no display)
      setChatHistory(newChatHistory);

      // Push output value to outputValues array
      setOutputValues((prev) => [...prev, output]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 right-0 bg-[hsl(var(--accent))] text-white w-[420px] h-[100vh]   flex flex-col z-50"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      {showFullChat ? (
        <>
          <div className="flex flex-col h-full w-full px-4 pb-4  rounded-lg">
            <div className="flex justify-between">
              <div className="text-xs mt-3">FlickAI | {mode} mode</div>
              <div className="flex space-x-3 items-center justify-end py-2">
                <button
                  onClick={() => {
                    setShowFullChat(false);
                    setChatHistory([]);
                    setInputValues([]);
                    setOutputValues([]);
                  }}
                  className="text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  <FiPlus />
                </button>

                <button
                  onClick={() => {
                    setShowFullChat(true);
                  }}
                  className="text-gray-400 hover:text-indigo-500 transition-colors text-xs"
                >
                  <FaHistory />
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>

            <div
              className="flex-grow overflow-y-auto pr-4 mt-2  rounded-md shadow-inner"
              key={mode}
            >
              {/* Render inputValues on the right side */}
              {inputValues.map((input, index) => (
                <>
                  <div
                    key={`${index}-${mode}`}
                    className="flex justify-end mb-2"
                  >
                    <div className="max-w-xs px-4 py-2 rounded-lg text-white text-sm bg-indigo-800">
                      {input}
                    </div>
                  </div>
                  <div className="flex justify-start my-3">
                    <div className="max-w-xs p-4 rounded-lg text-white text-sm bg-[rgba(200,200,200,0.1)]">
                      <MarkdownChat
                        data={{
                          data: outputValues[index] || "",
                          key: "output",
                          status: "success",
                        }}
                      />
                    </div>
                  </div>
                </>
              ))}

              {/* Render outputValues on the left side */}

              {isLoading && (
                <div className="flex justify-start mb-2">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-300 animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-grow pr-12 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-indigo-800 placeholder:text-sm placeholder:text-gray-300"
                placeholder="Type your message here..."
              />
              {dialogVisible && (
                <div
                  // style={{ top: cursorPosition.y + 5, left: cursorPosition.x }}
                  className="absolute bottom-full bg-indigo-800 text-gray-200 rounded-md shadow-lg p-2 z-50"
                >
                  {important_keys.map((item) => (
                    <div
                      key={item.key}
                      onClick={() => handleKeyClick(item)}
                      className="px-3 py-1 cursor-pointer hover:bg-indigo-600 rounded text-xs flex items-center"
                    >
                      <span className="mr-3 text-xs">{item.icon}</span>{" "}
                      {item.value}
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleSendMessage}
                className="px-4 py-2  text-white rounded-full hover:bg-indigo-700 absolute top-1 right-1 z-10"
              >
                <MdSend />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mx-2">
            <div className="text-xs mt-3">FlickAI | {mode} mode</div>
            <div className="flex space-x-3 items-center justify-end py-2">
              <button
                onClick={() => {
                  setShowFullChat(false);
                  setChatHistory([]);
                  setInputValues([]);
                  setOutputValues([]);
                }}
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <FiPlus />
              </button>

              <button
                onClick={() => {
                  setShowFullChat(true);
                }}
                className="text-gray-400 hover:text-indigo-500 transition-colors text-xs"
              >
                <FaHistory />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 mt-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white rounded-full">
                <Image
                  src="/marktelogo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="sr-only">Logo</span>
              </div>
            </div>

            <motion.div
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {mode === "write" ? (
                <>
                  <h1 className="text-xl font-bold">Write with FlickChat </h1>
                  <p className="text-sm text-gray-200">
                    Kick off a new project or make changes across your entire
                    market analysis
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold">Chat with FlickChat</h1>
                  <p className="text-sm text-gray-200">
                    Chat with FlickChat to broaden your insights your entire
                    market analysis.
                  </p>
                </>
              )}
            </motion.div>
          </div>

          {/* Main Interaction Section - Search Bar */}
          <div className="px-4">
            <div className="bg-indigo-800 rounded-lg flex flex-col px-3 py-3 shadow-sm relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Ask anything (Ctrl+L), @ to mention code blocks"
                className="flex-1 bg-transparent outline-none text-xs placeholder:text-gray-200"
              />

              {dialogVisible && (
                <div
                  // style={{ top: cursorPosition.y + 5, left: cursorPosition.x }}
                  className="absolute top-full bg-indigo-400 text-gray-200 rounded-md shadow-lg p-2 z-50"
                >
                  {important_keys.map((item) => (
                    <div
                      key={item.key}
                      onClick={() => handleKeyClick(item)}
                      className="px-3 py-1 cursor-pointer hover:bg-indigo-600 rounded text-xs"
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              )}

              <div className="relative mt-3 w-full flex items-center justify-end">
                <div
                  className="relative bg-indigo-400 w-[75px] h-[20px] rounded-full flex items-center p-1 cursor-pointer"
                  onClick={toggleMode}
                >
                  <motion.div
                    className="absolute bg-white w-[33px] h-[18px] rounded-full shadow-md"
                    initial={{ x: mode === "write" ? 0 : 37 }}
                    animate={{ x: mode === "write" ? 0 : 37 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {mode === "write" ? (
                      <div className="relative top-[2px] left-1 text-[10px] font-semibold text-indigo-800">
                        Write
                      </div>
                    ) : (
                      <div className="relative top-[2px] left-1 text-[10px] font-semibold text-indigo-800">
                        Chat
                      </div>
                    )}
                  </motion.div>
                  <span className="flex-1 text-center text-[10px] font-semibold text-indigo-800">
                    Write
                  </span>
                  <span className="flex-1 text-center text-[10px] font-semibold text-indigo-800">
                    Chat
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Past Workflows Section */}
          {/* <FileUpload /> */}
          <div className="flex-1 overflow-y-auto mt-4 px-4">
            <h2 className="text-md font-semibold mb-2">Past Workflows</h2>
            <div className="flex flex-col gap-2">
              {pastWorkflows.map((workflow, idx) => (
                <button
                  key={idx}
                  className="bg-indigo-800 hover:bg-indigo-700 p-3 rounded-md text-left transition-colors"
                >
                  <div className="font-bold text-sm">{workflow.title}</div>
                  <div className="text-xs text-gray-300 mt-1">
                    {workflow.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer / Additional Notes */}
          <div className="mt-auto p-4 text-center text-xs text-gray-300 border-t border-indigo-800">
            AI may make mistakes. Double-check all generated components.
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CascadeModal;
