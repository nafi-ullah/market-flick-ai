import React from 'react';

const ArticleSkeleton: React.FC = () => {
  return (
    <div className='w-full '>
    <div className="animate-pulse space-y-4 p-4 max-h-[60vh] overflow-hidden ">
      {/* Heading Placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>

      {/* Subheading Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph Placeholders */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>

      {/* List Placeholder */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Extra Paragraph Placeholder */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>
    </div>
    </div>
  );
};

export default ArticleSkeleton;
