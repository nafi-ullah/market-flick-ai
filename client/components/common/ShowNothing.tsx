
import React from "react";


interface MarkdownViewerProps {
  content: string;
}

const ShowNothing: React.FC<MarkdownViewerProps> = ({ content }) => {
    

  return (
    <div className="hidden">
      
        {content}
     
    </div>
  );
};

export default ShowNothing;
