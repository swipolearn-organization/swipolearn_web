"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "👆",
    title: "Swipe to Learn",
    description:
      "Absorb concepts 3× faster with short, focused flashcard-style swipes. Skip what you know, master what you don't.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    glow: "rgba(99,102,241,0.35)",
    tag: "Core Feature",
    stats: "3× faster retention",
    featured: true,
  },
  {
    icon: "📝",
    title: "Full-Length Mock Tests",
    description:
      "Timed, exam-pattern mock tests with auto-evaluated answers, detailed solutions, and rank predictions.",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
    glow: "rgba(6,182,212,0.3)",
    tag: "Exam Ready",
    stats: "500+ mock papers",
    featured: false,
  },
  {
    icon: "🎯",
    title: "Daily Quiz Challenge",
    description:
      "Fresh 10-question quizzes every day, crafted by exam toppers. Compete on leaderboards and earn streak rewards.",
    gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
    glow: "rgba(249,115,22,0.3)",
    tag: "Daily Habit",
    stats: "365 days of quizzes",
    featured: false,
  },
  {
    icon: "📚",
    title: "Curated Study Materials",
    description:
      "Structured notes, PDFs, and topic-wise content for SSC, Banking, Railway, UPSC, and Defence exams in one place.",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    glow: "rgba(16,185,129,0.3)",
    tag: "All-in-One",
    stats: "10,000+ topics covered",
    featured: false,
  },
  {
    icon: "📊",
    title: "AI Performance Analytics",
    description:
      "Smart tracking identifies your weak areas. Get personalised study plans based on your accuracy and speed trends.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    glow: "rgba(139,92,246,0.3)",
    tag: "Smart Learning",
    stats: "Personalised to you",
    featured: false,
  },
  {
    icon: "🔔",
    title: "Exam Calendar & Alerts",
    description:
      "Never miss a notification — admit cards, exam dates, results, and syllabus updates delivered instantly.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    glow: "rgba(245,158,11,0.3)",
    tag: "Stay Updated",
    stats: "Real-time alerts",
    featured: false,
  },
  {
    icon: "🔄",
    title: "Spaced Repetition Engine",
    description:
      "Our algorithm resurfaces topics at optimal intervals so information sticks in long-term memory automatically.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    glow: "rgba(236,72,153,0.3)",
    tag: "Science-Backed",
    stats: "Proven methodology",
    featured: false,
  },
  {
    icon: "🏆",
    title: "Leaderboard & Streaks",
    description:
      "Stay motivated with daily streaks, XP points, badges and national leaderboards. Learning is more fun when you compete.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #10b981 100%)",
    glow: "rgba(245,158,11,0.3)",
    tag: "Gamified",
    stats: "10,000+ active users",
    featured: false,
  },
];

