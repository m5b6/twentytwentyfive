import { useState, useEffect } from "react";

/** Some random emojis for the habit chips */
const EMOJIS = [
  "🌱",
  "🔥",
  "⭐",
  "💧",
  "🧠",
  "💫",
  "🍀",
  "🌿",
  "🚀",
  "✨",
  "⚡",
  "🌙",
  "🌸",
];

/** Get a random emoji from the list */
function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

/** Default random pastel color generator */
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.random() * 20; // 50–70%
  const lightness = 80 + Math.random() * 10; // 80–90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/** Simple swirling animation for the pickers */
const swirlAnimation = `
@keyframes swirl {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}
`;

/** The main page component */
export default function Home() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false); // toggles emoji picker
  const [colorPickerOpen, setColorPickerOpen] = useState(false); // toggles color circle
  const [chosenEmoji, setChosenEmoji] = useState("random");
  const [chosenColor, setChosenColor] = useState("auto");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  // Save to localStorage
  const saveHabits = (updated) => {
    setHabits(updated);
    localStorage.setItem("habits", JSON.stringify(updated));
  };

  /** Add a new habit with chosen emoji & color. */
  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habitEmoji =
      chosenEmoji === "random" ? getRandomEmoji() : chosenEmoji;
    const habitColor =
      chosenColor === "auto" ? getRandomPastelColor() : chosenColor;

    const updated = [
      ...habits,
      { name: newHabit, count: 0, emoji: habitEmoji, color: habitColor },
    ];
    saveHabits(updated);
    setNewHabit("");
    setChosenEmoji("random");
    setChosenColor("auto");
  };

  /** Increment habit count */
  const increment = (index) => {
    const updated = [...habits];
    updated[index].count++;
    saveHabits(updated);
  };

  /** Remove habit entirely */
  const removeHabit = (index) => {
    const updated = [...habits];
    updated.splice(index, 1);
    saveHabits(updated);
  };

  // A big inline style object with all the fancy stuff
  const styles = {
    container: {
      maxWidth: 800,
      margin: "2rem auto",
      textAlign: "center",
      fontFamily: "monospace",
      background: "#1a1a1a",
      color: "#eee",
      padding: "1rem",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      marginBottom: "1rem",
    },
    inputRow: {
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    textInput: {
      fontFamily: "monospace",
      padding: "0.5rem",
      background: "#333",
      border: "1px solid #444",
      color: "#eee",
      borderRadius: "5px",
      width: "180px",
    },
    addButton: {
      cursor: "pointer",
      padding: "0.5rem 1rem",
      background: "#333",
      border: "1px solid #666",
      color: "#eee",
      borderRadius: "5px",
      fontFamily: "monospace",
      transition: "background 0.3s",
    },
    addButtonHover: {
      background: "#555",
    },
    chipContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0.5rem auto",
      padding: "0.5rem 1rem",
      borderRadius: "9999px",
      color: "#000",
      width: "fit-content",
    },
    chipEmoji: { marginRight: "0.5rem" },
    chipName: { marginRight: "1rem" },
    chipCount: { marginRight: "1rem" },
    incrementButton: {
      cursor: "pointer",
      marginRight: "0.5rem",
      background: "#eee",
      border: "none",
      borderRadius: "5px",
      padding: "0.2rem 0.5rem",
      fontFamily: "monospace",
    },
    removeButton: {
      cursor: "pointer",
      background: "#eee",
      border: "none",
      borderRadius: "5px",
      padding: "0.2rem 0.5rem",
      fontFamily: "monospace",
    },
    // The magical swirl icons for picking emoji
    swirl: {
      position: "relative",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      border: "2px solid #555",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      animation: "swirl 8s linear infinite",
      transition: "transform 0.3s",
      overflow: "hidden",
    },
    swirlHover: {
      transform: "scale(1.2)",
    },
    swirlContent: {
      fontSize: "1.2rem",
    },
    swirlingPickerContainer: {
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
    },
    swirlingPickerEmoji: {
      fontSize: "1.4rem",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    swirlingPickerEmojiHover: {
      transform: "scale(1.3)",
    },
    // The swirling rainbow color circle
    swirlColor: {
      position: "relative",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      border: "2px solid transparent",
      background:
        "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
      cursor: "pointer",
      animation: "swirl 5s linear infinite",
      marginLeft: "0.5rem",
    },
    swirlColorPickerContainer: {
      position: "absolute",
      top: "3.5rem",
      right: "5rem",
      background: "#222",
      border: "1px solid #555",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      zIndex: 998,
    },
    colorSwatch: {
      display: "inline-block",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      margin: "0.3rem",
      cursor: "pointer",
      border: "2px solid #333",
      transition: "transform 0.2s",
    },
    colorSwatchHover: {
      transform: "scale(1.3)",
    },
    randomSwatch: {
      display: "inline-block",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      margin: "0.3rem",
      background: "#aaa",
      cursor: "pointer",
      border: "2px solid #333",
    },
  };

  /** Predefined color array (pastels, brights, etc.) */
  const COLORS = [
    "#ffb3ba",
    "#ffdfba",
    "#ffffba",
    "#baffc9",
    "#bae1ff",
    "#ffc0cb",
    "#ffd700",
    "#98fb98",
    "#afeeee",
    "#dabfff",
    "#b19cd9",
    "#f0e68c",
    "#ffa07a",
    "#f08080",
    "#90ee90",
  ];

  return (
    <div style={styles.container}>
      {/* Insert custom keyframe animation in a <style> tag */}
      <style>{swirlAnimation}</style>

      <h1 style={styles.title}>2025: Habits</h1>

      <div style={styles.inputRow}>
        <input
          style={styles.textInput}
          placeholder="Enter a habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />

        {/* "Magical" swirl for choosing emoji */}
        <div
          style={styles.swirl}
          onClick={() => setPickerOpen(!pickerOpen)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={styles.swirlContent}>
            {chosenEmoji === "random" ? "❓" : chosenEmoji}
          </span>
        </div>

        {/* "Magical" swirl for choosing color */}
        <div
          style={styles.swirlColor}
          onClick={() => setColorPickerOpen(!colorPickerOpen)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        <button
          style={styles.addButton}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
          onClick={addHabit}
        >
          Add
        </button>
      </div>

      {/* Floating emoji picker */}
      {pickerOpen && (
        <div style={styles.swirlingPickerContainer}>
          {EMOJIS.map((emoji) => (
            <span
              key={emoji}
              style={styles.swirlingPickerEmoji}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => {
                setChosenEmoji(emoji);
                setPickerOpen(false);
              }}
            >
              {emoji}
            </span>
          ))}
          <span
            style={styles.swirlingPickerEmoji}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.3)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => {
              setChosenEmoji("random");
              setPickerOpen(false);
            }}
          >
            ❓
          </span>
        </div>
      )}

      {/* Floating color picker */}
      {colorPickerOpen && (
        <div style={styles.swirlColorPickerContainer}>
          {/* "Random" option */}
          <div
            style={styles.randomSwatch}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.3)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => {
              setChosenColor("auto");
              setColorPickerOpen(false);
            }}
            title="Random pastel"
          />
          {/* Predefined color swatches */}
          {COLORS.map((c) => (
            <div
              key={c}
              style={{ ...styles.colorSwatch, background: c }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => {
                setChosenColor(c);
                setColorPickerOpen(false);
              }}
              title={c}
            />
          ))}
        </div>
      )}

      {habits.map((h, i) => (
        <div
          key={i}
          style={{
            ...styles.chipContainer,
            backgroundColor: h.color,
          }}
        >
          <span style={styles.chipEmoji}>{h.emoji}</span>
          <span style={styles.chipName}>{h.name}</span>
          <span style={styles.chipCount}>{h.count}</span>

          <button style={styles.incrementButton} onClick={() => increment(i)}>
            +1
          </button>
          <button style={styles.removeButton} onClick={() => removeHabit(i)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
