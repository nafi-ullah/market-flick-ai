"use client";
import React from 'react'
import AIGapIdentification from './marketgapanalysis/AiGapIdentification';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import StrategicRecommendations from './marketgapanalysis/StrategicRecommend';
import VisualGapAnalysis from './charts/VIsualGapAnalysis';
import CustomReports from './marketgapanalysis/CustomReports';
const MarketGapAnalysis = () => {

    const gapData = [
        {
          title: 'Product Feature Gaps',
          priority: 'High Priority',
          color: '#E0F2FF', // Light blue background
          priorityColor: '#4F46E5', // Blue text
        },
        {
          title: 'Service Quality Gaps',
          priority: 'Medium Priority',
          color: '#FEF9C3', // Light yellow background
          priorityColor: '#F59E0B', // Yellow text
        },
        {
          title: 'Market Coverage Gaps',
          priority: 'Low Priority',
          color: '#DCFCE7', // Light green background
          priorityColor: '#16A34A', // Green text
        },
      ];

      const handleRefresh = () => {
        console.log('Refresh Analysis clicked');
      };

      const recommendationsData = [
        {
          title: 'Short-term Actions',
          items: ['Develop mobile app features', 'Expand customer support hours'],
          icon: <FaCheckCircle />,
        },
        {
          title: 'Long-term Strategy',
          items: ['Enter emerging markets', 'Develop AI-powered solutions'],
          icon: <FaStar />,
        },
      ];
      
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Market Gaps Analysis</h3>
      <AIGapIdentification data={gapData} onRefresh={handleRefresh} />
      <StrategicRecommendations data={recommendationsData} />
      <VisualGapAnalysis />
      <CustomReports/>
        </div>
  )
}

export default MarketGapAnalysis