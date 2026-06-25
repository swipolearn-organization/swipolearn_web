"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SwipeTestDeck.module.css";

// Mock Data
const testQuestions = [
  {
    id: 1,
    subject: "Mathematics",
    difficulty: "Medium",
    question: "If a train travels 120 km in 2 hours, what is its average speed in m/s?",
    options: ["16.67 m/s", "33.33 m/s", "60 m/s", "20 m/s"],
    correct: 0,
  },
  {
    id: 2,
    subject: "General Science",
    difficulty: "Easy",
    question: "Which of the following is the lightest gas?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Helium"],
    correct: 1,
  },
  {
    id: 3,
    subject: "History",
    difficulty: "Hard",
    question: "Who was the first Governor-General of independent India?",
    options: ["C. Rajagopalachari", "Lord Mountbatten", "Dr. Rajendra Prasad", "Jawaharlal Nehru"],
    correct: 1,
  }
];

export default function SwipeTestDeck() {
  const [cards, setCards] = useState(testQuestions);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleDragEnd = (event: any, info: any) => {
    // Swipe threshold to register as a choice/skip
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe();
    }
  };

  const handleSwipe = () => {
    setCards((prev) => prev.slice(1));
    setSelectedOption(null); // Reset selection for next card
  };

  return (
    <div className={styles.deckContainer}>
      <AnimatePresence>
        {cards.length > 0 ? (
          cards.map((card, index) => {
            // Only render the top two cards for performance and visual effect
            if (index > 1) return null;

            const isFront = index === 0;

            return (
              <motion.div
                key={card.id}
                className={styles.card}
                style={{
                  zIndex: cards.length - index,
                }}
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{
                  scale: isFront ? 1 : 0.95,
                  y: isFront ? 0 : 20,
                  opacity: 1,
                }}
                exit={{ x: -500, opacity: 0, transition: { duration: 0.2 } }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isFront ? handleDragEnd : undefined}
                whileDrag={{ scale: 1.05 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.subjectBadge}>{card.subject}</span>
                  <span className={styles.difficultyBadge}>{card.difficulty}</span>
                </div>

                <h3 className={styles.questionText}>{card.question}</h3>

                <div className={styles.optionsContainer}>
                  {card.options.map((opt, optIndex) => (
                    <button
                      key={optIndex}
                      className={`${styles.optionBtn} ${selectedOption === optIndex ? styles.selected : ''}`}
                      onClick={() => setSelectedOption(optIndex)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {isFront && (
                  <p className={styles.swipeInstructions}>Swipe left or right for next question</p>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className={styles.endCard}>
            <h2 className={styles.endTitle}>Test Complete!</h2>
            <p>You've answered all the questions.</p>
            <button 
              className={styles.optionBtn} 
              style={{ width: 'auto', background: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: 'white', marginTop: '2rem' }}
              onClick={() => setCards(testQuestions)}
            >
              Restart Test
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
