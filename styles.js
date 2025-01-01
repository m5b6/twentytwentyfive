// styles.js

export const swirlAnimation = `
@keyframes swirl {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}
`;

export const sharedStyles = {
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
  title: { marginBottom: "1rem" },
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
};
