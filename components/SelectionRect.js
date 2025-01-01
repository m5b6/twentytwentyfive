import { useState, useEffect, useCallback, useRef } from 'react';

export default function SelectionRect() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [savedRects, setSavedRects] = useState([]);
  const isChipInteractionRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('selection-rects');
    if (saved) {
      setSavedRects(JSON.parse(saved));
    }
  }, []);

  // Track chip interactions
  useEffect(() => {
    const handleGlobalMouseDown = (e) => {
      if (e.target.closest('.habit-chip')) {
        isChipInteractionRef.current = true;
      }
    };

    const handleGlobalMouseUp = () => {
      // Reset on next tick to ensure we don't start drawing immediately
      setTimeout(() => {
        isChipInteractionRef.current = false;
      }, 0);
    };

    window.addEventListener('mousedown', handleGlobalMouseDown, true);
    window.addEventListener('mouseup', handleGlobalMouseUp, true);
    
    return () => {
      window.removeEventListener('mousedown', handleGlobalMouseDown, true);
      window.removeEventListener('mouseup', handleGlobalMouseUp, true);
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (isChipInteractionRef.current || 
        e.target.closest('input, button, .habit-chip, .emoji-picker, .color-picker, .delete-rect') ||
        e.button !== 0) {
      return;
    }

    const { clientX, clientY } = e;
    setIsDrawing(true);
    setStartPos({ x: clientX, y: clientY });
    setRect({ x: clientX, y: clientY, width: 0, height: 0 });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || isChipInteractionRef.current) {
      setIsDrawing(false);
      return;
    }

    const { clientX, clientY } = e;
    setRect({
      x: Math.min(clientX, startPos.x),
      y: Math.min(clientY, startPos.y),
      width: Math.abs(clientX - startPos.x),
      height: Math.abs(clientY - startPos.y),
    });
  }, [isDrawing, startPos]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && rect.width >= 100 && rect.height >= 100 && !isChipInteractionRef.current) {
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
      {/* Only show drawing rectangle if we're not interacting with a chip */}
      {isDrawing && !isChipInteractionRef.current && (
        <div
          style={{
            position: 'fixed',
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            ...rectStyle,
            pointerEvents: 'none',
            zIndex: 1,
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
              zIndex: 1,
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
              zIndex: 2,
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