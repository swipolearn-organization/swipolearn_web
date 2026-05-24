"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-end pointer-events-none">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
        <div>{/* Left side empty for 3D Data Visuals */}</div>
        <div className="flex flex-col gap-8 z-10 pointer-events-auto text-right items-end">
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight">
            Deep Analytics & <br />
            <span className="text-emerald-green">Global Leaderboards</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-lg mb-8">
            Track your progress with precision. Identify weak subjects, monitor your speed, and compete with thousands on the global leaderboard.
          </p>
          <div className="flex gap-4">
            <div className="glass p-6 rounded-2xl text-center min-w-[120px] hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl font-bold font-heading text-emerald-green mb-1">98%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="glass p-6 rounded-2xl text-center min-w-[120px] hover:scale-105 transition-transform cursor-default">
              <div className="text-3xl font-bold font-heading text-electric-indigo mb-1">#12</div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
