'use client';

import React from 'react';
import DataCard from '@/components/DataCard';

export default function ClosingReveal() {
  return (
    <DataCard
      title="EVERY PAGE YOU HAVE EVER VISITED KNOWS AT LEAST THIS MUCH"
      description="Most of them know more. None of them told you."
      delay={0.8}
    />
  );
}
