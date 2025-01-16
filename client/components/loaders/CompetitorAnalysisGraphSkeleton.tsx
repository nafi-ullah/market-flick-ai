import React, { useState } from 'react'

import { MarketSharedetails, MarketSharedsources } from "@/data/DummyData";

import { createChartData } from '@/data/GraphDataMapping';
import MarketShareCardSkeleton from './MarketShareSkeleton';
import PricePositioningCardSkeleton from './BarChartSkeleton';
import FeatureComparisonCardSkeleton from './RadarChartSkelton';
import MarketPositionMappingCardSkeleton from './BubbleChartLoader';


type MarketSizeAnalysisCardProps = {

  content: string;
  
};

const CompetitiorAnalysisGraphSkeleton = () => {
 
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-7xl mx-auto my-6">
      
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       <MarketShareCardSkeleton
     
      />
      <PricePositioningCardSkeleton
       
      />
       <FeatureComparisonCardSkeleton
     
      />
       <MarketPositionMappingCardSkeleton
      
      />
      
       </div>
    </div>
  )
}

export default CompetitiorAnalysisGraphSkeleton