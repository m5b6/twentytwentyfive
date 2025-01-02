import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WallpaperIcon from '@mui/icons-material/Wallpaper';

const BackgroundButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  background: ${props => props.currentColor || '#111'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 997;

  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const AnimatedContainer = styled.div`
  position: fixed;
  top: 4rem;
  left: 1rem;
  background: #2A2A2A;
  border: 1px solid #555;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 998;
  min-width: 240px;

  opacity: ${(p) => (p.isClosing ? 0 : p.isVisible ? 1 : 0)};
  transform: ${(p) =>
    p.isClosing
      ? "scale(0.3) translateY(-30px)"
      : p.isVisible
      ? "scale(1) translateY(0)"
      : "scale(0.95) translateY(-20px)"};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: top left;
`;

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
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
    border-color: #FFF;
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

const BACKGROUND_COLORS = [
  // Moody Darks
  "#0B0014", // Deep void
  "#1A0B1C", // Midnight aubergine
  "#0D1321", // Stormy night
  "#1D1135", // Dark mystic
  "#0F1C23", // Deep ocean

  // Quirky Darks
  "#1F1B24", // Dark plum
  "#1B1F3B", // Twilight navy
  "#2D1B34", // Mysterious mauve
  "#1C1E26", // Space gray
  "#2B1C1C", // Dark chocolate

  // Rich Undertones
  "#1E1B18", // Dark espresso
  "#1C2541", // Deep denim
  "#2C1810", // Burnt umber
  "#1B2D2A", // Dark forest
  "#251A1C", // Dark wine

  // Experimental
  "#16161E", // Japanese indigo
  "#1E2040", // Dark slate indigo
  "#2B1D24", // Dark berry
  "#1D2951", // Space cadet
  "#1B1D23", // Dark gunmetal

  // Cosmic Darks
  "#0F0F1B", // Deep space
  "#1A1B26", // Tokyo night
  "#232136", // Rose pine
  "#191724", // Dark rose
  "#1E1E2E"  // Catppuccin mocha
];

export default function BackgroundPicker({ currentColor, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
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

  return (
    <>
      <BackgroundButton
        onClick={() => setIsOpen(!isOpen)}
        currentColor={currentColor}
        title="Change background color"
      >
        <WallpaperIcon
        style={{
            color: "rgba(255, 255, 255, 0.3)",
        }}
        />
      </BackgroundButton>

      {isOpen && (
        <AnimatedContainer
          ref={pickerRef}
          isVisible={isVisible}
          isClosing={isClosing}
        >
          <SwatchGrid>
            {BACKGROUND_COLORS.map((color) => (
              <Swatch
                key={color}
                color={color}
                onClick={() => {
                  onColorChange(color);
                  handleClose();
                }}
                aria-label={`Select background color ${color}`}
                title={color}
              />
            ))}
          </SwatchGrid>
        </AnimatedContainer>
      )}
    </>
  );
} 