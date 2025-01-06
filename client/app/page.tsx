import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitiorAnalysisGraph from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import MarketShareCard from "@/components/MarketShareCardComponent";
import SWOTAnalysis from "@/components/SWOTAnalysisCard";
import { AIDAanalysisData, analysis_data, marketSharedData, MarketSharedetails, MarketSharedsources, SWOTanalysisData } from "@/data/DummyData";
import Image from "next/image";

export default function Home() {



  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <BusinessAnalysisForm/>
      <CompetitorAnalysisTable analysis_data={analysis_data} />
      <SWOTAnalysis swot_data={SWOTanalysisData}/>
      <CompetitiorAnalysisGraph/>
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
      
      
    </div>
  );
}
