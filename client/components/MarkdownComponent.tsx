import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="markdown-content p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
