import React, { useEffect, useState } from "react";
import SourceCardSkeleton from "./SourcesLoader";
import SourceCard from "./SourceCard";

interface Metadata {
  title: string;
  description: string;
  image: string;
}

interface GridItem {
  url: string;
  websiteTitle: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  sources: string[];
}

const UrlMetadataGrid: React.FC<Props> = ({ sources = [] }) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadataPromises = sources.map(async (url, index) => {
          return new Promise(async (resolve, reject) => {
            setTimeout(async () => {
              // Extract website title from URL
              const cleanUrl = url.startsWith("https://www.")
                ? url.split("https://www.")[1].split("/")[0]
                : url.split("https://")[1].split("/")[0];

              try {
                const response = await fetch(
                  `/api/fetch-metadata?url=${encodeURIComponent(url)}`
                );
                if (!response.ok) throw new Error("Failed to fetch metadata.");

                const metadata: Metadata = await response.json();
                return resolve({
                  url,
                  websiteTitle: cleanUrl,
                  title: metadata.title,
                  description: metadata.description,
                  image: metadata.image,
                });
              } catch (error) {
                // Handle metadata fetch failure
                return resolve({
                  url,
                  websiteTitle: cleanUrl,
                  title: "Unavailable",
                  description: "Could not fetch description.",
                  image: "https://via.placeholder.com/150", // Placeholder image
                });
              }
            }, index * 400);
          });
        });

        const resolvedItems = await Promise.all(metadataPromises);
        setGridItems(resolvedItems);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [JSON.stringify(sources)]);

  return (
    <div className="flex gap-5 flex-wrap">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SourceCardSkeleton key={index} />
          ))
        : gridItems.map((item) => (
            <SourceCard
              websiteName={item.websiteTitle}
              articleTitle={item.title}
              description={item.description}
              image={item.image}
              url={item.url}
              key={item.url}
            />
          ))}
    </div>
  );
};

export default UrlMetadataGrid;
