"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does Swipe Learning work?",
    answer: "Our Tinder-like UI allows you to quickly memorize facts, current affairs, and formulas. Swipe right if you know it, left to revise later. It uses spaced repetition algorithms to ensure long-term retention."
  },
  {
    question: "Is there a negative marking system in Mock Tests?",
    answer: "Yes. Our intelligent mock tests simulate exact exam environments (UPSC, SSC, etc.), including negative marking schemas, time limits, and section-wise cutoffs."
  },
  {
    question: "What's included in the Premium Tier?",
    answer: "Swipolearn Premium offers an ad-free experience, unlimited access to Drill Mode, extensive Previous Year Questions (PYQs), and advanced predictive analytics to pinpoint your weak areas."
  },
  {
    question: "Can I use Swipolearn on multiple devices?",
    answer: "Absolutely. Your progress syncs instantly across your mobile app and desktop web interface, so you can pick up exactly where you left off."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 z-10 pointer-events-auto bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12 text-center">
          Frequently Asked <span className="text-emerald-green">Questions</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold font-heading">{faq.question}</h3>
                <span className={`text-emerald-green transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
