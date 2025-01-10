// pages/index.tsx

import ImpactGrid from "./common/PastelCard";
import { PastelData, } from "@/data/DummyData";



export default function PASTELIAnalysis() {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">PASTELI Analysis</h2>
      
      <ImpactGrid data={PastelData} />
    </div>
  );
}
