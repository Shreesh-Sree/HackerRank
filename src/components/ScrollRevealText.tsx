"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export default function ScrollRevealText({
  text,
  className = "",
  wordClassName = "",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track the scroll progress of the container within the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "end 0.55"],
  });

  // Split the text into words
  const words = text.split(/\s+/);

  return (
    <p
      ref={containerRef}
      className={`relative flex flex-wrap leading-relaxed ${className}`}
    >
      {words.map((word, index) => {
        // Calculate scroll start and end thresholds for each individual word
        const start = index / words.length;
        const end = (index + 1) / words.length;

        // Map the container scroll progress to this word's opacity
        // It starts dull (0.15) and transitions to full visibility (1.0)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1.0]);

        return (
          <span key={index} className="inline-block mr-[0.25em] whitespace-nowrap">
            <motion.span
              style={{ opacity }}
              className={`inline-block transition-colors duration-200 ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
