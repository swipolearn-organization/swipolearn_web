"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useTransform as useMotionTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── Questions data ───────────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    subject: "General Knowledge",
    subjectColor: "#6366f1",
    emoji: "🇮🇳",
    question: "Who was the first President of India?",
    options: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"],
    correct: 0,
    explanation: "Dr. Rajendra Prasad served as India's first President from 1950–1962.",
  },
  {
    id: 2,
    subject: "Mathematics",
    subjectColor: "#ec4899",
    emoji: "🔢",
    question: "A train travels 360 km in 4 hours. Find speed.",
    options: ["80 km/h", "90 km/h", "100 km/h", "70 km/h"],
    correct: 1,
    explanation: "Speed = Distance ÷ Time = 360 ÷ 4 = 90 km/h",
  },
  {
    id: 3,
    subject: "Science",
    subjectColor: "#06b6d4",
    emoji: "🔬",
    question: "What is the chemical formula of water?",
    options: ["H₂O₂", "HO", "H₂O", "H₃O"],
    correct: 2,
    explanation: "Water is H₂O — 2 Hydrogen atoms bonded to 1 Oxygen atom.",
  },
  {
    id: 4,
    subject: "History",
    subjectColor: "#f59e0b",
    emoji: "📜",
    question: "India got independence in which year?",
    options: ["1945", "1946", "1947", "1948"],
    correct: 2,
    explanation: "India gained independence on August 15, 1947.",
  },
  {
    id: 5,
    subject: "Current Affairs",
    subjectColor: "#10b981",
    emoji: "🌍",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Saturn", "Mars"],
    correct: 3,
    explanation: "Mars is called the Red Planet due to iron oxide on its surface.",
  },
];

