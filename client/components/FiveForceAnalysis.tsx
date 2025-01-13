import React from 'react'
import IndustryRivalry from './subcomponent/IndustryRivalry'
import FiveForcesBar from './subcomponent/FiveForceValuesCard';
import { FaCheckCircle } from 'react-icons/fa';
import CustomIconList from './common/Customiconlist';
import { KeyDifferentiatorsData } from '@/data/DummyData';
const FiveForceAnalysis = () => {

  const data = [
    { title: 'New Entrants', value: 65, color: '#007bff' }, // Use hex or Tailwind colors
    { title: 'Supplier Power', value: 45, color: '#28a745' },
    { title: 'Buyer Power', value: 80, color: '#6f42c1' },
    { title: 'Substitutes', value: 55, color: '#dc3545' },
  ];
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Porter's Five Forces Analysis</h2>
      <div className='rounded-lg border-[1px] border-gray-200 p-3 mb-4'>
      <IndustryRivalry />
      <FiveForcesBar data={data} />
      </div>
      <div className='rounded-lg border-[1px] border-gray-200 p-3 mb-4'>
      <CustomIconList title={`Actionable Recommendations`} items={KeyDifferentiatorsData.items} Icon={FaCheckCircle} />

      </div>

      <div className='rounded-lg border-[1px] border-gray-200 p-3 mb-4'>
      <h3 className="text-lg font-bold mb-4">AI Insights</h3>
 
      </div>

      <div className='rounded-lg border-[1px] border-gray-200 p-3 mb-4'>
      <h3 className="text-lg font-bold mb-4">Competitive Landscape</h3>
 
      </div>

 
      
      </div>
  )
}

export default FiveForceAnalysis