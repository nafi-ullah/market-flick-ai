"use client"

import React, { useState } from "react";
import { FiShare } from "react-icons/fi";
import Image from "next/image";
import { 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Avatar
} from "@mui/material";
import { 
  Person as PersonIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import SocialShare from "../features/ShareCards";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case 'profile':
        router.push('/profile');
        break;
      case 'previous-analysis':
        router.push('/previous-analysis');
        break;
      case 'settings':
        // Handle settings click
        break;
      case 'logout':
        logout();
        break;
    }
    handleClose();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">

            <span 
            onClick={()=>{
              window.location.href='analyze'
            }}
            className="text-xl font-bold my-3 cursor-pointer">

           

              <Image
                src="/marktelogo.png"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
            </span> 
          </div>

          {/* Right: Share button and avatar */}
          <div className="flex items-center space-x-4">
            {/* Share Button */}
            <button 
            onClick={()=>{
              window.location.href = "/investor";
            }}
            className="flex items-center px-4 py-2 bg-[hsl(var(--foreground))] border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none">
             
              <span className="text-sm font-medium text-[hsl(var(--background))]">Investor</span>
            </button>
            <button 
            onClick={()=>{
              setIsShareModalOpened(true);
            }}
            className="flex items-center px-4 py-2 bg-[hsl(var(--foreground))] border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none">
              <FiShare className="mr-2 text-[hsl(var(--background))] " />
              <span className="text-sm font-medium text-[hsl(var(--background))]">Share</span>
            </button>

            {/* Avatar with Dropdown */}
            <div 
              className="w-8 h-8 cursor-pointer"
              onClick={handleClick}
              aria-controls={open ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                src="/avatar.png"
                alt="User Avatar"
                sx={{ 
                  width: 32, 
                  height: 32,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  }
                }}
              />
            </div>

            {/* Profile Menu */}
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    margin: '2px 8px',
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => handleMenuItemClick('profile')}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Personal Information</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleMenuItemClick('previous-analysis')}>
                <ListItemIcon>
                  <HistoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Previous Analysis</ListItemText>
              </MenuItem>

              <Divider sx={{ my: 1, mx: 2 }} />

              <MenuItem onClick={() => handleMenuItemClick('settings')}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleMenuItemClick('logout')}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      {isShareModalOpened &&  <div
          className="fixed inset-0 bg-opacity-80 bg-black flex justify-center items-center w-screen h-screen p-5 md:p-10 z-50"
          onClick={() => {
           
          }}
        >
          <div
            className="bg-gray-900 text-black rounded-xl w-full h-auto max-w-[600px] flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
           
            <SocialShare onClick={()=>{setIsShareModalOpened(false)}}/> 
          </div>
          </div>
          }
    </nav>
  );
};

export default Navbar;
