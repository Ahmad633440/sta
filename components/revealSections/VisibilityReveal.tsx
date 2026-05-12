'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { SessionMetrics } from '@/hooks/useSessionMetrics';
import { VisibilityData } from '@/hooks/useVisibilityTracking';

interface VisibilityRevealProps {
  metrics: SessionMetrics;
  visibility: VisibilityData;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms / 100) / 10}s`;
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
}

export default function VisibilityReveal({
  metrics,
  visibility,
}: VisibilityRevealProps) {
  const lastAwayDuration = visibility.awayDuration > 0
    ? formatDuration(visibility.awayDuration)
    : 'Never left';

  return (
    <DataCard
      title="YOU LEFT"
      subtitle={`${lastAwayDuration} away`}
      description={`You just switched to another tab — or another app — and came back ${lastAwayDuration} later. The Visibility API named the exact moment you left and the exact moment you returned. Every website you open can read this signal. Most advertising platforms use it to calculate whether you are actually seeing their ads, or just leaving them open in a background tab. Your attention is a commodity. We just watched it leave the room.`}
      delay={0.7}
    />
  );
}
