'use client';

import React from 'react';
import { motion } from 'motion/react';

interface DataCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  delay?: number;
}

export default function DataCard({
  title,
  subtitle,
  description,
  children,
  delay = 0,
}: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div
        className="p-6 backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(26, 26, 29, 0.4)',
        }}
      >
        <h3 style={{ color: '#948979' }} className="text-lg font-mono font-bold mb-2">
          {title}
        </h3>

        {subtitle && (
          <p style={{ color: '#DFD0B8' }} className="text-sm font-mono mb-4 font-semibold">
            {subtitle}
          </p>
        )}

        {description && (
          <p
            style={{ color: '#DFD0B8' }}
            className="text-sm font-mono leading-relaxed mb-4 opacity-90"
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </motion.div>
  );
}
