"use client";
import { useEffect, useState } from "react";
import Type1Component from "./Type1Component";
import Type2Component from "./Type2Component";
import Type3Component from "./Type3Component";
import { BACKENDURL } from "@/utils/constants";

const StreamDataWrapper = () => {
  const [type1Data, setType1Data] = useState<string[]>([]);
  const [type2Data, setType2Data] = useState<string[]>([]);
  const [type3Data, setType3Data] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${BACKENDURL}/stream`); // Replace with your backend URL

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      // Determine the type and set data accordingly
      if (parsedData.type === "type1") {
        setType1Data((prev) => [...prev, parsedData.message]);
      } else if (parsedData.type === "type2") {
        setType2Data((prev) => [...prev, parsedData.message]);
      } else if (parsedData.type === "type3") {
        setType3Data((prev) => [...prev, parsedData.message]);
      }
    };

    eventSource.onerror = () => {
      console.error("Error occurred while streaming data.");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Streaming Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Type1Component data={type1Data} />
        <Type2Component data={type2Data} />
        <Type3Component data={type3Data} />
      </div>
    </div>
  );
};

export default StreamDataWrapper;
