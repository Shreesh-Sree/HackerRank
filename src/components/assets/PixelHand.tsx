"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PixelHand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<SVGSVGElement>(null);
  const emblemRef = useRef<SVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow breathing effect for the hand
      gsap.to(handRef.current, {
        y: -15,
        rotation: 2,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 2. Slow counter-rotation and floating effect for the emblem
      gsap.to(emblemRef.current, {
        y: -10,
        rotation: -4,
        scale: 1.05,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-[400px] aspect-square">
      {/* Radial Neon Glow behind the hand */}
      <div className="absolute inset-0 rounded-full bg-radial from-[#1A0533] via-transparent to-transparent opacity-80 blur-3xl pointer-events-none scale-125" />

      <svg
        ref={handRef}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none pointer-events-none filter drop-shadow-[0_10px_20px_rgba(26,5,51,0.5)]"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Surreal background floating particles inside SVG */}
        <circle cx="20" cy="30" r="1.5" fill="#39FF14" opacity="0.4" />
        <circle cx="85" cy="45" r="1" fill="#00FFFF" opacity="0.5" />
        <circle cx="75" cy="15" r="2" fill="#FFD700" opacity="0.3" />

        {/* 1. Giant Pixelated Hand (rendered in blocky, retro steps) */}
        <g stroke="#050505" strokeWidth="1.5">
          {/* Main Arm Base */}
          <path d="M40 95 H60 V80 H40 Z" fill="#1A0533" />
          {/* Arm Accent details */}
          <path d="M44 95 H56 V88 H44 Z" fill="#121418" />
          <path d="M48 95 H52 V91 H48 Z" fill="#39FF14" />

          {/* Wrist Cuff */}
          <path d="M35 80 H65 V72 H35 Z" fill="#050505" />
          <path d="M38 78 H62 V74 H38 Z" fill="#FFD700" />

          {/* Main Palm */}
          <path d="M32 72 H68 V55 H32 Z" fill="#1A0533" />
          <path d="M40 68 H60 V59 H40 Z" fill="#121418" />

          {/* Thumb Finger */}
          <path d="M26 62 H32 V54 H26 Z" fill="#1A0533" />
          <path d="M22 54 H28 V48 H22 Z" fill="#121418" />
          
          {/* Index Finger */}
          <path d="M32 55 H40 V42 H32 Z" fill="#1A0533" />
          <path d="M32 42 H40 V34 H32 Z" fill="#121418" />

          {/* Middle Finger */}
          <path d="M42 55 H50 V38 H42 Z" fill="#1A0533" />
          <path d="M42 38 H50 V30 H42 Z" fill="#121418" />

          {/* Ring Finger */}
          <path d="M52 55 H60 V40 H52 Z" fill="#1A0533" />
          <path d="M52 40 H60 V32 H52 Z" fill="#121418" />

          {/* Pinky Finger */}
          <path d="M62 55 H68 V45 H62 Z" fill="#1A0533" />
          <path d="M62 45 H68 V38 H62 Z" fill="#121418" />
        </g>

        {/* 2. Floating emblem / green badge held by the fingers */}
        <g ref={emblemRef as any} transform="translate(0, -6)">
          {/* Outer glowing glow shield */}
          <polygon
            points="50,15 68,25 68,45 50,55 32,45 32,25"
            fill="#39FF14"
            opacity="0.15"
          />

          {/* Retro Hexagon Emblem Plate */}
          <polygon
            points="50,18 64,26 64,44 50,52 36,44 36,26"
            fill="#050505"
            stroke="#39FF14"
            strokeWidth="1.5"
          />

          {/* Internal Neon Accent Rim */}
          <polygon
            points="50,22 60,28 60,42 50,48 40,42 40,28"
            fill="#121418"
            stroke="#00FFFF"
            strokeWidth="0.8"
          />

          {/* Glowing HackerRank Emblem "H" */}
          <path
            d="M45,28 H48 V33 H52 V28 H55 V42 H52 V37 H48 V42 H45 Z"
            fill="#39FF14"
            className="filter drop-shadow-[0_0_4px_#39FF14]"
          />
        </g>
      </svg>
    </div>
  );
}
