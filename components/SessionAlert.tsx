'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SessionAlertProps {
  duration: number; // in milliseconds
  onDismiss: () => void;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms / 100) / 10}s`;
  const seconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;
  return `${seconds}.${Math.floor(milliseconds / 100)}s`;
}

export default function SessionAlert({ duration, onDismiss }: SessionAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        className="px-6 py-3 rounded-lg text-sm font-mono backdrop-blur-md cursor-pointer"
        style={{
          backgroundColor: 'rgba(148, 137, 121, 0.1)',
          borderLeft: '2px solid rgba(148, 137, 121, 0.5)',
          color: '#DFD0B8',
        }}
        onClick={onDismiss}
      >
        <span style={{ color: '#948979', fontWeight: 'bold' }}>
          You left for {formatDuration(duration)}.{' '}
        </span>
        We noticed.
      </div>
    </motion.div>
  );
}
