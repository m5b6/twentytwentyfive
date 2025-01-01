export const EMOJIS = [
  "🌱",
  "🔥",
  "⭐",
  "💧",
  "🧠",
  "💫",
  "🍀",
  "🌿",
  "🚀",
  "✨",
  "⚡",
  "🌙",
  "🌸",
];

export function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}
