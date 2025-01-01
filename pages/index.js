import { useState, useEffect } from "react";
import { swirlAnimation, sharedStyles } from "../styles";
import { getRandomEmoji } from "../utils/emojiUtils";
import { EMOJIS } from "../utils/emojiUtils";
import { PRESET_COLORS, getRandomPastelColor } from "../utils/colorUtils";
import EmojiPicker from "../components/EmojiPicker";
import ColorPicker from "../components/ColorPicker";
import HabitChip from "../components/HabitChip";
import HabitInput from "../components/HabitInput";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("random");
  const [chosenColor, setChosenColor] = useState("auto");

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  const saveHabits = (updated) => {
    setHabits(updated);
    localStorage.setItem("habits", JSON.stringify(updated));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habitEmoji =
      chosenEmoji === "random" ? getRandomEmoji() : chosenEmoji;
    const habitColor =
      chosenColor === "auto" ? getRandomPastelColor() : chosenColor;

    saveHabits([
      ...habits,
      { name: newHabit, count: 0, emoji: habitEmoji, color: habitColor },
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

  return (
    <div style={sharedStyles.container} className="container">
      <style>{swirlAnimation}</style>

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
        />
      ))}
    </div>
  );
}
