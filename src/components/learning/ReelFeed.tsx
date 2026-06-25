"use client";

import { useEffect, useRef, useState } from "react";
import ReelCard from "./ReelCard";
import styles from "./ReelFeed.module.css";

// Mock Data
const learningData = [
  {
    id: 1,
    topic: "History",
    title: "The Fall of the Roman Empire",
    content: "The Roman Empire officially fell in 476 AD when Romulus Augustulus was deposed by the Germanic king Odoacer.",
    keyFact: "Duration: 27 BC - 476 AD",
    color: "#ec4899",
  },
  {
    id: 2,
    topic: "Geography",
    title: "The Ring of Fire",
    content: "A path along the Pacific Ocean characterized by active volcanoes and frequent earthquakes. 75% of Earth's volcanoes are here.",
    keyFact: "Length: 40,000 km",
    color: "#6366f1",
  },
  {
    id: 3,
    topic: "Science",
    title: "Newton's First Law",
    content: "An object will not change its motion unless a force acts on it. This is also known as the law of inertia.",
    keyFact: "Inertia = Resistance to change",
    color: "#10b981",
  },
  {
    id: 4,
    topic: "Economy",
    title: "Inflation Explained",
    content: "Inflation is the rate at which the general level of prices for goods and services is rising, decreasing purchasing power.",
    keyFact: "Target rate: ~2%",
    color: "#f59e0b",
  }
];

export default function ReelFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      setActiveIndex(index);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.feedContainer} ref={containerRef}>
      {learningData.map((data, index) => (
        <div key={data.id} className={styles.reelWrapper}>
          <ReelCard 
            data={data} 
            isActive={index === activeIndex} 
          />
        </div>
      ))}
    </div>
  );
}
