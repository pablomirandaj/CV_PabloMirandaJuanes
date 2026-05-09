"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks";

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const followerConfig = { damping: 35, stiffness: 200, mass: 0.8 };

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const fx = useSpring(rawX, followerConfig);
  const fy = useSpring(rawY, followerConfig);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const handleHoverIn = () => setHovered(true);
    const handleHoverOut = () => setHovered(false);

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Add hover listeners to all interactive elements
    const selectors = "a, button, [role='button'], input, textarea, select, .cursor-pointer, .glass-hover";
    const targets = document.querySelectorAll<HTMLElement>(selectors);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [isMobile, rawX, rawY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: clicked ? 0.6 : hovered ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </motion.div>

      {/* Follower ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: fx, y: fy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 2 : 1,
          opacity: hidden ? 0 : hovered ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.25 }}
      >
        <div
          className="w-8 h-8 rounded-full border border-sky-400"
          style={{
            boxShadow: hovered
              ? "0 0 20px rgba(14,165,233,0.5)"
              : "0 0 8px rgba(14,165,233,0.2)",
          }}
        />
      </motion.div>
    </>
  );
}
