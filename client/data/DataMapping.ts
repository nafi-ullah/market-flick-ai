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
  marketSizeData: {
    sources: string[];
    data_points: MarketSizeDataPoint[];
  }
): MarketSizeAnalysisOutput | null {
  
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

interface TableData {
  company: string;
  valuation: string;
  money_raised: string;
  key_focus: string;
}

interface AnalysisData {
  competitors: TableData[];
  sources: string[];
}

export function parseMarketPlayerData(marketPlayerData: {
  competitors:  {
    company_name: string;
    valuation: string;
    money_raised: string;
    key_focus: string;
  }[];
  sources: string[];
}): AnalysisData {
   
  // Map the data to the desired analysis_data format
  const competitors: TableData[] = marketPlayerData.competitors.map(
    (player: any) => ({
      company: player.company_name || "N/A",
      valuation: player.valuation || "N/A",
      money_raised: player.money_raised || "N/A",
      key_focus: player.key_focus || "N/A",
    })
  );
  const sources: string[] = marketPlayerData.sources;

  const analysisData: AnalysisData = {
    competitors,
    sources,
  };

  return analysisData;
}

interface ParsedData {
  markdowndata: string[];
  references_array: { [key: string]: string };
}

export function parseMarkdownContentData(contentData: string): ParsedData {
 
  let markdownContent = contentData
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
