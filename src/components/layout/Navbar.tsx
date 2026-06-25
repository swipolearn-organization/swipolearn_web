"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Text-based brand logo — looks clean on any background
function SwipOLearnLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const fontSize = size === "sm" ? "1.1rem" : size === "lg" ? "1.6rem" : "1.35rem";
  return (
    <span className="brand-logo" style={{ fontSize }}>
      <span className="brand-logo__swip">swip</span>
      <span className="brand-logo__o">O</span>
      <span className="brand-logo__learn">learn</span>
      <style jsx>{`
        .brand-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          display: inline-flex;
          align-items: baseline;
        }
        .brand-logo__swip {
          color: var(--text-primary);
        }
        .brand-logo__o {
          background: var(--grad-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.15em;
          font-weight: 900;
          position: relative;
          top: 0.04em;
        }
        .brand-logo__learn {
          color: var(--text-primary);
        }
      `}</style>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Exams", href: "#exams" },
    { label: "Mock Tests", href: "#mock-tests" },
    { label: "App Preview", href: "#app-preview" },
  ];

  return (
    <motion.header
      className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="navbar__inner container">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="6" fill="url(#logoGrad)" />
              <path d="M6 14l3-7 3 5 2-3 2 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <SwipOLearnLogo size="md" />
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="navbar__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="#download" className="navbar__cta btn-primary btn-primary--sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Download App
          </a>
          <button
            className="navbar__burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`burger-line burger-line--top${mobileOpen ? " open" : ""}`} />
            <span className={`burger-line burger-line--mid${mobileOpen ? " open" : ""}`} />
            <span className={`burger-line burger-line--bot${mobileOpen ? " open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                className="mobile-menu__link"
                onClick={() => setMobileOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#download" className="btn-primary" style={{ marginTop: "0.75rem", justifyContent: "center" }}>
              Download App
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: background 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
        }
        .navbar--scrolled {
          background: rgba(8, 9, 10, 0.88);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          padding: 0.7rem 0;
          box-shadow: 0 4px 32px rgba(0,0,0,0.3);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Logo ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .navbar__logo:hover { opacity: 0.85; }
        .navbar__logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 8px rgba(99,102,241,0.4));
          transition: filter 0.2s, transform 0.2s;
        }
        .navbar__logo:hover .navbar__logo-icon {
          filter: drop-shadow(0 4px 14px rgba(99,102,241,0.6));
          transform: scale(1.08) rotate(-3deg);
        }

        /* ── Nav links ── */
        .navbar__links {
          display: none;
          list-style: none;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .navbar__links { display: flex; }
        }
        .navbar__link {
          position: relative;
          display: inline-block;
          padding: 0.5rem 0.875rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: color 0.2s, background 0.2s;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: var(--grad-brand);
          transition: transform 0.25s var(--ease-smooth);
        }
        .navbar__link:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.04);
        }
        .navbar__link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* ── Actions ── */
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          flex-shrink: 0;
        }
        .navbar__cta {
          display: none;
        }
        @media (min-width: 768px) {
          .navbar__cta { display: inline-flex; }
        }
        .btn-primary--sm {
          padding: 0.55rem 1.1rem;
          font-size: 0.875rem;
          gap: 0.375rem;
        }

        /* ── Burger ── */
        .navbar__burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0.375rem;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
        }
        .navbar__burger:hover { background: rgba(255,255,255,0.06); }
        @media (min-width: 768px) {
          .navbar__burger { display: none; }
        }
        .burger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: transform 0.28s var(--ease-smooth), opacity 0.28s;
          transform-origin: center;
        }
        .burger-line--top.open { transform: translateY(7px) rotate(45deg); }
        .burger-line--mid.open { opacity: 0; transform: scaleX(0); }
        .burger-line--bot.open { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .mobile-menu {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding: 0.75rem 1.5rem 1.5rem;
          background: rgba(8, 9, 10, 0.97);
          border-top: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(28px);
        }
        .mobile-menu__link {
          padding: 0.875rem 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: background 0.2s, color 0.2s;
        }
        .mobile-menu__link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }
      `}</style>
    </motion.header>
  );
}
