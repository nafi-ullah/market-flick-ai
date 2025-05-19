'use client';

import { useEffect, useState } from 'react';

const SampleDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/hello');
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className='bg-white text-black'>
      <h1>Dashboard</h1>
      <p>API Response: {message}</p>
    </div>
  );
};

export default SampleDashboard;
