// components/TeamCollaboration.tsx
import React from "react";

interface CollaborationItem {
  name: string;
  imageUrl: string;
  description: string;
  timeAgo: string;
}

interface TeamCollaborationProps {
  data: CollaborationItem[];
}

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({ data }) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg ">
      <h3 className="text-lg font-semibold mb-4">Team Collaboration</h3>
      <ul className="divide-y divide-gray-300">
        {data.map((item, index) => (
          <li key={index} className="flex items-center py-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <span className="text-sm text-gray-500">{item.timeAgo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCollaboration;
