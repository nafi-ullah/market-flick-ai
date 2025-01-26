import React from "react";
import ReactMarkdown from "react-markdown";
import { parseMarkdownContentData } from "@/data/DataMapping";

export interface MarkdownChatProps {
  data: {
    key: string;
    data: string;
    status: string;
  };
}

const MarkdownChat: React.FC<MarkdownChatProps> = ({ data }) => {
  const chartData = parseMarkdownContentData(data["data"]);

  console.log({ chartData, data });
  function LinkRenderer(props: any) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }
  return (
    <div className="markdown-content w-full">
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

      <div className="markdown-content">
        <ReactMarkdown
          components={{
            a: LinkRenderer,
          }}
        >
          {chartData.markdowndata.join("\n")}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownChat;
