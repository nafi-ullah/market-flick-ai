interface PieChartData {
  labels: string[];
  dataValues: number[];
  colors: string[];
  soures: string[]; // spelled as in your original interface
}

interface BarChartData {
  labels: string[];
  dataValues: number[];
  color: string;
  soures: string[]; // spelled as in your original interface
}

interface RadarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
  soures: string[]; // spelled as in your original interface
}

interface BubbleChartData {
  datasets: {
    label: string;
    data: { x: number; y: number; r: number }[];
    backgroundColor: string;
  }[];
  soures: string[]; // spelled as in your original interface
}

interface ParsedChartData {
  pieData: PieChartData;
  barChartData: BarChartData;
  radarChartData: RadarChartData;
  bubbleChartData: BubbleChartData;
}

 

/**
 * Main function to structure the data into pieData, barChartData,
 * radarChartData, and bubbleChartData, also returning the `soures` 
 * array from each chart definition.
 */
export function createChartData(chartDataArray: any[]): ParsedChartData {
  // Initialize with some default empty structures:
  let pieData: PieChartData = {
    labels: [],
    dataValues: [],
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
    soures: [],
  };

  let barChartData: BarChartData = {
    labels: [],
    dataValues: [],
    color: "purple",
    soures: [],
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
    soures: [],
  };

  let bubbleChartData: BubbleChartData = {
    datasets: [],
    soures: [],
  };

  // 1) Extract the array of competitor chart data from the content_data

  // 2) Iterate over each chart definition and transform
  chartDataArray.forEach((chart) => {
    const { chartType, data, radarData, bubbleData, sources } = chart;

    switch (chartType) {
      case "pie":
        // Fill pieData
        pieData = {
          labels: data.map((item: any) => item.label),
          dataValues: data.map((item: any) => item.value),
          colors: pieData.colors,
          soures: sources || [],
        };
        break;

      case "bar":
        // Fill barChartData
        barChartData = {
          labels: data.map((item: any) => item.label),
          dataValues: data.map((item: any) => item.value),
          color: "purple", // or pick a color from your logic
          soures: sources || [],
        };
        break;

      case "radar":
        // We'll assume radarData is an array of attributes
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

        radarChartData.soures = sources || [];
        break;

      case "bubble":
        // bubbleData is an array of objects: { label, x_value, y_value, bubble_size }
        // We'll create a dataset for each bubble.
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

        bubbleChartData.soures = sources || [];
        break;

      default:
        // Unknown chart type; do nothing
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

// ---- Example usage ----
// const content_data = `('content', 'Market size report generated with ID: 6688a47b-7dac-4f96-935d-307e54689162') ('additional_kwargs', {}) ('response_metadata', {}) ('type', 'ai') ('name', None) ('id', 'd605c9f6-289a-4e4c-8454-6d341d668809') ('example', False) ('tool_calls', []) ('invalid_tool_calls', []) ('usage_metadata', None) messages: content='Market size report generated with ID: 6688a47b-7dac-4f96-935d-307e
