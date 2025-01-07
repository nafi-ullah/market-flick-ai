// components/KeyDifferentiators.tsx
import React from 'react';
import { IconType } from 'react-icons';

interface KeyDifferentiatorsProps {
  title: string;
  items: string[];
  Icon: IconType; // This ensures the icon comes from react-icons
}

const CustomIconList: React.FC<KeyDifferentiatorsProps> = ({ title, items, Icon }) => {
  return (
    <div className="p-6 bg-white  rounded-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500">
              <Icon size={20} />
            </span>
            <p className="ml-2 text-gray-700">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomIconList;
