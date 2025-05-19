import React, { useState } from "react";

interface Metadata {
  title: string;
  description: string;
  image: string;
}

const FetchMetadata: React.FC = () => {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchMetadata = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/fetch-metadata?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error("Failed to fetch metadata.");
      const data: Metadata = await response.json();
      setMetadata(data);
    } catch (err: any) {
      setMetadata(null);
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Website Metadata Viewer</h1>

      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://chatgpt.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleFetchMetadata}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Metadata
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {metadata && (
        <div className="mt-8 p-4 border border-gray-300 rounded w-full max-w-md bg-white shadow">
          <h2 className="text-lg font-semibold">Metadata</h2>
          <p><strong>Title:</strong> {metadata.title || "N/A"}</p>
          <p><strong>Description:</strong> {metadata.description || "N/A"}</p>
          {metadata.image && (
            <div className="mt-4">
              <strong>Image:</strong>
              <img src={metadata.image} alt="Website Preview" className="mt-2 max-h-48 rounded" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchMetadata;
