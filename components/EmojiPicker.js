// components/EmojiPicker.js

import { sharedStyles } from "../styles";

export default function EmojiPicker({
  emojis,
  onSelect,
  onSelectRandom,
  closePicker,
}) {
  const containerStyle = {
    position: "absolute",
    top: "3.5rem",
    right: "2rem",
    background: "#222",
    border: "1px solid #555",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    zIndex: 999,
  };
  const emojiStyle = {
    fontSize: "1.4rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <div style={containerStyle}>
      {emojis.map((emoji) => (
        <span
          key={emoji}
          style={emojiStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => {
            onSelect(emoji);
            closePicker();
          }}
        >
          {emoji}
        </span>
      ))}
      <span
        style={emojiStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => {
          onSelectRandom();
          closePicker();
        }}
      >
        ❓
      </span>
    </div>
  );
}
