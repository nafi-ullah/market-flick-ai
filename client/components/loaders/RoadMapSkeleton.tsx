import React from "react";

const RoadmapComponentSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md  my-6 animate-pulse">
      <div className="container mx-auto px-4 py-8">
        {/* Title Placeholder */}
        <div className="h-8 bg-gray-300 w-1/2 mx-auto rounded-md mb-12"></div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 transform -translate-x-1/2"></div>

          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative mb-16">
              {/* Timeline Element */}
              <div
                className={`flex items-center mb-4 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Placeholder for the content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "text-right pr-8" : "pl-8"
                  }`}
                >
                  <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded-md"></div>
                    <div className="h-3 bg-gray-300 w-full mb-1 rounded-md"></div>
                    <div className="h-3 bg-gray-300 w-5/6 rounded-md"></div>
                  </div>
                </div>

                {/* Placeholder for the icon */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10"></div>
                </div>

                <div className="w-5/12"></div>
              </div>

              {/* Curved connecting line placeholder */}
              {index < 3 && (
                <div
                  className={`absolute w-1/2 h-16 border-t-4 border-gray-300 ${
                    index % 2 === 0
                      ? "left-0 border-r-4 rounded-tr-full"
                      : "right-0 border-l-4 rounded-tl-full"
                  }`}
                  style={{
                    top: "3rem",
                    borderTopWidth: "4px",
                    borderRightWidth: index % 2 === 0 ? "4px" : "0",
                    borderLeftWidth: index % 2 === 0 ? "0" : "4px",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapComponentSkeleton;
