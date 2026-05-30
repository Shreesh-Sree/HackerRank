"use client";

import { useEffect, useState, useRef } from "react";
import { animate } from "framer-motion";

const navLinks = [
  { label: "Pillars", href: "#pillars-heading" },
  { label: "Timeline", href: "#timeline-heading" },
  { label: "Quests", href: "#quests-heading" },
  { label: "Sandbox", href: "#sandbox-heading" },
  { label: "Complexity", href: "#complexity-heading" },
  { label: "Leaderboard", href: "#leaderboard-heading" },
  { label: "Utilities", href: "#utilities-heading" },
  { label: "Milestones", href: "#milestones-heading" },
  { label: "Architects", href: "#team-heading" },
  { label: "FAQs", href: "#faq-heading" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Spotlight active tab and hover position states
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically sync spotlight activeIndex as user scrolls down the page
  useEffect(() => {
    const handleScrollActive = () => {
      const links = [
        { id: "pillars-heading", idx: 0 },
        { id: "timeline-heading", idx: 1 },
        { id: "quests-heading", idx: 2 },
        { id: "sandbox-heading", idx: 3 },
        { id: "complexity-heading", idx: 4 },
        { id: "leaderboard-heading", idx: 5 },
        { id: "utilities-heading", idx: 6 },
        { id: "milestones-heading", idx: 7 },
        { id: "team-heading", idx: 8 },
        { id: "faq-heading", idx: 9 },
      ];

      for (const item of links) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect when the section crosses the upper half of screen
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveIndex(item.idx);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollActive);
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  // Update moving spotlight position following mouse pointer
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      // Spring spotlight back to active item
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Spring active state ambience light to sit on currently active link
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Top Nav */}
      <nav
        ref={navRef}
        className={`topnav ${scrolled ? "scrolled" : ""}`}
        id="topnav"
        aria-label="Main navigation"
      >
        <div className="topnav__logo-wrap">
          <a
            className="brand-logo topnav__logo-inner z-[10]"
            href="#"
            onClick={handleLogoClick}
            aria-label="HRCC SJGI — back to top"
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Logo-Emblem-1.svg"
              alt="HackerRank"
              decoding="async"
              fetchPriority="high"
            />
          </a>
        </div>
        
        {/* Dynamic Nav Links with Index Data */}
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            data-index={idx}
            className={`topnav__link relative z-[10] transition-colors duration-200 ${
              activeIndex === idx
                ? "font-bold text-[#121418]!"
                : "text-neutral-500 hover:text-[#121418]"
            }`}
            href={link.href}
            onClick={(e) => {
              handleLinkClick(e, link.href);
              setActiveIndex(idx);
            }}
          >
            {link.label}
          </a>
        ))}

        {/* LIGHTING LAYERS */}
        {/* 1. Moving Spotlight (Follows Mouse pointer) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(5, 199, 112, 0.08)) 0%, 
                transparent 50%
              )
            `
          }}
        />

        {/* 2. Active State Ambience (Underlines active item with light glow) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[3px] z-[2]"
          style={{
            background: `
              radial-gradient(
                60px circle at var(--ambience-x) 100%, 
                var(--ambience-color, #05C770) 0%, 
                transparent 100%
              )
            `
          }}
        />
      </nav>



      {/* Mobile Top Nav */}
      <nav
        className={`mobile-topnav ${scrolled ? "scrolled" : ""} ${
          mobileOpen ? "open" : ""
        }`}
        id="mobile-topnav"
        aria-label="Mobile navigation"
      >
        <div className="mobile-topnav__bar">
          <a
            className="mobile-topnav__logo brand-logo"
            href="#"
            onClick={handleLogoClick}
            aria-label="HRCC SJGI — back to top"
          >
            <img
              src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Logo-Emblem-1.svg"
              alt="HackerRank"
              decoding="async"
              fetchPriority="high"
            />
          </a>
          <button
            className="mobile-topnav__toggle"
            id="mobile-menu-toggle"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={toggleMobileMenu}
          >
            <svg
              className="mobile-topnav__icon mobile-topnav__icon--menu"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="#121418"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="mobile-topnav__icon mobile-topnav__icon--close"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              style={{ opacity: mobileOpen ? 1 : 0 }}
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="#121418"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className="mobile-topnav__drawer"
          id="mobile-drawer"
          aria-hidden={!mobileOpen}
        >
          <a
            className="mobile-topnav__link"
            href="#pillars-heading"
            onClick={(e) => handleLinkClick(e, "#pillars-heading")}
          >
            Pillars
          </a>
          <a
            className="mobile-topnav__link"
            href="#timeline-heading"
            onClick={(e) => handleLinkClick(e, "#timeline-heading")}
          >
            Timeline
          </a>
          <a
            className="mobile-topnav__link"
            href="#quests-heading"
            onClick={(e) => handleLinkClick(e, "#quests-heading")}
          >
            Quests
          </a>
          <a
            className="mobile-topnav__link"
            href="#sandbox-heading"
            onClick={(e) => handleLinkClick(e, "#sandbox-heading")}
          >
            Sandbox
          </a>
          <a
            className="mobile-topnav__link"
            href="#complexity-heading"
            onClick={(e) => handleLinkClick(e, "#complexity-heading")}
          >
            Complexity
          </a>
          <a
            className="mobile-topnav__link"
            href="#leaderboard-heading"
            onClick={(e) => handleLinkClick(e, "#leaderboard-heading")}
          >
            Leaderboard
          </a>
          <a
            className="mobile-topnav__link"
            href="#utilities-heading"
            onClick={(e) => handleLinkClick(e, "#utilities-heading")}
          >
            Utilities
          </a>
          <a
            className="mobile-topnav__link"
            href="#milestones-heading"
            onClick={(e) => handleLinkClick(e, "#milestones-heading")}
          >
            Milestones
          </a>
          <a
            className="mobile-topnav__link"
            href="#team-heading"
            onClick={(e) => handleLinkClick(e, "#team-heading")}
          >
            Architects
          </a>
          <a
            className="mobile-topnav__link"
            href="#faq-heading"
            onClick={(e) => handleLinkClick(e, "#faq-heading")}
          >
            FAQs
          </a>
        </div>
      </nav>
    </>
  );
}
