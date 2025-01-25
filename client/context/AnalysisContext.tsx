"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface BasicInfo {
  title: string;
  date: string;
  business_idea: string;
  business_sector: string;
  business_location: string;
}

interface AnalysisData {
  basic_info_id: string;
  basic_info: BasicInfo;
}

interface AnalysisDataContextType {
  analysisData: AnalysisData[];
  currentBasicInfoId: string;
  setAnalysisData: React.Dispatch<React.SetStateAction<AnalysisData[]>>;
  setCurrentBasicInfoId: React.Dispatch<React.SetStateAction<string>>;
}

const AnalysisDataContext = createContext<AnalysisDataContextType | undefined>(undefined);

export const useAnalysisDataContext = () => {
  const context = useContext(AnalysisDataContext);
  if (!context) {
    throw new Error("useAnalysisDataContext must be used within an AnalysisDataProvider");
  }
  return context;
};

export const AnalysisDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [currentBasicInfoId, setCurrentBasicInfoId] = useState<string>("");

  useEffect(()=>{
        console.log(`analaysis data in context ${analysisData}`)
  },[analysisData])

  return (
    <AnalysisDataContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        currentBasicInfoId,
        setCurrentBasicInfoId,
      }}
    >
      {children}
    </AnalysisDataContext.Provider>
  );
};
