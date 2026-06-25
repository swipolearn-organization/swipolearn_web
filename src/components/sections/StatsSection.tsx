"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Questions", icon: "❓", color: "#6366f1" },
  { value: 500, suffix: "+", label: "Mock Tests", icon: "📋", color: "#ec4899" },
  { value: 100, suffix: "+", label: "Study Materials", icon: "📚", color: "#06b6d4" },
  { label: "Learning Access", display: "24×7", icon: "⚡", color: "#10b981" },
];

function useCountUp(target: number, duration = 2, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value ?? 0, 2, inView && !!stat.value);

  const displayValue = stat.display ?? `${count.toLocaleString()}${stat.suffix ?? ""}`;

  return (
    <motion.div
      ref={ref}
      className="stat-card glass-card"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ "--stat-color": stat.color } as React.CSSProperties}
    >
      <div className="stat-icon-bg" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
        <span className="stat-icon">{stat.icon}</span>
      </div>
      <div className="stat-value font-heading" style={{ color: stat.color }}>
        {displayValue}
      </div>
      <div className="stat-label">{stat.label}</div>

      <style jsx>{`
        .stat-card {
          padding: 2rem 1.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .stat-card:hover {
          border-color: color-mix(in srgb, var(--stat-color, #6366f1) 35%, transparent);
          box-shadow: 0 0 40px color-mix(in srgb, var(--stat-color, #6366f1) 20%, transparent), var(--shadow-card);
        }
        .stat-icon-bg {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
        }
        .stat-icon { font-size: 1.75rem; }
        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
      `}</style>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-stats" id="stats" ref={ref}>
      <div className="stats-bg">
        <div className="stats-gradient" />
      </div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">By The Numbers</div>
          <h2 className="section-title font-heading">
            Why Students Love<br />SwipOlearn
          </h2>
          <p className="section-sub">
            Join thousands of students already accelerating their exam prep.
          </p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-stats {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .stats-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .stats-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%);
        }
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .section-title { font-size: clamp(2rem,4vw,3rem); font-weight: 900; letter-spacing: -0.025em; line-height: 1.1; color: var(--text-primary); }
        .section-sub { font-size: 1.0625rem; color: var(--text-secondary); line-height: 1.65; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 900px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </section>
  );
}
