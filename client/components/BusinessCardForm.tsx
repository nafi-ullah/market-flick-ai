"use client";
import { BACKENDURL } from "@/utils/constants";
import React, { useState } from "react";
import AnalyseLoader from "./loaders/AnalyzeLoader";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import StackedAnimatedLoader from "./loaders/AiLoader";
import { useAuth } from "@/hooks/useAuth";

interface FormDataState {
  businessSector: string;
  businessIdea: string;
  location: string;
  files: File[];
  urls: string[];
  urls_text: string;
}

const BUSINESS_SECTORS = [
  "IT & Technology",
  "AI & Machine Learning",
  "Real Estate",
  "Finance",
  "Healthcare",
  "Retail",
  "Renewable Energy",
  "Education",
  "Food & Beverage",
  "Energy & Utilities",
  "Entertainment",
  "Transportation",
  "Manufacturing",
  "Agriculture",
  "Construction",
  "Tourism & Hospitality",
  "Professional Services",
  "Media & Communications",
  "Automotive",
  "Fashion & Apparel",
  "Sports & Recreation",
  "Beauty & Wellness",
  "Other",
];

const LOCATIONS = [
  "Global",
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Japan",
  "France",
  "Germany",
  "Australia",
  "Canada",
  "India",
  "Brazil",
  "South Africa",
  "China",
  "Korea",
  "Netherlands",
  "Spain",
  "Italy",
  "Russia",
  "Mexico",
  "Singapore",
  "Dubai",
  "Mumbai",
  "São Paulo",
  "Cape Town",
  "Shanghai",
  "Hong Kong",
  "Seoul",
  "Amsterdam",
  "Madrid",
];

