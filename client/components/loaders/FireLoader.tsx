"use client";
import React from 'react';
import { Box, LinearProgress, keyframes } from '@mui/material';

const fireAnimation = keyframes`
  0% {
    background-position: 0% center;
    background-size: 200% auto;
    filter: brightness(1) hue-rotate(0deg) saturate(1.2);
  }
  33% {
    background-size: 250% auto;
    filter: brightness(1.3) hue-rotate(5deg) saturate(1.4);
  }
  66% {
    background-size: 230% auto;
    filter: brightness(1.2) hue-rotate(-5deg) saturate(1.3);
  }
  100% {
    background-position: -200% center;
    background-size: 200% auto;
    filter: brightness(1) hue-rotate(0deg) saturate(1.2);
  }
`;

const sparkleAnimation = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1) translateY(0);
  }
  25% {
    opacity: 1;
    transform: scale(1.2) translateY(-1px);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8) translateY(1px);
  }
  75% {
    opacity: 0.9;
    transform: scale(1.1) translateY(-0.5px);
  }
`;

const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 5px #FF8C00,
      0 0 10px #FFA500,
      0 0 15px #FFD700,
      0 0 20px rgba(255, 140, 0, 0.3);
    transform: scale(1);
  }
  25% {
    box-shadow: 
      0 0 8px #FF8C00,
      0 0 15px #FFA500,
      0 0 20px #FFD700,
      0 0 25px rgba(255, 140, 0, 0.5);
    transform: scale(1.02) translateX(1px);
  }
  50% {
    box-shadow: 
      0 0 10px #FF8C00,
      0 0 20px #FFA500,
      0 0 25px #FFD700,
      0 0 30px rgba(255, 140, 0, 0.4);
    transform: scale(1.03) translateX(-1px);
  }
  75% {
    box-shadow: 
      0 0 7px #FF8C00,
      0 0 14px #FFA500,
      0 0 21px #FFD700,
      0 0 28px rgba(255, 140, 0, 0.3);
    transform: scale(1.01) translateX(0.5px);
  }
`;

const FireLoader = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      position: 'relative',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '85%',
        height: '200%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255,140,0,0.1) 0%, rgba(255,165,0,0.05) 50%, rgba(0,0,0,0) 70%)',
        animation: `${sparkleAnimation} 3s ease-in-out infinite`,
        pointerEvents: 'none',
      }
    }}>
      <LinearProgress
        sx={{
          height: 10,
          width: '80%',
          borderRadius: 5,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,165,0,0.1) 10px, rgba(255,165,0,0.1) 20px)',
            animation: `${sparkleAnimation} 4s linear infinite`,
          },
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(
              90deg,
              #FF8C00 0%,
              #FFA500 20%,
              #FF4500 40%,
              #FF8C00 60%,
              #FFA500 80%,
              #FF4500 100%
            )`,
            backgroundSize: '200% auto',
            animation: `
              ${fireAnimation} 2s ease-in-out infinite,
              ${glowAnimation} 3s ease-in-out infinite
            `,
            transition: 'all 0.3s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'translateX(-100%)',
              animation: `${sparkleAnimation} 2s linear infinite`,
            }
          },
          backgroundColor: 'rgba(255, 140, 0, 0.15)',
          '&:hover': {
            transform: 'scale(1.01)',
            '& .MuiLinearProgress-bar': {
              animationDuration: '1.5s, 2s',
              filter: 'brightness(1.2)',
            },
          },
        }}
      />
    </Box>
  );
};

export default FireLoader; 