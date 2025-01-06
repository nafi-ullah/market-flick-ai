import AIDAAnalysis from "@/components/AidiaAnalaysisComponent";
import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitiorAnalysisGraph from "@/components/CompetitiorAnalysisGraph";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import Navbar from "@/components/core/Navbar";
import MarketShareCard from "@/components/MarketShareCardComponent";
import MarketSizeAnalysisCard from "@/components/MarketSizeAnalysisCard";
import SWOTAnalysis from "@/components/SWOTAnalysisCard";
import { AIDAanalysisData, analysis_data, MarketSizeAnalysisCardchartData, MarketSharedetails, MarketSharedsources, SWOTanalysisData } from "@/data/DummyData";
import Image from "next/image";

export default function Home() {



  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
      <BusinessAnalysisForm/>
      <MarketSizeAnalysisCard
        title="Market Size Analysis"
        subtitle="TAM, SAM, SOM"
        chartData={MarketSizeAnalysisCardchartData}
        sources={MarketSharedsources}
      />
      <CompetitorAnalysisTable analysis_data={analysis_data} />
      <SWOTAnalysis swot_data={SWOTanalysisData}/>
      <CompetitiorAnalysisGraph/>
      <AIDAAnalysis analysis_data={AIDAanalysisData}/>
      
      
    </div>
  );
}
