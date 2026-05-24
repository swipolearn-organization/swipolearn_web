"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getStroke } from "perfect-freehand";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Pencil, Eraser, Undo2, Redo2, Trash2, Download, X, Type, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Point = [number, number, number];
type Stroke = { points: Point[]; color: string; size: number; };

const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
};

export default function DrawingCanvas({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  
  // Snapshot-based history for precise Undo/Redo of both drawing and erasing
  const [history, setHistory] = useState<Stroke[][]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[][]>([]);
  
  const [color, setColor] = useState("#facc15");
  const [size, setSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const isPointerDown = useRef(false);
  const erasedThisDrag = useRef(false); // Track if anything was actually erased

  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const event = new CustomEvent("drawingModeChanged", { detail: { isDrawing: isOpen, isEraser } });
    window.dispatchEvent(event);
  }, [isOpen, isEraser]);

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, history, strokes, redoStack]); // Need these dependencies since undo/redo use state directly

  const getCanvasCoordinates = (e: React.PointerEvent) => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top, e.pressure] as Point;
  };

  const eraseStrokesAt = (coords: Point) => {
    const eraserRadius = 25;
    let didErase = false;
    
    setStrokes((prev) => {
      const newStrokes = prev.filter(stroke => {
        // Keep stroke if NO point is within eraserRadius
        const isHit = stroke.points.some(p => {
          const dx = p[0] - coords[0];
          const dy = p[1] - coords[1];
          return Math.sqrt(dx*dx + dy*dy) < eraserRadius;
        });
        if (isHit) didErase = true;
        return !isHit;
      });
      return newStrokes;
    });
    
    if (didErase) erasedThisDrag.current = true;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isPointerDown.current = true;
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    // Snapshot history before drawing or erasing starts
    setHistory((prev) => [...prev, strokes]);
    setRedoStack([]);

    if (isEraser) {
      erasedThisDrag.current = false;
      eraseStrokesAt(coords);
    } else {
      setCurrentStroke([coords]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    if (isEraser) {
      eraseStrokesAt(coords);
    } else if (currentStroke.length > 0) {
      setCurrentStroke((prev) => [...prev, coords]);
    }
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    
    if (isEraser) {
      // If we didn't actually erase anything, pop the redundant snapshot we took on mouseDown
      if (!erasedThisDrag.current) {
        setHistory((prev) => prev.slice(0, -1));
      }
      return;
    }

    if (currentStroke.length === 0) {
      setHistory((prev) => prev.slice(0, -1));
      return;
    }

    setStrokes((prev) => [...prev, { points: currentStroke, color, size }]);
    setCurrentStroke([]);
  };

  // Safe undo wrapper that uses latest state
  const undo = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const prevStrokes = prevHistory[prevHistory.length - 1];
      setStrokes((currentStrokes) => {
        setRedoStack((prevRedo) => [...prevRedo, currentStrokes]);
        return prevStrokes;
      });
      return prevHistory.slice(0, -1);
    });
  }, []);

  // Safe redo wrapper that uses latest state
  const redo = useCallback(() => {
    setRedoStack((prevRedo) => {
      if (prevRedo.length === 0) return prevRedo;
      const nextStrokes = prevRedo[prevRedo.length - 1];
      setStrokes((currentStrokes) => {
        setHistory((prevHistory) => [...prevHistory, currentStrokes]);
        return nextStrokes;
      });
      return prevRedo.slice(0, -1);
    });
  }, []);

  const clear = () => {
    setHistory((prev) => [...prev, strokes]);
    setRedoStack([]);
    setStrokes([]);
  };

  const exportPDF = async () => {
    if (!boardRef.current) return;
    
    const toolbar = document.querySelector(".drawing-toolbar") as HTMLElement;
    if (toolbar) toolbar.style.display = "none";

    try {
      const canvas = await html2canvas(boardRef.current, { 
        backgroundColor: "#0f172a", 
        scale: 2 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save("Swipolearn_Notebook.pdf");
    } finally {
      if (toolbar) toolbar.style.display = "flex";
    }
  };

  return (
    <>
      {children}
      
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[9000] w-14 h-14 rounded-full bg-electric-indigo text-white flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Pencil size={24} />
      </button>

      {/* Floating Smart Study Board */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[9900] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
          >
            {/* Backdrop to close */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            {/* Board Container */}
            <div 
              ref={containerRef}
              className="relative w-full max-w-6xl h-[85vh] bg-deep-space-navy/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header / Toolbar */}
              <div className="drawing-toolbar h-16 border-b border-white/10 bg-white/5 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl">
                    <button onClick={() => { setIsEraser(false); setSize(6); }} className={`p-2 rounded-lg transition-colors ${!isEraser && size === 6 ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`} title="Normal Pen">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => { setIsEraser(false); setSize(14); }} className={`p-2 rounded-lg transition-colors ${!isEraser && size === 14 ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`} title="Bold Pen">
                      <PenTool size={18} />
                    </button>
                    <button onClick={() => setIsEraser(true)} className={`p-2 rounded-lg transition-colors ${isEraser ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`} title="Eraser">
                      <Eraser size={18} />
                    </button>
                  </div>

                  <div className="w-px h-6 bg-white/20 mx-2" />

                  {/* Color Presets */}
                  <div className="flex gap-3">
                    {['#ffffff', '#facc15', '#10b981', '#4f46e5', '#ef4444'].map((c) => (
                      <button
                        key={c}
                        onClick={() => { setColor(c); setIsEraser(false); }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c && !isEraser ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  <div className="w-px h-6 bg-white/20 mx-2" />

                  <div className="flex items-center gap-1">
                    <button onClick={undo} disabled={history.length === 0} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors" title="Undo (Ctrl+Z)">
                      <Undo2 size={18} />
                    </button>
                    <button onClick={redo} disabled={redoStack.length === 0} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors" title="Redo (Ctrl+Y)">
                      <Redo2 size={18} />
                    </button>
                    <button onClick={clear} className="p-2 text-red-400 hover:text-red-300 transition-colors ml-2" title="Clear Board">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-emerald-green/20 text-emerald-green hover:bg-emerald-green/30 rounded-lg font-medium transition-colors text-sm">
                    <Download size={16} /> Export PDF
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Drawing Area */}
              <div 
                ref={boardRef}
                className={`flex-1 w-full h-full relative select-none touch-none ${isEraser ? 'cursor-none' : 'cursor-crosshair'}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <svg className="w-full h-full">
                  {strokes.map((stroke, i) => {
                    const strokeData = getStroke(stroke.points, {
                      size: stroke.size,
                      thinning: 0.5,
                      smoothing: 0.5,
                      streamline: 0.5,
                    });
                    const pathData = getSvgPathFromStroke(strokeData);
                    return (
                      <path 
                        key={i} 
                        d={pathData} 
                        fill={stroke.color} 
                      />
                    );
                  })}
                  
                  {/* Active Stroke (Only render if NOT erasing) */}
                  {!isEraser && currentStroke.length > 0 && (
                    <path
                      d={getSvgPathFromStroke(
                        getStroke(currentStroke, { size, thinning: 0.5, smoothing: 0.5, streamline: 0.5 })
                      )}
                      fill={color}
                    />
                  )}
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
