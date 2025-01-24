// pages/index.tsx
"use client"

import { useState } from "react";
import ImpactGrid from "./common/PastelCard";
import { PastelData, } from "@/data/DummyData";
import { FaInfoCircle } from "react-icons/fa";
import SourcesModal from "./common/SourcesModal";
import { parsePestaliData } from "@/data/PasteliDataMapping";
import { SiCrowdsource } from "react-icons/si";
import UrlMetadataGrid from "./common/Sources/ShowAllSources";


export interface PASTELIAnalysisProps {
  data: {
    key: string;
    data: any;
    status: string;
  }
}

const PASTELIAnalysis: React.FC<PASTELIAnalysisProps> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pestali_data = parsePestaliData(data.data)
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
  return (
    <div className="p-4 bg-[hsl(var(--accent))] rounded-md shadow-md my-6">
      <h2 className="text-lg font-bold mb-4">PASTELI Analysis</h2>
      
      {/* You can pass that data on to other components */}
      <ImpactGrid pestali_data={pestali_data} />
      

        {/* Sources */}
        <div className="flex flex-col justify-start">
        <div
          className="flex items-center text-lg  py-2  rounded-md "
        >
          <SiCrowdsource className="mr-2" />
          Sources
        </div>
        <UrlMetadataGrid sources={pestali_data.sources} />
      </div>
    </div>
  );
}


export default PASTELIAnalysis;