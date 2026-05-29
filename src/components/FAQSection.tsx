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
      question: "Who can participate?",
      answer: "Anyone can participate, whether you&apos;re a developer, an AI engineer, or just someone who&apos;s excited about building agents. We welcome people of all experience levels and backgrounds.",
    },
    {
      question: "Is it solo or team-based?",
      answer: "This is a solo challenge; it&apos;s you and your code. Build at your own pace, showcase your AI orchestration skills, and win exciting prizes.",
    },
    {
      question: "Do I need prior AI experience?",
      answer: "No prior AI experience required! If you can code, you can build an agent. This challenge is about creative problem-solving and engineering, not ML expertise.",
    },
    {
      question: "What kind of problems can I expect, and what do I need to build?",
      answer: "You will get an open-ended problem statement along with relevant data. You are expected to build an AI Agent for that use-case.",
    },
    {
      question: "How should I prepare for the hackathon?",
      answer: "You can start learning about Prompt Engineering, RAG, Context Engineering, Agent Building.",
    },
    {
      question: "Can I use my own AI IDE or AI tools for this challenge?",
      answer: (
        <>
          Yes! Use Cursor, GitHub Copilot, Claude Code or any AI-assisted development tools. This challenge is about building autonomous agents, not restricting your development process. The goal is what your agent can do independently, not how you build it.
        </>
      ),
    },
    {
      question: "How does the AI judge work and how do I present my project to it?",
      answer: "The AI judge will have context about your submissions and will ask you questions around your approach to build the solution, system design etc.",
    },
    {
      question: "How do I submit my solution?",
      answer: "You will be required to submit your solution on the HackerRank Community Platform. The link to the page will be shared in an email.",
    },
    {
      question: "Who is eligible to receive the HackerRank AI Mock Interview credits?",
      answer: "All participants who successfully submit a valid project and complete the mandatory Judge Round are eligible.",
    },
    {
      question: "I still have questions - where can I ask them?",
      answer: (
        <>
          If you didn&apos;t find the answer you&apos;re looking for, feel free to join our{" "}
          <a
            href="https://discord.gg/TzsUaAhPbr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", fontWeight: 700 }}
          >
            Discord community
          </a>
          ! Our team and members are active there and happy to help.
        </>
      ),
    },
    {
      question: "Where can I check the results?",
      answer: (
        <>
          Head over to the HackerRank Orchestrate contest page to view your results and see how you fared against other participants on the leaderboard.{" "}
          <a
            href="https://www.hackerrank.com/contests/hackerrank-orchestrate-may26/challenges/support-agent/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", fontWeight: 700 }}
          >
            HackerRank Orchestrate Leaderboard
          </a>
          .
        </>
      ),
    },
    {
      question: "How is the ranking determined?",
      answer: "Rankings are based on your cumulative score across four evaluation categories — Judge Interview (30), Technical Execution (30), Test Cases (30), and AI Fluency (10), for a total of 100 points. The higher your score, the better your rank!",
    },
    {
      question: "How will I receive my prizes?",
      answer: "Winners will be notified via the email address linked to their HackerRank account. The email will include all the details on how to claim and avail your prizes. Be sure to check your spam or junk folder as well, just in case.",
    },
    {
      question: "When is the next edition coming up?",
      answer: "We&apos;re coming back on June 19th with another exciting edition of HackerRank Orchestrate. Keep an eye on your inbox and our official channels for updates and registration details!",
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
