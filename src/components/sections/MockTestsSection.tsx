"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Mock tests data — in a real app this would come from a CMS/API
const upcomingTests = [
  {
    id: 1,
    name: "SSC CGL Tier-1 Mock Test",
    exam: "SSC",
    date: "June 15, 2026",
    time: "10:00 AM",
    duration: "60 min",
    questions: 100,
    difficulty: "Medium",
    color: "#6366f1",
    registered: 1240,
  },
  {
    id: 2,
    name: "IBPS PO Prelims Full Mock",
    exam: "Banking",
    date: "June 18, 2026",
    time: "02:00 PM",
    duration: "60 min",
    questions: 100,
    difficulty: "Hard",
    color: "#06b6d4",
    registered: 980,
  },
  {
    id: 3,
    name: "RRB NTPC CBT-1 Grand Test",
    exam: "Railway",
    date: "June 20, 2026",
    time: "11:00 AM",
    duration: "90 min",
    questions: 100,
    difficulty: "Medium",
    color: "#10b981",
    registered: 2100,
  },
  {
    id: 4,
    name: "UPSC Prelims GS Paper-1",
    exam: "UPSC",
    date: "June 22, 2026",
    time: "09:30 AM",
    duration: "120 min",
    questions: 100,
    difficulty: "Hard",
    color: "#f59e0b",
    registered: 765,
  },
];

function TestCard({ test, index }: { test: typeof upcomingTests[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [registered, setRegistered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="test-card glass-card"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ "--test-color": test.color } as React.CSSProperties}
    >
      <div className="test-card-left">
        <div className="test-badge" style={{ background: `${test.color}22`, color: test.color, borderColor: `${test.color}44` }}>
          {test.exam}
        </div>
        <h3 className="test-name">{test.name}</h3>
        <div className="test-meta">
          <span className="test-meta-item">📅 {test.date}</span>
          <span className="test-meta-item">⏰ {test.time}</span>
          <span className="test-meta-item">⏱ {test.duration}</span>
          <span className="test-meta-item">❓ {test.questions} Qs</span>
        </div>
        <div className="test-stats">
          <span className={`test-difficulty test-difficulty--${test.difficulty.toLowerCase()}`}>
            {test.difficulty === "Hard" ? "🔴" : "🟡"} {test.difficulty}
          </span>
          <span className="test-registrations">
            👥 {test.registered.toLocaleString()} registered
          </span>
        </div>
      </div>

      <div className="test-card-right">
        <button
          className={`register-btn${registered ? " registered" : ""}`}
          style={!registered ? { background: test.color } : {}}
          onClick={() => setRegistered(!registered)}
        >
          {registered ? "✓ Registered" : "Register Free"}
        </button>
        <p className="register-note">Free for all students</p>
      </div>

      <div className="test-accent-bar" style={{ background: test.color }} />

      <style jsx>{`
        .test-card {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.5rem 1.75rem;
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .test-card:hover {
          border-color: color-mix(in srgb, var(--test-color, #6366f1) 40%, transparent);
          box-shadow: 0 0 30px color-mix(in srgb, var(--test-color, #6366f1) 15%, transparent), var(--shadow-card);
        }
        .test-accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 3px 0 0 3px;
        }
        .test-card-left {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          flex: 1;
          min-width: 220px;
        }
        .test-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          border: 1px solid;
          width: fit-content;
        }
        .test-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .test-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .test-meta-item {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }
        .test-stats {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .test-difficulty {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.625rem;
          border-radius: 20px;
        }
        .test-difficulty--medium { background: rgba(245,158,11,0.1); color: #f59e0b; }
        .test-difficulty--hard { background: rgba(239,68,68,0.1); color: #ef4444; }
        .test-registrations { font-size: 0.8125rem; color: var(--text-muted); }
        .test-card-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.375rem;
          flex-shrink: 0;
        }
        .register-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .register-btn:hover { opacity: 0.9; transform: scale(1.03); }
        .register-btn.registered {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .register-note { font-size: 0.7rem; color: var(--text-muted); }
      `}</style>
    </motion.div>
  );
}

export default function MockTestsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="mock-tests">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header-row"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: "0.75rem" }}>Upcoming Tests</div>
            <h2 className="section-title font-heading">Upcoming Mock Tests</h2>
            <p className="section-sub" style={{ maxWidth: "500px" }}>
              Free mock tests updated regularly. Register now and get notified.
            </p>
          </div>
          <a href="#download" className="btn-secondary">View All Tests →</a>
        </motion.div>

        <div className="tests-list">
          {upcomingTests.map((test, i) => (
            <TestCard key={test.id} test={test} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .section { padding: 6rem 0; }
        .section-header-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .section-title {
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .section-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .tests-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </section>
  );
}
