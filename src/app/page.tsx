import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import SwipeShowcase from "@/components/sections/SwipeShowcase";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import ExamsSection from "@/components/sections/ExamsSection";
import MockTestsSection from "@/components/sections/MockTestsSection";
import AppPreview from "@/components/sections/AppPreview";
import StatsSection from "@/components/sections/StatsSection";
import DownloadSection from "@/components/sections/DownloadSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <SwipeShowcase />
      <FeaturesGrid />
      <ExamsSection />
      <MockTestsSection />
      <AppPreview />
      <StatsSection />
      <DownloadSection />
      <Footer />
    </>
  );
}
