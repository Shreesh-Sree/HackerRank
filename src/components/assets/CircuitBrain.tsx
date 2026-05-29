"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CircuitBrain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const brainRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slowly rotate the orbiting code snippets and equations
      gsap.to(orbitRef.current, {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // 2. Pulse the brain's internal glowing circuit traces
      gsap.to(".circuit-trace", {
        strokeDashoffset: -50,
        duration: 3,
        ease: "none",
        repeat: -1,
      });

      // 3. Subtle floating float effect for the brain itself
      gsap.to(brainRef.current, {
        y: -10,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-[450px] aspect-square">
      {/* Cyan/Violet Surrealist Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-radial from-[#1A0533]/60 via-[#00FFFF]/5 to-transparent opacity-80 blur-3xl pointer-events-none scale-110" />

      <svg
        ref={brainRef}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,255,255,0.25)]"
      >
        {/* Outer Orbit Group */}
        <g ref={orbitRef}>
          {/* Orbit rings */}
          <circle cx="60" cy="60" r="48" stroke="#1A0533" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <circle cx="60" cy="60" r="54" stroke="#39FF14" strokeWidth="0.3" strokeDasharray="5 5" opacity="0.2" />

          {/* Floating code / equation blocks positioned in orbit */}
          <text x="60" y="8" fill="#39FF14" fontSize="4.5" fontFamily="monospace" textAnchor="middle" opacity="0.8">while(true)</text>
          <text x="110" y="60" fill="#00FFFF" fontSize="4" fontFamily="monospace" opacity="0.7">0xDEADBEEF</text>
          <text x="60" y="115" fill="#FFD700" fontSize="4" fontFamily="monospace" textAnchor="middle" opacity="0.7">&lt;/&gt;</text>
          <text x="8" y="60" fill="#F5F5F5" fontSize="4.5" fontFamily="monospace" opacity="0.8">λ_calc</text>
          <text x="92" y="32" fill="#39FF14" fontSize="3.5" fontFamily="monospace" opacity="0.5">O(log n)</text>
          <text x="25" y="90" fill="#00FFFF" fontSize="3.5" fontFamily="monospace" opacity="0.5">d/dx</text>
        </g>

        {/* 1. Circuit Board Brain Nodes & Connections */}
        <g strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Hemisphere (Deep Violet & Lime traces) */}
          <path
            d="M58,40 C52,38 42,38 38,46 C34,54 36,66 44,72 C52,78 56,86 58,90"
            stroke="#1A0533"
          />
          <path
            d="M58,48 C50,48 44,52 44,58 C44,64 48,68 54,68 C58,68 58,74 58,80"
            stroke="#39FF14"
            strokeDasharray="4 2"
            className="circuit-trace"
          />
          <path
            d="M48,50 C40,54 40,64 46,64"
            stroke="#00FFFF"
          />
          <path
            d="M38,46 C30,50 30,62 36,68"
            stroke="#FFD700"
            strokeDasharray="3 3"
          />

          {/* Right Hemisphere (Cyan & Lime traces) */}
          <path
            d="M62,40 C68,38 78,38 82,46 C86,54 84,66 76,72 C68,78 64,86 62,90"
            stroke="#00FFFF"
          />
          <path
            d="M62,48 C70,48 76,52 76,58 C76,64 72,68 66,68 C62,68 62,74 62,80"
            stroke="#39FF14"
            strokeDasharray="4 2"
            className="circuit-trace"
          />
          <path
            d="M72,50 C80,54 80,64 74,64"
            stroke="#1A0533"
          />
          <path
            d="M82,46 C90,50 90,62 84,68"
            stroke="#FFD700"
            strokeDasharray="3 3"
          />

          {/* Central Stem connection */}
          <path d="M58,90 H62 V102 H58 Z" fill="#121418" stroke="#050505" />
          <path d="M60,90 V102" stroke="#39FF14" strokeWidth="0.5" />
        </g>

        {/* 2. Microchip Core in the Center */}
        <g stroke="#050505" strokeWidth="0.8">
          <rect x="54" y="55" width="12" height="12" rx="1.5" fill="#050505" stroke="#FFD700" strokeWidth="1" />
          <circle cx="60" cy="61" r="2.5" fill="#39FF14" className="animate-pulse" />
          {/* Chip Pins */}
          <line x1="51.5" y1="57" x2="54" y2="57" stroke="#FFD700" />
          <line x1="51.5" y1="61" x2="54" y2="61" stroke="#FFD700" />
          <line x1="51.5" y1="65" x2="54" y2="65" stroke="#FFD700" />
          
          <line x1="66" y1="57" x2="68.5" y2="57" stroke="#FFD700" />
          <line x1="66" y1="61" x2="68.5" y2="61" stroke="#FFD700" />
          <line x1="66" y1="65" x2="68.5" y2="65" stroke="#FFD700" />
        </g>

        {/* 3. Glowing terminal circuit nodes */}
        <g fill="#050505">
          {/* Left Nodes */}
          <circle cx="38" cy="46" r="1.5" fill="#39FF14" stroke="#050505" strokeWidth="0.5" />
          <circle cx="44" cy="72" r="1.5" fill="#00FFFF" stroke="#050505" strokeWidth="0.5" />
          <circle cx="46" cy="64" r="1" fill="#FFD700" stroke="#050505" strokeWidth="0.4" />
          {/* Right Nodes */}
          <circle cx="82" cy="46" r="1.5" fill="#00FFFF" stroke="#050505" strokeWidth="0.5" />
          <circle cx="76" cy="72" r="1.5" fill="#39FF14" stroke="#050505" strokeWidth="0.5" />
          <circle cx="74" cy="64" r="1" fill="#FFD700" stroke="#050505" strokeWidth="0.4" />
        </g>
      </svg>
    </div>
  );
}
