"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        className={`topnav ${scrolled ? "scrolled" : ""}`}
        id="topnav"
        aria-label="Main navigation"
      >
        <div className="topnav__logo-wrap">
          <a
            className="brand-logo topnav__logo-inner"
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
        <a
          className="topnav__link"
          href="#pillars-heading"
          onClick={(e) => handleLinkClick(e, "#pillars-heading")}
        >
          Pillars
        </a>
        <a
          className="topnav__link"
          href="#timeline-heading"
          onClick={(e) => handleLinkClick(e, "#timeline-heading")}
        >
          Timeline
        </a>
        <a
          className="topnav__link"
          href="#quests-heading"
          onClick={(e) => handleLinkClick(e, "#quests-heading")}
        >
          Quests
        </a>
        <a
          className="topnav__link"
          href="#sandbox-heading"
          onClick={(e) => handleLinkClick(e, "#sandbox-heading")}
        >
          Sandbox
        </a>
        <a
          className="topnav__link"
          href="#leaderboard-heading"
          onClick={(e) => handleLinkClick(e, "#leaderboard-heading")}
        >
          Leaderboard
        </a>
        <a
          className="topnav__link"
          href="#milestones-heading"
          onClick={(e) => handleLinkClick(e, "#milestones-heading")}
        >
          Milestones
        </a>
        <a
          className="topnav__link"
          href="#team-heading"
          onClick={(e) => handleLinkClick(e, "#team-heading")}
        >
          Architects
        </a>
        <a
          className="topnav__link"
          href="#faq-heading"
          onClick={(e) => handleLinkClick(e, "#faq-heading")}
        >
          FAQs
        </a>
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
            href="#leaderboard-heading"
            onClick={(e) => handleLinkClick(e, "#leaderboard-heading")}
          >
            Leaderboard
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
