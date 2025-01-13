"use client";
import React from 'react'
import dynamic from 'next/dynamic';
import MetricCard from './subcomponent/MetricCard';
// import CombinedBarLineChart from './charts/BarLineChart';
import { FaRobot, FaLeaf, FaMobileAlt } from 'react-icons/fa';
import EmergingTrends from './subcomponent/EmergencyTrend';
import FuturePredictions from './subcomponent/FuturePrediction';
const CombinedBarLineChart = dynamic(() => import('./charts/BarLineChart'), {
    ssr: false, // Disable server-side rendering
  });

  interface MetricCardProps {
    data: {
      title: string;
      description: string;
      value: string;
      trend: 'up' | 'down';
      color: string;
    }[];
  }


const MarketTrends = () => {

    const graphData = [
        { year: '2020', marketSize: 40, growthRate: 20, digitalAdoption: 60 },
        { year: '2021', marketSize: 60, growthRate: 25, digitalAdoption: 70 },
        { year: '2022', marketSize: 80, growthRate: 30, digitalAdoption: 75 },
        { year: '2023', marketSize: 100, growthRate: 35, digitalAdoption: 80 },
        { year: '2024 (P)', marketSize: 110, growthRate: 40, digitalAdoption: 85 },
        { year: '2025 (P)', marketSize: 120, growthRate: 45, digitalAdoption: 90 },
      ];


      const metricdata: MetricCardProps['data'] = [
        {
          title: 'Market Growth',
          description: 'Year-over-year expansion',
          value: '23%',
          trend: 'up',
          color: '#dbeafe', // Light blue
        },
        {
          title: 'Digital Adoption',
          description: 'Digital transformation rate',
          value: '45%',
          trend: 'down',
          color: '#f5f3ff', // Light purple
        },
        {
          title: 'Innovation Index',
          description: 'Industry innovation score',
          value: '12%',
          trend: 'up',
          color: '#dcfce7', // Light green
        },
      ];

      const trendsData = [
        {
          title: 'AI Integration',
          percentage: 75,
          color: '#4F46E5', // Blue
          icon: <FaRobot />,
        },
        {
          title: 'Sustainability',
          percentage: 60,
          color: '#10B981', // Green
          icon: <FaLeaf />,
        },
        {
          title: 'Mobile First',
          percentage: 85,
          color: '#D946EF', // Purple
          icon: <FaMobileAlt />,
        },
      ];


      const predictionsData = [
        {
          quarter: 'Q1 2024',
          growth: '+28%',
          description: 'Expected Growth',
          color: '#16a34a', // Green
        },
        {
          quarter: 'Q2 2024',
          growth: '+32%',
          description: 'Expected Growth',
          color: '#16a34a', // Green
        },
        {
          quarter: 'Q3 2024',
          growth: '+18%',
          description: 'Expected Growth',
          color: '#f59e0b', // Yellow
        },
        {
          quarter: 'Q4 2024',
          growth: '+25%',
          description: 'Expected Growth',
          color: '#16a34a', // Green
        }]

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
    <h2 className="text-lg font-bold mb-4">Market Trends & Future Projections</h2>
    <CombinedBarLineChart data={graphData} />
    <MetricCard data={metricdata} />
    <EmergingTrends data={trendsData} />
    <FuturePredictions data={predictionsData} />
    </div>
  )
}

export default MarketTrends