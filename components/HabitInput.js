import { sharedStyles } from "../styles";

export default function HabitInput({
  newHabit,
  onHabitChange,
  chosenEmoji,
  chosenColor,
  onEmojiPickerToggle,
  onColorPickerToggle,
  onAddHabit,
}) {
  const colorPickerStyle = {
    ...sharedStyles.swirlColor,
    background: chosenColor || "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
    userSelect: "none",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "50%",
      background: chosenColor
        ? `linear-gradient(135deg, ${chosenColor}, ${chosenColor})`
        : "linear-gradient(135deg, #FFE66D, #4ECDC4, #556270)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
  };

  return (
    <div style={sharedStyles.inputRow} className="inputRow">
      <div
        style={{
          ...sharedStyles.swirl,
          userSelect: "none",
        }}
        className="spin"
        onClick={onEmojiPickerToggle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "1.2rem", userSelect: "none" }}>
          {chosenEmoji === "random" ? "❓" : chosenEmoji}
        </span>
      </div>

      <div
        className="spin"
        style={colorPickerStyle}
        onClick={onColorPickerToggle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <input
        style={{
          ...sharedStyles.textInput,
          "::placeholder": {
            userSelect: "none",
          },
        }}
        className="textInput"
        placeholder="Enter a habit"
        value={newHabit}
        onChange={(e) => onHabitChange(e.target.value)}
      />

      <button
        style={{
          ...sharedStyles.addButton,
          userSelect: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
        onClick={onAddHabit}
      >
        +
      </button>
    </div>
  );
}
