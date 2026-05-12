"use client";

import { useEffect, useState } from "react";



export function Typewriter({ text, startTyping = true, speed = 15, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("");
      return;
    }
    
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, startTyping, speed, onComplete]);

  return <span>{displayedText}</span>;
}
