"use client";

import { motion } from "framer-motion";
import { Heart, Share2, Bookmark } from "lucide-react";
import styles from "./ReelCard.module.css";
import { useState } from "react";

interface ReelData {
  id: number;
  topic: string;
  title: string;
  content: string;
  keyFact: string;
  color: string;
}

interface ReelCardProps {
  data: ReelData;
  isActive: boolean;
}

export default function ReelCard({ data, isActive }: ReelCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div 
      className={styles.card}
      style={{ backgroundColor: data.color }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1 : 0.95, 
        opacity: isActive ? 1 : 0.5 
      }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className={styles.bgGlow} />
      
      <div className={styles.topicBadge}>
        {data.topic}
      </div>

      <div className={styles.contentWrapper}>
        <motion.h2 
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ delay: 0.2 }}
        >
          {data.title}
        </motion.h2>
        
        <motion.p 
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          {data.content}
        </motion.p>

        <motion.div 
          className={styles.keyFactCard}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          <p>💡 {data.keyFact}</p>
        </motion.div>
      </div>

      <div className={styles.actionArea}>
        <button 
          className={styles.actionBtn}
          onClick={() => setLiked(!liked)}
        >
          <Heart fill={liked ? "white" : "none"} size={24} />
        </button>
        <button 
          className={styles.actionBtn}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark fill={saved ? "white" : "none"} size={24} />
        </button>
        <button className={styles.actionBtn}>
          <Share2 size={24} />
        </button>
      </div>
    </motion.div>
  );
}
