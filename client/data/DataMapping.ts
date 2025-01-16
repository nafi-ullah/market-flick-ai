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


  interface AnalysisData {
    company: string;
    valuation: string;
    money_raised: string;
    key_focus: string;
  }
  
  export function parseMarketPlayerData(content: string): AnalysisData[] {
    // Extract the market_player_table_data part using a regex
    const marketPlayerDataMatch = content.match(/market_player_table_data: (\[.*?\])/);
    if (!marketPlayerDataMatch) {
      throw new Error("No market_player_table_data found in contentData");
    }
  
    // Parse the extracted JSON string into an array
    const marketPlayerData = JSON.parse(marketPlayerDataMatch[1].replace(/'/g, '"')); // Replace single quotes with double quotes for valid JSON
  
    // Map the data to the desired analysis_data format
    const analysisData: AnalysisData[] = marketPlayerData.map((player: any) => ({
      company: player.company_name || "N/A",
      valuation: player.valuation || "N/A",
      money_raised: player.money_raised || "N/A",
      key_focus: player.key_focus || "N/A",
    }));
  
    return analysisData;
  }
  
  


  interface ParsedData {
    markdowndata: string[];
    references_array: { [key: string]: string };
  }
  
  export function parseMarkdownContentData(contentData: string): ParsedData {
    // Adjust regex to avoid using the /s flag
    const markdownMatch = contentData.match(/knowledge_base: ([\s\S]*?)(?=search_queries:|$)/);
    let markdownContent = markdownMatch ? markdownMatch[1].trim() : "";
    // remove first and last quotes if present
    markdownContent = markdownContent.replace(/^"|"$/g, "");
        
    // Extract references section
    // const referencesMatch = markdowndata.match(/#### 6. References\n([\s\S]*?)(?=\n####|$)/);
    // const referencesSection = referencesMatch ? referencesMatch[1].trim() : "";
  
    // Parse references into an object
    const references_array: { [key: string]: string } = {};
    // const referenceRegex = /- \[(.*?)\]\((.*?)\)/g;
    // let match;
    // while ((match = referenceRegex.exec(referencesSection)) !== null) {
    //   const [_, name, url] = match;
    //   references_array[name] = url;
    // }
  
    return { markdowndata: markdownContent.split("\\n"), references_array };
  }
  