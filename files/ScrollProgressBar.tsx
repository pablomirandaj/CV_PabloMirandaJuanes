"use client";

import { useScrollProgress } from "@/hooks";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const raw = useScrollProgress();
  const smooth = useSpring(raw, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{
        scaleX: smooth,
        background: "linear-gradient(90deg, #00fff2, #0ea5e9, #8b5cf6)",
        boxShadow: "0 0 10px rgba(14,165,233,0.8)",
      }}
    />
  );
}
