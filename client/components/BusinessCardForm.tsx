"use client";
import React, { useState } from 'react';

interface FormData {
  businessSector: string;
  businessIdea: string;
  location: string;
}

const BusinessAnalysisForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessSector: '',
    businessIdea: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Market Flick AI</h1>
      <p className="text-gray-600 mb-6">
        Make informed business decisions with real market data analysis
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Business Sector */}
        <div>
          <label htmlFor="businessSector" className="block text-sm font-medium text-gray-700 mb-1">
            Business Sector
          </label>
          <select
            id="businessSector"
            name="businessSector"
            value={formData.businessSector}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a sector</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Retail">Retail</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Business Idea */}
        <div>
          <label htmlFor="businessIdea" className="block text-sm font-medium text-gray-700 mb-1">
            Business Idea
          </label>
          <textarea
            id="businessIdea"
            name="businessIdea"
            value={formData.businessIdea}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            placeholder="Describe your business idea..."
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter location"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Analyze Market
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessAnalysisForm;
