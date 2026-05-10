"use client";

import { FloatingParticles } from "@/components/FloatingParticles";
import { TerminalCard } from "@/components/TerminalCard";

export default function TakenPage() {
  return (
    <div className="relative min-h-screen bg-black text-zinc-300 py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center selection:bg-zinc-800">
      <FloatingParticles />
      
      {/* Subtle vignette overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10" />

      <div className="z-20 w-full max-w-2xl flex flex-col items-center pt-10">
        
        <TerminalCard
          title="SUBJECT: 001_ALPHA"
          delay={0.2}
          dataPoints={[
            { label: "Status", value: "OBSERVED" },
            { label: "Location", value: "SECTOR 7G" },
            { label: "Clearance", value: "LEVEL 4" },
            { label: "Anomalies", value: "DETECTED" },
          ]}
          description="Subject exhibits irregular gravitational pull. Time dilation observed in immediate vicinity. Standard protocols failing to contain localized reality distortions. Recommend immediate extraction and quarantine."
        />

        {/* Spacer to force scrolling for the next card */}
        <div className="h-[40vh]"></div>

        <TerminalCard
          title="INCIDENT LOG 49-B"
          dataPoints={[
            { label: "Timestamp", value: "2026-10-14 04:22:00 UTC" },
            { label: "Origin", value: "UNKNOWN" },
          ]}
          description="Sudden drop in atmospheric pressure. All chronometers desynced by exactly 3.14 seconds. The debt is compounding. It expects payment in mass."
        />

        <div className="h-[40vh]"></div>

        <TerminalCard
          title="FINAL DIRECTIVE"
          dataPoints={[
            { label: "Action", value: "EVACUATE" },
            { label: "Destination", value: "VOID" },
          ]}
          description="Do not look at the sky. The stars are no longer where we left them. The terminal will now sever connection to prevent cognitive hazards from propagating through the local network. Goodbye."
        />

        <div className="h-[20vh]"></div>
      </div>
    </div>
  );
}