// ─── Floating Orb ─────────────────────────────────────────────────────────────
function Orb({ style }: { style: React.CSSProperties }) {
  return <div className="hero-orb" style={style} />;
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="sb">
      <span className="sb-time">{time}</span>
      <div className="sb-icons">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="4" width="3" height="7" rx="1" fill="rgba(255,255,255,0.9)" />
          <rect x="4" y="2.5" width="3" height="8.5" rx="1" fill="rgba(255,255,255,0.9)" />
          <rect x="8" y="1" width="3" height="10" rx="1" fill="rgba(255,255,255,0.9)" />
          <rect x="12" y="0" width="3" height="11" rx="1" fill="rgba(255,255,255,0.4)" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2C5 2 2.8 3.2 1.5 5L3 6.5C3.9 5.3 5.6 4.5 7.5 4.5S11.1 5.3 12 6.5L13.5 5C12.2 3.2 10 2 7.5 2z" fill="rgba(255,255,255,0.9)" />
          <path d="M7.5 5.5C6.2 5.5 5 6.1 4.2 7L5.7 8.5C6.2 8 6.8 7.7 7.5 7.7s1.3.3 1.8.8L10.8 7C10 6.1 8.8 5.5 7.5 5.5z" fill="rgba(255,255,255,0.9)" />
          <circle cx="7.5" cy="10" r="1.2" fill="rgba(255,255,255,0.9)" />
        </svg>
        <div className="sb-battery">
          <div className="sb-battery-fill" />
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Swipe Phone ───────────────────────────────────────────────────
function SwipePhone() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [swipeHint, setSwipeHint] = useState<"left" | "right" | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const x = useMotionValue(0);
  const rotate = useMotionTransform(x, [-150, 0, 150], [-18, 0, 18]);
  const cardOpacity = useMotionTransform(x, [-150, -60, 0, 60, 150], [0, 1, 1, 1, 0]);
  const skipOpacity = useMotionTransform(x, [-80, -20, 0], [1, 0.5, 0]);
  const learnOpacity = useMotionTransform(x, [0, 20, 80], [0, 0.5, 1]);

  const q = questions[idx % questions.length];
  const nextQ = questions[(idx + 1) % questions.length];

  const advance = (dir: "left" | "right") => {
    setDirection(dir);
    if (dir === "right" && selected === q.correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else if (dir === "left") {
      setStreak(0);
    }
    setTimeout(() => {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
      setDirection(null);
      x.set(0);
    }, 380);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60) advance("left");
    else if (info.offset.x > 60) advance("right");
    else x.set(0);
  };

  // Auto-swipe demo after 3s idle
  useEffect(() => {
    if (selected !== null) return;
    const t = setTimeout(() => setSwipeHint("right"), 2800);
    return () => clearTimeout(t);
  }, [idx, selected]);

  useEffect(() => {
    if (swipeHint) {
      const t = setTimeout(() => setSwipeHint(null), 900);
      return () => clearTimeout(t);
    }
  }, [swipeHint]);

  const progress = ((idx % questions.length) + 1);

  return (
    <div className="phone-wrap">
      {/* Glow behind phone */}
      <div className="phone-glow" />

      {/* Phone bezel */}
      <motion.div
        className="phone-bezel"
        initial={{ y: 60, opacity: 0, rotateY: -12 }}
        animate={{ y: 0, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Side buttons */}
        <div className="side-btn side-btn--vol-up" />
        <div className="side-btn side-btn--vol-dn" />
        <div className="side-btn side-btn--power" />

        {/* Dynamic Island */}
        <div className="dynamic-island">
          <div className="di-camera" />
        </div>

        {/* Screen */}
        <div className="phone-screen">
          <StatusBar />

          {/* App Header */}
          <div className="app-header">
            <div className="app-logo">
              <span style={{ color: "#f8fafc" }}>swip</span>
              <span style={{
                background: "linear-gradient(135deg,#6366f1,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 900,
              }}>O</span>
              <span style={{ color: "#f8fafc" }}>learn</span>
            </div>
            <div className="app-header-right">
              {streak > 0 && (
                <div className="streak-badge">🔥 {streak}</div>
              )}
              <div className="score-badge">⭐ {score}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-wrap">
            <div className="progress-label">
              <span>Question {progress} of {questions.length}</span>
              <span className="progress-pct">{Math.round((progress / questions.length) * 100)}%</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                animate={{ width: `${(progress / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Swipe zone */}
          <div className="swipe-zone">
            {/* Skip / Learn overlays */}
            <motion.div className="swipe-label swipe-label--skip" style={{ opacity: skipOpacity }}>
              <span>✕ SKIP</span>
            </motion.div>
            <motion.div className="swipe-label swipe-label--learn" style={{ opacity: learnOpacity }}>
              <span>✓ GOT IT</span>
            </motion.div>

            {/* Background card (next card peek) */}
            <div
              className="card card--bg"
              style={{ background: `linear-gradient(135deg,${nextQ.subjectColor}66,${nextQ.subjectColor}33)` }}
            />

            {/* Main draggable card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="card card--main"
                style={{
                  x,
                  rotate,
                  opacity: cardOpacity,
                  background: `linear-gradient(145deg,${q.subjectColor}ee,${q.subjectColor}99)`,
                }}
                drag="x"
                dragConstraints={{ left: -120, right: 120 }}
                dragElastic={0.15}
                onDrag={(_, info) => {
                  if (info.offset.x < -20) setSwipeHint("left");
                  else if (info.offset.x > 20) setSwipeHint("right");
                  else setSwipeHint(null);
                }}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={
                  direction === "left"
                    ? { x: -300, rotate: -20, opacity: 0 }
                    : direction === "right"
                    ? { x: 300, rotate: 20, opacity: 0 }
                    : { scale: 1, opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Card header */}
                <div className="card-head">
                  <span className="card-emoji">{q.emoji}</span>
                  <span className="card-subject">{q.subject}</span>
                </div>

                {/* Question */}
                <p className="card-question">{q.question}</p>

                {/* Options */}
                <div className="card-options">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`card-option${selected === i ? (i === q.correct ? " correct" : " wrong") : ""}${revealed && i === q.correct ? " correct" : ""}`}
                      onClick={() => {
                        if (selected !== null) return;
                        setSelected(i);
                        setRevealed(true);
                      }}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                      <span className="opt-text">{opt}</span>
                      {revealed && i === q.correct && <span className="opt-check">✓</span>}
                      {selected === i && i !== q.correct && <span className="opt-x">✗</span>}
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      className="card-explanation"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="exp-icon">💡</span>
                      <span className="exp-text">{q.explanation}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Swipe hint */}
                {!revealed && (
                  <motion.p
                    className="card-drag-hint"
                    animate={{ x: swipeHint === "right" ? [0, 8, 0] : swipeHint === "left" ? [0, -8, 0] : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    👆 Drag to swipe
                  </motion.p>
                )}
                {revealed && (
                  <p className="card-swipe-to-next">
                    {selected === q.correct ? "🎉 Swipe right →" : "Swipe to continue →"}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="action-row">
            <button className="action-btn action-btn--skip" onClick={() => advance("left")}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 9H7M9 6L6 9l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Skip
            </button>
            <div className="dots-row">
              {questions.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className={`dot${i === idx % questions.length ? " dot--active" : i < idx % questions.length ? " dot--done" : ""}`}
                />
              ))}
            </div>
            <button className="action-btn action-btn--got" onClick={() => advance("right")}>
              Got it
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 9h4M9 6l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Bottom nav */}
          <div className="bottom-nav">
            {[
              { icon: "🏠", label: "Home" },
              { icon: "📚", label: "Learn", active: true },
              { icon: "📝", label: "Tests" },
              { icon: "📊", label: "Stats" },
              { icon: "👤", label: "Profile" },
            ].map((item) => (
              <div key={item.label} className={`nav-item${item.active ? " nav-item--active" : ""}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating stat badges */}
      <motion.div
        className="float-badge float-badge--tl"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="fb-icon">🎯</span>
        <div>
          <div className="fb-label">Accuracy</div>
          <div className="fb-value">94%</div>
        </div>
      </motion.div>

      <motion.div
        className="float-badge float-badge--br"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="fb-icon">⚡</span>
        <div>
          <div className="fb-label">Streak</div>
          <div className="fb-value">7 Days</div>
        </div>
      </motion.div>

      <motion.div
        className="float-badge float-badge--top"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        🏆 Top Performer Today
      </motion.div>

      <style jsx>{`
        /* ── Wrapper ── */
        .phone-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 4rem;
        }
        .phone-glow {
          position: absolute;
          width: 340px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        /* ── Bezel ── */
        .phone-bezel {
          position: relative;
          width: 300px;
          background: linear-gradient(155deg, #1c1c28 0%, #0e0e18 60%, #111118 100%);
          border-radius: 50px;
          padding: 14px 12px 10px;
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow:
            0 60px 100px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.05),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.3);
        }

        /* Side buttons */
        .side-btn {
          position: absolute;
          background: linear-gradient(90deg, #1a1a28, #252535);
          border-radius: 3px;
        }
        .side-btn--vol-up { width: 3px; height: 32px; left: -4px; top: 100px; }
        .side-btn--vol-dn { width: 3px; height: 32px; left: -4px; top: 142px; }
        .side-btn--power  { width: 3px; height: 52px; right: -4px; top: 110px; }

        /* Dynamic Island */
        .dynamic-island {
          width: 100px;
          height: 30px;
          background: #000;
          border-radius: 20px;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 22px;
        }
        .di-camera {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #1a1a28;
          border: 1.5px solid #222232;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.15);
        }

        /* ── Screen ── */
        .phone-screen {
          background: #08090f;
          border-radius: 38px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 580px;
        }

        /* Status bar */
        .sb {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 18px 4px;
        }
        .sb-time {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.03em;
        }
        .sb-icons {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .sb-battery {
          width: 22px;
          height: 11px;
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 3px;
          position: relative;
          display: flex;
          align-items: center;
          padding: 2px;
        }
        .sb-battery::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 0 2px 2px 0;
        }
        .sb-battery-fill {
          width: 70%;
          height: 100%;
          background: #10b981;
          border-radius: 1px;
        }

        /* App header */
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 14px 8px;
        }
        .app-logo {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-family: var(--font-heading);
        }
        .app-header-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .streak-badge {
          font-size: 10px;
          font-weight: 700;
          background: rgba(245,158,11,0.15);
          color: #f59e0b;
          padding: 3px 8px;
          border-radius: 20px;
          border: 1px solid rgba(245,158,11,0.2);
        }
        .score-badge {
          font-size: 10px;
          font-weight: 700;
          background: rgba(99,102,241,0.15);
          color: #818cf8;
          padding: 3px 8px;
          border-radius: 20px;
          border: 1px solid rgba(99,102,241,0.2);
        }

        /* Progress */
        .progress-wrap {
          padding: 0 14px 10px;
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 5px;
          font-weight: 600;
        }
        .progress-pct { color: rgba(255,255,255,0.6); }
        .progress-track {
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          border-radius: 4px;
        }

        /* Swipe zone */
        .swipe-zone {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          min-height: 360px;
        }
        .swipe-label {
          position: absolute;
          z-index: 20;
          top: 14px;
          pointer-events: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 8px;
          border: 2px solid;
        }
        .swipe-label--skip {
          left: 14px;
          color: #ef4444;
          border-color: #ef4444;
          transform: rotate(-15deg);
        }
        .swipe-label--learn {
          right: 14px;
          color: #10b981;
          border-color: #10b981;
          transform: rotate(15deg);
        }

        /* Background (next) card */
        .card--bg {
          position: absolute;
          width: 240px;
          height: 320px;
          border-radius: 22px;
          transform: rotate(4deg) translateY(10px) scale(0.93);
          opacity: 0.7;
          z-index: 1;
        }

        /* Main card */
        .card--main {
          position: relative;
          z-index: 10;
          width: 252px;
          border-radius: 22px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 9px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          cursor: grab;
          user-select: none;
          touch-action: none;
        }
        .card--main:active { cursor: grabbing; }

        /* Card internals */
        .card-head {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .card-emoji { font-size: 16px; }
        .card-subject {
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.2);
          padding: 3px 8px;
          border-radius: 20px;
        }
        .card-question {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          line-height: 1.45;
        }
        .card-options {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .card-option {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
          text-align: left;
        }
        .card-option:hover { background: rgba(0,0,0,0.35); }
        .card-option.correct {
          background: rgba(16,185,129,0.2);
          border-color: rgba(16,185,129,0.5);
        }
        .card-option.wrong {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.4);
        }
        .opt-letter {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 800;
          color: rgba(255,255,255,0.7);
          flex-shrink: 0;
        }
        .opt-text {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          flex: 1;
        }
        .opt-check { font-size: 11px; color: #10b981; font-weight: 900; }
        .opt-x { font-size: 11px; color: #ef4444; font-weight: 900; }

        /* Explanation */
        .card-explanation {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          padding: 7px 9px;
          background: rgba(0,0,0,0.25);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .exp-icon { font-size: 11px; flex-shrink: 0; margin-top: 1px; }
        .exp-text { font-size: 9px; color: rgba(255,255,255,0.8); line-height: 1.5; }

        .card-drag-hint {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          text-align: center;
        }
        .card-swipe-to-next {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          text-align: center;
          font-weight: 600;
        }

        /* Action row */
        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          gap: 8px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s;
        }
        .action-btn--skip {
          background: rgba(239,68,68,0.1);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.2);
        }
        .action-btn--skip:hover { background: rgba(239,68,68,0.2); }
        .action-btn--got {
          background: rgba(16,185,129,0.1);
          color: #10b981;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .action-btn--got:hover { background: rgba(16,185,129,0.2); }

        /* Progress dots */
        .dots-row { display: flex; gap: 5px; align-items: center; }
        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: all 0.25s;
        }
        .dot--active {
          width: 14px;
          border-radius: 3px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
        }
        .dot--done { background: rgba(99,102,241,0.4); }

        /* Bottom nav */
        .bottom-nav {
          display: flex;
          justify-content: space-around;
          padding: 6px 0 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          opacity: 0.35;
          transition: opacity 0.2s;
        }
        .nav-item--active { opacity: 1; }
        .nav-icon { font-size: 16px; }
        .nav-label { font-size: 7px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .nav-item--active .nav-label { color: #818cf8; }

        /* Floating badges */
        .float-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(14,14,22,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          white-space: nowrap;
          z-index: 20;
        }
        .float-badge--tl { left: -10px; top: 30%; }
        .float-badge--br { right: -10px; top: 62%; }
        .float-badge--top { top: 14px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 600; color: #f59e0b; }
        .fb-icon { font-size: 18px; }
        .fb-label { font-size: 8px; color: rgba(255,255,255,0.5); }
        .fb-value { font-size: 13px; font-weight: 800; color: #fff; }
      `}</style>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref} id="home">
      {/* Background */}
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <Orb style={{ width: 700, height: 700, top: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
        <Orb style={{ width: 500, height: 500, top: "5%", right: "-8%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)" }} />
        <Orb style={{ width: 400, height: 400, bottom: "0%", left: "30%", background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }} />
        <div className="hero-grid" />
      </motion.div>

      <motion.div className="hero-inner container" style={{ opacity: contentOpacity }}>
        {/* LEFT — Phone Mockup */}
        <SwipePhone />

        {/* RIGHT — Copy */}
        <div className="hero-copy">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✦ Next-Gen Exam Preparation
          </motion.div>

          <motion.h1
            className="hero-headline font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Learn Faster.<br />
            <span className="text-gradient">Swipe Smarter.</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            The next-generation platform where every swipe helps you master concepts, solve questions, and crack competitive exams — SSC, Banking, Railway & more.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            className="hero-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {["📱 Swipe to Learn", "🎯 Daily Quizzes", "📊 Smart Analytics", "🏆 Leaderboards"].map(p => (
              <span key={p} className="hero-pill">{p}</span>
            ))}
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a href="#download" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v10M6 9l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Download Free
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="hero-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="proof-avatars">
              {["#6366f1","#ec4899","#06b6d4","#10b981","#f59e0b"].map((c,i) => (
                <div key={i} className="proof-avatar" style={{ background: c, zIndex: 5-i }} />
              ))}
            </div>
            <p className="proof-text">
              <strong>10,000+</strong> students already learning smarter
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="scroll-dot" />
      </motion.div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 5rem;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
        .hero-inner {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 4rem;
          width: 100%;
        }
        @media (min-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        /* Copy side */
        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 1.375rem;
          max-width: 560px;
        }
        .hero-headline {
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }
        .hero-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 480px;
        }
        .hero-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hero-pill {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s;
        }
        .hero-pill:hover {
          border-color: rgba(99,102,241,0.3);
          color: var(--text-primary);
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .hero-proof {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }
        .proof-avatars {
          display: flex;
          align-items: center;
        }
        .proof-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
          margin-left: -8px;
        }
        .proof-avatar:first-child { margin-left: 0; }
        .proof-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .proof-text strong { color: var(--text-primary); }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        .scroll-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
