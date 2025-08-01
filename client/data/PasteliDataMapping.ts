// 1. Define interfaces for type safety
interface PestaliItem {
  title: string;
  description: string;
  impact_level: number;
  color: string;
}

// The shape of each item inside "pestali_analysis" categories
interface PestaliCategoryItem {
  description: string;
  impact_level: string; // e.g. "High", "Medium", "Low"
}

// The shape of the pestali_analysis object
interface PestaliAnalysis {
  political?: PestaliCategoryItem[];
  economic?: PestaliCategoryItem[];
  social?: PestaliCategoryItem[];
  technological?: PestaliCategoryItem[];
  legal?: PestaliCategoryItem[];
  environmental?: PestaliCategoryItem[];
  sources?: string[];
  // "industry" not in your data, so we handle that as static below
}

// 2. The default pestaliData array, with placeholders
const defaultPestaliData: PestaliItem[] = [
  {
    title: "Political",
    description:
      "Trade policies, regulatory changes, and political stability affecting market conditions.",
    impact_level: 80,
    color: "#FF0000",
  },
  {
    title: "Economic",
    description:
      "Market conditions, inflation rates, and economic growth indicators.",
    impact_level: 50,
    color: "#2563EB",
  },
  {
    title: "Social",
    description:
      "Demographics, lifestyle changes, and social trends impacting market behavior.",
    impact_level: 70,
    color: "#16A34A",
  },
  {
    title: "Technological",
    description:
      "Technological advancements, digital transformation, and innovation trends.",
    impact_level: 90,
    color: "#800080",
  },
  {
    title: "Environmental",
    description:
      "Environmental regulations, sustainability practices, and ecological impact.",
    impact_level: 40,
    color: "#CA8A04",
  },
  {
    title: "Legal",
    description:
      "Legal frameworks, compliance requirements, and regulatory landscape.",
    impact_level: 60,
    color: "#4F46E5",
  },
  {
    title: "Industry",
    description:
      "Industry-specific trends, competitive dynamics, and market structure.",
    impact_level: 75,
    color: "#FF8000",
  },
];

// 3. Helper to convert a string "High"/"Medium"/"Low" → numeric impact
function parseImpactLevel(level: string): number {
  switch (level.toLowerCase()) {
    case "high":
      return 90;
    case "medium":
      return 60;
    case "low":
      return 30;
    default:
      return 50; // Fallback if unrecognized
  }
}

/**
 * Extracts and parses 'pestali_analysis' (and its 'sources') from a Python-like string,
 * maps to the static pestaliData array, and returns { pestaliData, sources }.
 */
export function parsePestaliData(rawAnalysis: any): {
  pestaliData: PestaliItem[];
  sources: string[];
} {
  try {
 

    // 6. Update pestaliData with descriptions and impact levels from parsed data
    const updatedPestaliData = defaultPestaliData.map((item) => {
      const key = item.title.toLowerCase(); // Match category keys like "political"
      if (key === "industry") {
        return item; // Skip "Industry" as it is static
      }

      const categoryData = rawAnalysis[key as keyof PestaliAnalysis] as
        | PestaliCategoryItem[]
        | undefined;

      if (categoryData && categoryData.length > 0) {
        const firstItem = categoryData[0];
        return {
          ...item,
          description: firstItem.description,
          impact_level: parseImpactLevel(firstItem.impact_level),
        };
      }

      // Return the original item if no data is available for the category
      return item;
    });

    // 7. Extract sources (string array) from the parsed analysis
    const sources = rawAnalysis.sources ?? [];

    // 8. Return the updated pestaliData + sources in a single object
    return {
      pestaliData: updatedPestaliData,
      sources,
    };
  } catch (error) {
    console.error("Error parsing pestali analysis data:", error);
    return {
      pestaliData: [],
      sources: [],
    };
  }
}
