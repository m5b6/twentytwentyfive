// components/ColorPicker.js
import { sharedStyles } from "../styles";

export default function ColorPicker({
  colors,
  onSelect,
  onSelectRandom,
  closePicker,
}) {
  const containerStyle = {
    position: "absolute",
    top: "3.5rem",
    right: "5rem",
    background: "#222",
    border: "1px solid #555",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    zIndex: 998,
  };
  const swatchStyle = {
    display: "inline-block",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    margin: "0.3rem",
    cursor: "pointer",
    border: "2px solid #333",
    transition: "transform 0.2s",
  };

  return (
    <div style={containerStyle}>
      {/* Random pastel swatch */}
      <div
        style={{ ...swatchStyle, background: "#aaa" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => {
          onSelectRandom();
          closePicker();
        }}
        title="Random pastel"
      />
      {/* Preset color swatches */}
      {colors.map((c) => (
        <div
          key={c}
          style={{ ...swatchStyle, background: c }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => {
            onSelect(c);
            closePicker();
          }}
          title={c}
        />
      ))}
    </div>
  );
}
