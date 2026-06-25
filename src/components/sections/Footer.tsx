"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";


export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const links = {
    Company: ["About Us", "Features", "Careers", "Blog"],
    Exams: ["SSC", "Banking", "Railway", "UPSC", "Defence"],
    Resources: ["Mock Tests", "Study Materials", "Exam Updates", "Daily Quiz"],
    Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
  };

  const socials = [
    { label: "Twitter/X", icon: "𝕏", href: "#" },
    { label: "Instagram", icon: "📸", href: "#" },
    { label: "YouTube", icon: "▶", href: "#" },
    { label: "Telegram", icon: "✈", href: "#" },
  ];

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-top-glow" />
      <div className="container">
        <motion.div
          className="footer-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <div className="footer-logo-icon">
                <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                  <rect width="22" height="22" rx="6" fill="url(#footerLogoGrad)" />
                  <path d="M6 14l3-7 3 5 2-3 2 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1" />
                      <stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="footer-brand-text">
                <span className="footer-brand-swip">swip</span>
                <span className="footer-brand-o">O</span>
                <span className="footer-brand-learn">learn</span>
              </span>
            </Link>
            <p className="footer-tagline">
              The next-generation exam prep platform where every swipe brings you closer to your goal.
            </p>
            <div className="footer-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="footer-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="footer-store-btns">
              <a href="#download" className="footer-store-btn">
                <span>▶</span> Google Play
              </a>
              <div className="footer-store-btn footer-store-btn--disabled">
                <span>⬡</span> App Store
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            {Object.entries(links).map(([category, items]) => (
              <div key={category} className="footer-col">
                <h4 className="footer-col-title">{category}</h4>
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="footer-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="footer-copy">SwipOlearn © 2026. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy-policy" className="footer-link">Privacy</a>
            <span>·</span>
            <a href="/terms" className="footer-link">Terms</a>
            <span>·</span>
            <a href="#" className="footer-link">Cookies</a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 5rem 0 2rem;
          overflow: hidden;
        }
        .footer-top-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 200px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 768px) {
          .footer-inner { grid-template-columns: 1.5fr 2fr; }
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-logo-link {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          transition: opacity 0.2s;
        }
        .footer-logo-link:hover { opacity: 0.85; }
        .footer-logo-icon {
          display: flex;
          filter: drop-shadow(0 2px 8px rgba(99,102,241,0.4));
        }
        .footer-brand-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .footer-brand-swip { color: var(--text-primary); }
        .footer-brand-o {
          background: var(--grad-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
        }
        .footer-brand-learn { color: var(--text-primary); }
        .footer-tagline {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 340px;
        }
        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        .footer-social {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--bg-glass);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .footer-social:hover {
          background: rgba(255,255,255,0.08);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.15);
        }
        .footer-store-btns {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .footer-store-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.125rem;
          border-radius: 10px;
          background: var(--bg-glass);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: all 0.2s;
        }
        .footer-store-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }
        .footer-store-btn--disabled { opacity: 0.4; cursor: not-allowed; }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .footer-links { grid-template-columns: repeat(4, 1fr); }
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem; }
        .footer-col-title {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }
        .footer-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--text-primary); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .footer-copy {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
      `}</style>
    </footer>
  );
}
