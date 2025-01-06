import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import SWOTAnalysis from "@/components/SWOTAnalysisCard";
import { AIDAanalysisData, analysis_data, SWOTanalysisData } from "@/data/DummyData";
import Image from "next/image";

export default function Home() {



  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <BusinessAnalysisForm/>
      <CompetitorAnalysisTable analysis_data={analysis_data} />
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
      <SWOTAnalysis swot_data={SWOTanalysisData}/>
    </div>
  );
}
