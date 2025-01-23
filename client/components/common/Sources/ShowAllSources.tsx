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

const UrlMetadataGrid: React.FC<Props> = ({ sources }) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadataPromises = sources.map(async (url) => {
          // Extract website title from URL
          const cleanUrl = url.startsWith("https://www.")
            ? url.split("https://www.")[1].split("/")[0]
            : url.split("https://")[1].split("/")[0];

          try {
            const response = await fetch(`/api/fetch-metadata?url=${encodeURIComponent(url)}`);
            if (!response.ok) throw new Error("Failed to fetch metadata.");

            const metadata: Metadata = await response.json();
            return {
              url,
              websiteTitle: cleanUrl,
              title: metadata.title,
              description: metadata.description,
              image: metadata.image,
            };
          } catch (error) {
            // Handle metadata fetch failure
            return {
              url,
              websiteTitle: cleanUrl,
              title: "Unavailable",
              description: "Could not fetch description.",
              image: "https://via.placeholder.com/150", // Placeholder image
            };
          }
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
  }, [sources]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SourceCardSkeleton/>
          ))
        : gridItems.map((item) => (
            <>
            <SourceCard 
                websiteName={item.websiteTitle}
                articleTitle={item.title}
                description={item.description}
                image={item.image}
                url={item.url}

            />
            </>
          ))}
    </div>
  );
};

export default UrlMetadataGrid;
