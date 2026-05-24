"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current?.children as HTMLCollection,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[150vh] flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
        <div ref={textRef} className="flex flex-col gap-12 z-10 pointer-events-auto">
          <div className="glass-dark p-6 md:p-8 rounded-3xl border-l-4 border-emerald-green max-w-md will-change-transform">
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">Swipe Learning</h3>
            <p className="text-gray-300 text-sm md:text-base">Tinder-like fluid interface to memorize key facts instantly and intuitively.</p>
          </div>
          <div className="glass-dark p-6 md:p-8 rounded-3xl border-l-4 border-electric-indigo max-w-md ml-4 md:ml-8 will-change-transform">
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">Drill Mode & MCQs</h3>
            <p className="text-gray-300 text-sm md:text-base">Targeted quizzes and exhaustive multiple-choice questions to reinforce your weak areas.</p>
          </div>
          <div className="glass-dark p-6 md:p-8 rounded-3xl border-l-4 border-yellow-500 max-w-md will-change-transform">
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">Intelligent Mock Tests</h3>
            <p className="text-gray-300 text-sm md:text-base">Timed environments with negative marking simulating the real pressure of UPSC & SSC exams.</p>
          </div>
        </div>
        {/* Right side is empty for 3D Floating Phones */}
      </div>
    </section>
  );
}
