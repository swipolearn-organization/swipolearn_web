"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: "👆",
    title: "Swipe",
    description: "Discover bite-sized concepts designed for rapid understanding. No more lengthy textbooks.",
    gradient: "var(--grad-brand)",
    glow: "rgba(99, 102, 241, 0.3)",
  },
  {
    number: "02",
    icon: "💡",
    title: "Learn",
    description: "Understand instantly with visual explanations and interactive question cards.",
    gradient: "var(--grad-cyber)",
    glow: "rgba(6, 182, 212, 0.3)",
  },
  {
    number: "03",
    icon: "🏆",
    title: "Master",
    description: "Retain knowledge better and perform confidently in your competitive exams.",
    gradient: "var(--grad-warm)",
    glow: "rgba(249, 115, 22, 0.3)",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="step-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      style={{ "--step-glow": step.glow } as React.CSSProperties}
    >
      <div className="step-number">{step.number}</div>
      <div className="step-icon-wrap" style={{ background: step.gradient }}>
        <span className="step-icon">{step.icon}</span>
      </div>
      <h3 className="step-title font-heading">{step.title}</h3>
      <p className="step-desc">{step.description}</p>

      {/* Connector line (not last) */}
      {index < steps.length - 1 && <div className="step-connector" />}

      <style jsx>{`
        .step-card {
          position: relative;
          padding: 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: box-shadow 0.3s ease;
        }
        .step-card:hover {
          box-shadow: 0 0 40px var(--step-glow, rgba(99,102,241,0.25)), var(--shadow-card);
        }
        .step-number {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .step-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .step-icon { font-size: 1.75rem; }
        .step-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .step-desc {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .step-connector {
          display: none;
          position: absolute;
          top: 50%;
          right: -2rem;
          width: 2rem;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
        }
        @media (min-width: 900px) {
          .step-connector { display: block; }
        }
      `}</style>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="how-it-works">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">How It Works</div>
          <h2 className="section-title font-heading">
            Learning That Feels Natural
          </h2>
          <p className="section-sub">
            Three simple steps to transform your exam preparation journey.
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .section {
          padding: 6rem 0;
          position: relative;
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
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          position: relative;
        }
        @media (min-width: 640px) { .steps-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .steps-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </section>
  );
}
