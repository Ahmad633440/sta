"use client";

import React from "react";
import { motion } from "motion/react";
import { useFeedbackTracking } from "@/hooks/useFeedbackTracking";
import { RatingStars } from "@/components/feedback/RatingStars";
import { FeedbackResponse } from "@/components/feedback/FeedbackResponse";

interface FeedbackContainerProps {
  question?: string;
  subtitle?: string;
  onSubmit?: (rating: number) => void;
}

export function FeedbackContainer({
  question = "How would you rate your experience?",
  subtitle = "Your honest feedback shapes the system's understanding.",
  onSubmit,
}: FeedbackContainerProps) {
  const {
    metrics,
    hoveredStar,
    hasRated,
    handleStarHover,
    handleStarLeave,
    handleRating,
    rotateResponse,
  } = useFeedbackTracking();

  // Call onSubmit callback when rating changes
  React.useEffect(() => {
    if (hasRated && metrics.rating && onSubmit) {
      onSubmit(metrics.rating);
    }
  }, [metrics.rating, hasRated, onSubmit]);

  const isOneStar = metrics.rating === 1;

  return (
    <div className="relative w-full">
      {/* Darkening overlay effect for 1-star rating */}
      {isOneStar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 bg-black pointer-events-none z-30"
          style={{
            pointerEvents: "none",
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Question Section */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-5xl font-display mb-4"
            style={{ color: "#948979" }}
          >
            {question}
          </h1>

          {!hasRated && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base font-mono"
              style={{ color: "#DFD0B8" }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Rating Stars */}
        <RatingStars
          rating={metrics.rating}
          hoveredStar={hoveredStar}
          onStarClick={handleRating}
          onStarHover={handleStarHover}
          onStarLeave={handleStarLeave}
        />

        {/* Feedback Response Messages */}
        <FeedbackResponse
          metrics={metrics}
          hasRated={hasRated}
          onRotateResponse={rotateResponse}
        />

        {/* Time indicator (subtle) */}
        {hasRated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8 text-xs opacity-40"
            style={{ color: "#948979" }}
          >
            <p className="font-mono">
              [response recorded in{" "}
              {(metrics.timeBeforeRating / 1000).toFixed(1)}s]
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
