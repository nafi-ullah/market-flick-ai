/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

type ArticleCardProps = {
  websiteName: string;
  articleTitle: string;
  description: string;
  image: string;
  url: string;
};

const SourceCard: React.FC<ArticleCardProps> = ({
  websiteName,
  articleTitle,
  description,
  image,
  url,
}) => {
  const placeholderImageUrl = "https://placehold.co/40x40?text=S";
  const [isHovered, setIsHovered] = useState(false);

  const [imageUrl, setImageUrl] = useState(placeholderImageUrl);

  useEffect(() => {
    // check if image is a valid url using request
    const imageRequest = new Request(image);
    // fetch(imageRequest).then((response) => {
    //   if (url.includes("digitaljournal.com")) {
    //     console.log({ response, url });
    //   }
    //   setImageUrl(response.url);
    // });
  }, [image, url]);

  const handleImageError = () => {
    setImageUrl(placeholderImageUrl);
  };

  if (articleTitle === "Unavailable") {
    return null;
  }

  return (
    <div
      className="relative cursor-pointer w-full max-w-[250px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <div className="flex flex-col w-full bg-[hsl(var(--source))] text-[hsl(var(--foreground))] p-3 rounded-md ">
        <div>
          <h3 className="text-[hsl(var(--foreground))] font-medium text-xs leading-3">
            {articleTitle.slice(0, 30) +
              (articleTitle.length > 30 ? "..." : "")}
          </h3>
        </div>
        <div className="flex my-2 justify-start items-start">
          <img
            src={imageUrl}
            alt="Article Thumbnail"
            className="w-5 h-5 rounded-full mr-2"
            onError={handleImageError}
          />
          <p className="text-xs text-[hsl(var(--secondary))]">{websiteName}</p>
        </div>
      </div>

      {isHovered && (
        <div className="absolute bottom-full left-0  p-4 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--source))] shadow-md z-10 min-w-[250px]">
          <div className="flex my-2 justify-start items-start">
            <img
              src={imageUrl}
              alt="Article Thumbnail"
              className="w-5 h-5 rounded-full mr-2"
            />
            <p className="text-xs text-[hsl(var(--secondary))]">
              {websiteName}
            </p>
          </div>
          <h3 className="text-[hsl(var(--foreground))] font-medium text-sm leading-4">
            {articleTitle.slice(0, 30) +
              (articleTitle.length > 30 ? "..." : "")}
          </h3>

          <div className="text-[hsl(var(--foreground))] font-medium text-xs leading-4 mt-2">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceCard;
