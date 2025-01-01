// components/EmojiPicker.js

import { sharedStyles } from "../styles";
import { useEffect, useRef, useState } from "react";

export default function EmojiPicker({
  emojis,
  onSelect,
  onSelectRandom,
  closePicker,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        closePicker();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePicker]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerStyle = {
    position: "absolute",
    top: "3.5rem",
    right: "2rem", 
    background: "#222",
    border: "1px solid #555",
    borderRadius: "10px",
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.8rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: 999,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-20px)",
    transition: "all 0.2s ease-out",
  };

  const emojiStyle = {
    fontSize: "1.6rem",
    cursor: "pointer",
    transition: "all 0.15s ease-out",
    width: "2.5rem",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    background: "#333",
    userSelect: "none",
    "&:hover": {
      background: "#444",
    }
  };

  const handleEmojiClick = (emoji, isRandom = false) => {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.fontSize = "2rem";
    el.style.pointerEvents = "none";
    el.style.transition = "all 0.4s cubic-bezier(0.2, 0, 0, 1)";
    el.textContent = isRandom ? "❓" : emoji;
    document.body.appendChild(el);

    // Get click position and final position (bottom-right of screen)
    const rect = event.target.getBoundingClientRect();
    const finalX = window.innerWidth - 20; // 20px from right
    const finalY = window.innerHeight - 20; // 20px from bottom

    // Set initial position
    el.style.left = `${rect.left}px`;
    el.style.top = `${rect.top}px`;
    
    requestAnimationFrame(() => {
      // Create a curved animation effect
      el.style.transform = `
        translate(${finalX - rect.left}px, ${finalY - rect.top}px) 
        scale(0.1) 
        rotate(${Math.random() * 180 - 90}deg)
      `;
      el.style.opacity = "0";
    });

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(el);
      if (isRandom) {
        onSelectRandom();
      } else {
        onSelect(emoji);
      }
      closePicker();
    }, 500);
  };

  return (
    <div style={containerStyle} ref={pickerRef}>
      {emojis.map((emoji) => (
        <div
          key={emoji}
          style={emojiStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.background = "#444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#333";
          }}
          onClick={(e) => handleEmojiClick(emoji)}
        >
          {emoji}
        </div>
      ))}
      <div
        style={{...emojiStyle, background: "#444"}}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.background = "#555";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#444";
        }}
        onClick={(e) => handleEmojiClick("❓", true)}
      >
        ❓
      </div>
    </div>
  );
}
