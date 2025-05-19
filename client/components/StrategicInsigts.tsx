import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FcIdea } from "react-icons/fc";
import CustomIconList from './common/Customiconlist'
import { KeyDifferentiatorsData, StrategicRecData } from "@/data/DummyData";
const StrategicInsigtsCard = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">Strategic Insights</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 '>
      <CustomIconList title={KeyDifferentiatorsData.title} items={KeyDifferentiatorsData.items} Icon={FaCheckCircle} />
      <CustomIconList title={StrategicRecData.title} items={StrategicRecData.items} Icon={FcIdea} />
      </div>
    </div>
  )
}

export default StrategicInsigtsCard