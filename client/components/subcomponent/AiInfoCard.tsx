// components/InfoCard.tsx
import React from 'react';

interface InfoCardProps {
  data: { title: string; description: string; color: string }[];
}

const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${item.color}20` }} // Light background color
        >
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <p className={`text-sm`} style={{ color: item.color }}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
