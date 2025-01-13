"use client";
import React from 'react'
import dynamic from 'next/dynamic';
// import CombinedBarLineChart from './charts/BarLineChart';

const CombinedBarLineChart = dynamic(() => import('./charts/BarLineChart'), {
    ssr: false, // Disable server-side rendering
  });

const MarketTrends = () => {

    const graphData = [
        { year: '2020', marketSize: 40, growthRate: 20, digitalAdoption: 60 },
        { year: '2021', marketSize: 60, growthRate: 25, digitalAdoption: 70 },
        { year: '2022', marketSize: 80, growthRate: 30, digitalAdoption: 75 },
        { year: '2023', marketSize: 100, growthRate: 35, digitalAdoption: 80 },
        { year: '2024 (P)', marketSize: 110, growthRate: 40, digitalAdoption: 85 },
        { year: '2025 (P)', marketSize: 120, growthRate: 45, digitalAdoption: 90 },
      ];
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
    <h2 className="text-lg font-bold mb-4">Market Trends & Future Projections</h2>
    <CombinedBarLineChart data={graphData} />
    </div>
  )
}

export default MarketTrends