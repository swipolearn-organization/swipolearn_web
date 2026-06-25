"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const swipeCards = [
  {
    id: 1,
    subject: "General Knowledge",
    question: "Who was the first President of India?",
    answer: "Dr. Rajendra Prasad became India's first President on January 26, 1950.",
    color: "#6366f1",
    emoji: "🇮🇳",
  },
  {
    id: 2,
    subject: "Mathematics",
    question: "A train travels 360 km in 4 hours. Find its speed.",
    answer: "Speed = Distance ÷ Time = 360 ÷ 4 = 90 km/h",
    color: "#ec4899",
    emoji: "🚂",
  },
  {
    id: 3,
    subject: "Science",
    question: "What is the chemical formula of water?",
    answer: "H₂O — two Hydrogen atoms bonded to one Oxygen atom.",
    color: "#06b6d4",
    emoji: "🔬",
  },
];

export default function SwipeShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);

  const card = swipeCards[currentIndex % swipeCards.length];

  const handleSwipe = (dir: "left" | "right") => {
    setSwipeDir(dir);
    setShowAnswer(false);
    setTimeout(() => {
      setCurrentIndex((p) => p + 1);
      setSwipeDir(null);
    }, 350);
  };

  return (
    <section className="section-alt" id="showcase" ref={ref}>
      {/* BG glow */}
      <div className="showcase-glow" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Interactive Demo</div>
          <h2 className="section-title font-heading">
            Every Swipe Makes You Smarter
          </h2>
          <p className="section-sub">
            Try it yourself — swipe the card to see how SwipOlearn works.
          </p>
        </motion.div>

        <div className="showcase-layout">
          {/* Demo Phone */}
          <motion.div
            className="demo-phone-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Swipe indicators */}
            <div className="swipe-indicators">
              <div className="swipe-indicator swipe-left">
                <span>← Skip</span>
              </div>
              <div className="swipe-indicator swipe-right">
                <span>Learn →</span>
              </div>
            </div>

            <div className="demo-card-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="demo-card"
                  style={{ background: `linear-gradient(135deg, ${card.color}ee, ${card.color}99)` }}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: swipeDir === "left" ? -200 : swipeDir === "right" ? 200 : 0,
                    rotate: swipeDir === "left" ? -15 : swipeDir === "right" ? 15 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  drag="x"
                  dragConstraints={{ left: -50, right: 50 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) handleSwipe("left");
                    else if (info.offset.x > 60) handleSwipe("right");
                  }}
                >
                  <div className="demo-card-emoji">{card.emoji}</div>
                  <div className="demo-card-subject">{card.subject}</div>
                  <h3 className="demo-card-q">{card.question}</h3>

                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        className="demo-card-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="answer-divider" />
                        <p className="answer-text">{card.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showAnswer && (
                    <button
                      className="reveal-btn"
                      onClick={() => setShowAnswer(true)}
                    >
                      Tap to reveal answer
                    </button>
                  )}

                  <p className="drag-hint">or drag to swipe</p>
                </motion.div>
              </AnimatePresence>

              {/* Background stacked card */}
              <div className="demo-card-bg" style={{ background: `linear-gradient(135deg, ${swipeCards[(currentIndex + 1) % swipeCards.length].color}44, ${swipeCards[(currentIndex + 1) % swipeCards.length].color}22)` }} />
            </div>

            {/* Swipe buttons */}
            <div className="demo-btns">
              <button className="demo-btn demo-btn--skip" onClick={() => handleSwipe("left")}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 10H7M9 7l-3 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Skip
              </button>
              <button className="demo-btn demo-btn--learn" onClick={() => handleSwipe("right")}>
                Learn
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10h6M11 7l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Progress dots */}
            <div className="demo-progress">
              {swipeCards.map((_, i) => (
                <div key={i} className={`demo-dot${i === currentIndex % swipeCards.length ? " active" : ""}`} />
              ))}
            </div>
          </motion.div>

          {/* Feature list */}
          <motion.div
            className="showcase-features"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {[
              { icon: "⚡", title: "Instant Learning", desc: "Absorb concepts 3× faster than traditional reading with our visual cards." },
              { icon: "🎯", title: "Targeted Practice", desc: "Questions curated specifically for SSC, Banking, Railway and other exams." },
              { icon: "📊", title: "Smart Tracking", desc: "Our algorithm identifies your weak areas and improves them automatically." },
              { icon: "🔄", title: "Spaced Repetition", desc: "Scientifically-proven technique to help you remember what you learn." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="showcase-feature glass-card"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="feature-icon-sm">{f.icon}</span>
                <div>
                  <h4 className="feature-title-sm">{f.title}</h4>
                  <p className="feature-desc-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .section-alt {
          padding: 6rem 0;
          background: linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.04) 50%, transparent 100%);
          position: relative;
          overflow: hidden;
        }
        .showcase-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
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
        .showcase-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .showcase-layout { grid-template-columns: 1fr 1fr; }
        }
        .demo-phone-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
        }
        .swipe-indicators {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 340px;
        }
        .swipe-indicator {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.375rem 0.875rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
        }
        .demo-card-container {
          position: relative;
          width: 100%;
          max-width: 340px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .demo-card {
          position: absolute;
          width: 300px;
          border-radius: 24px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
          cursor: grab;
          user-select: none;
          z-index: 2;
        }
        .demo-card:active { cursor: grabbing; }
        .demo-card-bg {
          position: absolute;
          width: 280px;
          height: 360px;
          border-radius: 24px;
          top: 16px;
          z-index: 1;
          transform: rotate(3deg);
        }
        .demo-card-emoji { font-size: 2rem; }
        .demo-card-subject {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.2);
          padding: 4px 10px;
          border-radius: 20px;
          width: fit-content;
        }
        .demo-card-q {
          font-size: 1.125rem;
          font-weight: 700;
          color: white;
          line-height: 1.4;
        }
        .answer-divider { height: 1px; background: rgba(255,255,255,0.2); }
        .answer-text { font-size: 0.9375rem; color: rgba(255,255,255,0.9); line-height: 1.5; }
        .reveal-btn {
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s;
          text-align: center;
        }
        .reveal-btn:hover { background: rgba(0,0,0,0.4); }
        .drag-hint { font-size: 0.7rem; color: rgba(255,255,255,0.4); text-align: center; }
        .demo-btns {
          display: flex;
          gap: 1rem;
        }
        .demo-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s;
        }
        .demo-btn--skip {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .demo-btn--skip:hover { background: rgba(239, 68, 68, 0.2); }
        .demo-btn--learn {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .demo-btn--learn:hover { background: rgba(16, 185, 129, 0.2); }
        .demo-progress {
          display: flex;
          gap: 0.5rem;
        }
        .demo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: all 0.2s;
        }
        .demo-dot.active {
          width: 20px;
          border-radius: 3px;
          background: var(--indigo);
        }
        .showcase-features {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .showcase-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
        }
        .feature-icon-sm { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
        .feature-title-sm { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .feature-desc-sm { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }
      `}</style>
    </section>
  );
}
