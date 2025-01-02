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
  const [isClosing, setIsClosing] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closePicker();
    }, 300); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePicker]);

  

  const containerStyle = {
    position: "absolute",
    left: "-6rem", 
    background: "#222",
    border: "1px solid #555",
    borderRadius: "12px",
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "0.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: 999,
    opacity: isClosing ? 0 : (isVisible ? 1 : 0),
    transform: isClosing 
      ? "scale(0.3) translateY(0) translateX(-30px)"
      : (isVisible ? "scale(1) translateY(0) translateX(0)" : "scale(0.95) translateX(20px)"),
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    transformOrigin: "center right",
    minWidth: "240px",
  };

  const emojiStyle = {
    fontSize: "1.4rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "2.5rem",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    background: "#333",
    userSelect: "none",
    border: "2px solid transparent",
  };

  const handleEmojiClick = (emoji, isRandom = false) => {
    if (isRandom) {
      onSelectRandom();
    } else {
      onSelect(emoji);
    }
    handleClose();
  };

  return (
    <div style={containerStyle} ref={pickerRef}>
      <div
        style={{...emojiStyle, background: "#444"}}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.borderColor = "#FFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "transparent";
        }}
        onClick={(e) => handleEmojiClick("❓", true)}
      >
        ❓
      </div>
      {emojis.map((emoji) => (
        <div
          key={emoji}
          style={emojiStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.borderColor = "#FFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
          onClick={(e) => handleEmojiClick(emoji)}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
