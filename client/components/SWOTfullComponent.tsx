import { swotdata } from '@/data/DummyData'
import React from 'react'
import SwotDetailedCard from './common/SWOTCard'

const SWOTfullComponent = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-4xl mx-auto my-6">
      <h2 className="text-lg font-bold mb-4">AIDA Model Analysis</h2>SWOTcomponent
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
  )
}

export default SWOTfullComponent