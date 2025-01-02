import { useState, useRef, useEffect } from "react";
import { SUFFIXES } from "../utils/SuffixUtils";
import { Tooltip } from "@mui/material";

export default function SuffixPicker({ onSelect, selectedSuffix }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedCategory(null);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedCategory && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [selectedCategory]);

  const handleSelect = (suffix) => {
    onSelect(suffix);
    setIsOpen(false);
    setSelectedCategory(null);
    setSearchTerm("");
  };

  const getFilteredOptions = () => {
    if (!selectedCategory) return [];
    return SUFFIXES[selectedCategory].options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "8px",
    background: "rgba(0,0,0,0.9)",
    borderRadius: "12px",
    padding: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    minWidth: "400px",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    pointerEvents: isOpen ? "auto" : "none",
    transition: "all 0.2s ease-out",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "8px 12px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "6px",
    color: "#fff",
    outline: "none",
    marginBottom: "8px",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    "&:focus": {
      background: "rgba(255,255,255,0.15)",
      borderColor: "rgba(255,255,255,0.3)",
    },
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    maxHeight: "400px",
    overflowY: "auto",
  };

  const categoryStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    transition: "all 0.15s ease",
    "&:hover": {
      background: "rgba(255,255,255,0.1)",
      transform: "translateX(5px)",
    },
  };

  const optionStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px",
    color: "#fff",
    transition: "all 0.15s ease",
    "&:hover": {
      background: "rgba(255,255,255,0.1)",
      transform: "translateX(5px)",
    },
  };

  const labelIconStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    opacity: 0.7,
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
  };

  return (
    <div style={{ position: "relative", height: "100%" }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "transparent",
          border: "none",
          borderLeft: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "0",
          padding: "6px 12px",
          height: "100%",
          color: "rgba(255,255,255,0.6)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "14px",
          "&:hover": {
            color: "#fff",
            background: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <span style={{ opacity: 0.7 }}>%</span>
      </button>

      <div style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        background: "rgba(0,0,0,0.9)",
        borderRadius: "12px",
        padding: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        minWidth: "400px",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(-10px)",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "all 0.2s ease-out",
      }}>
        {selectedCategory ? (
          <>
            <div
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "4px",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    color: "#fff",
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                ←
              </button>
              <span>{SUFFIXES[selectedCategory].label}</span>
            </div>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.currentTarget) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }
              }}
            />

            <div style={gridStyle}>
              {getFilteredOptions().map((option, index) => (
                <div
                  key={option}
                  style={optionStyle}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {option}
                </div>
              ))}
              {getFilteredOptions().length === 0 && (
                <div
                  style={{
                    padding: "8px 12px",
                    color: "rgba(255,255,255,0.5)",
                    textAlign: "center",
                    gridColumn: "1 / -1",
                  }}
                >
                  No matches found
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={gridStyle}>
            {Object.entries(SUFFIXES).map(([key, { label }]) => (
              <div
                key={key}
                style={categoryStyle}
                onClick={() => setSelectedCategory(key)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {label}
                <span style={{ color: "rgba(255,255,255,0.4)" }}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
