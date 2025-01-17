"use client";
import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import { 
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { BACKENDURL } from '@/utils/constants';
import IndividualLoader from '@/components/loaders/IndividualLoader';

const DRAWER_WIDTH = 240;
 

export default function PreviousAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKENDURL}/analyses`)
    .then(res => res.json())
    .then(data => {
      setAnalyses(data.analyses);
      setIsLoading(false);
    })
    .catch(error => console.error('Error fetching analyses:', error));
  }, []);

 

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        
      >
        <Box sx={{ overflow: 'auto', mt: 8 }}>  {/* Added margin top to account for navbar */}
          <Typography
            variant="h6"
            sx={{
              px: 3,
              py: 2,
              color: theme.palette.text.secondary
            }}
          >
            Previous Analysis
          </Typography>
          <List className='mt-4'>
            {analyses.map((uid, idx) => {
            const path = `/previous-analysis/${uid}`;
            
            return (
              <ListItem key={`Item ${idx + 1}`} disablePadding>
                <ListItemButton
                  selected={pathname === path}
                  onClick={() => router.push(path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: pathname === path ? 'primary.main' : 'inherit' }}>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Item ${idx + 1}`}
                    sx={{
                      '& .MuiTypography-root': {
                        color: pathname === path ? 'primary.main' : 'inherit',
                        fontWeight: pathname === path ? 500 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
            })}
          </List>
          {isLoading && <IndividualLoader />}
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 