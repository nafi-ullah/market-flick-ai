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
import { Button } from "../ui/button";
import { Loader, PlusSquare } from "lucide-react";
import { useAnalysisDataContext } from "@/context/AnalysisContext";


interface BasicInfo {
  title: string;
  date: string;
  business_idea: string;
  business_sector: string;
  business_location: string;
}

interface AnalysisData {
  basic_info_id: string;
  basic_info: BasicInfo;
}
export default function Leftbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {setAnalysisData} = useAnalysisDataContext();
  useEffect(() => {
    fetch(`${BACKENDURL}/analyses`)
      .then((res) => res.json())
      .then((data) => {
        console.log("~~~ data", data);
        setAnalyses(
          data.analyses.filter((analysis) => analysis && analysis["basic_info"])
        );

        const filteredData = data.analyses
          .filter((analysis: any) => analysis && analysis["basic_info"])
          .map((analysis: AnalysisData) => ({
            basic_info_id: analysis.basic_info_id,
            basic_info: analysis.basic_info,
          }));
        console.log("Filtered Data:", filteredData);
        setAnalysisData(filteredData);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching analyses:", error));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            px: 3,
            py: 2,
            color: "hsl(var(--foreground))",
          }}
        >
          Market Flick AI
        </Typography>
        <PlusSquare
          color="#ffffff"
          onClick={() => (window.location.href = "/analyze")}
          className="cursor-pointer"
        />
      </Box>

      <hr />
      <Typography
        variant="h6"
        sx={{
          px: 3,
          py: 2,
          fontSize: 16,
          color: "hsl(var(--foreground))",
        }}
      >
        Analysis history
      </Typography>
      <Box
        sx={{
          mx: "auto",
          backgroundColor: "hsl(var(--accent))",
          overflow: "auto",
          width: "100%",
        }}
      >
        <List
          sx={{
            overflow: "auto",
          }}
        >
          {analyses.map((analysis, idx) => {
            const path = `/previous-analysis/${analysis["basic_info_id"]}`;
            return (
              <ListItem key={`Item ${idx + 1}`} disablePadding>
                <ListItemButton
                  selected={pathname === path}
                  onClick={() => router.push(path)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: pathname === path ? "primary.main" : "inherit",
                    }}
                  >
                    <BarChartIcon className="text-[hsl(var(--foreground))]" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${analysis["basic_info"]["title"]}`}
                    sx={{
                      "& .MuiTypography-root": {
                        color:
                          pathname === path
                            ? "primary.main"
                            : "hsl(var(--foreground))",
                        fontWeight: pathname === path ? 500 : 400,
                        fontSize: 14,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" color="hsl(var(--foreground))" />
        </div>
      )}
    </>
  );
}
