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

interface MarketSizeAnalysisOutput {
  chartData: MarketSizeAnalysisCardchartData;
  sources: string[];
}

export function parseMarketSizeData(
  content_data: string
): MarketSizeAnalysisOutput | null {
  // 1. Extract the substring that contains market size data points.
  const regex = /market_size_data_points:\s(\{[\s\S]*?\})\s*market_size_plot_id:/;
  const match = content_data.match(regex);
  if (!match || match.length < 2) {
    console.error("Unable to locate market_size_data_points in content_data");
    return null;
  }

  let marketSizeDataString: string = match[1];

  // 2. Convert Python-style dictionary to JSON-style string:
  //    - Replace single quotes with double quotes
  //    - Convert Python booleans (True/False) to JS (true/false)
  //    - Convert None to null
  marketSizeDataString = marketSizeDataString
    .replace(/'/g, '"')
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/None/g, "null");

  // 3. Parse the JSON string into an object
  let marketSizeData: MarketSizeData;
  try {
    marketSizeData = JSON.parse(marketSizeDataString);
  } catch (err) {
    console.error("Error parsing JSON from market_size_data_points:", err);
    return null;
  }

  const { sources, data_points } = marketSizeData;
  if (!Array.isArray(data_points)) {
    console.error("data_points is not an array");
    return null;
  }

  // 4. Prepare labels (years) and separate data arrays for TAM, SAM, and SOM
  const labels: string[] = [];
  const tamData: number[] = [];
  const samData: number[] = [];
  const somData: number[] = [];

  data_points.forEach((dp) => {
    // Extract the year from point_date (e.g., "2024" from "2024-01-01")
    const year = dp.point_date.split("-")[0];
    labels.push(year);
    tamData.push(dp.tam);
    samData.push(dp.sam);
    somData.push(dp.som);
  });

  // 5. Construct the chart data object with your preferred colors
  const chartData: MarketSizeAnalysisCardchartData = {
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

  // 6. Return both chartData and sources
  return {
    chartData,
    sources,
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
