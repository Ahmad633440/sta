"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  feedbackResponses,
  contextMessages,
} from "@/data/feedbackResponses";
import type { FeedbackMetrics } from "@/hooks/useFeedbackTracking";

interface FeedbackResponseProps {
  metrics: FeedbackMetrics;
  hasRated: boolean;
  onRotateResponse: () => void;
}

export function FeedbackResponse({
  metrics,
  hasRated,
  onRotateResponse,
}: FeedbackResponseProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageKey, setMessageKey] = useState(0);

  const rating = metrics.rating;
  const isLowRating = rating && rating <= 2;

  // Get the appropriate title and messages based on rating
  const getResponseContent = () => {
    if (!rating) return null;

    if (rating === 5) {
      return feedbackResponses.five;
    } else if (rating === 4) {
      return feedbackResponses.four;
    } else if (rating === 3) {
      return feedbackResponses.three;
    } else {
      return feedbackResponses.lowRating;
    }
  };

  const content = getResponseContent();
  const currentMessage = content
    ? content.messages[metrics.responseIndex % content.messages.length]
    : "";

  // Rotate messages for low ratings
  useEffect(() => {
    if (!isLowRating || !hasRated) return;

    const interval = setInterval(() => {
      onRotateResponse();
      setMessageKey((prev) => prev + 1);
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval);
  }, [isLowRating, hasRated, onRotateResponse]);

  if (!hasRated || !content) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="mt-12 text-center"
    >
      {/* Title - appears immediately */}
      <motion.h2
        key={`title-${rating}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-display mb-6"
        style={{ color: "#948979" }}
      >
        {content.title}
      </motion.h2>

      {/* Main message with fade/glitch effect */}
      <div className="h-12 md:h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={`message-${messageKey}`}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="text-base md:text-lg font-mono max-w-md px-4"
            style={{ color: "#DFD0B8" }}
          >
            "{currentMessage}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Context messages based on behavior */}
      {metrics.ratingChanges > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs md:text-sm font-mono mt-6 opacity-70"
          style={{ color: "#948979" }}
        >
          {contextMessages.multipleChanges(metrics.ratingChanges)}
        </motion.p>
      )}

      {/* One star specific message */}
      {rating === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4"
        >
          <p
            className="text-xs md:text-sm font-mono opacity-60 italic"
            style={{ color: "#DFD0B8" }}
          >
            {contextMessages.oneStar}
          </p>
        </motion.div>
      )}

      {/* Hesitation indicator */}
      {metrics.hoverHesitations > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs font-mono mt-3 opacity-50"
          style={{ color: "#948979" }}
        >
          [hesitation detected]
        </motion.p>
      )}
    </motion.div>
  );
}
