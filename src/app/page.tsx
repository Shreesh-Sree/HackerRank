"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FAQSection from "@/components/FAQSection";
import ScrollRevealText from "@/components/ScrollRevealText";

// Zod Validation Schemas
const joinFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNumber: z.string().min(3, "Roll number is too short"),
  department: z.string().min(2, "Invalid department"),
  year: z.number().int().min(1).max(4),
  hackerrankUsername: z.string().min(2, "Invalid username"),
  whyJoin: z.string().min(10, "Minimum 10 characters required"),
});

const rsvpFormSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;
type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

export default function Home() {
  const queryClient = useQueryClient();

  // Modal / RSVP states
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<{ id: string; title: string } | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Sandbox Compiler State
  const [code, setCode] = useState(
    `function findSingle(nums) {\n  // Implement O(log n) solution here\n  let low = 0, high = nums.length - 1;\n  while (low < high) {\n    let mid = Math.floor((low + high) / 2);\n    if (mid % 2 === 1) mid--;\n    if (nums[mid] === nums[mid + 1]) {\n      low = mid + 2;\n    } else {\n      high = mid;\n    }\n  }\n  return nums[low];\n}`
  );
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const runCodeSimulation = () => {
    setIsCompiling(true);
    setTerminalOutput(["> Initializing node compiler...", "> Loading runtime libraries..."]);

    setTimeout(() => {
      setTerminalOutput((prev) => [...prev, "> Compiling solution... SUCCESS."]);
    }, 600);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        "> Running Test Case 1: nums = [1,1,2,3,3,4,4]...",
        "  Expected: 2, Got: 2 -> PASS ✅",
      ]);
    }, 1200);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        "> Running Test Case 2: nums = [3,3,7,7,10,11,11]...",
        "  Expected: 10, Got: 10 -> PASS ✅",
      ]);
    }, 1800);

    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        "> -----------------------------------------",
        "> STATUS: 2/2 Test Cases Passed.",
        "> SCORE SECURED: +100 Quest Points! 🏆",
      ]);
      setIsCompiling(false);
    }, 2400);
  };

  // TanStack Queries
  const { data: eventsList = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const { data: leaderboardList = [], isLoading: leaderboardLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      return res.json();
    },
  });

  // TanStack Mutations
  const joinMutation = useMutation({
    mutationFn: async (data: JoinFormValues) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to join crew");
      }
      return res.json();
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: async (data: RsvpFormValues & { eventId: string }) => {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit RSVP");
      }
      return res.json();
    },
    onSuccess: () => {
      setRsvpSuccess(true);
      setRsvpError("");
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
    onError: (err) => {
      setRsvpError(err.message || "Failed to submit RSVP");
      setRsvpSuccess(false);
    },
  });

  // React Hook Forms
  const {
    register: registerJoin,
    handleSubmit: handleJoinSubmit,
    formState: { errors: joinErrors },
    reset: resetJoinForm,
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      department: "",
      year: 1,
      hackerrankUsername: "",
      whyJoin: "",
    },
  });

  const {
    register: registerRsvp,
    handleSubmit: handleRsvpSubmit,
    reset: resetRsvpForm,
    formState: { errors: rsvpErrors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleJoinCrew = (data: JoinFormValues) => {
    joinMutation.mutate(data);
  };

  const handleRsvpSubmitWrapper = (data: RsvpFormValues) => {
    if (activeRsvpEvent) {
      rsvpMutation.mutate({
        ...data,
        eventId: activeRsvpEvent.id,
      });
    }
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector("#join-crew-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main className="page">
        
        {/* 1. HERO SECTION */}
        <section className="hero" aria-label="Hero">
          <div className="hero__media" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="auto">
              <source
                src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Cinematic_Sky.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="hero__overlay" aria-hidden="true"></div>
          <div className="hero__content">
            <div className="brand-logo reveal" style={{ "--delay": "0.05s" } as React.CSSProperties}>
              <img
                src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Logo-Emblem-1.svg"
                alt="HackerRank"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <div className="hero__copy">
              <h1
                className="hero__title hero-stagger hero-stagger--letters"
                style={{ "--base-delay": "0.1s" } as React.CSSProperties}
              >
                <span className="hero-stagger__item" style={{ "--index": 0 } as React.CSSProperties}>H</span>
                <span className="hero-stagger__item" style={{ "--index": 1 } as React.CSSProperties}>R</span>
                <span className="hero-stagger__item" style={{ "--index": 2 } as React.CSSProperties}>C</span>
                <span className="hero-stagger__item" style={{ "--index": 3 } as React.CSSProperties}>C</span>
                <span className="hero-stagger__item" style={{ "--index": 4 } as React.CSSProperties}>&nbsp;</span>
                <span className="hero-stagger__item" style={{ "--index": 5 } as React.CSSProperties}>S</span>
                <span className="hero-stagger__item" style={{ "--index": 6 } as React.CSSProperties}>J</span>
                <span className="hero-stagger__item" style={{ "--index": 7 } as React.CSSProperties}>G</span>
                <span className="hero-stagger__item" style={{ "--index": 8 } as React.CSSProperties}>I</span>
              </h1>
              <p
                className="hero__subtitle hero-stagger hero-stagger--words font-satoshi uppercase tracking-wider"
                style={{ "--base-delay": "0.16s" } as React.CSSProperties}
              >
                <span className="hero-stagger__item" style={{ "--index": 0 } as React.CSSProperties}>St.</span>
                <span className="hero-stagger__item" style={{ "--index": 1 } as React.CSSProperties}>Joseph&apos;s</span>
                <span className="hero-stagger__item" style={{ "--index": 2 } as React.CSSProperties}>Group</span>
                <span className="hero-stagger__item" style={{ "--index": 3 } as React.CSSProperties}>of</span>
                <span className="hero-stagger__item" style={{ "--index": 4 } as React.CSSProperties}>Institutions</span>
              </p>
            </div>

            <div className="hero__cta reveal" style={{ "--delay": "0.22s" } as React.CSSProperties}>
              <button
                onClick={handleRegisterClick}
                className="button font-satoshi font-bold tracking-wider"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 36px",
                  background: "#000000",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Join the Crew
              </button>
            </div>
          </div>
        </section>

        {/* 2. STORY SECTION */}
        <section className="story" aria-label="Introduction">
          <div className="story__inner w-full max-w-[917px] mx-auto flex flex-col items-center gap-6">
            <ScrollRevealText
              text="The role of a developer has evolved. You're not just writing standard loops, you're orchestrating advanced logic systems and AI to solve real-world problems. We are the elite digital architects of St. Joseph's Group of Institutions."
              className="story__lead justify-center text-center font-satoshi"
            />
            <ScrollRevealText
              text="Code beyond reality."
              className="story__accent justify-center text-center font-newsreader italic text-[#4d4d4d]"
            />
          </div>
        </section>

        {/* 3. CORE PILLARS SECTION (How This Works) */}
        <section className="section border-t border-[#c1c2d6]" id="pillars-heading" aria-labelledby="pillars-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">
              How the Crew Operates
            </h2>

            <div className="steps-panel desktop-only">
              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-11.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">Code Battles</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Challenge fellow programmers in our weekly algorithmic brackets. Solve graph theory and dynamic programming under strict time pressure.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-3.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">Build Sprints</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Collaborate in intensive 24-hour sprint hackathons. Form guilds, design robust system architectures, and deploy production-level applications.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-8.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">Career Sprints</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Prepare for elite tech roles with mock resume reviews, system design practice boards, and direct panels with seasoned alumni engineers.
                  </p>
                </div>
              </article>
            </div>

            {/* Mobile Pillars list */}
            <div className="steps-stack mobile-only" aria-label="Crew Pillars">
              <article className="step-card">
                <div className="step-card__media" aria-hidden="true">
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-11.svg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-card__copy">
                  <h3 className="step-card__title">Code Battles</h3>
                  <p className="step-card__body">
                    Challenge fellow programmers in our weekly algorithmic brackets. Solve graph theory and dynamic programming under strict time pressure.
                  </p>
                </div>
              </article>

              <div className="steps-stack__divider" aria-hidden="true"></div>

              <article className="step-card">
                <div className="step-card__media" aria-hidden="true">
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-3.svg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-card__copy">
                  <h3 className="step-card__title">Build Sprints</h3>
                  <p className="step-card__body">
                    Collaborate in intensive 24-hour sprint hackathons. Form guilds, design robust system architectures, and deploy production-level applications.
                  </p>
                </div>
              </article>

              <div className="steps-stack__divider" aria-hidden="true"></div>

              <article className="step-card">
                <div className="step-card__media" aria-hidden="true">
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-8.svg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="step-card__copy">
                  <h3 className="step-card__title">Career Sprints</h3>
                  <p className="step-card__body">
                    Prepare for elite tech roles with mock resume reviews, system design practice boards, and direct panels with seasoned alumni engineers.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 4. TIMELINE SECTION */}
        <section className="section border-t border-[#c1c2d6]" id="timeline-heading" aria-labelledby="timeline-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Active Guild Timeline</h2>

            <div className="timeline-panel desktop-only">
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">PHASE 01</p>
                <p className="timeline-panel__label font-bold">Crew Registrations</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">PHASE 02</p>
                <p className="timeline-panel__label font-bold">Guild Orientation</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">PHASE 03</p>
                <p className="timeline-panel__label font-bold">Weekly Quests</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">PHASE 04</p>
                <p className="timeline-panel__label font-bold">Surreal Hackathon</p>
              </article>
            </div>

            <div className="timeline-stack mobile-only" aria-label="Roadmap">
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">PHASE 01</p>
                <p className="timeline-stack__label">Crew Registrations</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">PHASE 02</p>
                <p className="timeline-stack__label">Guild Orientation</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">PHASE 03</p>
                <p className="timeline-stack__label">Weekly Quests</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">PHASE 04</p>
                <p className="timeline-stack__label">Surreal Hackathon</p>
              </article>
            </div>
          </div>
        </section>

        {/* 5. DYNAMIC QUESTS (EVENTS) SECTION — MAPPED TO REWARDS CARDS */}
        <section className="section border-t border-[#c1c2d6]" id="quests-heading" aria-labelledby="quests-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Upcoming Quests</h2>

            {eventsLoading ? (
              <div className="py-10 text-center font-satoshi text-gray-500 text-[14px]">
                Syncing crew quests timeline...
              </div>
            ) : (
              <div className="rewards-desktop w-full max-w-[1280px] mx-auto flex flex-col gap-8">
                {eventsList.map((event: any, idx: number) => {
                  const trophyImages = [
                    "https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png",
                    "https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-s.png",
                    "https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-b.png",
                  ];
                  const trophyImg = trophyImages[idx % 3];
                  
                  const cardTypeClass = "reward-card--grand";

                  return (
                    <article key={event.id} className={`reward-card ${cardTypeClass} w-full flex flex-col md:flex-row border border-[#c1c2d6] bg-white overflow-hidden p-6`}>
                      <div className="reward-card__hero md:w-1/3 flex items-center justify-center p-4">
                        <picture>
                          <img src={trophyImg} alt="" className="max-h-[140px] object-contain" />
                        </picture>
                      </div>

                      <div className="reward-card__content md:w-2/3 flex flex-col justify-between p-4 gap-4">
                        <div className="reward-card__intro flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] uppercase font-bold text-gray-500 border border-gray-400 px-2 py-0.5 rounded bg-gray-50">
                              {event.type}
                            </span>
                            <span className="text-[12px] font-satoshi text-gray-500">
                              Date: {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="reward-card__title font-newsreader italic text-[28px] md:text-[34px] leading-tight text-[#121418] mt-1">
                            {event.title}
                          </h3>

                          <p className="reward-card__description font-satoshi text-[14px] text-gray-600 leading-relaxed mt-2">
                            {event.description}
                          </p>

                          <div className="text-[12px] font-satoshi font-bold text-[#121418] mt-2">
                            📍 Venue: {event.venue}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveRsvpEvent({ id: event.id, title: event.title });
                            setRsvpSuccess(false);
                            setRsvpError("");
                            resetRsvpForm();
                          }}
                          className="button font-satoshi font-bold self-start mt-4 px-6 py-3 bg-[#121418] hover:bg-black text-white text-[12px] rounded border-none cursor-pointer"
                        >
                          RSVP Quest
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* NEW ADDED SECTION A: DAILY ALGORITHMIC SANDBOX */}
        <section className="section border-t border-[#c1c2d6] bg-[#f8f9fa]" id="sandbox-heading" aria-labelledby="sandbox-heading">
          <div className="section__stack max-w-4xl mx-auto">
            <div className="text-center flex flex-col gap-2 mb-4">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-[11px]">[INTERACTIVE_SANDBOX]</span>
              <h2 className="section__title font-newsreader italic text-[42px]">Daily Sandbox Challenge</h2>
              <p className="text-[14px] text-gray-600 max-w-[600px] mx-auto mt-2">
                Replicate the competitive programming experience inside this minimal, live compiler simulator! Try to compile the O(log n) solution below.
              </p>
            </div>

            <div className="w-full border border-[#c1c2d6] bg-white overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[400px]">
              
              {/* Left Side: Code Editor */}
              <div className="md:w-3/5 p-4 flex flex-col border-r border-[#c1c2d6] bg-gray-50">
                <div className="flex items-center justify-between border-b border-[#c1c2d6]/50 pb-2 mb-3">
                  <span className="font-bold text-[12px] text-gray-500">PROBLEM: Single element in sorted array</span>
                  <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 border border-green-200">JS / node.js</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 w-full font-mono text-[12px] p-3 border border-[#c1c2d6] bg-[#121418] text-[#39FF14] focus:outline-none resize-none leading-relaxed min-h-[250px]"
                />
                <button
                  onClick={runCodeSimulation}
                  disabled={isCompiling}
                  className="button mt-3 font-satoshi font-bold py-3 bg-[#121418] hover:bg-black text-white text-[12px] rounded border-none cursor-pointer uppercase tracking-wider"
                >
                  {isCompiling ? "Compiling..." : "Compile & Run"}
                </button>
              </div>

              {/* Right Side: Simulated Terminal output */}
              <div className="md:w-2/5 p-4 bg-[#050505] text-white flex flex-col justify-between font-mono text-[12px]">
                <div>
                  <div className="border-b border-gray-800 pb-2 mb-3 text-gray-500 font-bold text-[10px] uppercase">
                    Execution Log Output
                  </div>
                  <div className="flex flex-col gap-2 min-h-[200px]">
                    {terminalOutput.length === 0 ? (
                      <span className="text-gray-600 italic">Click &quot;Compile &amp; Run&quot; to test your algorithmic solution...</span>
                    ) : (
                      terminalOutput.map((line, idx) => (
                        <div
                          key={idx}
                          className={`${
                            line.includes("PASS")
                              ? "text-green-400"
                              : line.includes("SCORE")
                              ? "text-yellow-400 font-bold animate-bounce"
                              : "text-gray-300"
                          }`}
                        >
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="text-[9px] text-gray-600 border-t border-gray-800 pt-2 text-right">
                  HRCC Compiler v4.2.1
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. LEADERBOARD SECTION */}
        <section className="section border-t border-[#c1c2d6]" id="leaderboard-heading" aria-labelledby="leaderboard-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">High Score Leaderboard</h2>

            <div className="w-full max-w-[900px] mx-auto border border-[#c1c2d6] bg-white overflow-hidden shadow-sm">
              {leaderboardLoading ? (
                <div className="py-10 text-center text-gray-500 font-satoshi text-[14px]">
                  Syncing scores...
                </div>
              ) : (
                <div className="flex flex-col w-full text-[13px] font-satoshi">
                  <div className="grid grid-cols-12 font-bold bg-[#f8f9fa] border-b border-[#c1c2d6] py-3.5 px-4 text-gray-500 text-[11px] tracking-wider uppercase">
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-6">Member Username</div>
                    <div className="col-span-2 text-center">Quests</div>
                    <div className="col-span-2 text-right">Score</div>
                  </div>

                  {leaderboardList.map((entry: any, index: number) => {
                    const isTopRank = index === 0;
                    return (
                      <div
                        key={entry.id}
                        className={`grid grid-cols-12 items-center py-4 px-4 border-b border-[#c1c2d6]/50 last:border-0 hover:bg-[#f8f9fa] transition-colors ${
                          isTopRank ? "bg-amber-50/20 font-bold" : ""
                        }`}
                      >
                        <div className="col-span-2 text-[#121418] font-bold text-[14px] flex items-center gap-1">
                          <span>#{index + 1}</span>
                          {index === 0 && <span className="text-[14px]">👑</span>}
                        </div>

                        <div className="col-span-6 flex flex-col">
                          <span className="font-bold text-[#121418] text-[14px]">
                            {entry.member?.name || "Hacker Crew"}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            @{entry.member?.hackerrankUsername || "hacker"}
                          </span>
                        </div>

                        <div className="col-span-2 text-center text-gray-600">
                          {entry.eventsAttended}
                        </div>

                        <div className="col-span-2 text-right font-bold text-[#121418] text-[15px]">
                          {entry.score}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* NEW ADDED SECTION B: UNLOCKED CHAPTER MILESTONES (Reusing Steps style) */}
        <section className="section border-t border-[#c1c2d6] bg-white" id="milestones-heading" aria-labelledby="milestones-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Chapter Accolades</h2>

            <div className="steps-panel desktop-only">
              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-11.svg" alt="" />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">100K+ Submissions</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Aggregated across all weekly algorithmic quests on our exclusive HackerRank challenge portal.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-3.svg" alt="" />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">Top 10 National</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Consistently recognized as a premier student coding chapter by HackerRank Academic Services.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <img src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-8.svg" alt="" />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title font-satoshi font-bold text-[18px]">150+ Careers Launched</h3>
                  <p className="step__body font-satoshi text-gray-600 leading-relaxed text-[14px]">
                    Alumni placed at Google, Amazon, HackerRank, Microsoft, and major global software engineering firms.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* NEW ADDED SECTION C: ALUMNI PLACEMENTS TELEMETRY (Reusing Rewards Cards style) */}
        <section className="section border-t border-[#c1c2d6] bg-[#f8f9fa]" id="alumni-heading" aria-labelledby="alumni-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Voices from the Guild</h2>
            <p className="text-[14px] text-gray-600 text-center max-w-[600px] mx-auto mt-2">
              Discover how former members of the St. Joseph&apos;s HackerRank Campus Crew leveraged coding sprints to secure top-tier engineering roles.
            </p>

            <div className="rewards-desktop w-full max-w-[1280px] mx-auto flex flex-col gap-8 mt-6">
              
              {/* Alumni Card 1 */}
              <article className="reward-card reward-card--grand w-full flex flex-col md:flex-row border border-[#c1c2d6] bg-white overflow-hidden p-6">
                <div className="reward-card__hero md:w-1/3 flex items-center justify-center p-4">
                  <img
                    src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Siddharth"
                    alt="Siddharth Sen"
                    className="w-24 h-24 rounded-full border border-[#c1c2d6] p-1 bg-gray-50"
                  />
                </div>
                <div className="reward-card__content md:w-2/3 flex flex-col justify-between p-4 gap-4">
                  <div className="reward-card__intro flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] uppercase font-bold text-green-600 border border-green-400 px-2 py-0.5 rounded bg-green-50">
                        Software Engineer @ Google
                      </span>
                    </div>
                    <h3 className="reward-card__title font-newsreader italic text-[28px] md:text-[34px] leading-tight text-[#121418] mt-1">
                      &quot;Brackets trained my brain to analyze time complexity on the fly.&quot;
                    </h3>
                    <p className="reward-card__description font-satoshi text-[14px] text-gray-600 leading-relaxed mt-2">
                      The weekly algorithmic battles and competitive pressure prepared me flawlessly for complex interview rounds. Being part of HRCC SJGI was the defining pivot point of my campus career.
                    </p>
                  </div>
                  <span className="font-bold text-[#121418] text-[14px]">— Siddharth Sen, Class of 22</span>
                </div>
              </article>

              {/* Alumni Card 2 */}
              <article className="reward-card reward-card--grand w-full flex flex-col md:flex-row border border-[#c1c2d6] bg-white overflow-hidden p-6">
                <div className="reward-card__hero md:w-1/3 flex items-center justify-center p-4">
                  <img
                    src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Riya"
                    alt="Riya Sharma"
                    className="w-24 h-24 rounded-full border border-[#c1c2d6] p-1 bg-gray-50"
                  />
                </div>
                <div className="reward-card__content md:w-2/3 flex flex-col justify-between p-4 gap-4">
                  <div className="reward-card__intro flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] uppercase font-bold text-blue-600 border border-blue-400 px-2 py-0.5 rounded bg-blue-50">
                        Cloud Architect @ Amazon
                      </span>
                    </div>
                    <h3 className="reward-card__title font-newsreader italic text-[28px] md:text-[34px] leading-tight text-[#121418] mt-1">
                      &quot;Designing dynamic schemas under pressure built real confidence.&quot;
                    </h3>
                    <p className="reward-card__description font-satoshi text-[14px] text-gray-600 leading-relaxed mt-2">
                      Collaborating on real-world projects during 24-hour sprints taught me database schema design, system configurations, and clean repository structures. It felt like real developer environments.
                    </p>
                  </div>
                  <span className="font-bold text-[#121418] text-[14px]">— Riya Sharma, Class of 23</span>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* 7. CORE TEAM SECTION */}
        <section className="section border-t border-[#c1c2d6]" id="team-heading" aria-labelledby="team-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Architects of Chaos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1200px] mx-auto mt-6">
              {[
                {
                  name: "Dharshan K",
                  role: "President / Chief Architect",
                  bio: "System design architect. Solves graph theory problems for fun. Refactors everything.",
                  avatar: "Dharshan",
                },
                {
                  name: "Ananya Rao",
                  role: "Vice President / Guild Lead",
                  bio: "Sprint coordinator, hackathon expert, and community builder. Loves clean architecture.",
                  avatar: "Ananya",
                },
                {
                  name: "Rohan Verma",
                  role: "Technical Lead",
                  bio: "6-star programmer on HackerRank. Machine learning enthusiast and backend developer.",
                  avatar: "Rohan",
                },
                {
                  name: "Sanya Gupta",
                  role: "Design Lead",
                  bio: "Creative mind. Crafts responsive vectors, elegant layouts, and visual design assets.",
                  avatar: "Sanya",
                },
              ].map((member, idx) => (
                <div key={idx} className="border border-[#c1c2d6] bg-white p-6 flex flex-col gap-4 text-center items-center rounded-lg hover:shadow-md transition-shadow">
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${member.avatar}`}
                    alt={member.name}
                    className="w-20 h-20 rounded-full border border-[#c1c2d6] p-1 bg-gray-50"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-satoshi font-bold text-[16px] text-[#121418] uppercase">{member.name}</h3>
                    <span className="text-[12px] font-newsreader italic text-gray-500 mt-0.5">{member.role}</span>
                  </div>
                  <p className="font-satoshi text-[12px] text-gray-600 leading-relaxed max-w-[200px]">
                    {member.bio}
                  </p>
                  <div className="flex gap-4 text-[12px] font-bold text-[#121418] mt-2">
                    <a href="#" className="hover:underline">LinkedIn</a>
                    <a href="#" className="hover:underline">GitHub</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CREW JOIN REGISTRATION FORM */}
        <section className="section border-t border-[#c1c2d6] bg-[#f8f9fa]" id="join-crew-section">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">Crew Registration</h2>

            <div className="w-full max-w-[640px] mx-auto border border-[#c1c2d6] bg-white p-6 md:p-8 rounded-lg shadow-sm">
              {joinMutation.isSuccess ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <span className="text-[#121418] font-newsreader italic text-[32px] font-bold">Mission Accepted</span>
                  <span className="text-[14px] text-gray-600 leading-relaxed max-w-[400px]">
                    Registration received. Welcome to the HackerRank SJGI crew. Check your email for transmission logs.
                  </span>
                  <button
                    onClick={() => {
                      joinMutation.reset();
                      resetJoinForm();
                    }}
                    className="button mt-6 bg-[#121418] hover:bg-black text-white px-6 py-3 rounded border-none cursor-pointer"
                  >
                    Open New Shell
                  </button>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit(handleJoinCrew)} className="flex flex-col gap-5 text-[14px] font-satoshi text-[#121418]">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700">Full Name</label>
                      <input
                        type="text"
                        {...registerJoin("name")}
                        placeholder="e.g. Aravind Swamy"
                        className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                      />
                      {joinErrors.name && <span className="text-red-500 text-[12px]">{joinErrors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        {...registerJoin("email")}
                        placeholder="e.g. aravind@sjgi.edu"
                        className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                      />
                      {joinErrors.email && <span className="text-red-500 text-[12px]">{joinErrors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700">Roll Number</label>
                      <input
                        type="text"
                        {...registerJoin("rollNumber")}
                        placeholder="e.g. 22CS104"
                        className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                      />
                      {joinErrors.rollNumber && <span className="text-red-500 text-[12px]">{joinErrors.rollNumber.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700">Department</label>
                      <input
                        type="text"
                        {...registerJoin("department")}
                        placeholder="e.g. CSE / IT / ECE"
                        className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                      />
                      {joinErrors.department && <span className="text-red-500 text-[12px]">{joinErrors.department.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-700">Year</label>
                      <select
                        {...registerJoin("year", { valueAsNumber: true })}
                        className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white cursor-pointer"
                      >
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                      </select>
                      {joinErrors.year && <span className="text-red-500 text-[12px]">{joinErrors.year.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">HackerRank Username</label>
                    <input
                      type="text"
                      {...registerJoin("hackerrankUsername")}
                      placeholder="e.g. aravind_codez"
                      className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                    />
                    {joinErrors.hackerrankUsername && <span className="text-red-500 text-[12px]">{joinErrors.hackerrankUsername.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-700">Why do you want to join the Crew?</label>
                    <textarea
                      rows={4}
                      {...registerJoin("whyJoin")}
                      placeholder="Tell us about your coding passions, systems you enjoy building..."
                      className="border border-[#c1c2d6] px-3 py-2.5 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white resize-none"
                    />
                    {joinErrors.whyJoin && <span className="text-red-500 text-[12px]">{joinErrors.whyJoin.message}</span>}
                  </div>

                  {joinMutation.isError && (
                    <div className="text-red-500 font-bold text-center text-[12px]">
                      Error: {joinMutation.error.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={joinMutation.isPending}
                    className="button font-satoshi font-bold py-4 mt-2 bg-[#121418] hover:bg-black text-white rounded border-none cursor-pointer text-center text-[13px] uppercase tracking-wider"
                  >
                    {joinMutation.isPending ? "Transmitting..." : "Submit Registration"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section className="section border-t border-[#c1c2d6]" id="faq-heading" aria-labelledby="faq-heading">
          <div className="section__stack">
            <h2 className="section__title font-newsreader italic text-[42px]">FAQs</h2>
            <FAQSection />
          </div>
        </section>

        {/* 10. ARCADE FOOTER */}
        <footer className="footer bg-white border-t border-[#c1c2d6] py-16 px-4 md:px-8 text-center flex flex-col items-center gap-10 select-none overflow-hidden">
          <div className="brand-logo footer__logo">
            <img
              src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Logo-Emblem-1.svg"
              alt="HackerRank Logo"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-satoshi text-[14px] text-gray-500">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-black cursor-pointer">Back to Top</button>
            <button onClick={() => document.getElementById("pillars-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Pillars</button>
            <button onClick={() => document.getElementById("timeline-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Timeline</button>
            <button onClick={() => document.getElementById("quests-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Quests</button>
            <button onClick={() => document.getElementById("sandbox-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Sandbox</button>
            <button onClick={() => document.getElementById("leaderboard-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Leaderboard</button>
            <button onClick={() => document.getElementById("milestones-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Milestones</button>
            <button onClick={() => document.getElementById("alumni-heading")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-black cursor-pointer">Alumni</button>
            <a href="/admin" className="hover:text-black">Admin Panel</a>
          </div>

          <p className="font-satoshi text-[12px] text-gray-400 mt-2">
            &copy; 2026 HRCC SJGI &mdash; All Bugs Reserved.
          </p>
        </footer>

      </main>

      {/* 11. RSVP MODAL PANEL (MATCHED TO CLONED AESTHETIC) */}
      {activeRsvpEvent && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 font-satoshi">
          <div className="w-full max-w-[420px] bg-white border border-[#c1c2d6] p-6 rounded-lg shadow-2xl relative">
            
            {/* Close trigger */}
            <button
              onClick={() => setActiveRsvpEvent(null)}
              className="absolute top-3 right-4 text-[16px] font-bold text-gray-400 hover:text-black border-none bg-transparent cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-2">Quest RSVP</span>
              <h3 className="font-newsreader italic text-[24px] text-[#121418] leading-tight uppercase">
                {activeRsvpEvent.title}
              </h3>
            </div>

            {rsvpSuccess ? (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <span className="text-[#121418] font-newsreader italic text-[24px] font-bold">Registration Successful</span>
                <span className="text-[13px] text-gray-500 leading-relaxed max-w-[300px] mt-2">
                  Your spot has been reserved in the crew quest telemetry system. Prepare your engine.
                </span>
                <button
                  onClick={() => setActiveRsvpEvent(null)}
                  className="button mt-6 bg-[#121418] hover:bg-black text-white px-6 py-3 rounded border-none cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit(handleRsvpSubmitWrapper)} className="flex flex-col gap-4 text-[13px]">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    {...registerRsvp("name")}
                    placeholder="e.g. Aravind Swamy"
                    className="border border-[#c1c2d6] px-3 py-2 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                  />
                  {rsvpErrors.name && <span className="text-red-500 text-[11px]">{rsvpErrors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    {...registerRsvp("email")}
                    placeholder="e.g. aravind@sjgi.edu"
                    className="border border-[#c1c2d6] px-3 py-2 rounded focus:outline-none focus:border-[#121418] text-[13px] bg-white"
                  />
                  {rsvpErrors.email && <span className="text-red-500 text-[11px]">{rsvpErrors.email.message}</span>}
                </div>

                {rsvpError && (
                  <div className="text-red-500 text-[11px] font-bold text-center mt-1">
                    Error: {rsvpError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={rsvpMutation.isPending}
                  className="button font-satoshi font-bold py-3.5 mt-2 bg-[#121418] hover:bg-black text-white rounded border-none cursor-pointer text-center text-[12px] uppercase tracking-wider"
                >
                  {rsvpMutation.isPending ? "Transmitting..." : "Reserve Quest Spot"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
