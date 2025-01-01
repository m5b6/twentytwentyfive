import { sharedStyles } from "../styles";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

export default function HabitInput({
  newHabit,
  onHabitChange,
  chosenEmoji,
  chosenColor,
  onEmojiPickerToggle,
  onColorPickerToggle,
  onAddHabit,
}) {
  const [showTitle, setShowTitle] = useState(true);
  const [showRectangleHint, setShowRectangleHint] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    const savedRects = localStorage.getItem("selection-rects");
    const hasRects = savedRects && JSON.parse(savedRects).length > 0;

    if (saved && JSON.parse(saved).length > 0) {
      setShowTitle(false);
      setShowRectangleHint(!hasRects);
    }
    setIsFirstRender(false);
    setIsMac(navigator.platform.toLowerCase().includes("mac"));

    // Listen for changes in rectangles
    const handleStorageChange = (e) => {
      if (e.key === "selection-rects") {
        const rects = e.newValue ? JSON.parse(e.newValue) : [];
        if (rects.length > 0) {
          setShowRectangleHint(false);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    onAddHabit();
    setShowTitle(false);
    const savedRects = localStorage.getItem("selection-rects");
    const hasRects = savedRects && JSON.parse(savedRects).length > 0;
    if (!hasRects) {
      setTimeout(() => {
        setShowRectangleHint(true);
      }, 300);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleAddHabit();
    }
  };

  // Add effect to listen for rect changes in current window
  useEffect(() => {
    const checkForRects = () => {
      const savedRects = localStorage.getItem("selection-rects");
      const hasRects = savedRects && JSON.parse(savedRects).length > 0;
      if (hasRects) {
        setShowRectangleHint(false);
      }
    };

    const interval = setInterval(checkForRects, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <>
      <div
        style={{
          position: "fixed",
          bottom: "12px",
          right: "12px",
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.3)",
          zIndex: 10,
          fontFamily: "monospace",
        }}
      >
        (built by{" "}
        <a
          href="https://matiasberrios.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.3)",
            zIndex: 100000,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          m5b6
        </a>
        )
      </div>

      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          transform: `translateY(${showRectangleHint ? "0" : "-20px"})`,
          opacity: showRectangleHint ? 0.8 : 0,
          transition: "all 0.3s ease-out",
          textAlign: "left",
          fontSize: "0.9rem",
          color: "#fff",
          pointerEvents: "none",
          zIndex: 10,
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          background: "rgba(0,0,0,0.2)",
          padding: "8px 12px",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      >
        ✨ tip: click and drag anywhere to create windows
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: "30px",
            transform: `translateY(${showTitle ? "0" : "-20px"})`,
            opacity: showTitle ? 1 : 0,
            transition: isFirstRender ? "none" : "all 0.3s ease-out",
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#fff",
            pointerEvents: showTitle ? "auto" : "none",
            zIndex: 10,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          ✨ write something you will do in 2025 ↓
        </div>

        <div style={sharedStyles.inputRow} className="inputRow">
          <Tooltip
            title="choose icon"
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: "0.875rem",
                },
              },
            }}
          >
            <div
              style={{
                ...sharedStyles.swirl,
                userSelect: "none",
              }}
              className="spin"
              onClick={onEmojiPickerToggle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <span style={{ fontSize: "1.2rem", userSelect: "none" }}>
                {chosenEmoji === "random" ? "❓" : chosenEmoji}
              </span>
            </div>
          </Tooltip>

          <Tooltip
            title="choose color"
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: "0.875rem",
                },
              },
            }}
          >
            <div
              className="spin"
              style={colorPickerStyle}
              onClick={onColorPickerToggle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </Tooltip>

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
            onKeyDown={handleKeyDown}
          />

          <Tooltip
            title={`add habit [${isMac ? "⌘" : "Ctrl"} + ↵]`}
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "black",
                  color: "white",
                  fontSize: "0.875rem",
                },
              },
            }}
          >
            <button
              style={{
                ...sharedStyles.addButton,
                userSelect: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
              onClick={handleAddHabit}
            >
              +
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
