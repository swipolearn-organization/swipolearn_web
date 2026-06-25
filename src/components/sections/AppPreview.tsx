"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const screens = [
  { label: "Home Feed", icon: "🏠", color: "#6366f1", content: "home" },
  { label: "Swipe Learn", icon: "👆", color: "#ec4899", content: "learn" },
  { label: "Quiz Screen", icon: "🎯", color: "#06b6d4", content: "quiz" },
  { label: "Mock Test", icon: "📋", color: "#10b981", content: "test" },
  { label: "Profile", icon: "👤", color: "#f59e0b", content: "profile" },
];

function ScreenContent({ type, color }: { type: string; color: string }) {
  if (type === "home") return (
    <div className="sc-home">
      <div className="sc-banner" style={{ background: `linear-gradient(135deg, ${color}, #ec4899)` }}>
        <p className="sc-banner-label">Today's Goal</p>
        <p className="sc-banner-goal">20 Questions</p>
      </div>
      {[1,2,3].map(i => (
        <div key={i} className="sc-list-item glass-card">
          <div className="sc-li-icon" style={{ background: `${color}33` }}>📚</div>
          <div><div className="sc-li-title">Chapter {i}</div><div className="sc-li-sub">15 concepts</div></div>
          <div className="sc-li-badge">{i * 20}%</div>
        </div>
      ))}
    </div>
  );
  if (type === "learn") return (
    <div className="sc-learn">
      <div className="sc-card" style={{ background: `linear-gradient(135deg, ${color}, #8b5cf6)` }}>
        <div className="sc-card-tag">GK</div>
        <p className="sc-card-q">First Prime Minister of India?</p>
        <p className="sc-card-a">Pandit Jawaharlal Nehru</p>
        <div className="sc-card-swipe">← Skip · Learn →</div>
      </div>
    </div>
  );
  if (type === "quiz") return (
    <div className="sc-quiz">
      <p className="sc-q-number">Q 4 of 10</p>
      <div className="sc-progress"><div style={{ width: "40%", height: "100%", background: color, borderRadius: "3px" }} /></div>
      <p className="sc-q-text">Which planet is closest to the Sun?</p>
      {["Mercury", "Venus", "Mars", "Jupiter"].map((o, i) => (
        <div key={o} className={`sc-option${i === 0 ? " correct" : ""}`} style={i === 0 ? { borderColor: color, background: `${color}22` } : {}}>
          <span className="sc-option-key">{["A","B","C","D"][i]}</span>
          {o}
        </div>
      ))}
    </div>
  );
  if (type === "test") return (
    <div className="sc-test">
      <div className="sc-test-header">
        <span style={{ color }}>SSC CGL Mock</span>
        <span className="sc-timer">⏱ 44:12</span>
      </div>
      <p className="sc-q-text">If 2x + 3 = 11, then x = ?</p>
      {["x = 4", "x = 3", "x = 5", "x = 2"].map((o, i) => (
        <div key={o} className={`sc-option${i === 0 ? " correct" : ""}`} style={i === 0 ? { borderColor: color, background: `${color}22` } : {}}>
          <span className="sc-option-key">{["A","B","C","D"][i]}</span>{o}
        </div>
      ))}
    </div>
  );
  return (
    <div className="sc-profile">
      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${color}, #ec4899)` }}>R</div>
      <p className="sc-name">Rahul Sharma</p>
      <p className="sc-rank">Rank #42 this week</p>
      <div className="sc-stats-row">
        {[["189","Questions"],["12","Tests"],["94%","Accuracy"]].map(([v,l]) => (
          <div key={l} className="sc-stat">
            <div className="sc-stat-val" style={{ color }}>{v}</div>
            <div className="sc-stat-lbl">{l}</div>
          </div>
        ))}
      </div>
      <div className="sc-streak-bar glass-card">
        <span>🔥</span><span style={{ color }}>7-day streak!</span><span>Keep it up</span>
      </div>
    </div>
  );
}

