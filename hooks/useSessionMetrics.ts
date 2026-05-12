import { useState, useEffect, useCallback } from 'react';

export interface SessionMetrics {
  timeSpent: number; // in seconds
  cursorMoves: number;
  clicks: number;
  tabSwitches: number;
}

const INITIAL_METRICS: SessionMetrics = {
  timeSpent: 0,
  cursorMoves: 0,
  clicks: 0,
  tabSwitches: 0,
};

export function useSessionMetrics() {
  const [metrics, setMetrics] = useState<SessionMetrics>(INITIAL_METRICS);

  // Track time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        timeSpent: prev.timeSpent + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Track cursor movements
  useEffect(() => {
    let lastMoveTime = Date.now();

    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastMoveTime > 100) {
        setMetrics((prev) => ({
          ...prev,
          cursorMoves: prev.cursorMoves + 1,
        }));
        lastMoveTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track clicks
  useEffect(() => {
    const handleClick = () => {
      setMetrics((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
      }));
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const resetMetrics = useCallback(() => {
    setMetrics(INITIAL_METRICS);
  }, []);

  return { metrics, resetMetrics };
}
