"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    ).fromTo(
      btnsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="text-center z-10 pointer-events-auto max-w-4xl px-4">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight"
        >
          Master Your Exams. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-emerald-green">
            Enter the Future of Learning.
          </span>
        </h1>
        <div ref={btnsRef} className="flex gap-4 justify-center mt-8">
          <button className="px-8 py-4 bg-electric-indigo hover:bg-indigo-500 transition-colors rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            Download App
          </button>
          <button className="px-8 py-4 glass hover:glass-dark transition-all rounded-full font-semibold text-lg">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}
