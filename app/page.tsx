"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { FloatingParticles } from "@/components/FloatingParticles";

const INIT_TEXT = `> SYSTEM INITIALIZATION SEQUENCE STARTED...
> ESTABLISHING SECURE CONNECTION...
> VERIFYING ENCRYPTION KEYS... [OK]
> LOADING CORE MODULES...
> 
> Welcome to "Browser Transparency".
>,
> .
> 
> 
> Redirection imminent...`;

export default function Home() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
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
    setTimeout(() => {
      router.push("/reveal");
    }, 3000); // Wait 3s before redirecting
  }, [router]);

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center bg-black min-h-screen overflow-hidden selection:bg-zinc-800">
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 opacity-80" />

      {/* Global Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 p-2 text-zinc-400 hover:text-zinc-100 transition-colors bg-black/50 backdrop-blur-md border border-zinc-800 rounded-none cursor-pointer"
        aria-label="Toggle mute"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-20 flex flex-col items-start w-full max-w-3xl p-8 bg-black/40 backdrop-blur-sm border border-zinc-800 shadow-2xl"
      >
        <div className="text-zinc-300 font-mono text-sm md:text-base leading-loose whitespace-pre-wrap">
          <Typewriter
            text={INIT_TEXT}
            speed={25}
            onComplete={handleSequenceComplete}
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-zinc-300 ml-1 align-middle"
          />
        </div>
      </motion.div>
    </div>
  );
}

