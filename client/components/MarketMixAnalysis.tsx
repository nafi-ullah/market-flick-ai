import React from 'react'
import StrategyCard from './subcomponent/StrategyCard';

interface StrategyCardProps {
    title: string;
    data: { title: string; value: string; trend: 'up' | 'neutral' }[];
    aiRecommendation: string;
  }


const MarketMixAnalysis = () => {

    const cardsData: StrategyCardProps[] = [
        {
          title: 'Product Strategy',
          data: [
            { title: 'Product Quality Score', value: '85%', trend: 'up' },
            { title: 'Feature Completeness', value: '92%', trend: 'up' },
          ],
          aiRecommendation: 'Consider adding AI-powered features to maintain competitive edge',
        },
        {
          title: 'Place Strategy',
          data: [
            { title: 'Distribution Coverage', value: '82%', trend: 'up' },
            { title: 'Channel Efficiency', value: '78%', trend: 'up' },
          ],
          aiRecommendation: 'Expand digital distribution channels to increase market reach',
        },
        {
          title: 'Price Strategy',
          data: [
            { title: 'Price Competitiveness', value: '75%', trend: 'neutral' },
            { title: 'Value Perception', value: '88%', trend: 'up' },
          ],
          aiRecommendation: 'Implement dynamic pricing strategy based on market demand',
        },
        {
          title: 'Promotion Strategy',
          data: [
            { title: 'Campaign Effectiveness', value: '90%', trend: 'up' },
            { title: 'ROI on Marketing', value: '85%', trend: 'up' },
          ],
          aiRecommendation: 'Leverage personalized marketing campaigns using AI insights',
        },
      ];
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
    <h2 className="text-lg font-bold mb-4">4P Marketing Mix Analysis</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {cardsData.map((card, index) => (
        <StrategyCard
          key={index}
          title={card.title}
          data={card.data}
          aiRecommendation={card.aiRecommendation}
        />
      ))}
    </div>
  </div>
  )
}

export default MarketMixAnalysis