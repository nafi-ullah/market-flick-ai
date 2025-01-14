import { parseMarkdownContentData } from "@/data/DataMapping";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
     const [chartData, setChartData]= useState(parseMarkdownContentData(content));

  return (
    <div className="markdown-content p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      
      <ReactMarkdown>{chartData.markdowndata}</ReactMarkdown>
      <h2 className="text-xl font-bold my-4">References</h2>
      <ul className="list-disc ml-6">
        {Object.entries(chartData.references_array).map(([name, url], index) => (
          <li key={index} className="mb-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkdownViewer;
