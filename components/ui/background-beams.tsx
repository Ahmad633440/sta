"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 bg-black/90 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
            <stop offset="50%" stopColor="#a1a1aa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 0 Q 200 400 400 0 T 800 0 T 1200 0 T 1600 0"
          stroke="url(#beam)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, x: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0 200 Q 200 600 400 200 T 800 200 T 1200 200 T 1600 200"
          stroke="url(#beam)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, x: [0, -100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0 400 Q 200 800 400 400 T 800 400 T 1200 400 T 1600 400"
          stroke="url(#beam)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};
