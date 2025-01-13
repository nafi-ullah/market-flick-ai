import React from 'react'
import StarRating from '../common/StarRating'

const IndustryRivalry = () => {
  return (
    <div className="bg-white rounded-lg p-6 text-cente flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Industry Rivalry</h2>
      <StarRating value={4.5} />
      <p className="text-sm text-gray-500 mt-2">High Competition</p>
    </div>
  )
}

export default IndustryRivalry