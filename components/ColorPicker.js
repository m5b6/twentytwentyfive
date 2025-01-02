import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const AnimatedContainer = styled.div`
  position: absolute;
  left: -6rem;
  background: ${(p) => (p.theme === "dark" ? "#2A2A2A" : "#FFFFFF")};
  border: 1px solid ${(p) => (p.theme === "dark" ? "#555" : "#E0E0E0")};
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 998;
  min-width: 240px;

  opacity: ${(p) => (p.isClosing ? 0 : p.isVisible ? 1 : 0)};
  transform: ${(p) =>
    p.isClosing
      ? "scale(0.3) translateY(0) translateX(-30px)"
      : p.isVisible
      ? "scale(1) translateY(0) translateX(0)"
      : "scale(0.95) translateX(20px)"};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center right;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${(p) => (p.theme === "dark" ? "#444" : "#E0E0E0")};
  padding-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: ${(p) => (p.theme === "dark" ? "#FFF" : "#333")};
`;

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Swatch = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(p) => p.color};
  position: relative;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    border-color: ${(p) => (p.theme === "dark" ? "#FFF" : "#000")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 6px;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const RandomButton = styled(Swatch)`
  background: conic-gradient(from 0deg at 50% 50%, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff, #ff0000);
  filter: blur(0.5px);

  &::after {
    border-radius: 6px;
  }
`;

export default function ColorPicker({
  colors,
  onSelect,
  onSelectRandom,
  closePicker,
}) {
  const [theme] = useState("dark");
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => closePicker(), 300);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <AnimatedContainer
      ref={pickerRef}
      theme={theme}
      role="dialog"
      aria-label="Color picker"
      isVisible={isVisible}
      isClosing={isClosing}
    >
      <SwatchGrid>
        <RandomButton
          theme={theme}
          onClick={() => {
            onSelectRandom();
            handleClose();
          }}
          onKeyDown={(e) =>
            handleKeyDown(e, () => {
              onSelectRandom();
              handleClose();
            })
          }
          aria-label="Random color"
          title="Random color"
        />
        {colors.map((c) => (
          <Swatch
            key={c}
            color={c}
            theme={theme}
            onClick={() => {
              onSelect(c);
              handleClose();
            }}
            onKeyDown={(e) =>
              handleKeyDown(e, () => {
                onSelect(c);
                handleClose();
              })
            }
            aria-label={`Select color ${c}`}
            title={c}
          />
        ))}
      </SwatchGrid>
    </AnimatedContainer>
  );
}
