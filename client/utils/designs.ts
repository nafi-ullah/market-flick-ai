export function getLowOpacityHexColor(hexColor: string, opacityPercent: number): string {
    // Ensure the opacity is within 0-100 range
    const opacity = Math.min(Math.max(opacityPercent, 0), 100);
  
    // Convert opacity to a 2-digit hex value
    const alpha = Math.round((opacity / 100) * 255)
      .toString(16)
      .padStart(2, "0");
  
    // Normalize the hex color (remove the # if present)
    const hex = hexColor.replace("#", "");
  
    // Validate and ensure the hex color is in a 6-character format
    if (hex.length !== 6) {
      throw new Error("Invalid hex color format. Please use #RRGGBB.");
    }
  
    // Return the 8-character hex color
    return `#${hex}${alpha}`;
  }