export function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.random() * 20; // 50–70%
  const lightness = 80 + Math.random() * 10; // 80–90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const PRESET_COLORS = [
  "#ffb3ba", // Light pink
  "#ffdfba", // Light peach
  "#ffffba", // Light yellow
  "#baffc9", // Light green
  "#bae1ff", // Light blue
  "#ffc0cb", // Pink
  "#ffd700", // Gold
  "#98fb98", // Pale green
  "#dabfff", // Light purple
  "#b19cd9", // Light violet
  "#f0e68c", // Khaki
  "#ffa07a", // Light salmon
  "#f08080", // Light coral
  "#90ee90", // Light green
  // Added 10 new colors:
  "#dcd0ff", // Pale lavender
  "#ffe4e1", // Misty rose
  "#e0ffff", // Light cyan
  "#ffdab9", // Peach puff
  "#d3ffce", // Pale mint
  "#ffb5c5", // Light pink
  "#c1ffc1", // Pale green
  "#b0e2ff", // Light sky blue
  "#ffcba4", // Soft peach
  "#e6e6fa"  // Lavender
];
