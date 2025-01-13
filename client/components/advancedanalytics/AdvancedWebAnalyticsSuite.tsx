import React from 'react'
import UserBehaviorAnalytics from './UserBehavior'
import CompetitorBenchmarking from './CompetitiorBenchmark'
import PredictiveAnalytics from './PredictiveAnalysis'
import PersonalizationEngine from './PersonalizationEngine'
import AutomatedReporting from './AutomatedReporting'
import Trends from './Trends'
import ActionableInsights from './ActionableInsights'
import IntegrationHub from './IntegrationHub'

const AdvancedWebAnalyticsSuite = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
    <h2 className="text-lg font-bold mb-4">Market Trends & Future Projections</h2>
    <div className='grid grid-cols-2 gap-4'>
    <UserBehaviorAnalytics />
      <CompetitorBenchmarking />
      <PredictiveAnalytics />
      <PersonalizationEngine />
      <AutomatedReporting />
      <Trends />
      <ActionableInsights />
      <IntegrationHub />
    
      </div>
    </div>
  )
}

export default AdvancedWebAnalyticsSuite