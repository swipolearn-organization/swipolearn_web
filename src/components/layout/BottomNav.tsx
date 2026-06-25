"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenTool, User } from "lucide-react";
import styles from "./BottomNav.module.css";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Learn", path: "/learn", icon: BookOpen },
    { name: "Tests", path: "/test", icon: PenTool },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <div style={{ position: "relative" }}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--accent-primary)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
