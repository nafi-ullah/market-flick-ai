import { useState, useEffect } from 'react';

const sentences = [
  "Crunching data, stand by.",
  "Hang tight, insights brewing.",
  "Plotting competitive edge now.",
  "Digging deep, success awaits.",
  "Fine-tuning fresh insights now.",
  "Scanning signals, clarity incoming.",
  "Business intelligence brewing now.",
  "Analyzing data, conquering niche.",
  "Your advantage awaits now.",
  "Forecast loading… get ready!",
];

const AnalyseLoader: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    
      <div className="text-md font-bold text-gray-400 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent animate-shimmer">
        {sentences[currentIndex]}
    
    </div>
  );
};

export default AnalyseLoader;