"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DownloadSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="download-section" id="download" ref={ref}>
      {/* Background effects */}
      <div className="download-bg">
        <div className="download-orb download-orb--l" />
        <div className="download-orb download-orb--r" />
        <div className="download-grid" />
      </div>

      <div className="container">
        <div className="download-inner">
          {/* Left */}
          <motion.div
            className="download-content"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label" style={{ marginBottom: "1.25rem" }}>Download Now</div>
            <h2 className="download-headline font-heading">
              Your Next Swipe Could Be The Answer That Helps You{" "}
              <span className="text-gradient">Crack The Exam.</span>
            </h2>
            <p className="download-sub">
              Join thousands of students learning smarter every day. Available on Android now.
            </p>

            <div className="download-btns">
              <a href="#" className="store-btn store-btn--android">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341L14.51 12.33l-2.65 2.65a.82.82 0 01-1.163 0L7.896 12.18l-2.37 3.16a.82.82 0 01-.716.34.82.82 0 01-.617-.46L3.17 12.6a.82.82 0 01.146-.948l6.73-6.73a.82.82 0 01.948-.146l2.64 1.028a.82.82 0 01.46.617.82.82 0 01-.34.716l-2.05 1.54 1.6 1.6 3.012-3.01a.82.82 0 01.948-.146l1.028 2.64a.82.82 0 01-.146.948z" />
                </svg>
                <div>
                  <div className="store-sub">Get it on</div>
                  <div className="store-name">Google Play</div>
                </div>
              </a>

              <div className="store-btn store-btn--ios store-btn--disabled">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="store-sub">Coming Soon</div>
                  <div className="store-name">App Store</div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="download-rating">
              <div className="rating-stars">{"★★★★★"}</div>
              <span>4.9 — Loved by 10,000+ students</span>
            </div>
          </motion.div>

          {/* Right — Phone Mockup */}
          <motion.div
            className="download-phone-wrap"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dl-phone">
              <div className="dl-phone-notch" />
              <div className="dl-phone-screen">
                {/* App content */}
                <div className="dl-app-header">
                  <span className="dl-app-logo">SwipOlearn</span>
                  <span>🔥 7</span>
                </div>
                <div className="dl-hero-card">
                  <div className="dl-card-inner" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
                    <span className="dl-card-tag">Daily Challenge</span>
                    <p className="dl-card-q">Which Article of the Indian Constitution deals with Fundamental Rights?</p>
                    <div className="dl-card-actions">
                      <span>← Skip</span>
                      <div className="dl-swipe-circle">👆</div>
                      <span>Learn →</span>
                    </div>
                  </div>
                </div>
                <div className="dl-progress-row">
                  <span className="dl-progress-label">Today's Progress</span>
                  <span className="dl-progress-val">7/20</span>
                </div>
                <div className="dl-progress-bar">
                  <div className="dl-progress-fill" style={{ width: "35%" }} />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              className="dl-float dl-float--tl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✅ SSC CGL Score: 185/200
            </motion.div>
            <motion.div
              className="dl-float dl-float--br"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              🏆 Rank #1 This Week!
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .download-section {
          padding: 8rem 0;
          position: relative;
          overflow: hidden;
        }
        .download-bg { position: absolute; inset: 0; pointer-events: none; }
        .download-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .download-orb--l {
          width: 600px; height: 600px;
          top: -20%; left: -15%;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
        }
        .download-orb--r {
          width: 400px; height: 400px;
          bottom: -10%; right: -10%;
          background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%);
        }
        .download-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
        .download-inner {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .download-inner { grid-template-columns: 1fr 1fr; }
        }
        .download-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .download-headline {
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--text-primary);
        }
        .download-sub {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 460px;
        }
        .download-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .store-btn {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          transition: all 0.2s;
          min-width: 180px;
        }
        .store-btn--android {
          background: var(--grad-brand);
          color: white;
          box-shadow: var(--glow-indigo);
        }
        .store-btn--android:hover { transform: translateY(-3px); box-shadow: 0 0 40px rgba(99,102,241,0.5); }
        .store-btn--ios {
          background: var(--bg-glass);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
        }
        .store-btn--disabled { opacity: 0.5; cursor: not-allowed; }
        .store-sub { font-size: 0.6875rem; opacity: 0.8; }
        .store-name { font-size: 1rem; font-weight: 700; }
        .download-rating {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .rating-stars { color: #f59e0b; letter-spacing: 2px; font-size: 1rem; }

        /* Phone */
        .download-phone-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .dl-phone {
          width: 280px;
          background: linear-gradient(160deg, #1a1b2e, #0f1020);
          border-radius: 44px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .dl-phone-notch { width: 80px; height: 24px; background: #0a0a0b; border-radius: 20px; margin: 0 auto 10px; }
        .dl-phone-screen { background: #0a0a0b; border-radius: 32px; overflow: hidden; padding: 12px; min-height: 480px; display: flex; flex-direction: column; gap: 10px; }
        .dl-app-header { display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; color: white; }
        .dl-app-logo { background: var(--grad-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .dl-hero-card { flex: 1; display: flex; align-items: center; }
        .dl-card-inner { border-radius: 20px; padding: 16px; width: 100%; display: flex; flex-direction: column; gap: 10px; }
        .dl-card-tag { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 20px; width: fit-content; }
        .dl-card-q { font-size: 13px; font-weight: 700; color: white; line-height: 1.4; }
        .dl-card-actions { display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: rgba(255,255,255,0.6); }
        .dl-swipe-circle { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .dl-progress-label { font-size: 10px; color: var(--text-muted); }
        .dl-progress-val { font-size: 10px; color: white; font-weight: 600; }
        .dl-progress-row { display: flex; justify-content: space-between; }
        .dl-progress-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 3px; }
        .dl-progress-fill { height: 100%; background: var(--grad-brand); border-radius: 3px; }

        /* Floating */
        .dl-float {
          position: absolute;
          padding: 0.625rem 1rem;
          background: rgba(20,21,25,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .dl-float--tl { top: 10%; left: -30px; }
        .dl-float--br { bottom: 15%; right: -20px; }
      `}</style>
    </section>
  );
}
