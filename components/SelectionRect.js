import { useState, useEffect, useCallback } from 'react';

export default function SelectionRect() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDraggingChip, setIsDraggingChip] = useState(false);
  const [savedRects, setSavedRects] = useState([]);

  useEffect(() => {
    // Load saved rectangles from localStorage
    const saved = localStorage.getItem('selection-rects');
    if (saved) {
      setSavedRects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleChipDragStart = (e) => {
      if (e.target.closest('.habit-chip')) {
        setIsDraggingChip(true);
        setIsDrawing(false);
      }
    };
    
    const handleChipDragEnd = () => {
      setTimeout(() => {
        setIsDraggingChip(false);
      }, 100); // Small delay to ensure drag is fully complete
    };

    window.addEventListener('dragstart', handleChipDragStart);
    window.addEventListener('dragend', handleChipDragEnd);
    window.addEventListener('drop', handleChipDragEnd);
    
    return () => {
      window.removeEventListener('dragstart', handleChipDragStart);
      window.removeEventListener('dragend', handleChipDragEnd);
      window.removeEventListener('drop', handleChipDragEnd);
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    // Don't start drawing if we're interacting with interactive elements
    if (isDraggingChip || 
        e.target.closest('input, button, .habit-chip, .emoji-picker, .color-picker, .delete-rect')) {
      return;
    }

    if (e.button !== 0) return;

    const { clientX, clientY } = e;
    setIsDrawing(true);
    setStartPos({ x: clientX, y: clientY });
    setRect({ x: clientX, y: clientY, width: 0, height: 0 });
  }, [isDraggingChip]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || isDraggingChip) {
      if (isDraggingChip) setIsDrawing(false);
      return;
    }

    const { clientX, clientY } = e;
    setRect({
      x: Math.min(clientX, startPos.x),
      y: Math.min(clientY, startPos.y),
      width: Math.abs(clientX - startPos.x),
      height: Math.abs(clientY - startPos.y),
    });
  }, [isDrawing, startPos, isDraggingChip]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && rect.width >= 100 && rect.height >= 100) {
      const newRects = [...savedRects, rect];
      setSavedRects(newRects);
      localStorage.setItem('selection-rects', JSON.stringify(newRects));
    }
    setIsDrawing(false);
  }, [isDrawing, rect, savedRects]);

  const deleteRect = (index) => {
    const newRects = savedRects.filter((_, i) => i !== index);
    setSavedRects(newRects);
    localStorage.setItem('selection-rects', JSON.stringify(newRects));
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const rectStyle = {
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      {/* Currently drawing rectangle */}
      {isDrawing && !isDraggingChip && (
        <div
          style={{
            position: 'fixed',
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            ...rectStyle,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}

      {/* Saved rectangles */}
      {savedRects.map((savedRect, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <div
            style={{
              position: 'fixed',
              left: savedRect.x,
              top: savedRect.y,
              width: savedRect.width,
              height: savedRect.height,
              ...rectStyle,
              zIndex: 998,
            }}
          />
          <button
            className="delete-rect"
            onClick={() => deleteRect(index)}
            style={{
              position: 'fixed',
              left: savedRect.x + savedRect.width - 24,
              top: savedRect.y - 12,
              width: '24px',
              height: '24px',
              background: '#ff4444',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              zIndex: 999,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = '#ff6666';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#ff4444';
            }}
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
} 