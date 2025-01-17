interface MarketSizeAnalysisCardchartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}


interface MarketSizeDataPoint {
  point_date: string;
  tam: number;
  sam: number;
  som: number;
}

interface MarketSizeData {
  sources: string[];
  data_points: MarketSizeDataPoint[];
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface MarketSizeAnalysisCardchartData {
  labels: string[];
  datasets: ChartDataset[];
}

export function parseMarketSizeData(
  contentData: string
): MarketSizeAnalysisCardchartData | null {
  // 1. Extract the substring that contains market size data points.
  const regex = /market_size_data_points:\s(\{[\s\S]*?\})\s*market_size_plot_id:/;
  const match = contentData.match(regex);
  if (!match || match.length < 2) {
    console.error("Unable to locate market_size_data_points in content_data");
    console.log("No market_size_data_points found in contentData");
    return {
      labels: [],
      datasets: [],
    };
  }

  let marketSizeDataString: string = match[1];

  // 2. Convert Python-style dictionary to JSON-style string.
  //    a. Replace single quotes around keys/values with double quotes
  //    b. Make sure the structure is valid JSON.
  marketSizeDataString = marketSizeDataString
    .replace(/'/g, '"')
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/None/g, "null");

  // 3. Parse the cleaned-up JSON string
  let marketSizeData: MarketSizeData;
  try {
    marketSizeData = JSON.parse(marketSizeDataString);
  } catch (err) {
    console.error("Error parsing JSON from market_size_data_points:", err);
    console.log("No market_size_data_points found in contentData");
    return {
      labels: [],
      datasets: [],
    };
  }

  // 4. Extract data_points array
  const { data_points } = marketSizeData;
  if (!Array.isArray(data_points)) {
    console.log("No market_size_data_points found in contentData");
    return {
      labels: [],
      datasets: [],
    };
  }

  // 5. Prepare labels and data arrays for TAM, SAM, and SOM
  const labels: string[] = [];
  const tamData: number[] = [];
  const samData: number[] = [];
  const somData: number[] = [];

  data_points.forEach((dp) => {
    // Each dp has structure: { point_date, tam, sam, som }
    // Extract just the year (e.g., "2024" from "2024-01-01")
    const year = dp.point_date.split("-")[0];
    labels.push(year);
    tamData.push(dp.tam);
    samData.push(dp.sam);
    somData.push(dp.som);
  });

  // 6. Build the final chart data object using your desired colors
  const MarketSizeAnalysisCardchartData: MarketSizeAnalysisCardchartData = {
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

  return MarketSizeAnalysisCardchartData;
}

// Example usage:
// const content_data = `Node: market_size_graph ('content', 'Market size report generated with ID: 48fec11d-da36-4737-84fd-c9e605aa2229') ('additional_kwargs', {}) ('response_metadata', {}) ('type', 'ai') ('name', None) ('id', '6c466bad-1a64-487f-a480-f376356e06a4') ('example', False) ('tool_calls', []) ('invalid_tool_calls', []) ('usage_metadata', None) messages: content='Market size report generated with ID: 48fec11d-da36-4737-84fd-c9e605aa2229' additional_kwargs={} response_metadata={} id='6c466bad-1a64-487f-a480-f376356e06a4' market_size_data_points: {'sources': ['Assumptions based on typical market growth rates and demographic distribution'], 'data_points': [{'point_date': '2024-01-01', 'tam': 100.0, 'sam': 15.0, 'som': 1.5}, {'point_date': '2025-01-01', 'tam': 105.0, 'sam': 15.75, 'som': 1.53}, {'point_date': '2026-01-01', 'tam': 110.25, 'sam': 16.5375, 'som': 1.56}, {'point_date': '2027-01-01', 'tam': 115.7625, 'sam': 17.364375, 'som': 1.59}, {'point_date': '2028-01-01', 'tam': 121.550625, 'sam': 18.23259375, 'som': 1.62}]} market_size_plot_id: 48fec11d-da36-4737-84fd-c9e605aa2229`;

// const chartData = convertContentDataToMarketSizeAnalysisCardchartData(content_data);
// console.log(chartData);


export function PreveiousparseMarketSizeData(
  contentData: string
): MarketSizeAnalysisCardchartData {
  // Extract the market_size_data_points part



  

  const marketSizeDataPointsString = "gg";
  if (!marketSizeDataPointsString) {
    // throw new Error("No market_size_data_points found in contentData");
    console.log("No market_size_data_points found in contentData");
    return {
      labels: [],
      datasets: [],
    };
  }





  const marketSizeDataPoints = JSON.parse(
    marketSizeDataPointsString.replace(/'/g, '"')
  );

  // Extract relevant data
  const labels: string[] = marketSizeDataPoints.data_points.map((dp: any) =>
    dp.point_date.split("-")[0]
  );
  const tamData: number[] = marketSizeDataPoints.data_points.map((dp: any) => dp.tam);
  const samData: number[] = marketSizeDataPoints.data_points.map((dp: any) => dp.sam);
  const somData: number[] = marketSizeDataPoints.data_points.map((dp: any) => dp.som);

  // Create the MarketSizeAnalysisCardchartData object
  const MarketSizeAnalysisCardchartData = {
    labels: labels,
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

  return MarketSizeAnalysisCardchartData;
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
  const marketPlayerDataMatch = content.match(
    /market_player_table_data: (\[.*?\])/
  );
  if (!marketPlayerDataMatch) {
    throw new Error("No market_player_table_data found in contentData");
  }

  // Parse the extracted JSON string into an array
  const marketPlayerData = JSON.parse(
    marketPlayerDataMatch[1].replace(/'/g, '"')
  ); // Replace single quotes with double quotes for valid JSON

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
  const markdownMatch = contentData.match(
    /knowledge_base: ([\s\S]*?)(?=search_queries:|$)/
  );
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
