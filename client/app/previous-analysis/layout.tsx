"use client";
import React from 'react';
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

const DRAWER_WIDTH = 240;

const MENU_ITEMS = [
  {
    text: 'Item 1',
    icon: <TrendingUpIcon />,
    path: '/previous-analysis/64cb3eeb-36fc-4959-a437-37f8a16700eb'
  },
  {
    text: 'Item 2',
    icon: <TrendingUpIcon />,
    path: '/previous-analysis/93bbb14c-06a1-477b-ba14-32a94e33bba4'
  }
];

export default function PreviousAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

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
            {MENU_ITEMS.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => router.push(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        color: pathname === item.path ? 'primary.main' : 'inherit',
                        fontWeight: pathname === item.path ? 500 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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