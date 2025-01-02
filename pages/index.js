import { useState, useEffect } from "react";
import { swirlAnimation, sharedStyles } from "../styles";
import EmojiPicker from "../components/EmojiPicker";
import ColorPicker from "../components/ColorPicker";
import HabitChip from "../components/HabitChip";
import HabitInput from "../components/HabitInput";
import SelectionRect from "../components/SelectionRect";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("random");
  const [chosenColor, setChosenColor] = useState("auto");
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 50 + Math.random() * 20; // 50–70%
    const lightness = 80 + Math.random() * 10; // 80–90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const EMOJIS = [
    "🏃",
    "📚",
    "✍️",
    "🧘",
    "💪",
    "🎨",
    "🎵",
    "🌱",
    "🧹",
    "💧",
    "🥗",
    "😴",
    "🚴",
    "🧠",
    "🎯",
    "⌛",
    "🤝",
    "📝",
    "🧘‍♀️",
    "💻",
    "🎮",
    "🏊",
    "🎪",
    "💭",
  ];

  const getRandomEmoji = () => {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  };

  const PRESET_COLORS = [
    "#ffb3ba",
    "#ffdfba",
    "#ffffba",
    "#baffc9",
    "#bae1ff",
    "#ffc0cb",
    "#ffd700",
    "#98fb98",
    "#dabfff",
    "#b19cd9",
    "#f0e68c",
    "#ffa07a",
    "#f08080",
    "#90ee90",
    "#dcd0ff",
    "#ffe4e1",
    "#e0ffff",
    "#ffdab9",
    "#d3ffce",
    "#ffb5c5",
    "#c1ffc1",
    "#b0e2ff",
    "#ffcba4",
    "#e6e6fa",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  const saveHabits = (updated) => {
    setHabits(updated);
    localStorage.setItem("habits", JSON.stringify(updated));
  };

  const addHabit = (suffix = "") => {
    if (!newHabit.trim()) return;

    const habitEmoji = chosenEmoji === "random" ? getRandomEmoji() : chosenEmoji;
    const habitColor = chosenColor === "auto" ? getRandomPastelColor() : chosenColor;

    saveHabits([
      ...habits,
      { 
        name: newHabit, 
        count: 0, 
        emoji: habitEmoji, 
        color: habitColor,
        suffix: suffix 
      },
    ]);

    setNewHabit("");
    setChosenEmoji("random");
    setChosenColor("auto");
  };

  const increment = (index) => {
    const updated = [...habits];
    updated[index].count++;
    saveHabits(updated);
  };

  const decrement = (index) => {
    const updated = [...habits];
    if (updated[index].count > 0) {
      updated[index].count--;
      saveHabits(updated);
    }
  };

  const deleteHabit = (habitToDelete) => {
    const updated = habits.filter((h) => h.name !== habitToDelete.name);
    saveHabits(updated);
    // Also remove the saved position from localStorage
    localStorage.removeItem(`habit-pos-${habitToDelete.name}`);
  };

  return (
    <div style={sharedStyles.container} className="container">
      <style>{swirlAnimation}</style>
      <SelectionRect />

      {pickerOpen && (
        <EmojiPicker
          emojis={EMOJIS}
          onSelect={(emoji) => setChosenEmoji(emoji)}
          onSelectRandom={() => setChosenEmoji("random")}
          closePicker={() => setPickerOpen(false)}
        />
      )}

      {colorPickerOpen && (
        <ColorPicker
          colors={PRESET_COLORS}
          onSelect={(color) => setChosenColor(color)}
          onSelectRandom={() => setChosenColor("auto")}
          closePicker={() => setColorPickerOpen(false)}
        />
      )}

      <HabitInput
        newHabit={newHabit}
        onHabitChange={setNewHabit}
        chosenEmoji={chosenEmoji}
        chosenColor={chosenColor === "auto" ? null : chosenColor}
        onEmojiPickerToggle={() => setPickerOpen(!pickerOpen)}
        onColorPickerToggle={() => setColorPickerOpen(!colorPickerOpen)}
        onAddHabit={addHabit}
      />

      {habits.map((h, i) => (
        <HabitChip
          key={i}
          habit={h}
          onIncrement={() => increment(i)}
          onRemove={() => decrement(i)}
          onDelete={deleteHabit}
        />
      ))}
    </div>
  );
}
