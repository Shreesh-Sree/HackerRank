"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Who can participate and join HRCC SJGI?",
      answer: "All engineering and technology students of St. Joseph's Group of Institutions with an absolute fire for solving coding puzzles and creating custom digital applications. Beginners are welcome if they possess strong dedication!",
    },
    {
      question: "Is membership in the Campus Crew free?",
      answer: "Yes, absolutely! Student membership, algorithmic tournaments, career sprints, system design prep, and mock coding audits are 100% free of charge.",
    },
    {
      question: "What is HackerRank Campus Crew?",
      answer: "It is the official, elite university chapter powered by HackerRank to organize competitive programing contests, hackathons, and software engineering circles on campus.",
    },
    {
      question: "How are contests and build sprints conducted?",
      answer: "We host regular coding brackets on our exclusive HackerRank challenge portal, and coordinate collaborative sprint workshops inside our campus labs.",
    },
    {
      question: "Do I get certificates or placements credits?",
      answer: "Yes! Active crew participants who finish quests, secure top leaderboard positions, or collaborate on open club applications receive validated HackerRank certifications and event credentials.",
    },
    {
      question: "What makes HRCC SJGI different from other clubs?",
      answer: "We do not deal in generic slideshows or basic loops. We are a tightly knit collective focused strictly on production-level engineering, extreme algorithm optimizations, and high-fidelity tech aesthetics.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {faqData.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <article
            key={idx}
            className={`faq-card ${isOpen ? "faq-card--open" : ""}`}
          >
            <button
              className="faq-card__row"
              type="button"
              aria-expanded={isOpen}
              onClick={() => handleToggle(idx)}
            >
              <h3 className="faq-card__question">{item.question}</h3>
              <svg
                className="faq-card__icon"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.5 1.5L7.5 8L13.5 1.5"
                  stroke="#121418"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="faq-card__body">
              <div className="faq-card__answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
