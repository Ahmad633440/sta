"use client";

import React, { useEffect, useState } from "react";
import { TerminalCard } from "@/components/TerminalCard";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface TechData {
  ip: string;
  location: string;
  userAgent: string;
  platform: string;
  screenSize: string;
  connection: string;
}

export default function RevealPage() {
  const [data, setData] = useState<TechData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch IP and Location
        const res = await fetch("https://ipapi.co/json/");
        const ipData = await res.json();
        
        // Browser info
        const ua = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const connection = (window.navigator as any).connection?.effectiveType || "Unknown";

        setData({
          ip: ipData.ip || "UNKNOWN",
          location: `${ipData.city || "UNKNOWN"}, ${ipData.country_name || "UNKNOWN"}`,
          userAgent: ua,
          platform: platform,
          screenSize: screenSize,
          connection: connection.toUpperCase(),
        });
      } catch (err) {
        console.error(err);
        setData({
          ip: "ERROR_FETCHING",
          location: "UNKNOWN_ORIGIN",
          userAgent: window.navigator.userAgent,
          platform: window.navigator.platform,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          connection: "OFFLINE",
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-zinc-300 font-mono overflow-x-hidden selection:bg-zinc-800 flex flex-col items-center py-24 px-6 md:px-12">
      <BackgroundBeams />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center mt-12 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase text-zinc-100 mb-4 animate-pulse">
            Terminal Access Granted
          </h1>
          <p className="text-zinc-500 tracking-widest text-sm uppercase">
            Surveillance Node Active • Anti-Gravity Protocol Engaged
          </p>
        </div>

        <TerminalCard
          title="IDENTITY & ORIGIN"
          dataPoints={[
            { label: "IP Address", value: data?.ip || "SCANNING..." },
            { label: "Physical Location", value: data?.location || "TRIANGULATING..." },
          ]}
          description="Subject identified in real space. Tracing routing packets across orbital satellites. The grid is aware of your presence."
          delay={0.2}
        />

        {/* Spacer to force scrolling */}
        <div className="h-[30vh]" />

        <TerminalCard
          title="HARDWARE & SPECIFICATIONS"
          dataPoints={[
            { label: "Platform", value: data?.platform || "DETECTING..." },
            { label: "Screen Resolution", value: data?.screenSize || "MEASURING..." },
            { label: "Connection", value: data?.connection || "TESTING..." },
          ]}
          description="Monitoring localized gravity wells and device parameters. System footprint recorded. Visual interfaces bounded by physical screen constraints."
          delay={0.2}
        />

        <div className="h-[30vh]" />

        <TerminalCard
          title="SOFTWARE FOOTPRINT"
          dataPoints={[
            { label: "User Agent", value: data?.userAgent || "ANALYZING..." },
          ]}
          description="Digital fingerprint acquired. The browser transparency initiative has successfully compromised anonymity vectors. We see you."
          delay={0.2}
        />
      </div>
    </div>
  );
}
