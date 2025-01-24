import React from "react";
import ReactMarkdown from "react-markdown";
import { parseMarkdownContentData } from "@/data/DataMapping";

export interface MarkdownViewerProps {
  data: {
    key: string;
    data: string;
    status: string;
  };
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ data }) => {
  const chartData = parseMarkdownContentData(data["data"]);

  console.log({chartData, data});
  function LinkRenderer(props: any) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }
  return (
    <div className="markdown-content p-4 bg-[hsl(var(--accent))] rounded-md shadow-md w-full my-6">
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
            line-height: 1.8;
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
          .markdown-content a {
            color: #007bff;
            text-decoration: underline;
          }
          .markdown-content h3 {
            font-size: 1.2em;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
          }
        `}
      </style>
      <div className="text-2xl font-bold text-[hsl(var(--foreground))] mb-4 text-center">Market Analysis Report</div>
      <div className="markdown-content p-4 bg-[hsl(var(--background))] rounded-md border border-[hsl(var(--source))] max-w-7xl max-h-[500px] overflow-y-auto mx-auto my-6">
        <ReactMarkdown 
          components={{
            a: LinkRenderer
          }}
        >{chartData.markdowndata.join("\n")}</ReactMarkdown>
      </div>
     
    </div>
  );
};

export default MarkdownViewer;
