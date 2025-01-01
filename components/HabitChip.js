// components/HabitChip.js

export default function HabitChip({ habit, onIncrement, onRemove }) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem auto",
    padding: "0.5rem 1rem",
    borderRadius: "9999px",
    backgroundColor: habit.color,
    color: "#000",
    width: "fit-content",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    cursor: "grab",
    userSelect: "none",
    transition: "box-shadow 0.2s ease",
    "&:active": {
      cursor: "grabbing",
      boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
    }
  };

  const emojiStyle = { marginRight: "0.5rem" };
  const nameStyle = { marginRight: "1rem" };
  const countStyle = { marginRight: "1rem" };
  const btnStyle = {
    cursor: "pointer",
    background: "#eee",
    border: "none",
    borderRadius: "5px",
    padding: "0.2rem 0.5rem",
    fontFamily: "monospace",
    marginRight: "0.5rem",
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(habit));
    e.currentTarget.style.opacity = "0.7";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div 
      style={containerStyle}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span style={emojiStyle}>{habit.emoji}</span>
      <span style={nameStyle}>{habit.name}</span>
      <span style={countStyle}>{habit.count}</span>
      <button style={btnStyle} onClick={onIncrement}>
        +1
      </button>
      <button style={{ ...btnStyle, marginRight: 0 }} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}
