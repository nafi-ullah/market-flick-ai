"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPen, FaComment, FaCircle } from 'react-icons/fa';
import Image from "next/image";
import FileUpload from './FileUpload';
interface CascadeModalProps {
  onClose: () => void;
  knowledge_id: string;
}

const CascadeModal: React.FC<CascadeModalProps> = ({ onClose, knowledge_id }) => {
  // Example data for past workflows
  const pastWorkflows = [
    { title: 'Enhancing TAM SAM SOM ', time: '3d' },
    { title: 'Redesigning Roadmap', time: '4d' },
    { title: 'Redesigning Competittor Analysis', time: '4d' },
  ];

  const [mode, setMode] = useState<'write' | 'chat'>('write');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'write' ? 'chat' : 'write'));
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
        {/* Top row: minimal circular logo + close button (optional) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-full">
            {/* Minimalist circular logo */}
           <Image
                           src="/marktelogo.png"
                           alt="Logo"
                           width={32}
                           height={32}
                           className="rounded-full"
                         />
            {/* If you have a logo image, place it here instead */}
            <span className="sr-only">Logo</span>
          </div>
          {/* Optional close button or any header control */}
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Header text */}
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
        <div className="bg-indigo-800 rounded-lg flex flex-col px-3 py-3 shadow-sm">
          <input
            type="text"
            placeholder="Ask anything (Ctrl+L), @ to mention code blocks"
            className="flex-1 bg-transparent outline-none text-xs placeholder:text-gray-400"
          />

          {/* Toggle switch */}
          <div className="relative mt-3 w-full flex items-center justify-end">
            <div
              className="relative bg-indigo-400 w-[75px] h-[20px] rounded-full flex items-center p-1 cursor-pointer"
              onClick={toggleMode}
            >
              {/* Animated toggle button */}
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
              
              {/* Labels */}
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
      <FileUpload/>
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
