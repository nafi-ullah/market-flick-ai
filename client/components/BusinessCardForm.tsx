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
  Box
} from '@mui/material';
import StackedAnimatedLoader from "./loaders/AiLoader";

interface FormData {
  businessSector: string;
  businessIdea: string;
  location: string;
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
  "Other"
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

const BusinessAnalysisForm = ({ setStreamData }: { setStreamData: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [formData, setFormData] = useState<FormData>({
    businessSector: "",
    businessIdea: "",
    location: "",
  });
  const [isStreaming, setIsStreaming] = useState(false);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }> | null,
    newValue: string | null
  ) => {
    let value: string;
    
    if (event === null && newValue !== null) {
      // Handle Autocomplete selection
      value = newValue;
    } else if (event && 'target' in event) {
      // Handle regular input changes
      value = event.target.value as string;
    } else {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStreamData([]);
    setIsStreaming(true);

    const payload = {
      sector: formData.businessSector,
      idea: formData.businessIdea,
      location: formData.location,
    };

    try {
      const response = await fetch(`${BACKENDURL}/business-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        const splitted_chunkstr = chunkstr.split("}{")
        
        const chunks: string[] = [];
        splitted_chunkstr.forEach((chunk, index) => {
          if (splitted_chunkstr.length == 1) {
            chunks.push(chunk);
          }
          else if (index === 0) {
            chunks.push(`${chunk}}`);
          } else if (index === splitted_chunkstr.length - 1) {
            chunks.push(`{${chunk}`);
          } else {
            chunks.push(`{${chunk}}`);
          }
        });

        setStreamData(prev => [...prev, ...chunks.map(chunk => {
          try {
            return JSON.parse(chunk);
          } catch (error) {
            console.error("Error parsing JSON:", error, chunk);
            return null;
          }
        }).filter(Boolean)]);
      }

  
 

    } catch (error) {
      console.error("Error streaming data:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
<Paper
  elevation={3}
  sx={{
    maxWidth: '800px',
    width: '100%',
    mx: 'auto',
    p: 6,
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  }}
>
  <Typography variant="h4" component="h1" gutterBottom>
    Market Flick AI 🚀
  </Typography>
  <Typography
    variant="subtitle1"
    color="text.secondary"
    sx={{ mb: 4, color: 'hsl(var(--foreground))' }}
  >
    Make informed business decisions with real market data analysis
  </Typography>

  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {/* Business Sector */}
    <Autocomplete
      id="businessSector"
      options={BUSINESS_SECTORS}
      value={formData.businessSector}
      onChange={(_, newValue) => handleChange('businessSector')(null, newValue || '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Business Sector"
          placeholder="Search for a sector..."
          sx={{
            '& .MuiInputBase-root': {
              color: 'hsl(var(--foreground))', // Text color
              backgroundColor: 'hsl(var(--background))', // Background color
            },
            '& .MuiInputLabel-root': {
              color: 'hsl(var(--secondary))', // Placeholder/Label color
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--secondary))', // Border color
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--foreground))', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--foreground))', // Focus border color
              },
            },
          }}
        />
      )}
      freeSolo
      fullWidth
    />

    {/* Business Idea */}
    <TextField
      id="businessIdea"
      label="Business Idea"
      multiline
      rows={5}
      value={formData.businessIdea}
      onChange={(e) => handleChange('businessIdea')(e, null)}
      placeholder="Describe your business idea..."
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          color: 'hsl(var(--foreground))', // Text color
          backgroundColor: 'hsl(var(--background))', // Background color
        },
        '& .MuiInputLabel-root': {
          color: 'hsl(var(--secondary))', // Placeholder/Label color
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'hsl(var(--secondary))', // Border color
          },
          '&:hover fieldset': {
            borderColor: 'hsl(var(--foreground))', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: 'hsl(var(--foreground))', // Focus border color
          },
        },
      }}
    />

    {/* Location */}
    <Autocomplete
      id="location"
      options={LOCATIONS}
      value={formData.location}
      onChange={(_, newValue) => handleChange('location')(null, newValue || '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          placeholder="Search for a location..."
          sx={{
            '& .MuiInputBase-root': {
              color: 'hsl(var(--foreground))', // Text color
              backgroundColor: 'hsl(var(--background))', // Background color
            },
            '& .MuiInputLabel-root': {
              color: 'hsl(var(--secondary))', // Placeholder/Label color
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--secondary))', // Border color
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--foreground))', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--foreground))', // Focus border color
              },
            },
          }}
        />
      )}
      freeSolo
      fullWidth
    />

    {/* Submit Button */}
    <Button
      type="submit"
      variant="contained"
      size="large"
      sx={{
        bgcolor: 'hsl(var(--foreground))', // Button background color
        color: 'hsl(var(--background))', // Button text color
        '&:hover': {
          bgcolor: 'hsl(var(--secondary))', // Hover button background
          color: 'hsl(var(--foreground))', // Hover button text color
        },
        mt: 2,
      }}
      disabled={isStreaming}
    >
      {isStreaming ? <StackedAnimatedLoader /> : 'Analyze Market'}
    </Button>
  </Box>
</Paper>

  );
};

export default BusinessAnalysisForm;
