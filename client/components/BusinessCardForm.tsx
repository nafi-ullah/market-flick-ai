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
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Renewable Energy"
];

const LOCATIONS = [
  "New York, USA",
  "London, UK",
  "Tokyo, Japan",
  "Paris, France",
  "Berlin, Germany",
  "Sydney, Australia",
  "Toronto, Canada",
  "Singapore",
  "Dubai, UAE",
  "Mumbai, India",
  "São Paulo, Brazil",
  "Cape Town, South Africa"
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

        const chunk = decoder.decode(value);
        setStreamData((prev) => [...prev, chunk]);
      }
    } catch (error) {
      console.error("Error streaming data:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      maxWidth: '800px',
      width: '100%',
      mx: 'auto',
      p: 6 
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market Flick AI 🚀
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Make informed business decisions with real market data analysis
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Business Sector */}
        <FormControl fullWidth>
          <InputLabel id="business-sector-label">Business Sector</InputLabel>
          <Select
            labelId="business-sector-label"
            id="businessSector"
            value={formData.businessSector}
            label="Business Sector"
            onChange={(e: any) => handleChange('businessSector')(e, null)}
          >
            {BUSINESS_SECTORS.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            bgcolor: 'black',
            color: 'white',
            '&:hover': {
              bgcolor: 'grey.800',
            },
            mt: 2
          }}
          disabled={isStreaming}
        >
          {isStreaming ? <StackedAnimatedLoader/> : "Analyze Market"}
        </Button>
      </Box>
    </Paper>
  );
};

export default BusinessAnalysisForm;
