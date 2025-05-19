import React, { useEffect, useRef, useState } from "react";

type TypingDisplayProps = {
  content: string;
};

const TypingDisplay: React.FC<TypingDisplayProps> = ({ content }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText((prev) => prev + content[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 3); // Typing speed (ms)

    return () => clearInterval(typingInterval);
  }, [content]);

  useEffect(() => {
    // Scroll to bottom when new content is added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div
      ref={containerRef}
      className="relative max-h-[50vh] overflow-auto border-l-2 border-gray-500  text-gray-400 p-4 text-lg "
    >
      {displayedText.split("\n").map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
    </div>
  );
};

export default TypingDisplay;
