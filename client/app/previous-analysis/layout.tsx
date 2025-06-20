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
  const { user } = useAuth(); // Assuming you have a useAuth hook to get the user context
  useEffect(() => {
    if (!user) return;
    fetch(`${BACKENDURL}/analyses?user_id=${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnalyses(data.analyses);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "hsl(var(--background))" }}>
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
