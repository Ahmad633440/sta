'use client';

import React, { useState, useEffect } from 'react';
import DataCard from '@/components/DataCard';
import { LocationData } from '@/utils/ipLocation';

interface TimeRevealProps {
  location: LocationData | null;
  loading: boolean;
}

export default function TimeReveal({ location, loading }: TimeRevealProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <DataCard
        title="WHEN YOU ARRIVED"
        description="Detecting timezone and local time..."
        delay={0.1}
      />
    );
  }

  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'the middle of the night';
    if (hour < 12) return 'the morning';
    if (hour < 17) return 'the afternoon';
    if (hour < 21) return 'the evening';
    return 'late at night';
  };

  return (
    <DataCard
      title="WHEN YOU ARRIVED"
      subtitle={`${currentTime} · ${location?.timezone || 'Unknown Timezone'}`}
      description={`It is near ${timeOfDay()} where you are. Your device reported your timezone before the page finished loading. A website knowing your local time can infer when you sleep, when you work, and when you browse because you cannot sleep. Nothing about this was requested. The information arrived on its own.`}
      delay={0.1}
    />
  );
}
