// components/RatingCard.tsx
import React from 'react';

interface RatingCardProps {
  data: { title: string; rating: number }[];
}

const CompetititveLandScape: React.FC<RatingCardProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-gray-800 font-medium">{item.title}</span>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < item.rating ? 'gold' : 'none'}
                stroke="gold"
                strokeWidth={1}
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompetititveLandScape;
