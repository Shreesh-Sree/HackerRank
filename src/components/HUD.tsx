"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HUD() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  const [stage, setStage] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    // Dynamically update the HUD stage depending on user scroll position
    const handleScroll = () => {
      const sections = [
        { id: "hero", name: "HOME" },
        { id: "about", name: "ABOUT" },
        { id: "pillars", name: "QUESTS" },
        { id: "events", name: "EVENTS" },
        { id: "leaderboard", name: "SCORES" },
        { id: "team", name: "CORE" },
        { id: "join", name: "ENTER" },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setStage(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 border-b-4 border-[#1A0533] backdrop-blur-md px-4 py-3 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-press-start text-[8px] md:text-[10px]">
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => scrollTo("hero")} 
          className="flex items-center gap-2 cursor-pointer group text-[#39FF14] hover:text-[#00FFFF] transition-colors"
        >
          <span className="text-[12px] md:text-[14px] font-extrabold tracking-tighter shadow-glow">HRCC SJGI</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#F5F5F5]">
          <button onClick={() => scrollTo("about")} className="hover:text-[#39FF14] cursor-pointer transition-colors">ABOUT</button>
          <button onClick={() => scrollTo("pillars")} className="hover:text-[#39FF14] cursor-pointer transition-colors">PILLARS</button>
          <button onClick={() => scrollTo("events")} className="hover:text-[#39FF14] cursor-pointer transition-colors">EVENTS</button>
          <button onClick={() => scrollTo("leaderboard")} className="hover:text-[#39FF14] cursor-pointer transition-colors">LEADERBOARD</button>
          <button onClick={() => scrollTo("team")} className="hover:text-[#39FF14] cursor-pointer transition-colors">THE TEAM</button>
          <button onClick={() => scrollTo("join")} className="border border-[#39FF14] px-2 py-1 text-[#39FF14] hover:bg-[#39FF14]/10 transition-all cursor-pointer">JOIN_CREW</button>
        </nav>

        {/* Right Side: Retro HUD Stats */}
        <div className="hidden md:flex items-center gap-4 text-[#FFD700]">
          <div className="bg-[#121418] border border-[#1A0533] px-2 py-1 flex items-center gap-1">
            <span>LIVES:</span>
            <span className="text-[#39FF14] animate-pulse">♥♥♥</span>
          </div>
          <div className="bg-[#121418] border border-[#1A0533] px-2 py-1">
            <span>SCORE:</span>
            <span className="text-[#00FFFF]">9999</span>
          </div>
          <div className="bg-[#39FF14]/10 border border-[#39FF14] px-2 py-1 text-[#39FF14]">
            <span>STAGE:</span>
            <span className="text-[#F5F5F5] font-bold"> {stage}</span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="bg-[#39FF14]/10 border border-[#39FF14] px-2 py-1 text-[#39FF14] text-[8px] mr-2">
            <span>STAGE: {stage}</span>
          </div>
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="border-2 border-[#39FF14] p-1 bg-[#121418] text-[#39FF14] focus:outline-none"
          >
            {mobileOpen ? "[X]" : "[=]"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-[#050505] border-b-4 border-[#39FF14] flex flex-col items-center gap-4 py-6 font-press-start text-[10px] crt-flicker">
          <button onClick={() => scrollTo("about")} className="text-[#F5F5F5] hover:text-[#39FF14] py-1">ABOUT</button>
          <button onClick={() => scrollTo("pillars")} className="text-[#F5F5F5] hover:text-[#39FF14] py-1">PILLARS</button>
          <button onClick={() => scrollTo("events")} className="text-[#F5F5F5] hover:text-[#39FF14] py-1">EVENTS</button>
          <button onClick={() => scrollTo("leaderboard")} className="text-[#F5F5F5] hover:text-[#39FF14] py-1">LEADERBOARD</button>
          <button onClick={() => scrollTo("team")} className="text-[#F5F5F5] hover:text-[#39FF14] py-1">THE TEAM</button>
          <button 
            onClick={() => scrollTo("join")} 
            className="border-2 border-[#39FF14] px-4 py-2 text-[#39FF14] hover:bg-[#39FF14]/10 transition-colors"
          >
            JOIN CREW
          </button>

          <div className="flex items-center gap-4 text-[#FFD700] text-[8px] mt-2 pt-3 border-t border-[#1A0533] w-[80vw] justify-center">
            <div>HP: <span className="text-[#39FF14]">3/3</span></div>
            <div>SCORE: <span className="text-[#00FFFF]">9999</span></div>
          </div>
        </div>
      )}
    </header>
  );
}
