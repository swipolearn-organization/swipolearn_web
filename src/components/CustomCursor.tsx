"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // When drawing, we want zero latency (no spring)
  // We can achieve this by dynamically setting the spring config to be instantaneous 
  const springConfig = isDrawing ? { damping: 100, stiffness: 10000, mass: 0.1 } : { damping: 30, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailingConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const trailX = useSpring(cursorX, trailingConfig);
  const trailY = useSpring(cursorY, trailingConfig);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleDrawingMode = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsDrawing(customEvent.detail.isDrawing);
      setIsEraser(customEvent.detail.isEraser);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("drawingModeChanged", handleDrawingMode);

    document.documentElement.style.cursor = 'none';
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("drawingModeChanged", handleDrawingMode);
      document.documentElement.style.cursor = '';
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Icon (Pencil or Eraser) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none drop-shadow-lg"
        style={{ x: smoothX, y: smoothY, originX: 0, originY: 1 }}
        animate={{
          scale: isClicked ? 0.9 : isHovering ? 1.2 : 1,
          rotate: isDrawing ? (isClicked ? -15 : -5) : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        {isEraser ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform -translate-x-[2px] -translate-y-[26px] ${isClicked ? 'text-red-400' : 'text-gray-300'}`}
          >
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
            <path d="M22 21H7" />
            <path d="m5 11 9 9" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform -translate-x-[2px] -translate-y-[26px] ${isDrawing ? 'text-yellow-400' : 'text-white'}`}
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
        )}
      </motion.div>

      {/* Trailing glowing aura */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full z-[9998] pointer-events-none"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isClicked ? 0.6 : isHovering ? 1.4 : 1,
          opacity: isDrawing ? 0.8 : isHovering ? 0.6 : 0.3,
          backgroundColor: isEraser ? "rgba(248, 113, 113, 0.15)" : isDrawing ? "rgba(234, 179, 8, 0.15)" : "rgba(79, 70, 229, 0.15)",
          boxShadow: isEraser ? "0 0 20px rgba(248, 113, 113, 0.3)" : isDrawing ? "0 0 20px rgba(234, 179, 8, 0.3)" : "0 0 20px rgba(79, 70, 229, 0.2)"
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
