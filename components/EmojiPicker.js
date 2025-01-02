// components/EmojiPicker.js

import { sharedStyles } from "../styles";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  left: -6rem;
  background: #222;
  border: 1px solid #555;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 999;
  opacity: ${props => props.isClosing ? 0 : (props.isVisible ? 1 : 0)};
  transform: ${props => props.isClosing 
    ? "scale(0.3) translateY(0) translateX(-30px)"
    : (props.isVisible ? "scale(1) translateY(0) translateX(0)" : "scale(0.95) translateX(20px)")};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center right;
  min-width: 240px;
`;

const ScrollableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  max-height: 290px; /* Height for 5 rows (5 * 2.5rem + 4 * 0.5rem gap) + some padding */
  overflow-y: auto;
  padding-right: 0.5rem;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #333;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
    &:hover {
      background: #666;
    }
  }
`;

const EmojiButton = styled.button`
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${props => props.isRandom ? "#444" : "#333"};
  user-select: none;
  border: 2px solid transparent;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    border-color: #FFF;
  }
`;

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

  const handleEmojiClick = (emoji, isRandom = false) => {
    if (isRandom) {
      onSelectRandom();
    } else {
      onSelect(emoji);
    }
    handleClose();
  };

  return (
    <Container ref={pickerRef} isClosing={isClosing} isVisible={isVisible}>
      <ScrollableGrid>
        <EmojiButton
          isRandom
          onClick={() => handleEmojiClick("❓", true)}
          title="Random emoji"
        >
          ❓
        </EmojiButton>
        {emojis.map((emoji) => (
          <EmojiButton
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            title={emoji}
          >
            {emoji}
          </EmojiButton>
        ))}
      </ScrollableGrid>
    </Container>
  );
}
