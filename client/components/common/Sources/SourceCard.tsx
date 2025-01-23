import React, { useState } from 'react';

type ArticleCardProps = {
    websiteName: string;
    articleTitle: string;
    description: string;
    image: string;
    url: string;
};

const SourceCard: React.FC<ArticleCardProps> = ({ websiteName, articleTitle, description, image, url }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative  cursor-pointer w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col w-full bg-[hsl(var(--source))] text-[hsl(var(--foreground))] p-3 rounded-md ">
            <div>
                    <h3 className="text-[hsl(var(--foreground))] font-medium text-xs leading-3">{articleTitle}</h3>
                   
                </div>
                <div className='flex my-2 justify-start items-start'>
                <img
                    src={image}
                    alt="Article Thumbnail"
                    className="w-5 h-5 rounded-full mr-2"
                />
                <p className="text-xs text-[hsl(var(--secondary))]">{websiteName}</p>
                </div>
               
               
            </div>

            {isHovered && (
                <div
                    className="absolute top-full left-0  p-4 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--source))] shadow-md z-10 max-w-[250px]"
                >
                      <div className='flex my-2 justify-start items-start'>
                <img
                    src={image}
                    alt="Article Thumbnail"
                    className="w-5 h-5 rounded-full mr-2"
                />
                <p className="text-xs text-[hsl(var(--secondary))]">{websiteName}</p>
                </div>
                <h3 className="text-[hsl(var(--foreground))] font-medium text-sm leading-4">{articleTitle}</h3>
                    
                    <div className="text-[hsl(var(--foreground))] font-medium text-xs leading-4 mt-2">{description}</div>
                </div>
            )}
        </div>
    );
};

export default SourceCard;