function FeaturedCard({ feature }: { feature: typeof features[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="feat-card feat-card--hero"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="feat-card-glow" style={{ background: feature.glow }} />
      <div className="feat-hero-top">
        <div className="feat-icon-wrap" style={{ background: feature.gradient }}>
          <span className="feat-icon">{feature.icon}</span>
        </div>
        <span className="feat-tag">{feature.tag}</span>
        <span className="feat-badge">Most Popular</span>
      </div>
      <h3 className="feat-title">{feature.title}</h3>
      <p className="feat-desc">{feature.description}</p>
      <div className="feat-stat-row">
        <div className="feat-stat">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {feature.stats}
        </div>
        <a href="#download" className="feat-cta">
          Try Free →
        </a>
      </div>

      {/* Decorative card stack visual */}
      <div className="feat-cards-preview">
        {["#6366f1", "#ec4899", "#06b6d4"].map((c, i) => (
          <div
            key={i}
            className="mini-card"
            style={{
              background: `linear-gradient(135deg, ${c}cc, ${c}66)`,
              transform: `rotate(${[-6, 0, 6][i]}deg) translateY(${[8, 0, 8][i]}px)`,
              zIndex: [1, 3, 1][i],
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .feat-card--hero {
          grid-column: span 1;
          position: relative;
          background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 100%);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 24px;
          padding: 2rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 0 40px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.3);
        }
        @media (min-width: 900px) {
          .feat-card--hero { grid-column: span 2; padding: 2.5rem; }
        }
        .feat-card-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          pointer-events: none;
        }
        .feat-hero-top {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          flex-wrap: wrap;
        }
        .feat-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }
        .feat-icon { font-size: 1.625rem; }
        .feat-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--indigo);
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
        }
        .feat-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: white;
          background: var(--grad-brand);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          margin-left: auto;
        }
        .feat-title {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .feat-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
        }
        .feat-stat-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .feat-stat {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--indigo);
        }
        .feat-cta {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.5rem 1.125rem;
          border-radius: 20px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .feat-cta:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          transform: translateX(3px);
        }
        .feat-cards-preview {
          position: absolute;
          bottom: -10px;
          right: 2rem;
          display: none;
          align-items: flex-end;
          gap: 0;
        }
        @media (min-width: 900px) {
          .feat-cards-preview { display: flex; }
        }
        .mini-card {
          width: 90px;
          height: 130px;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
      `}</style>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="feat-card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="feat-card-glow-sm" style={{ background: feature.glow }} />
      <div className="feat-card-top">
        <div className="feat-icon-wrap-sm" style={{ background: feature.gradient }}>
          <span className="feat-icon-sm">{feature.icon}</span>
        </div>
        <span className="feat-tag-sm">{feature.tag}</span>
      </div>
      <h3 className="feat-title-sm">{feature.title}</h3>
      <p className="feat-desc-sm">{feature.description}</p>
      <div className="feat-stat-sm">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {feature.stats}
      </div>

      <style jsx>{`
        .feat-card {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 1.625rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .feat-card:hover {
          border-color: rgba(99,102,241,0.2);
          box-shadow: 0 0 28px rgba(99,102,241,0.1), 0 8px 24px rgba(0,0,0,0.25);
        }
        .feat-card-glow-sm {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.3;
          pointer-events: none;
        }
        .feat-card-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .feat-icon-wrap-sm {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          flex-shrink: 0;
        }
        .feat-icon-sm { font-size: 1.375rem; }
        .feat-tag-sm {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 0.25rem 0.625rem;
          border-radius: 20px;
        }
        .feat-title-sm {
          font-family: var(--font-heading);
          font-size: 1.0625rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          line-height: 1.25;
        }
        .feat-desc-sm {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.65;
          flex: 1;
        }
        .feat-stat-sm {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 0.75rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const [featuredCard, ...otherCards] = features;

  return (
    <section className="features-section" id="features">
      {/* Background */}
      <div className="features-bg-glow" />

      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="features-header"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.5 3.5H11L8.5 6.5l1 3.5L6 8l-3.5 2 1-3.5L1 4.5h3.5z" fill="currentColor" />
            </svg>
            Platform Features
          </div>
          <h2 className="features-title font-heading">
            Everything You Need<br />
            <span className="text-gradient">To Crack Any Exam</span>
          </h2>
          <p className="features-sub">
            A complete exam prep ecosystem — from daily flashcard swipes to full mock tests, analytics, and more.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="features-grid">
          {/* Hero card spanning 2 cols */}
          <FeaturedCard feature={featuredCard} />

          {/* Regular cards */}
          {otherCards.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="features-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="features-bottom-text">
            🚀 Join <strong>10,000+ students</strong> already learning smarter
          </p>
          <a href="#download" className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2v10M6 9l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Download Free
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 6rem 0 5rem;
          position: relative;
          overflow: hidden;
        }
        .features-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .features-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
          align-items: center;
        }
        .features-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text-primary);
        }
        .features-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.125rem;
        }
        @media (min-width: 640px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .features-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .features-bottom {
          margin-top: 3.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.06) 100%);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }
        .features-bottom-text {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .features-bottom-text strong { color: var(--text-primary); }
      `}</style>
    </section>
  );
}
