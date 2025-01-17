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
  export function parseSwotData(content_data: string): SwotItem[] {
    // 1. Locate "swot_analysis:" in the string
    const swotKey = "swot_analysis:";
    const startIdx = content_data.indexOf(swotKey);
    if (startIdx === -1) {
      throw new Error("No 'swot_analysis:' key found in the given string.");
    }
  
    // 2. Extract the substring that should contain the object
    //    e.g. {'strength': [...], 'weakness': [...], 'opportunity': [...], 'threat': [...]}
    //    We'll grab everything from "swot_analysis:" to the end of the string.
    let swotPart = content_data.substring(startIdx + swotKey.length).trim();
  
    // 3. Find the first '{' and the matching '}' from the end.
    //    This is naive but usually works if the SWOT object is enclosed in a single set of braces.
    const braceStart = swotPart.indexOf("{");
    const braceEnd = swotPart.lastIndexOf("}");
    if (braceStart === -1 || braceEnd === -1 || braceEnd <= braceStart) {
      throw new Error("Could not find a valid {...} block for 'swot_analysis' object.");
    }
  
    // 4. Extract just the object substring (including braces)
    let swotObjectString = swotPart.substring(braceStart, braceEnd + 1);
  
    // 5. Convert Python-style single quotes to JSON-friendly double quotes
    //    WARNING: This breaks if you have single quotes inside text paragraphs.
    //    For typical SWOT bullet lists, it generally works.
    swotObjectString = swotObjectString.replace(/\\'/g, '"');
  
    // 6. Parse the cleaned string as JSON
    let rawSwotData: RawSWOT;
    try {
      console.log(
        {swotObjectString}
      )
      rawSwotData = JSON.parse(swotObjectString);
    } catch (error) {

      
      console.error("Error parsing the extracted SWOT JSON:", error);
      throw error;
    }
  
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
  }
  