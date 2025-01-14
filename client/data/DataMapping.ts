interface MarketSizeAnalysisCardchartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }
  
 export function parseMarketSizeData(contentData: string): MarketSizeAnalysisCardchartData {
    // Extract the market_size_data_points part
    const marketSizeDataMatch = contentData.match(/market_size_data_points: (\[.*?\])/);
    if (!marketSizeDataMatch) {
      throw new Error("No market_size_data_points found in contentData");
    }
  
    const marketSizeDataPoints = JSON.parse(marketSizeDataMatch[1].replace(/'/g, '"')); // Replace single quotes with double quotes for valid JSON
  
    // Extract labels and data for TAM, SAM, and SOM
    const labels: string[] = marketSizeDataPoints.map((point: any) => point.point_date.split("-")[0]);
    const tamData: number[] = marketSizeDataPoints.map((point: any) => point.tam);
    const samData: number[] = marketSizeDataPoints.map((point: any) => point.sam);
    const somData: number[] = marketSizeDataPoints.map((point: any) => point.som);
  
    // Return the structured object
    return {
      labels,
      datasets: [
        {
          label: "TAM",
          data: tamData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "SAM",
          data: samData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "SOM",
          data: somData,
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
      ],
    };
  }
  
  // Example Usage
  
  