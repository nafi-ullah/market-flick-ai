// Define a type for the raw SWOT analysis object
interface RawSWOT {
  strength: string[];
  weakness: string[];
  opportunity: string[];
  threat: string[];
}

// Define a type for the final SWOT data structure
interface SwotItem {
  showPrompts: string[];
  title: string;
  tips: string[];
  values: string[];
  aiSuggestion: string;
  cardColor: string;
}

// The function that transforms your big string into swotdata[]
export function parseSwotData(rawSwotData: any): SwotItem[] {
  try {
     
    // 7. Create your final swotdata array using your static UI fields
    const swotdata: SwotItem[] = [
      {
        showPrompts: ["Prompt 1", "Prompt 2", "Prompt 3"],
        title: "Strengths",
        tips: [
          "Consider unique capabilities",
          "Evaluate market advantages",
          "Assess core competencies",
        ],
        values: rawSwotData.strength || [],
        aiSuggestion:
          rawSwotData.strength && rawSwotData.strength.length > 0
            ? rawSwotData.strength[0] // or however you want to pick an "AI suggestion"
            : "",
        cardColor: "#15803D",
      },
      {
        showPrompts: ["Prompt A", "Prompt B", "Prompt C"],
        title: "Weaknesses",
        tips: [
          "Identify improvement areas",
          "Review customer feedback",
          "Examine resource gaps",
        ],
        values: rawSwotData.weakness || [],
        aiSuggestion:
          rawSwotData.weakness && rawSwotData.weakness.length > 0
            ? rawSwotData.weakness[0]
            : "",
        cardColor: "#B91C1C",
      },
      {
        showPrompts: ["Prompt X", "Prompt Y", "Prompt Z"],
        title: "Opportunities",
        tips: [
          "Research market trends",
          "Analyze competitor gaps",
          "Explore new technologies",
        ],
        values: rawSwotData.opportunity || [],
        aiSuggestion:
          rawSwotData.opportunity && rawSwotData.opportunity.length > 0
            ? rawSwotData.opportunity[0]
            : "",
        cardColor: "#1D4ED8",
      },
      {
        showPrompts: ["Prompt 1", "Prompt 2", "Prompt 3"],
        title: "Threats",
        tips: [
          "Monitor market changes",
          "Track competitive moves",
          "Assess external risks",
        ],
        values: rawSwotData.threat || [],
        aiSuggestion:
          rawSwotData.threat && rawSwotData.threat.length > 0
            ? rawSwotData.threat[0]
            : "",
        cardColor: "#A16207",
      },
    ];
    return swotdata;
  } catch (error) {
    console.error("Error parsing SWOT data:", error);
    return [];
  }
}

