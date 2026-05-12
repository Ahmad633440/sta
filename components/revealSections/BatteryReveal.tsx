'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { BrowserInfo } from '@/utils/browserDetection';

interface BatteryRevealProps {
  browser: BrowserInfo | null;
  loading: boolean;
}

export default function BatteryReveal({ browser, loading }: BatteryRevealProps) {
  if (loading) {
    return (
      <DataCard
        title="HOW MUCH IS LEFT"
        description="Checking battery status..."
        delay={0.4}
      />
    );
  }

  if (!browser?.battery) {
    return (
      <DataCard
        title="HOW MUCH IS LEFT"
        subtitle="Battery API unavailable or device plugged in"
        delay={0.4}
      />
    );
  }

  const status = browser.battery.charging ? 'charging' : 'draining';

  return (
    <DataCard
      title="HOW MUCH IS LEFT"
      subtitle={`Battery: ${browser.battery.percentage}% · ${status}`}
      delay={0.4}
    />
  );
}
