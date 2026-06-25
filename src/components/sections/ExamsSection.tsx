"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const exams = [
  { label: "SSC", desc: "CGL, CHSL, MTS", icon: "🏛️", color: "#6366f1" },
  { label: "Banking", desc: "IBPS, SBI, RBI", icon: "🏦", color: "#06b6d4" },
  { label: "Railway", desc: "RRB NTPC, Group D", icon: "🚂", color: "#10b981" },
  { label: "UPSC", desc: "IAS, IPS, IFS", icon: "📜", color: "#f59e0b" },
  { label: "Teaching", desc: "CTET, TET, KVS", icon: "📖", color: "#ec4899" },
  { label: "Police", desc: "SI, Constable", icon: "🚔", color: "#8b5cf6" },
  { label: "Defence", desc: "NDA, CDS, AFCAT", icon: "🎖️", color: "#f97316" },
  { label: "State Exams", desc: "PSC, UPPSC", icon: "🗺️", color: "#14b8a6" },
];

function ExamCard({ exam, index }: { exam: typeof exams[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="exam-card glass-card"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{ "--exam-color": exam.color } as React.CSSProperties}
    >
      <div className="exam-icon-wrap" style={{ background: `${exam.color}22`, border: `1px solid ${exam.color}44` }}>
        <span className="exam-icon">{exam.icon}</span>
      </div>
      <div>
        <h3 className="exam-label font-heading" style={{ color: exam.color }}>{exam.label}</h3>
        <p className="exam-desc">{exam.desc}</p>
      </div>
      <div className="exam-arrow">→</div>

      <style jsx>{`
        .exam-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .exam-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--exam-color, #6366f1)08 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .exam-card:hover::before { opacity: 1; }
        .exam-card:hover {
          border-color: color-mix(in srgb, var(--exam-color, #6366f1) 40%, transparent);
          box-shadow: 0 0 40px color-mix(in srgb, var(--exam-color, #6366f1) 20%, transparent), var(--shadow-card);
        }
        .exam-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .exam-icon { font-size: 1.5rem; }
        .exam-label {
          font-size: 1.0625rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .exam-desc {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .exam-arrow {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 1.125rem;
          transition: transform 0.2s, color 0.2s;
        }
        .exam-card:hover .exam-arrow {
          transform: translateX(4px);
          color: var(--exam-color, #6366f1);
        }
      `}</style>
    </motion.div>
  );
}

export default function ExamsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-exams" id="exams">
      <div className="exams-bg-glow" />
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Exam Coverage</div>
          <h2 className="section-title font-heading">
            Prepare For Every<br />Major Exam
          </h2>
          <p className="section-sub">
            Comprehensive coverage for all government and competitive examinations in India.
          </p>
        </motion.div>

        <div className="exams-grid">
          {exams.map((exam, i) => (
            <ExamCard key={exam.label} exam={exam} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-exams {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, transparent, rgba(99,102,241,0.03) 50%, transparent);
        }
        .exams-bg-glow {
          position: absolute;
          top: 30%;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          pointer-events: none;
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
        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--text-primary);
        }
        .section-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .exams-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .exams-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .exams-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </section>
  );
}
