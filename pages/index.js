import { useState, useEffect } from "react";
import { swirlAnimation, sharedStyles } from "../styles";
import EmojiPicker from "../components/EmojiPicker";
import ColorPicker from "../components/ColorPicker";
import HabitChip from "../components/HabitChip";
import HabitInput from "../components/HabitInput";
import SelectionRect from "../components/SelectionRect";
import BackgroundPicker from "../components/BackgroundPicker";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("random");
  const [chosenColor, setChosenColor] = useState("auto");
  const [backgroundColor, setBackgroundColor] = useState("#111");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
    
    const savedBg = localStorage.getItem("background-color");
    if (savedBg) setBackgroundColor(savedBg);
  }, []);

  useEffect(() => {
    document.documentElement.style.background = backgroundColor;
    document.body.style.background = backgroundColor;
    document.documentElement.style.transition = 'background 0.3s ease';
    document.body.style.transition = 'background 0.3s ease';
    
    // Ensure the #__next div also has the background color
    const nextElement = document.getElementById('__next');
    if (nextElement) {
      nextElement.style.background = backgroundColor;
      nextElement.style.transition = 'background 0.3s ease';
      nextElement.style.minHeight = '100vh';
    }
  }, [backgroundColor]);

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

  if (isMobile) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background: backgroundColor,
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}>
        <div>
          <h1 style={{ 
            fontSize: "1.5rem", 
            marginBottom: "1rem",
            background: "conic-gradient(from 0deg at 50% 50%, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff, #ff0000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "blur(0.5px)"
          }}>
            ✨ twentytwentyfive
          </h1>
          <p style={{ 
            fontSize: "1rem", 
            lineHeight: "1.5",
            color: "rgba(255,255,255,0.8)" 
          }}>
             currently only available on desktop 🖥️
          </p>
        </div>
      </div>
    );
  }

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
    localStorage.setItem("background-color", color);
  };

  return (
    <div style={{ 
      ...sharedStyles.container,
      background: 'transparent' // Make container transparent to show background
    }} className="container">
      <style>{swirlAnimation}</style>
      <SelectionRect />
      <BackgroundPicker
        currentColor={backgroundColor}
        onColorChange={handleBackgroundChange}
      />

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
