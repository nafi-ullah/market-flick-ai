'use client'
 
import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
 
const loadingTexts = [
  "Searching the web for the latest business insights...",
  "Gathering market data and analyzing trends...",
  "Combining findings into actionable strategies...",
  "Refining the results for a comprehensive report...",
  "Preparing your tailored business roadmap..."
]
 
export default function StackedAnimatedLoader() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(loadingTexts.length).fill(false))
 
  useEffect(() => {
    if (currentTextIndex >= loadingTexts.length) return
 
    const timer = setTimeout(() => {
      setCompletedSteps(prev => {
        const newCompleted = [...prev]
        newCompleted[currentTextIndex] = true
        return newCompleted
      })
      setTimeout(() => {
        setCurrentTextIndex(prevIndex => prevIndex + 1)
      }, 1000) // Wait 1 second after completing before moving to next step
    }, 5000) // Show each text for 5 seconds
 
    return () => clearTimeout(timer)
  }, [currentTextIndex])
 
  return (
    <div className="flex items-center justify-center  bg-gray-100 text-md">
      <div className="max-w-md w-full p-3 bg-white rounded-lg shadow-lg">
        {loadingTexts.map((text, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="w-6 h-6 mt-1 mr-4 flex-shrink-0">
              {completedSteps[index] ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : index === currentTextIndex ? (
                <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              )}
            </div>
            <p className={`text-md ${index <= currentTextIndex ? 'text-gray-800' : 'text-gray-400'}`}>
              {text}
            </p>
          </div>
        ))}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentTextIndex + 1) / loadingTexts.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}