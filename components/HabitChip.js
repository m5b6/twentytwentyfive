import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

export default function HabitChip({ habit, onIncrement, onRemove, onDelete }) {
  const [defaultPos, setDefaultPos] = useState(() => {
    // Try to get saved position from localStorage
    const savedPos = localStorage.getItem(`habit-pos-${habit.name}`);
    if (savedPos) {
      return JSON.parse(savedPos);
    }
    // Generate random position only for new habits
    return {
      x: Math.random() * 1000 - 500,
      y: Math.random() * 1000 - 500,
    };
  });
  const [isBouncingPlus, setIsBouncingPlus] = useState(false);
  const [isBouncingMinus, setIsBouncingMinus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(habit.count);
  const nodeRef = useRef(null);
  const inputRef = useRef(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsInitialRender(false), 50);
  }, []);

  // Save position when dragging stops
  const handleDragStop = (e, data) => {
    setIsDragging(false);
    // Check if dropped on trash zone
    const trashZone = document.getElementById("trash-zone");
    if (trashZone) {
      const trashRect = trashZone.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        mouseX >= trashRect.left &&
        mouseX <= trashRect.right &&
        mouseY >= trashRect.top &&
        mouseY <= trashRect.bottom
      ) {
        // Delete the habit
        onDelete(habit);
        return;
      }
    }

    const newPos = { x: data.x, y: data.y };
    setDefaultPos(newPos);
    localStorage.setItem(`habit-pos-${habit.name}`, JSON.stringify(newPos));
  };

  const handleDrag = (e, data) => {
    const trashZone = document.getElementById("trash-zone");
    if (trashZone) {
      const trashRect = trashZone.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (
        mouseX >= trashRect.left &&
        mouseX <= trashRect.right &&
        mouseY >= trashRect.top &&
        mouseY <= trashRect.bottom
      ) {
        trashZone.style.transform = "scale(1.4)";
      } else {
        trashZone.style.transform = "scale(1.2)";
      }
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const containerStyle = {
    position: "fixed", // important for Draggable
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.45rem",
    borderRadius: "9999px",
    backgroundColor: habit.color,
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    minWidth: "200px",
    cursor: "grab",
    opacity: isInitialRender ? 0 : 1,
    transform: isInitialRender
      ? "scale(0.8) translateY(20px)"
      : "scale(1) translateY(0)",
    transition:
      "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 1rem",
    color: "black",
  };

  const contentTextStyle = {
    fontSize: "0.9rem",
  };

  const btnStyle = (isBouncing) => ({
    cursor: "pointer",
    background: "rgba(255,255,255,0.3)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    border: "none",
    borderRadius: "50%",
    width: "1.85rem",
    height: "1.85rem",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    transform: isBouncing ? "scale(0.9)" : "scale(1)",
    color: "rgba(0,0,0,0.7)",
    fontWeight: "bold",
    '&:hover': {
      background: "rgba(255,255,255,0.4)",
    },
  });

  const handleIncrement = (e) => {
    e.stopPropagation();
    onIncrement(1);
    setIsBouncingPlus(true);
    setTimeout(() => setIsBouncingPlus(false), 150);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (habit.count > 0) {
      onRemove(1);
      setIsBouncingMinus(true);
      setTimeout(() => setIsBouncingMinus(false), 150);
    }
  };

  const trashZoneStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: isDragging ? "rgba(255, 59, 48, 0.9)" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    opacity: isDragging ? 1 : 0,
    transform: isDragging ? "scale(1.2)" : "scale(0.8)",
    pointerEvents: isDragging ? "auto" : "none",
    zIndex: 100,
    cursor: "pointer",
  };

  const handleCountClick = (e) => {
    e.stopPropagation();
    if (!isDragging) {
      setIsEditing(true);
      setEditValue(String(habit.count));
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const newCount = parseInt(editValue, 10) || 0;
    if (newCount !== habit.count) {
      const diff = newCount - habit.count;
      if (diff > 0) {
        onIncrement(diff);
      } else {
        onRemove(-diff);
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(String(habit.count));
    }
  };

  const handleInputChange = (e) => {
    // Only allow numbers and update state
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      setEditValue('0');
    } else {
      // Limit to max value and remove leading zeros
      const num = Math.min(parseInt(value, 10), 999999999999);
      setEditValue(String(num));
    }
  };

  const formatNumber = (num) => {
    const MAX_VALUE = 999999999999; // 999.999 billion
    num = Math.min(num, MAX_VALUE);

    if (num < 1000) return String(num);
    if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    if (num < 1000000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'b';
  };

  return (
    <>
      <div id="trash-zone" style={trashZoneStyle}>
        <span role="img" aria-label="delete" style={{ fontSize: "24px" }}>
          🗑️
        </span>
      </div>
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={defaultPos}
        className="habit-chip"
        bounds="body"
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
        disabled={isEditing}
      >
        <div
          ref={nodeRef}
          style={{ ...containerStyle, zIndex: 200, cursor: isEditing ? 'default' : 'grab' }}
          className="habit-chip-container"
        >
          <button
            style={btnStyle(isBouncingMinus)}
            onClick={handleDecrement}
            className="habit-minus-btn"
          >
            −
          </button>
          <div style={contentStyle} className="habit-content">
            <span
              className="habit-emoji"
              style={{ ...contentTextStyle, fontSize: "1.2rem" }}
            >
              {habit.emoji}
            </span>
            <span className="habit-name" style={contentTextStyle}>
              {habit.name}
            </span>
            <span 
              className="habit-count" 
              style={{...contentTextStyle, cursor: 'pointer'}}
              onClick={handleCountClick}
            >
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={editValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  style={{
                    width: 'auto',
                    minWidth: '40px',
                    maxWidth: '80px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    textAlign: 'center',
                    cursor: 'text',
                    padding: '2px 4px',
                    margin: '0 -4px',
                  }}
                />
              ) : (
                <strong style={contentTextStyle}>{formatNumber(habit.count)}</strong>
              )}
              {habit.suffix && !isEditing && (
                <span
                  style={{
                    ...contentTextStyle,
                    opacity: 0.7,
                  }}
                >
                  &nbsp;{habit.suffix}
                </span>
              )}
            </span>
          </div>
          <button
            style={btnStyle(isBouncingPlus)}
            onClick={handleIncrement}
            className="habit-plus-btn"
          >
            +
          </button>
        </div>
      </Draggable>
    </>
  );
}
