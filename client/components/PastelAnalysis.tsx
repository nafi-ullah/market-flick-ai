// pages/index.tsx
"use client"

import { useState } from "react";
import ImpactGrid from "./common/PastelCard";
import { PastelData, } from "@/data/DummyData";
import { FaInfoCircle } from "react-icons/fa";
import SourcesModal from "./common/SourcesModal";
import { parsePestaliData } from "@/data/PasteliDataMapping";


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
    <div className="p-4 bg-[hsl(var(--accent))] rounded-md shadow-md max-w-7xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">PASTELI Analysis</h2>
      
      {/* You can pass that data on to other components */}
      <ImpactGrid pestali_data={pestali_data} />
      <div className="flex justify-end">
        <button 
         onClick={handleOpenModal}
        className="flex items-center text-sm px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          <FaInfoCircle className="mr-2" />
          Sources
        </button>
      </div>
      {isModalOpen && <SourcesModal handleClose={handleCloseModal} sources={pestali_data.sources} />}
    </div>
  );
}


export default PASTELIAnalysis;