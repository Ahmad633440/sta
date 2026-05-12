'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { BrowserInfo } from '@/utils/browserDetection';

interface TechRevealProps {
  browser: BrowserInfo | null;
  loading: boolean;
}

export default function TechReveal({ browser, loading }: TechRevealProps) {
  if (loading) {
    return (
      <DataCard
        title="WHAT YOU BROUGHT WITH YOU"
        description="Analyzing your device..."
        delay={0.2}
      />
    );
  }

  if (!browser) {
    return (
      <DataCard
        title="WHAT YOU BROUGHT WITH YOU"
        description="Unable to detect device information"
        delay={0.2}
      />
    );
  }

  return (
    <DataCard
      title="WHAT YOU BROUGHT WITH YOU"
      subtitle={`${browser.browser} · ${browser.os} · ${browser.screenResolution} @ ${browser.pixelRatio} · ${browser.colorDepth} color`}
      delay={0.2}
    />
  );
}
