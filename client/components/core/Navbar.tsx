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

const Navbar: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        // Handle profile click
        break;
      case 'previous-analysis':
        router.push('/previous-analysis');
        break;
      case 'settings':
        // Handle settings click
        break;
      case 'logout':
        // Handle logout
        break;
    }
    handleClose();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold my-3">
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
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none">
              <FiShare className="mr-2" />
              <span className="text-sm font-medium">Share</span>
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
    </nav>
  );
};

export default Navbar;
