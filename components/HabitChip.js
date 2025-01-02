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
  const nodeRef = useRef(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsInitialRender(false), 50);
  }, []);

  // Save position when dragging stops
  const handleDragStop = (e, data) => {
    setIsDragging(false);
    // Check if dropped on trash zone
    const trashZone = document.getElementById('trash-zone');
    if (trashZone) {
      const trashRect = trashZone.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      if (mouseX >= trashRect.left && mouseX <= trashRect.right &&
          mouseY >= trashRect.top && mouseY <= trashRect.bottom) {
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
    const trashZone = document.getElementById('trash-zone');
    if (trashZone) {
      const trashRect = trashZone.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      if (mouseX >= trashRect.left && mouseX <= trashRect.right &&
          mouseY >= trashRect.top && mouseY <= trashRect.bottom) {
        trashZone.style.transform = 'scale(1.4)';
      } else {
        trashZone.style.transform = 'scale(1.2)';
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
    transform: isInitialRender ? "scale(0.8) translateY(20px)" : "scale(1) translateY(0)",
    transition: "opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 1rem",
    color: "black",
  };

  const btnStyle = (isBouncing) => ({
    cursor: "pointer",
    background: "rgba(255,255,255,0.1)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    border: "none",
    borderRadius: "50%",
    width: "1.85rem",
    height: "1.85rem",
    fontSize: "1rem",
    transition: "transform 0.1s",
    transform: isBouncing ? "scale(0.9)" : "scale(1)",
  });

  const handleIncrement = (e) => {
    e.stopPropagation();
    onIncrement();
    setIsBouncingPlus(true);
    setTimeout(() => setIsBouncingPlus(false), 150);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (habit.count > 0) {
      onRemove();
      setIsBouncingMinus(true);
      setTimeout(() => setIsBouncingMinus(false), 150);
    }
  };

  const trashZoneStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: isDragging ? 'rgba(255, 59, 48, 0.9)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    opacity: isDragging ? 1 : 0,
    transform: isDragging ? 'scale(1.2)' : 'scale(0.8)',
    pointerEvents: isDragging ? 'auto' : 'none',
    zIndex: 100,
    cursor: 'pointer'
  };

  return (
    <>
      <div 
        id="trash-zone" 
        style={trashZoneStyle}
      >
        <span role="img" aria-label="delete" style={{ fontSize: '24px' }}>🗑️</span>
      </div>
      <Draggable 
        nodeRef={nodeRef} 
        defaultPosition={defaultPos} 
        className="habit-chip"
        bounds="body"
        onStart={handleDragStart}
        onStop={handleDragStop}
        onDrag={handleDrag}
      >
        <div ref={nodeRef} style={{...containerStyle, zIndex: 200}} className="habit-chip-container">
          <button style={btnStyle(isBouncingMinus)} onClick={handleDecrement} className="habit-minus-btn">
            −
          </button>
          <div style={contentStyle} className="habit-content">
            <span className="habit-emoji">{habit.emoji}</span>
            <span className="habit-name">{habit.name}</span>
            <span className="habit-count">
              <strong>{habit.count}</strong>
              {habit.suffix && <span style={{ marginLeft: "4px", opacity: 0.7 }}>{habit.suffix}</span>}
            </span>
          </div>
          <button style={btnStyle(isBouncingPlus)} onClick={handleIncrement} className="habit-plus-btn">
            +
          </button>
        </div>
      </Draggable>
    </>
  );
}
