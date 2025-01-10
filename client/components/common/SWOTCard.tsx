"use client";
import React from "react";

interface CardProps {
  showPrompts: string[];
  title: string;
  tips: string[];
  values: string[];
  aiSuggestion: string;
  cardColor: string;
}

const SwotDetailedCard: React.FC<CardProps> = ({
  showPrompts,
  title,
  tips,
  values,
  aiSuggestion,
  cardColor,
}) => {
  return (
    <div
      className={`p-4 rounded-lg`}
      style={{
        backgroundColor: `${cardColor}1A` , // Low opacity background
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-black text-white text-xs px-2 py-1 rounded-md"
          onClick={() => console.log("Show Prompts", showPrompts)}
        >
          Show Prompts
        </button>
        
      </div>
      <div className="bg-[#F3F4F6] rounded-md p-2 py-4">
      <div className="text-sm text-gray-600">Tips for {title} Analysis:</div>
      <ul className="text-sm text-gray-600 list-disc pl-5">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      </div>
      <div>
        <h3
          className={`font-bold text-lg my-4`}
          style={{
            color: cardColor, // Title color matches card color
          }}
        >
          {title}
        </h3>
        <ul className={`list-disc pl-5 `}>
          {values.map((value, index) => (
            <li key={index} style={{ color: cardColor }}>
              {value}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder={`Add new ${title.toLowerCase()}...`}
            className="border rounded px-2 py-1 w-full text-sm"
          />
        </div>
        <div className="text-sm text-gray-500 mt-2">
          AI Suggestion: <span className="italic">{aiSuggestion}</span>
        </div>
      </div>
    </div>
  );
};

export default SwotDetailedCard;