export default function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % screens.length), 3000);
    return () => clearInterval(t);
  }, []);

  const screen = screens[active];

  return (
    <section className="section-preview" id="app-preview" ref={ref}>
      <div className="preview-bg-glow" />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">App Preview</div>
          <h2 className="section-title font-heading">Inside SwipOlearn</h2>
          <p className="section-sub">A beautiful, focused learning environment designed for peak performance.</p>
        </motion.div>

        <div className="preview-layout">
          {/* Screen selector tabs */}
          <motion.div
            className="screen-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {screens.map((s, i) => (
              <button
                key={s.label}
                className={`screen-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
                style={active === i ? { background: `${s.color}22`, color: s.color, borderColor: `${s.color}44` } : {}}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Phone */}
          <motion.div
            className="preview-phone-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div className="preview-phone">
              <div className="preview-notch" />
              <div className="preview-screen">
                <div className="preview-statusbar">
                  <span>9:41</span><span>●●●</span>
                </div>
                <div className="preview-app-bar">
                  <span className="preview-app-logo" style={{ color: screen.color }}>SwipOlearn</span>
                  <span className="preview-app-icon" style={{ background: `${screen.color}22`, color: screen.color }}>
                    {screen.icon}
                  </span>
                </div>

                <motion.div
                  key={active}
                  className="preview-content-area"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScreenContent type={screen.content} color={screen.color} />
                </motion.div>

                <div className="preview-nav">
                  {["🏠","📚","📝","👤"].map((ic, i) => (
                    <span key={i} className={`preview-nav-ic${i === (active < 4 ? active % 4 : 3) ? " pnav-active" : ""}`}
                      style={i === (active < 4 ? active % 4 : 3) ? { color: screen.color } : {}}>
                      {ic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .section-preview {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .preview-bg-glow {
          position: absolute;
          bottom: 0;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%);
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
        .preview-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        .screen-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .screen-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.125rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-glass);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.2s;
        }
        .screen-tab:hover { color: var(--text-primary); }
        .preview-phone-wrap {
          position: relative;
        }
        .preview-phone {
          width: 300px;
          background: linear-gradient(160deg, #1a1b2e 0%, #0f1020 100%);
          border-radius: 44px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .preview-notch {
          width: 90px;
          height: 26px;
          background: #0a0a0b;
          border-radius: 20px;
          margin: 0 auto 10px;
        }
        .preview-screen {
          background: #0a0a0b;
          border-radius: 32px;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          padding: 10px;
        }
        .preview-statusbar {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          padding: 2px 6px 6px;
        }
        .preview-app-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 8px 10px;
        }
        .preview-app-logo { font-size: 12px; font-weight: 800; }
        .preview-app-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .preview-content-area { flex: 1; overflow: hidden; }
        .preview-nav {
          display: flex;
          justify-content: space-around;
          padding: 8px 0 4px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 16px;
        }
        .preview-nav-ic { opacity: 0.35; transition: opacity 0.2s; }
        .pnav-active { opacity: 1; }

        /* Screen styles */
        :global(.sc-home) { display: flex; flex-direction: column; gap: 8px; padding: 4px 8px; }
        :global(.sc-banner) { border-radius: 14px; padding: 12px; margin-bottom: 4px; }
        :global(.sc-banner-label) { font-size: 9px; color: rgba(255,255,255,0.7); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        :global(.sc-banner-goal) { font-size: 18px; font-weight: 800; color: white; }
        :global(.sc-list-item) { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 10px; }
        :global(.sc-li-icon) { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        :global(.sc-li-title) { font-size: 11px; font-weight: 700; color: white; }
        :global(.sc-li-sub) { font-size: 9px; color: var(--text-muted); }
        :global(.sc-li-badge) { margin-left: auto; font-size: 10px; font-weight: 700; color: var(--text-secondary); }
        :global(.sc-learn) { display: flex; align-items: center; justify-content: center; height: 100%; padding: 16px; }
        :global(.sc-card) { border-radius: 18px; padding: 16px; width: 100%; }
        :global(.sc-card-tag) { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 20px; width: fit-content; margin-bottom: 8px; }
        :global(.sc-card-q) { font-size: 14px; font-weight: 700; color: white; margin-bottom: 8px; }
        :global(.sc-card-a) { font-size: 12px; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 8px; margin-bottom: 8px; }
        :global(.sc-card-swipe) { font-size: 9px; color: rgba(255,255,255,0.5); text-align: center; }
        :global(.sc-quiz, .sc-test) { display: flex; flex-direction: column; gap: 8px; padding: 4px 8px; }
        :global(.sc-q-number) { font-size: 9px; color: var(--text-muted); font-weight: 600; }
        :global(.sc-progress) { height: 4px; background: rgba(255,255,255,0.08); border-radius: 3px; }
        :global(.sc-q-text) { font-size: 12px; font-weight: 700; color: white; line-height: 1.4; padding: 4px 0; }
        :global(.sc-option) { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03); font-size: 11px; color: rgba(255,255,255,0.8); }
        :global(.sc-option-key) { width: 18px; height: 18px; border-radius: 5px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; }
        :global(.sc-test-header) { display: flex; justify-content: space-between; align-items: center; }
        :global(.sc-timer) { font-size: 10px; font-weight: 700; color: white; }
        :global(.sc-profile) { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px; }
        :global(.sc-avatar) { width: 54px; height: 54px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; color: white; }
        :global(.sc-name) { font-size: 14px; font-weight: 700; color: white; }
        :global(.sc-rank) { font-size: 10px; color: var(--text-muted); }
        :global(.sc-stats-row) { display: flex; gap: 16px; }
        :global(.sc-stat) { text-align: center; }
        :global(.sc-stat-val) { font-size: 16px; font-weight: 800; }
        :global(.sc-stat-lbl) { font-size: 9px; color: var(--text-muted); }
        :global(.sc-streak-bar) { display: flex; gap: 8px; align-items: center; padding: 8px 12px; border-radius: 10px; font-size: 11px; font-weight: 600; width: 100%; justify-content: center; }
      `}</style>
    </section>
  );
}
