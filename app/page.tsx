"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { playLowFreqSound } from "@/utils/sound";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 items-center justify-center bg-black min-h-screen overflow-hidden selection:bg-zinc-800">
      <FloatingParticles />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 opacity-80" />

      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-20 flex flex-col items-center gap-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-zinc-100 uppercase text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Gravity's Debt
        </h1>

        <Link href="/taken" passHref>
          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => playLowFreqSound()}
            onClick={() => playLowFreqSound()}
            className="px-12 py-4 border border-zinc-700 bg-transparent text-zinc-400 tracking-[0.2em] text-sm uppercase transition-colors hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-500 backdrop-blur-sm"
          >
            Enter
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
