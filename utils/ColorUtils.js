
export function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.random() * 20; // 50–70%
  const lightness = 80 + Math.random() * 10; // 80–90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const PRESET_COLORS = [
  "#ffb3ba",
  "#ffdfba",
  "#ffffba",
  "#baffc9",
  "#bae1ff",
  "#ffc0cb",
  "#ffd700",
  "#98fb98",
  "#afeeee",
  "#dabfff",
  "#b19cd9",
  "#f0e68c",
  "#ffa07a",
  "#f08080",
  "#90ee90",
];
