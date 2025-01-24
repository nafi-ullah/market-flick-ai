"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import FileUpload from './FileUpload';

interface CascadeModalProps {
  onClose: () => void;
  knowledge_id: string;
}

const CascadeModal: React.FC<CascadeModalProps> = ({ onClose, knowledge_id }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);

  const pastWorkflows = [
    { title: 'Enhancing TAM SAM SOM ', time: '3d' },
    { title: 'Redesigning Roadmap', time: '4d' },
    { title: 'Redesigning Competitor Analysis', time: '4d' },
  ];

  const important_keys = [
    { key: "knowledge_base", value: "Market Analysis Report" },
    { key: "market_size_data_points", value: "Market Size Analysis" },
    { key: "market_player_table_data", value: "Market Players" },
    { key: "competitors_chart_data", value: "Competitor Analysis Graph" },
    { key: "swot_analysis", value: "SWOT Analysis" },
    { key: "pestali_analysis", value: "Pestali Analysis" },
    { key: "roadmap", value: "Roadmap" },
  ];

  const [mode, setMode] = useState<'write' | 'chat'>('write');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'write' ? 'chat' : 'write'));
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
    console.log(inputValue)
    console.log(selectedKeys)

    setInputValue(value);
  };

  const handleKeyClick = (item: { key: string; value: string }) => {
    setInputValue((prev) => `${prev}${item.value}`);
    setSelectedKeys((prev) => [...prev, item.key]);
    setDialogVisible(false);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-indigo-500 text-white w-[420px] h-[85vh] rounded-lg shadow-lg flex flex-col"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="p-4 flex flex-col gap-2">
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
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            &times;
          </button>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {mode === 'write' ? (
            <>
              <h1 className="text-xl font-bold">Write with FlickChat </h1>
              <p className="text-sm text-gray-200">
                Kick off a new project or make changes across your entire market analysis
              </p>
             
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">Chat with FlickChat</h1>
              <p className="text-sm text-gray-200">
                Chat with FlickChat to broaden your insights your entire market analysis.
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
            placeholder="Ask anything (Ctrl+L), @ to mention code blocks"
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-gray-400"
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
                initial={{ x: mode === 'write' ? 0 : 37 }}
                animate={{ x: mode === 'write' ? 0 : 37 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {mode === 'write' ? (
                  <div className="relative top-[2px] left-1 text-[10px] font-semibold text-indigo-800">Write</div>
                ) : (
                  <div className="relative top-[2px] left-1 text-[10px] font-semibold text-indigo-800">Code</div>
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
      <FileUpload />
      <div className="flex-1 overflow-y-auto mt-4 px-4">
        <h2 className="text-md font-semibold mb-2">Past Workflows</h2>
        <div className="flex flex-col gap-2">
          {pastWorkflows.map((workflow, idx) => (
            <button
              key={idx}
              className="bg-indigo-800 hover:bg-indigo-700 p-3 rounded-md text-left transition-colors"
            >
              <div className="font-bold text-sm">{workflow.title}</div>
              <div className="text-xs text-gray-300 mt-1">{workflow.time}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Additional Notes */}
      <div className="mt-auto p-4 text-center text-xs text-gray-300 border-t border-indigo-800">
        AI may make mistakes. Double-check all generated components.
      </div>
    </motion.div>
  );
};

export default CascadeModal;
