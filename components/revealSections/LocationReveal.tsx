'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { LocationData } from '@/utils/ipLocation';

interface LocationRevealProps {
  location: LocationData | null;
  loading: boolean;
}

export default function LocationReveal({ location, loading }: LocationRevealProps) {
  if (loading) {
    return (
      <DataCard
        title="WHERE YOU ARE"
        description="Detecting location..."
      />
    );
  }

  if (!location) {
    return (
      <DataCard
        title="WHERE YOU ARE"
        description="Unable to determine location"
      />
    );
  }

  return (
    <DataCard
      title="WHERE YOU ARE"
      subtitle={`${location.city}, ${location.region}, ${location.country}`}
      description={`You appear to be in ${location.city}, ${location.country}. Your internet provider is ${location.isp}. We know this because your IP address — ${location.ip} — was the first thing your device sent us. We know the rest of it. We chose not to display it. Most pages would not have made that choice. We did not ask for your location. Your address arrived before you did.`}
    />
  );
}
