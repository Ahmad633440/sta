"use client";

import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRevealData } from "@/hooks/useRevealData";
import { useSessionMetrics } from "@/hooks/useSessionMetrics";
import { useVisibilityTracking } from "@/hooks/useVisibilityTracking";

import LocationReveal from "@/components/revealSections/LocationReveal";
import TimeReveal from "@/components/revealSections/TimeReveal";
import TechReveal from "@/components/revealSections/TechReveal";
import GPUReveal from "@/components/revealSections/GPUReveal";
import BatteryReveal from "@/components/revealSections/BatteryReveal";
import LanguageReveal from "@/components/revealSections/LanguageReveal";
import PermissionsReveal from "@/components/revealSections/PermissionsReveal";
import VisibilityReveal from "@/components/revealSections/VisibilityReveal";
import ClosingReveal from "@/components/revealSections/ClosingReveal";

export default function RevealPage() {
  const { browser, location, loading } = useRevealData();
  const { metrics } = useSessionMetrics();
  const { visibility } = useVisibilityTracking();

  return (
    <div
      className="relative min-h-screen font-mono overflow-x-hidden flex flex-col"
      style={{ backgroundColor: "#1A1A1D", color: "#DFD0B8" }}
    >
      <Navbar />
      <BackgroundBeams />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-full flex flex-col items-center py-32 px-6 md:px-12"
      >
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-16"
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "#948979" }}
          >
            REVEAL
          </h1>
          <p style={{ color: "#DFD0B8" }} className="text-sm opacity-75">
            What your browser just told us about you
          </p>
        </motion.div>

        {/* Data Sections */}
        <div className="w-full max-w-3xl mx-auto space-y-12">
          <LocationReveal location={location} loading={loading} />
          <TimeReveal location={location} loading={loading} />
          <TechReveal browser={browser} loading={loading} />
          <GPUReveal browser={browser} loading={loading} />
          <BatteryReveal browser={browser} loading={loading} />
          <LanguageReveal browser={browser} loading={loading} />
          <PermissionsReveal browser={browser} loading={loading} />
          <VisibilityReveal metrics={metrics} visibility={visibility} />
          <ClosingReveal />
        </div>

        {/* Spacer */}
        <div className="h-32" />
      </motion.div>
    </div>
  );
}
