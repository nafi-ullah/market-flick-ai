import React from 'react';

const SourceCardSkeleton: React.FC = () => {
    return (
        <div className="relative w-full max-w-[250px] cursor-pointer animate-pulse">
            <div className="flex flex-col w-full bg-[hsl(var(--source))] text-[hsl(var(--foreground))] p-3 rounded-md">
                <div className="h-4 bg-[hsl(var(--secondary))] rounded w-3/4 mb-2"></div>
                <div className="flex my-2 justify-start items-start">
                    <div className="w-5 h-5 bg-[hsl(var(--secondary))] rounded-full mr-2"></div>
                    <div className="h-3 bg-[hsl(var(--secondary))] rounded w-1/3"></div>
                </div>
            </div>

            <div
                className="absolute top-full left-0 p-4 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--source))] shadow-md z-10 max-w-[250px] hidden"
            >
                <div className="flex my-2 justify-start items-start">
                    <div className="w-5 h-5 bg-[hsl(var(--secondary))] rounded-full mr-2"></div>
                    <div className="h-3 bg-[hsl(var(--secondary))] rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-[hsl(var(--secondary))] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[hsl(var(--secondary))] rounded w-full mt-2"></div>
            </div>
        </div>
    );
};

export default SourceCardSkeleton;
