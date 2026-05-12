"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { FloatingParticles } from "@/components/FloatingParticles";

const INIT_TEXT = `> [SYNC] Connecting to local node...
> [AUTH] Accessing browser handshake protocols.
> [INFO] This is a transparency experiment.
> [INFO] We are pulling the invisible threads you leave behind.
> [INFO] Every click, every hover, every heartbeat is recorded.
> Welcome to "Browser Transparency".
>[READY] Initializing reveal sequence...`;

export default function Home() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle global mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(console.error);
      }
    }
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleSequenceComplete = useCallback(() => {
    setShowSubtitle(true);
    setTimeout(() => {
      router.push("/reveal");
    }, 3000); // Wait 3s before redirecting
  }, [router]);

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center min-h-screen overflow-hidden" style={{ backgroundColor: '#1A1A1D' }}>
      <FloatingParticles />

      {/* Cinematic Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      >
        <source src="/assets/intro-video.mp4" type="video/mp4" />
      </video>

      {/* Synchronized looping audio */}
      <audio ref={audioRef} loop src="/assets/background-music.mp3" />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(26,26,29,0.9)_100%)] z-10 opacity-80" />

      {/* Global Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-2 transition-colors rounded-none cursor-pointer"
        style={{ color: '#DFD0B8', backgroundColor: 'rgba(26,26,29,0.5)', backdropFilter: 'blur(8px)' }}
        aria-label="Toggle mute"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Website Name - Slow Aesthetic Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="z-30 mb-8 text-center"
      >
        <h1 
          className="font-display text-5xl md:text-7xl"
          style={{ color: '#948979', fontFamily: "'Fredericka the Great', cursive" }}
        >
          GRAVITY'S DEBT
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-20 flex flex-col items-start w-full max-w-3xl p-8 shadow-2xl"
        style={{ backgroundColor: 'rgba(26,26,29,0.4)', backdropFilter: 'blur(8px)' }}
      >
        <div className="font-mono text-sm md:text-base leading-loose whitespace-pre-wrap" style={{ color: '#DFD0B8' }}>
          <Typewriter
            text={INIT_TEXT}
            speed={25}
            onComplete={handleSequenceComplete}
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 ml-1 align-middle"
            style={{ backgroundColor: '#DFD0B8' }}
          />
        </div>
        
        {/* Updated text after sequence */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 font-mono text-sm"
            style={{ color: '#948979' }}
          >
            <p>Terminal interface ready. Proceeding to reveal sequence...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

