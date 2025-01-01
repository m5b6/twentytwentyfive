import { sharedStyles } from "../styles";

export default function HabitInput({
  newHabit,
  onHabitChange,
  chosenEmoji,
  onEmojiPickerToggle,
  onColorPickerToggle,
  onAddHabit,
}) {
  return (
    <div style={sharedStyles.inputRow}>
      <input
        style={sharedStyles.textInput}
        placeholder="Enter a habit"
        value={newHabit}
        onChange={(e) => onHabitChange(e.target.value)}
      />

      <div
        style={sharedStyles.swirl}
        onClick={onEmojiPickerToggle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "1.2rem" }}>
          {chosenEmoji === "random" ? "❓" : chosenEmoji}
        </span>
      </div>

      <div
        style={sharedStyles.swirlColor}
        onClick={onColorPickerToggle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <button
        style={sharedStyles.addButton}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
        onClick={onAddHabit}
      >
        Add
      </button>
    </div>
  );
} 