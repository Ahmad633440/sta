'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { BrowserInfo } from '@/utils/browserDetection';

interface PermissionsRevealProps {
  browser: BrowserInfo | null;
  loading: boolean;
}

export default function PermissionsReveal({ browser, loading }: PermissionsRevealProps) {
  if (loading) {
    return (
      <DataCard
        title="WHAT YOU ALLOW"
        description="Checking browser permissions..."
        delay={0.6}
      />
    );
  }

  if (!browser) {
    return (
      <DataCard
        title="WHAT YOU ALLOW"
        description="Unable to determine permissions"
        delay={0.6}
      />
    );
  }

  const dnt = browser.doNotTrack === '1' ? 'enabled' : 'disabled';
  const storageInfo = browser.storage
    ? `${browser.storage.localStorage} local, ${browser.storage.sessionStorage} session`
    : 'Unknown';

  return (
    <DataCard
      title="WHAT YOU ALLOW"
      subtitle={`Cookies: ${browser.cookiesEnabled ? 'enabled' : 'disabled'} · Dark mode · Do Not Track: ${dnt} · Storage: ${storageInfo}`}
      delay={0.6}
    />
  );
}
