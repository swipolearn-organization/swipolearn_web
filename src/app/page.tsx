"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/dom/HeroSection";
import FeaturesSection from "@/components/dom/FeaturesSection";
import AnalyticsSection from "@/components/dom/AnalyticsSection";
import PremiumSection from "@/components/dom/PremiumSection";
import FAQSection from "@/components/dom/FAQSection";
import FooterHUD from "@/components/dom/FooterHUD";

// Dynamically import the Scene to avoid SSR issues with Canvas
const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger setup can be initialized here
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden min-h-screen">
      {/* 3D Canvas Layer (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* DOM Layer (Scrollable) */}
      <div className="relative z-10 w-full">
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
        <PremiumSection />
        <FAQSection />
        <FooterHUD />
      </div>
    </main>
  );
}
