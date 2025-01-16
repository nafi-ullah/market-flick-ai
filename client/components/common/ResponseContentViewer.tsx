
import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
  content: string;
}

const ResponseContentViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
    

  return (
    <div className="markdown-content p-4 bg-white rounded-md shadow-md max-w-7xl mx-auto my-6">
      
      <ReactMarkdown>{content}</ReactMarkdown>
      
     
    </div>
  );
};

export default ResponseContentViewer;
