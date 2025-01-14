
import Navbar from "@/components/core/Navbar";

import { AIDAanalysisData, analysis_data, MarketSizeAnalysisCardchartData, MarketSharedsources, SWOTanalysisData, sevenSData } from "@/data/DummyData";
import StreamData from "./component/Stream";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] pt-24">
      <Navbar />
    <StreamData/>
    </div>
  );
}
