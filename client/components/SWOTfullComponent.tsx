import { swotdata, TeamcollaborationData } from '@/data/DummyData'
import React from 'react'
import SwotDetailedCard from './common/SWOTCard'
import TeamCollaboration from './subcomponent/TeamCollaboration'

const SWOTfullComponent = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">AIDA Model Analysis</h2>SWOTcomponent
      <div className=" bg-gray-50 grid grid-cols-2 justify-center gap-6 p-4">
      {swotdata.map((card, index) => (
        <SwotDetailedCard
          key={index}
          showPrompts={card.showPrompts}
          title={card.title}
          tips={card.tips}
          values={card.values}
          aiSuggestion={card.aiSuggestion}
          cardColor={card.cardColor}
        />
      ))}
      </div>

      <div className="w-full bg-gray-50 flex items-center justify-center p-4">
      <TeamCollaboration data={TeamcollaborationData} />
    </div>
      
      </div>
  )
}

export default SWOTfullComponent