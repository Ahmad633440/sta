'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { BrowserInfo } from '@/utils/browserDetection';

interface GPURevealProps {
  browser: BrowserInfo | null;
  loading: boolean;
}

export default function GPUReveal({ browser, loading }: GPURevealProps) {
  if (loading) {
    return (
      <DataCard
        title="WHAT RENDERS YOUR WORLD"
        description="Detecting graphics processor..."
        delay={0.3}
      />
    );
  }

  if (!browser) {
    return (
      <DataCard
        title="WHAT RENDERS YOUR WORLD"
        description="Unable to detect GPU information"
        delay={0.3}
      />
    );
  }

  return (
    <DataCard
      title="WHAT RENDERS YOUR WORLD"
      subtitle={browser.gpu}
      delay={0.3}
    />
  );
}
