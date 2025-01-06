import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import { AIDAanalysisData, analysis_data } from "@/data/DummyData";
import Image from "next/image";

export default function Home() {



  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <BusinessAnalysisForm/>
      <CompetitorAnalysisTable analysis_data={analysis_data} />
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
    </div>
  );
}
