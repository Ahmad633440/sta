'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useSessionMetrics } from '@/hooks/useSessionMetrics';
import { useVisibilityTracking } from '@/hooks/useVisibilityTracking';
import SessionAlert from './SessionAlert';

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

export default function Navbar() {
  const { metrics } = useSessionMetrics();
  const { visibility, dismissAlert } = useVisibilityTracking();

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(26, 26, 29, 0.7)',
          borderBottom: '1px solid rgba(148, 137, 121, 0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Empty or logo */}
            <div className="w-32"></div>

          {/* feedback button */}
            <div className="flex items-center gap-4">
              <a
                href="/feedback"
                className="text-xs font-mono uppercase tracking-widest px-3 py-1 border border-[#948979] rounded hover:bg-[#948979]/10 transition-colors"
                style={{ color: '#948979' }}
              >
                Feedback
              </a>
            </div>       


            {/* Center: Metrics */}
            <div className="flex items-center gap-8 text-sm font-mono">
              <div className="flex flex-col items-center gap-1">
                <span style={{ color: '#948979' }}>TIME</span>
                <motion.span
                  key={metrics.timeSpent}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#DFD0B8' }}
                >
                  {formatTime(metrics.timeSpent)}
                </motion.span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span style={{ color: '#948979' }}>MOVEMENTS</span>
                <motion.span
                  key={metrics.cursorMoves}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#DFD0B8' }}
                >
                  {metrics.cursorMoves}
                </motion.span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span style={{ color: '#948979' }}>CLICKS</span>
                <motion.span
                  key={metrics.clicks}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#DFD0B8' }}
                >
                  {metrics.clicks}
                </motion.span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span style={{ color: '#948979' }}>ABSENCES</span>
                <motion.span
                  key={visibility.totalAbsences}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#DFD0B8' }}
                >
                  {visibility.totalAbsences}
                </motion.span>
              </div>
            </div>

            {/* Right: Status indicator */}
            <div className="w-32 flex justify-end">
              <motion.div
                animate={{ opacity: visibility.isVisible ? 1 : 0.5 }}
                className="flex items-center gap-2 text-xs font-mono"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: visibility.isVisible ? '#948979' : '#7a6f63',
                  }}
                />
                <span
                  style={{
                    color: visibility.isVisible ? '#948979' : '#7a6f63',
                  }}
                >
                  {visibility.isVisible ? 'ACTIVE' : 'AWAY'}
                </span>
                
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Session Alert - Shows when user returns */}
      {visibility.showAlert && (
        <SessionAlert
          duration={visibility.awayDuration}
          onDismiss={dismissAlert}
        />
      )}
    </>
  );
}