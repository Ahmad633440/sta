"use client";

import React from "react";
import { motion } from "motion/react";
import type { FeedbackMetrics } from "@/hooks/useFeedbackTracking";

interface RatingStarsProps {
  rating: number | null;
  hoveredStar: number | null;
  onStarClick: (index: number) => void;
  onStarHover: (index: number) => void;
  onStarLeave: () => void;
}

export function RatingStars({
  rating,
  hoveredStar,
  onStarClick,
  onStarHover,
  onStarLeave,
}: RatingStarsProps) {
  return (
    <div className="flex gap-4 justify-center items-center my-8">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isActive = rating && rating >= starIndex;
        const isHovered = hoveredStar && hoveredStar >= starIndex;

        return (
          <motion.button
            key={starIndex}
            onClick={() => onStarClick(starIndex)}
            onMouseEnter={() => onStarHover(starIndex)}
            onMouseLeave={onStarLeave}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{
              scale: isHovered ? 1.2 : isActive ? 1.1 : 1,
              opacity: isHovered || isActive ? 1 : 0.4,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="relative cursor-pointer focus:outline-none transition-all"
            aria-label={`Rate ${starIndex} stars`}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
            }}
          >
            {/* Star SVG */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background star (outline) */}
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke={isHovered || isActive ? "#DFD0B8" : "#948979"}
                strokeWidth="0.5"
                fill="none"
                className="transition-colors duration-200"
              />

              {/* Filled star (active state) */}
              {(isActive || isHovered) && (
                <motion.path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={isHovered ? "#DFD0B8" : "#948979"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </svg>

            {/* Glow effect on hover/active */}
            {(isHovered || isActive) && (
              <motion.div
                layoutId={`glow-${starIndex}`}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(223, 208, 184, 0.2) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
