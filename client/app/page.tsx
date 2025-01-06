import BusinessAnalysisForm from "@/components/BusinessCardForm";
import CompetitorAnalysisTable from "@/components/CompetitorAnalysisTable";
import Image from "next/image";

export default function Home() {
  const analysis_data = [
    {
      company: "CompetitorX",
      valuation: "$2.5B",
      money_raised: "$450M",
      key_focus: "AI-driven analytics",
    },
    {
      company: "MarketPro",
      valuation: "$1.8B",
      money_raised: "$280M",
      key_focus: "Enterprise solutions",
    },
    {
      company: "DataVision",
      valuation: "$900M",
      money_raised: "$150M",
      key_focus: "SMB focus",
    },
    {
      company: "AnalyticsPro",
      valuation: "$750M",
      money_raised: "$120M",
      key_focus: "Industry specific",
    },
  ];



  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <BusinessAnalysisForm/>
      <CompetitorAnalysisTable analysis_data={analysis_data} />
    </div>
  );
}
