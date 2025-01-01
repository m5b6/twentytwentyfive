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
    minHeight: "calc(100vh - 4rem)",
    margin: "2rem auto",
    fontFamily: "monospace",
    background: "#1a1a1a",
    color: "#eee",
    padding: "1rem",
    position: "relative",
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { 
    marginBottom: "1rem",
    textAlign: "center",
    position: "absolute",
    top: "1rem",
    left: 0,
    right: 0,
  },
  inputRow: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    background: "rgba(0,0,0,0.8)",
    padding: "1rem",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: 2,
  },
  textInput: {
    fontFamily: "monospace",
    padding: "0.5rem",
    background: "#333",
    border: "1px solid #444",
    color: "#eee",
    borderRadius: "10px",
    width: "20em",
    marginLeft: "0.5rem",
    outline: "none",
    "&:focus": {
      outline: "1px solid #666",
    },
  },

  addButton: {
    cursor: "pointer",
    padding: "0.5rem 1rem",
    background: "#333",
    border: "1px solid #666",
    color: "#eee",
    borderRadius: "10px",
    fontFamily: "monospace",
    transition: "background 0.3s",
  },
  swirl: {
    position: "relative",
    width: "2.2rem",
    height: "2.2rem",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    overflow: "hidden",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.2)",
    "&:hover": {
      background: "rgba(255,255,255,0.12)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)",
    },
    "&:active": {
      transform: "scale(0.95)",
    }
  },
  swirlColor: {
    position: "relative", 
    width: "2.2rem",
    height: "2.2rem",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.2)",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #FFE66D, #4ECDC4, #556270)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)",
      "&:before": {
        opacity: 1,
      }
    },
    "&:active": {
      transform: "scale(0.95)",
    }
  },
};
