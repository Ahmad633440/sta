"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export interface FeedbackMetrics {
  rating: number | null;
  timeBeforeRating: number; // milliseconds
  ratingChanges: number;
  hoverHesitations: number;
  initialRatingTime: number;
  responseIndex: number; // For rotating messages
}

export function useFeedbackTracking() {
  const [metrics, setMetrics] = useState<FeedbackMetrics>({
    rating: null,
    timeBeforeRating: 0,
    ratingChanges: 0,
    hoverHesitations: 0,
    initialRatingTime: 0,
    responseIndex: 0,
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const lastMessageTimeRef = useRef<number>(0);
  const hesitationTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize timer when component mounts
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Track hover hesitation (user hovers without committing)
  const handleStarHover = useCallback((starIndex: number) => {
    setHoveredStar(starIndex);

    // Clear existing timeout
    if (hesitationTimeoutRef.current) {
      clearTimeout(hesitationTimeoutRef.current);
    }

    // Set timeout to detect prolonged hesitation (over 1.5 seconds)
    hesitationTimeoutRef.current = setTimeout(() => {
      if (!hasRated && hoveredStar !== null) {
        setMetrics((prev) => ({
          ...prev,
          hoverHesitations: prev.hoverHesitations + 1,
        }));
      }
    }, 1500);
  }, [hasRated, hoveredStar]);

  const handleStarLeave = useCallback(() => {
    setHoveredStar(null);
    if (hesitationTimeoutRef.current) {
      clearTimeout(hesitationTimeoutRef.current);
    }
  }, []);

  // Handle rating submission
  const handleRating = useCallback((starIndex: number) => {
    const now = Date.now();
    const timeElapsed = now - startTimeRef.current;

    setMetrics((prev) => {
      const isFirstRating = prev.rating === null;
      const isChangingRating = !isFirstRating && prev.rating !== starIndex;

      return {
        ...prev,
        rating: starIndex,
        timeBeforeRating: isFirstRating ? timeElapsed : prev.timeBeforeRating,
        ratingChanges: isChangingRating ? prev.ratingChanges + 1 : prev.ratingChanges,
        initialRatingTime: isFirstRating ? now : prev.initialRatingTime,
        responseIndex: isFirstRating ? 0 : prev.responseIndex,
      };
    });

    if (!hasRated) {
      setHasRated(true);
    }

    // Clear hesitation timeout if rating is submitted
    if (hesitationTimeoutRef.current) {
      clearTimeout(hesitationTimeoutRef.current);
    }
  }, [hasRated]);

  // Rotate response messages every 4 seconds for low ratings
  const rotateResponse = useCallback(() => {
    lastMessageTimeRef.current = Date.now();
    setMetrics((prev) => ({
      ...prev,
      responseIndex: (prev.responseIndex + 1) % 12, // 12 low rating messages
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hesitationTimeoutRef.current) {
        clearTimeout(hesitationTimeoutRef.current);
      }
    };
  }, []);

  return {
    metrics,
    hoveredStar,
    hasRated,
    handleStarHover,
    handleStarLeave,
    handleRating,
    rotateResponse,
  };
}
