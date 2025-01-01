import { useCallback, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

export default function HabitChip({ habit, onIncrement, onRemove }) {
  const [isBouncingPlus, setIsBouncingPlus] = useState(false);
  const [isBouncingMinus, setIsBouncingMinus] = useState(false);
  const confettiRef = useRef(null);

  const getInstance = useCallback((instance) => {
    confettiRef.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    confettiRef.current && confettiRef.current({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    });
  }, []);

  const fireConfetti = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0.5rem auto",
    padding: "0.5rem 0.5rem",
    borderRadius: "9999px",
    backgroundColor: habit.color,
    color: "#000",
    width: "fit-content",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    userSelect: "none",
    position: "relative",
    minWidth: "200px",
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 1rem",
  };

  const btnStyle = (isBouncing) => ({
    cursor: "pointer",
    background: "rgba(255,255,255,0.5)",
    border: "none",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    color: "#444",
    transform: isBouncing ? "scale(0.85)" : "scale(1)",
    "&:hover": {
      background: "rgba(255,255,255,0.7)",
    }
  });

  const handleIncrement = () => {
    onIncrement();
    fireConfetti();
    setIsBouncingPlus(true);
    setTimeout(() => setIsBouncingPlus(false), 150);
  };

  const handleDecrement = () => {
    if (habit.count > 0) {
      onRemove();
      setIsBouncingMinus(true);
      setTimeout(() => setIsBouncingMinus(false), 150);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        style={btnStyle(isBouncingMinus)}
        onClick={handleDecrement}
        title="Decrease count"
      >
        −
      </button>

      <div style={contentStyle}>
        <span>{habit.emoji}</span>
        <span>{habit.name}</span>
        <span>{habit.count}</span>
      </div>

      <button
        style={btnStyle(isBouncingPlus)}
        onClick={handleIncrement}
        title="Increase count"
      >
        +
      </button>

      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      />
    </div>
  );
}
