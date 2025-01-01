import { useState, useEffect, useCallback, useRef } from "react";

export default function SelectionRect() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [savedRects, setSavedRects] = useState([]);
  const mouseDownTargetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragRectIndex, setDragRectIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selection-rects");
    if (saved) {
      setSavedRects(JSON.parse(saved));
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    mouseDownTargetRef.current = e.target;

    if (
      e.target.closest(
        "input, button, .habit-chip-container, .emoji-picker, .color-picker, .delete-rect, .habit-emoji, .habit-name, .habit-count"
      ) ||
      e.button !== 0
    ) {
      return;
    }

    // Check if clicking on a rect's top bar
    const rectTopBar = e.target.closest('.rect-top-bar');
    if (rectTopBar) {
      const index = parseInt(rectTopBar.dataset.index);
      setIsDragging(true);
      setDragRectIndex(index);
      setDragStartPos({
        x: e.clientX - savedRects[index].x,
        y: e.clientY - savedRects[index].y
      });
      return;
    }

    const { clientX, clientY } = e;
    setIsDrawing(true);
    setStartPos({ x: clientX, y: clientY });
    setRect({ x: clientX, y: clientY, width: 0, height: 0 });
  }, [savedRects]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging && dragRectIndex !== null) {
        const newRects = [...savedRects];
        newRects[dragRectIndex] = {
          ...newRects[dragRectIndex],
          x: e.clientX - dragStartPos.x,
          y: e.clientY - dragStartPos.y
        };
        setSavedRects(newRects);
        localStorage.setItem("selection-rects", JSON.stringify(newRects));
        return;
      }

      if (!isDrawing || mouseDownTargetRef.current?.closest(".habit-chip")) {
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
    },
    [isDrawing, startPos, isDragging, dragRectIndex, dragStartPos, savedRects]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragRectIndex(null);
      return;
    }

    if (
      isDrawing &&
      rect.width >= 100 &&
      rect.height >= 100 &&
      !mouseDownTargetRef.current?.closest(".habit-chip")
    ) {
      const newRect = {
        ...rect,
        name: `Window ${savedRects.length + 1}`
      };
      const newRects = [...savedRects, newRect];
      setSavedRects(newRects);
      localStorage.setItem("selection-rects", JSON.stringify(newRects));
    }
    setIsDrawing(false);
    mouseDownTargetRef.current = null;
  }, [isDrawing, rect, savedRects, isDragging]);

  const deleteRect = (index) => {
    const newRects = savedRects.filter((_, i) => i !== index);
    setSavedRects(newRects);
    localStorage.setItem("selection-rects", JSON.stringify(newRects));
  };

  const updateRectName = (index, name) => {
    const newRects = [...savedRects];
    newRects[index] = { ...newRects[index], name };
    setSavedRects(newRects);
    localStorage.setItem("selection-rects", JSON.stringify(newRects));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const rectStyle = {
    border: "2px solid rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    boxShadow:
      "0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)",
  };

  return (
    <>
      {isDrawing && !mouseDownTargetRef.current?.closest(".habit-chip") && (
        <div
          style={{
            position: "fixed",
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            ...rectStyle,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {savedRects.map((savedRect, index) => (
        <div key={index} style={{ position: "relative" }}>
          <div
            style={{
              position: "fixed",
              left: savedRect.x,
              top: savedRect.y,
              width: savedRect.width,
              height: savedRect.height,
              ...rectStyle,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div
              className="rect-top-bar"
              data-index={index}
              style={{
                height: '32px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                cursor: 'move',
                userSelect: 'none'
              }}
            >
              <input
                type="text"
                value={savedRect.name || ''}
                onChange={(e) => updateRectName(index, e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  width: '100%',
                  outline: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <button
            className="delete-rect"
            onClick={() => deleteRect(index)}
            style={{
              position: "fixed",
              left: savedRect.x + savedRect.width - 24,
              top: savedRect.y - 12,
              width: "24px",
              height: "24px",
              background: "#ff4444",
              border: "none",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              zIndex: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = "#ff6666";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#ff4444";
            }}
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
}
