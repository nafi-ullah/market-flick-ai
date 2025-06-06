"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { BACKENDURL } from "@/utils/constants";
import IndividualLoader from "@/components/loaders/IndividualLoader";
import Leftbar from "@/components/leftbar/Leftbar";
import { useAuth } from "@/hooks/useAuth";

const DRAWER_WIDTH = 250;

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
     const { user} = useAuth();
 
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!user) {
      setIsLoading(false);
      return;
    }
    
    fetch(`/analyses?user_id=${user?._id ?? ''}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
        }
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          const text = await res.text();
          throw new Error(`Expected JSON, got: ${text}`);
        }
      })
      .then((data) => {
        
        setAnalyses(data.analyses);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching analyses:", error);
      });
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "hsl(var(--background))",
        overflow: "none",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: "hsl(var(--accent))",
          },
        }}
      >
        <Leftbar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          minHeight: "100vh",
          backgroundColor: "hsl(var(--background))",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
