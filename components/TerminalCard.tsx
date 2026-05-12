"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { playLowFreqSound } from "@/utils/sound";
import { Typewriter } from "@/components/Typewriter";



export function TerminalCard({ title, dataPoints, description, delay = 0 }: TerminalCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStartTyping(true);
        playLowFreqSound();
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative w-full max-w-2xl p-6 mb-10 border border-zinc-800 bg-black/50 backdrop-blur-md rounded-none overflow-hidden"
    >

      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500"></div>

      <div className="border-b border-zinc-800 pb-2 mb-4 flex justify-between items-end">
        <h2 className="text-lg md:text-xl font-bold tracking-widest text-zinc-100 uppercase">
          {title}
        </h2>
        <span className="text-xs text-zinc-500 uppercase tracking-widest animate-pulse">
          {startTyping ? "DECRYPTING..." : "AWAITING SYNC"}
        </span>
      </div>

      {dataPoints.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {dataPoints.map((dp, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">{dp.label}</span>
              <span className="text-sm text-zinc-300 font-medium">
                {startTyping ? <Typewriter text={dp.value} startTyping={true} /> : <span className="opacity-0">_</span>}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-zinc-400 leading-relaxed mt-4">
        {startTyping ? (
          <>
            <Typewriter text={description} startTyping={true} />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-zinc-400 ml-1 align-middle"
            />
          </>
        ) : (
          <span className="opacity-0">_</span>
        )}
      </div>
    </motion.div>
  );
}
