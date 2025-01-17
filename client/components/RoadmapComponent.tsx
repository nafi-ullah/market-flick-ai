import React from 'react';
import { MapPin, Flag, Trophy } from 'lucide-react';

export interface RoadmapElement {
  title: string;
  description: string;
}

export interface RoadmapProps {
  title: string;
  elements: RoadmapElement[];
}

const RoadmapComponent: React.FC<RoadmapProps> = ({ title, elements }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">{title}</h1>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-blue-300 transform -translate-x-1/2"></div>
        {elements.map((element, index) => (
          <div key={index} className="relative mb-16">
            <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{element.title}</h3>
                  <p className="text-sm text-gray-600">{element.description}</p>
                </div>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center z-10">
                  {index === 0 ? (
                    <Flag className="text-white" size={24} />
                  ) : index === elements.length - 1 ? (
                    <Trophy className="text-white" size={24} />
                  ) : (
                    <MapPin className="text-white" size={24} />
                  )}
                </div>
              </div>
              <div className="w-5/12"></div>
            </div>
            {index < elements.length - 1 && (
              <div 
                className={`absolute w-1/2 h-16 border-t-4 border-blue-300 ${
                  index % 2 === 0 ? 'left-0 border-r-4 rounded-tr-full' : 'right-0 border-l-4 rounded-tl-full'
                }`}
                style={{
                  top: '3rem',
                  borderTopWidth: '4px',
                  borderRightWidth: index % 2 === 0 ? '4px' : '0',
                  borderLeftWidth: index % 2 === 0 ? '0' : '4px',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapComponent;

