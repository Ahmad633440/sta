'use client';

import React from 'react';
import DataCard from '@/components/DataCard';
import { BrowserInfo } from '@/utils/browserDetection';

interface LanguageRevealProps {
  browser: BrowserInfo | null;
  loading: boolean;
}

export default function LanguageReveal({ browser, loading }: LanguageRevealProps) {
  if (loading) {
    return (
      <DataCard
        title="WHAT YOU SPEAK"
        description="Detecting language preferences..."
        delay={0.5}
      />
    );
  }

  if (!browser) {
    return (
      <DataCard
        title="WHAT YOU SPEAK"
        description="Unable to detect language"
        delay={0.5}
      />
    );
  }

  return (
    <DataCard
      title="WHAT YOU SPEAK"
      subtitle={browser.language}
      delay={0.5}
    />
  );
}
