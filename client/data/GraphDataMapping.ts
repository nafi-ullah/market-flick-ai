/**
 * The return type for our chart data objects.
 * Adjust interface shapes based on your exact needs.
 */
interface PieChartData {
    labels: string[];
    dataValues: number[];
    colors: string[];
  }
  
  interface BarChartData {
    labels: string[];
    dataValues: number[];
    color: string;
  }
  
  interface RadarChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }
  
  interface BubbleChartData {
    datasets: {
      label: string;
      data: { x: number; y: number; r: number }[];
      backgroundColor: string;
    }[];
  }
  
  interface ParsedChartData {
    pieData: PieChartData;
    barChartData: BarChartData;
    radarChartData: RadarChartData;
    bubbleChartData: BubbleChartData;
  }
  
  /**
   * Helper function to parse the "competitors_chart_data" array
   * from the raw content_data string.
   */
  function extractCompetitorsChartData(content_data: string): any[] {
    const startKey = "competitors_chart_data:";
    const startIndex = content_data.indexOf(startKey);
  
    if (startIndex === -1) {
      console.warn("No competitors_chart_data found in content_data.");
      return [];
    }
  
    const substringFromData = content_data.slice(startIndex + startKey.length).trim();
    const firstBracketIndex = substringFromData.indexOf("[");
    const lastBracketIndex = substringFromData.lastIndexOf("]");
  
    if (firstBracketIndex === -1 || lastBracketIndex === -1) {
      console.warn("Malformed competitors_chart_data array in content_data.");
      return [];
    }
  
    // Extract just the array portion
    const arrayString = substringFromData.slice(firstBracketIndex, lastBracketIndex + 1).trim();
  
    // Convert single quotes to double quotes
    // Then convert Pythonic keywords to JSON keywords
    let jsonString = arrayString
      .replace(/'/g, '"')
      .replace(/\bNone\b/g, "null")
      .replace(/\bTrue\b/g, "true")
      .replace(/\bFalse\b/g, "false");
  
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse JSON for competitors_chart_data:", err);
      return [];
    }
  }
  
  
  /**
   * Main function to structure the data into pieData, barChartData,
   * radarChartData, and bubbleChartData.
   */
  export function createChartData(
    content_data: string
  ): ParsedChartData {
    // Initialize with some default empty structures or placeholders:
    let pieData: PieChartData = {
      labels: [],
      dataValues: [],
      colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
    };
  
    let barChartData: BarChartData = {
      labels: [],
      dataValues: [],
      color: "purple",
    };
  
    let radarChartData: RadarChartData = {
      labels: [],
      datasets: [
        {
          label: "Our Company",
          data: [],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "Industry Average",
          data: [],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };
  
    let bubbleChartData: BubbleChartData = {
      datasets: [],
    };
  
    // 1) Extract the array of competitor chart data from the content_data
    const chartDataArray = extractCompetitorsChartData(content_data);
  
    // 2) Iterate over each chart definition and transform
    chartDataArray.forEach((chart) => {
      const { chartType, data, radarData, bubbleData } = chart;
  
      switch (chartType) {
        case "pie":
          // Fill pieData
          pieData = {
            labels: data.map((item: any) => item.label),
            dataValues: data.map((item: any) => item.value),
            // Keep the colors array or generate your own
            colors: pieData.colors,
          };
          break;
  
        case "bar":
          // Fill barChartData
          barChartData = {
            labels: data.map((item: any) => item.label),
            dataValues: data.map((item: any) => item.value),
            color: "purple", // or pick a color from your logic
          };
          break;
  
        case "radar":
          // We’ll assume radarData is an array of attributes
          // with `our_company` and `industry_average`.
          radarChartData.labels = radarData.map((item: any) => item.attribute);
  
          // For the first dataset (Our Company)
          radarChartData.datasets[0].data = radarData.map(
            (item: any) => item.our_company
          );
  
          // For the second dataset (Industry Average)
          radarChartData.datasets[1].data = radarData.map(
            (item: any) => item.industry_average
          );
          break;
  
        case "bubble":
          // bubbleData is an array of objects: { label, x_value, y_value, bubble_size }
          // We'll create a dataset for each bubble.
          // Alternatively, you can group them differently if desired.
          bubbleChartData.datasets = bubbleData.map((item: any) => ({
            label: item.label,
            data: [
              {
                x: item.x_value,
                y: item.y_value,
                r: item.bubble_size,
              },
            ],
            backgroundColor: getRandomColor(),
          }));
          break;
  
        default:
          break;
      }
    });
  
    return { pieData, barChartData, radarChartData, bubbleChartData };
  }
  
  /**
   * Optional: Helper to pick random color for bubble datasets
   * so each competitor can have a different bubble color.
   */
  function getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }
  