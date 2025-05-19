"use client";
import { BACKENDURL } from "@/utils/constants";
import { useEffect, useState } from "react";

const StreamData = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${BACKENDURL}/stream`); // Replace with your backend URL

    eventSource.onmessage = (event) => {
      setData((prevData) => [...prevData, event.data]);
    };

    eventSource.onerror = () => {
      console.error("Error occurred while streaming data.");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up when component unmounts
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Streaming Data</h1>
      <ul className="list-disc ml-5">
        {data.map((chunk, index) => (
          <li key={index} className="mb-2">
            {chunk}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamData;
