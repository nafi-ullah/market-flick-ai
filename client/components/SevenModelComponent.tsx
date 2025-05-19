import React from 'react';

interface ModelCard {
  title: string;
  description: string;
}

interface SevenSModelProps {
  data: ModelCard[];
}

const SevenSModel: React.FC<SevenSModelProps> = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">7S McKinsey Model Analysis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenSModel;