const BusinessAnalysisForm = ({
  setStreamData,
}: {
  setStreamData: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const { user} = useAuth();
  
  const [formDataState, setFormDataState] = useState<FormDataState>({
    businessSector: "",
    businessIdea: "",
    location: "",
    files: [],
    urls: [],
    urls_text: "",
  });
  const [isStreaming, setIsStreaming] = useState(false);

  const handleChange =
    (field: keyof FormDataState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | { value: unknown }> | null,
      newValue: string | null
    ) => {
      let value: string;

      if (event === null && newValue !== null) {
        // Handle Autocomplete selection
        value = newValue;
      } else if (event && "target" in event) {
        // Handle regular input changes
        value = event.target.value as string;
      } else {
        return;
      }

      setFormDataState((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "urls" && { urls_text: value }),
      }));
    };

  const handleUrlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urlText = event.target.value;
    // Split by newlines and filter out empty lines
    const urlList = urlText.split("\n").filter((url) => url.trim() !== "");
    setFormDataState((prev) => ({
      ...prev,
      urls: urlList,
      urls_text: urlText,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStreamData([]);
    setIsStreaming(true);

    try {
      const formData = new FormData();
      formData.append("sector", formDataState.businessSector);
      formData.append("idea", formDataState.businessIdea);
      formData.append("location", formDataState.location);

      // Append URLs as a list
      for (const url of formDataState.urls) {
        formData.append("links", url);
      }

      // Append files
      formDataState.files.forEach((file) => {
        formData.append("files", file);
      });
      // Append user ID if available
      if (user && user._id) {
        formData.append("userId", user._id);
      }
      
      const response = await fetch(`${BACKENDURL}/business-analysis`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch streaming data");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunkstr = decoder.decode(value);
        const splitted_chunkstr = chunkstr.split("}{");

        const chunks: string[] = [];
        splitted_chunkstr.forEach((chunk, index) => {
          if (splitted_chunkstr.length == 1) {
            chunks.push(chunk);
          } else if (index === 0) {
            chunks.push(`${chunk}}`);
          } else if (index === splitted_chunkstr.length - 1) {
            chunks.push(`{${chunk}`);
          } else {
            chunks.push(`{${chunk}}`);
          }
        });

        setStreamData((prev) => [
          ...prev,
          ...chunks
            .map((chunk) => {
              try {
                return JSON.parse(chunk);
              } catch (error) {
                console.error("Error parsing JSON:", error, chunk);
                return null;
              }
            })
            .filter(Boolean),
        ]);
      }
    } catch (error) {
      console.error("Error streaming data:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormDataState((prev) => ({ ...prev, files: Array.from(files) }));
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: "800px",
        width: "100%",
        mx: "auto",
        p: 6,
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <Typography
        className="text-center"
        variant="h4"
        component="h1"
        gutterBottom
      >
        Tell us about your business idea
      </Typography>
      <Typography
        className="text-center"
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4, color: "hsl(var(--foreground))" }}
      >
        Make informed business decisions with real market data analysis
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* Business Sector */}
        <Autocomplete
          id="businessSector"
          options={BUSINESS_SECTORS}
          value={formDataState.businessSector}
          onChange={(_, newValue) =>
            handleChange("businessSector")(null, newValue || "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Business Sector"
              sx={{
                "& .MuiInputBase-root": {
                  color: "hsl(var(--foreground))", // Text color
                  backgroundColor: "hsl(var(--background))", // Background color
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--secondary))", // Placeholder/Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "hsl(var(--secondary))", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "hsl(var(--foreground))", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(var(--foreground))", // Focus border color
                  },
                },
              }}
            />
          )}
          slotProps={{
            popper: {
              sx: {
                "& .MuiAutocomplete-paper": {
                  backgroundColor: "hsl(var(--background))", // Dropdown background color
                  color: "hsl(var(--foreground))", // Dropdown text color
                },
                "& .MuiAutocomplete-listbox": {
                  "& .MuiAutocomplete-option": {
                    backgroundColor: "hsl(var(--background))", // Option background
                    color: "hsl(var(--foreground))", // Option text
                    '&[aria-selected="true"]': {
                      backgroundColor: "hsl(var(--secondary))", // Selected option background
                      color: "hsl(var(--foreground))", // Selected option text
                    },
                    "&:hover": {
                      backgroundColor: "hsl(var(--secondary))", // Hover background
                      color: "hsl(var(--foreground))", // Hover text color
                    },
                  },
                },
              },
            },
          }}
          freeSolo
          fullWidth
        />

        {/* Business Idea */}
        <TextField
          id="businessIdea"
          label="Business Idea"
          multiline
          rows={5}
          value={formDataState.businessIdea}
          onChange={(e) => handleChange("businessIdea")(e, null)}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              color: "hsl(var(--foreground))", // Text color
              backgroundColor: "hsl(var(--background))", // Background color
            },
            "& .MuiInputLabel-root": {
              color: "hsl(var(--secondary))", // Placeholder/Label color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "hsl(var(--secondary))", // Border color
              },
              "&:hover fieldset": {
                borderColor: "hsl(var(--foreground))", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "hsl(var(--foreground))", // Focus border color
              },
            },
          }}
        />

        {/* Location */}
        <Autocomplete
          id="location"
          options={LOCATIONS}
          value={formDataState.location}
          onChange={(_, newValue) =>
            handleChange("location")(null, newValue || "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              sx={{
                "& .MuiInputBase-root": {
                  color: "hsl(var(--foreground))", // Text color
                  backgroundColor: "hsl(var(--background))", // Background color
                },
                "& .MuiInputLabel-root": {
                  color: "hsl(var(--secondary))", // Placeholder/Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "hsl(var(--secondary))", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "hsl(var(--foreground))", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "hsl(var(--foreground))", // Focus border color
                  },
                },
              }}
            />
          )}
          slotProps={{
            popper: {
              sx: {
                "& .MuiAutocomplete-paper": {
                  backgroundColor: "hsl(var(--background))", // Dropdown background color
                  color: "hsl(var(--foreground))", // Dropdown text color
                },
                "& .MuiAutocomplete-listbox": {
                  "& .MuiAutocomplete-option": {
                    backgroundColor: "hsl(var(--background))", // Option background
                    color: "hsl(var(--foreground))", // Option text
                    '&[aria-selected="true"]': {
                      backgroundColor: "hsl(var(--secondary))", // Selected option background
                      color: "hsl(var(--foreground))", // Selected option text
                    },
                    "&:hover": {
                      backgroundColor: "hsl(var(--secondary))", // Hover background
                      color: "hsl(var(--foreground))", // Hover text color
                    },
                  },
                },
              },
            },
          }}
          freeSolo
          fullWidth
        />

        {/* File Upload */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            color: "hsl(var(--foreground))",
            backgroundColor: "hsl(var(--background))",
            padding: "8px",
            border: "1px solid hsl(var(--secondary))",
            borderRadius: "4px",
            width: "100%",
          }}
        />

        {/* URLs */}
        <TextField
          id="urls"
          label="Web URLs (one per line)"
          multiline
          rows={3}
          value={formDataState.urls_text}
          onChange={handleUrlChange}
          fullWidth
          placeholder="Enter URLs related to your business idea"
          sx={{
            "& .MuiInputBase-root": {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--background))",
            },
            "& .MuiInputLabel-root": {
              color: "hsl(var(--secondary))",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "hsl(var(--secondary))",
              },
              "&:hover fieldset": {
                borderColor: "hsl(var(--foreground))",
              },
              "&.Mui-focused fieldset": {
                borderColor: "hsl(var(--foreground))",
              },
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: "hsl(var(--foreground))", // Button background color
            color: "hsl(var(--background))", // Button text color
            "&:hover": {
              bgcolor: "hsl(var(--secondary))", // Hover button background
              color: "hsl(var(--foreground))", // Hover button text color
            },
            mt: 2,
          }}
          disabled={isStreaming}
        >
          {isStreaming ? <StackedAnimatedLoader /> : "Analyze Market"}
        </Button>
      </Box>
    </Paper>
  );
};

export default BusinessAnalysisForm;
