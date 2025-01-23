"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import FireLoader from '@/components/loaders/FireLoader';
import FetchMetadata from '@/components/common/Sources/FetchMetaData';
import SampleDashboard from '@/components/common/Sources/SampleDashboard';
import SourceCard from '@/components/common/Sources/SourceCard';

export default function PreviousAnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ mt: 8, px: 4 }}>
      {isLoading ? (
        <Box sx={{ width: '100%', mt: 4 }}>
          <FireLoader />
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            Loading previous analyses...
          </Typography>
        </Box>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            backgroundColor: 'transparent'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Previous Analysis
          </Typography>
          {/* <SampleDashboard/>
          <FetchMetadata/> */}
          <SourceCard
              websiteName="NerdWallet"
              articleTitle="How to Reduce Your Tax Bill: 12 Tips and Tricks"
              description="Learn how to lower your tax bill with these actionable tips. "
              image="./avatar.png"
          />
          <Typography variant="body1" color="text.secondary">
            Select an analysis from the sidebar to view details
          </Typography>
        </Paper>
      )}
    </Box>
  );
} 