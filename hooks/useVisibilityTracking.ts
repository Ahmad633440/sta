import { useState, useEffect, useCallback } from 'react';

export interface VisibilityData {
  isVisible: boolean;
  lastLeftTime: number | null;
  lastReturnTime: number | null;
  awayDuration: number; // in milliseconds
  totalAbsences: number;
  showAlert: boolean;
}

const INITIAL_VISIBILITY: VisibilityData = {
  isVisible: true,
  lastLeftTime: null,
  lastReturnTime: null,
  awayDuration: 0,
  totalAbsences: 0,
  showAlert: false,
};

export function useVisibilityTracking() {
  const [visibility, setVisibility] = useState<VisibilityData>(INITIAL_VISIBILITY);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisibility((prev) => ({
          ...prev,
          isVisible: false,
          lastLeftTime: Date.now(),
          showAlert: false,
        }));
      } else {
        setVisibility((prev) => {
          const now = Date.now();
          const awayTime = prev.lastLeftTime ? now - prev.lastLeftTime : 0;

          return {
            ...prev,
            isVisible: true,
            lastReturnTime: now,
            awayDuration: awayTime,
            totalAbsences: prev.totalAbsences + 1,
            showAlert: awayTime > 500, // Show alert if away more than 500ms
          };
        });

        // Auto-hide alert after 5 seconds
        const timer = setTimeout(() => {
          setVisibility((prev) => ({
            ...prev,
            showAlert: false,
          }));
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const dismissAlert = useCallback(() => {
    setVisibility((prev) => ({
      ...prev,
      showAlert: false,
    }));
  }, []);

  return { visibility, dismissAlert };
}
