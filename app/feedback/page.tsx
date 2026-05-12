"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { FeedbackContainer } from "@/components/feedback/FeedbackContainer";

export default function FeedbackPage() {
  const handleFeedbackSubmit = (rating: number) => {
    console.log("Feedback submitted with rating:", rating);
    // Additional tracking or API calls can go here
  };

  return (
    <div className="min-h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Cinematic Spotlight Background */}
      <Spotlight />

      {/* Main Content */}
      <div className="p-4 max-w-4xl mx-auto relative z-10 w-full py-20 md:py-32">
        {/* Subtle intro text */}
        <div className="text-center mb-20">
          <p
            className="text-xs md:text-sm font-mono uppercase tracking-widest mb-8 opacity-50"
            style={{ color: "#948979" }}
          >
            [FEEDBACK PROTOCOL]
          </p>
        </div>

        {/* Feedback Container */}
        <FeedbackContainer
          question="How would you rate your experience?"
          subtitle="Your honest feedback shapes the system's understanding."
          onSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
}
