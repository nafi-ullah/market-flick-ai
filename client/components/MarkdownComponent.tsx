import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { parseMarkdownContentData } from "@/data/DataMapping";

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const [chartData] = useState(parseMarkdownContentData(content));

  return (
    <div className="markdown-content p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      {/* Inline styles for scoped CSS */}
      <style>
        {`
          .markdown-content p, 
          .markdown-content li, 
          .markdown-content ol, 
          .markdown-content ul, 
          .markdown-content menu, 
          .markdown-content dd, 
          .markdown-content dt, 
          .markdown-content h1, 
          .markdown-content h2, 
          .markdown-content h3, 
          .markdown-content h4, 
          .markdown-content h5, 
          .markdown-content h6 {
            line-height: 1.7;
          }
          .markdown-content ol, 
          .markdown-content menu {
            list-style: auto;
            margin-left: 20px;
            margin-top: 10px;
          }
          .markdown-content ul, 
          .markdown-content menu {
            list-style: disc;
            margin-top: 10px;
            margin-left: 20px;
          }
          .markdown-content li, 
          .markdown-content ol {
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .markdown-content sup {
            font-size: 0.9em;
          }
        `}
      </style>
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
