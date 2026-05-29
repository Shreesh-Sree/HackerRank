"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step 1: Health bar progress counting
      const tracker = { val: 0 };
      gsap.to(tracker, {
        val: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: () => {
          const current = Math.floor(tracker.val);
          setPercent(current);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${current}%`;
          }
        },
        onComplete: () => {
          // Step 2: Glitch and fade out
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
            },
          });

          // Text flicker/glitch
          tl.to(textRef.current, {
            opacity: 0.2,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
          })
            .to(containerRef.current, {
              filter: "blur(8px)",
              opacity: 0,
              scale: 1.05,
              duration: 0.4,
              ease: "power2.inOut",
            });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center font-press-start crt-flicker"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="w-[85vw] max-w-[500px] flex flex-col gap-6 text-center">
        {/* Retro Title */}
        <div
          ref={textRef}
          className="text-[#39FF14] text-[10px] md:text-[14px] leading-relaxed tracking-wider drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]"
        >
          BOOTING HRCC SJGI...
          <span className="block text-[8px] text-[#00FFFF] mt-2">
            STAGE_01_SURREAL_VOID
          </span>
        </div>

        {/* RPG Health Bar Container */}
        <div className="w-full h-8 border-4 border-[#F5F5F5] bg-[#121418] p-1 relative box-border">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#39FF14] to-[#00FFFF] shadow-[0_0_8px_#39FF14] w-0 transition-all duration-75"
          />
          {/* Inner HUD Info */}
          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-[#F5F5F5] font-bold">
            HP: {percent}/100
          </div>
        </div>

        {/* Console Glitch Outputs */}
        <div className="text-[7px] text-gray-500 font-ibm-mono flex flex-col gap-1 text-left max-h-[80px] overflow-hidden opacity-60">
          <div>&gt; INITIALIZING SURREALIST_GSAP_ENGINE... OK</div>
          <div>&gt; LINKING NEON_DB_CONNECTION... SECURE [SANDBOX MODE]</div>
          <div>&gt; LOADED THEME_TOKENS: NEON_LIME, GLITCH_CYAN, VOID_BLACK</div>
          <div>&gt; CURSOR_PHYSICS_DRIFT = 0.85</div>
        </div>
      </div>
    </div>
  );
}
