import Navigation from "@/components/Navigation";
import FAQSection from "@/components/FAQSection";
import ScrollRevealText from "@/components/ScrollRevealText";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="page">
        {/* Hero Section */}
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
                <span className="hero-stagger__item" style={{ "--index": 0 } as React.CSSProperties}>O</span>
                <span className="hero-stagger__item" style={{ "--index": 1 } as React.CSSProperties}>r</span>
                <span className="hero-stagger__item" style={{ "--index": 2 } as React.CSSProperties}>c</span>
                <span className="hero-stagger__item" style={{ "--index": 3 } as React.CSSProperties}>h</span>
                <span className="hero-stagger__item" style={{ "--index": 4 } as React.CSSProperties}>e</span>
                <span className="hero-stagger__item" style={{ "--index": 5 } as React.CSSProperties}>s</span>
                <span className="hero-stagger__item" style={{ "--index": 6 } as React.CSSProperties}>t</span>
                <span className="hero-stagger__item" style={{ "--index": 7 } as React.CSSProperties}>r</span>
                <span className="hero-stagger__item" style={{ "--index": 8 } as React.CSSProperties}>a</span>
                <span className="hero-stagger__item" style={{ "--index": 9 } as React.CSSProperties}>t</span>
                <span className="hero-stagger__item" style={{ "--index": 10 } as React.CSSProperties}>e</span>
              </h1>
              <p
                className="hero__subtitle hero-stagger hero-stagger--words"
                style={{ "--base-delay": "0.16s" } as React.CSSProperties}
              >
                <span className="hero-stagger__item" style={{ "--index": 0 } as React.CSSProperties}>A</span>
                <span className="hero-stagger__item" style={{ "--index": 1 } as React.CSSProperties}>24-Hour</span>
                <span className="hero-stagger__item" style={{ "--index": 2 } as React.CSSProperties}>Hackathon</span>
                <span className="hero-stagger__item" style={{ "--index": 3 } as React.CSSProperties}>to</span>
                <span className="hero-stagger__item" style={{ "--index": 4 } as React.CSSProperties}>Design,</span>
                <span className="hero-stagger__item" style={{ "--index": 5 } as React.CSSProperties}>Build,</span>
                <span className="hero-stagger__item" style={{ "--index": 6 } as React.CSSProperties}>and</span>
                <span className="hero-stagger__item" style={{ "--index": 7 } as React.CSSProperties}>Ship</span>
                <span className="hero-stagger__item" style={{ "--index": 8 } as React.CSSProperties}>an</span>
                <span className="hero-stagger__item" style={{ "--index": 9 } as React.CSSProperties}>Agent</span>
              </p>
            </div>

            <div className="hero__cta reveal" style={{ "--delay": "0.22s" } as React.CSSProperties}>
              <a
                href="https://www.hackerrank.com/contests/hackerrank-orchestrate-may26/challenges/support-agent/leaderboard"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 32px",
                  background: "#000000",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                View the Leaderboard
              </a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story" aria-label="Introduction">
          <div className="story__inner w-full max-w-[917px] mx-auto flex flex-col items-center gap-6">
            <ScrollRevealText
              text="The role of a developer has evolved. You're not just writing code, you're orchestrating agents to solve real problems. Anyone can prompt. Few can build systems that actually deliver."
              className="story__lead justify-center text-center font-satoshi"
            />
            <ScrollRevealText
              text="This is your chance to prove you can."
              className="story__accent justify-center text-center font-newsreader italic"
            />
          </div>
        </section>

        {/* Steps Section */}
        <section className="section" id="how-this-works-heading" aria-labelledby="how-this-works-heading">
          <div className="section__stack">
            <h2 className="section__title">
              How This Works
            </h2>

            <div className="steps-panel desktop-only">
              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-11.svg"
                    />
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-11.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title">Get the Challenge</h3>
                  <p className="step__body">
                    You&apos;ll receive your challenge and instructions at{" "}
                    <time
                      className="js-local-datetime"
                      dateTime="2026-05-01T05:30:00Z"
                    >
                      11 AM IST on May 1
                    </time>{" "}
                    via email. Your task will be to build an agent that solves a
                    real-world problem.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-3.svg"
                    />
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-3.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title">Build &amp; Submit</h3>
                  <p className="step__body">
                    Build your agent using the tools you prefer like Cursor,
                    Claude Code, or Codex. Submit your solution when you&apos;re ready.
                  </p>
                </div>
              </article>

              <div className="steps-panel__divider" aria-hidden="true"></div>

              <article className="step">
                <div className="step__media" aria-hidden="true">
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-8.svg"
                    />
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-8.svg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="step__copy">
                  <h3 className="step__title">Explain Your Approach</h3>
                  <p className="step__body">
                    Walk through your approach with an AI judge. Explain how your
                    agent works and the decisions behind it.
                  </p>
                </div>
              </article>
            </div>

            <div
              className="steps-stack mobile-only"
              aria-label="How This Works Cards"
            >
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
                  <h3 className="step-card__title">Get the Challenge</h3>
                  <p className="step-card__body">
                    You&apos;ll receive your challenge and instructions at{" "}
                    <time
                      className="js-local-datetime"
                      dateTime="2026-05-01T05:30:00Z"
                    >
                      11 AM IST on May 1
                    </time>{" "}
                    via email. Your task will be to build an agent that solves a
                    real-world problem.
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
                  <h3 className="step-card__title">Build &amp; Submit</h3>
                  <p className="step-card__body">
                    Build your agent using the tools you prefer like Cursor,
                    Claude Code, or Codex. Submit your solution when you&apos;re ready.
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
                  <h3 className="step-card__title">Explain Your Approach</h3>
                  <p className="step-card__body">
                    Walk through your approach with an AI judge. Explain how your
                    agent works and the decisions behind it.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section" id="timeline-heading" aria-labelledby="timeline-heading">
          <div className="section__stack">
            <h2 className="section__title">Timeline</h2>

            <div className="timeline-panel desktop-only">
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-04-30T14:30:00Z"
                  >
                    Apr 30, 2026, 8 PM IST
                  </time>
                </p>
                <p className="timeline-panel__label">Registration Closes</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-01T05:30:00Z"
                  >
                    May 1, 2026, 11 AM IST
                  </time>
                </p>
                <p className="timeline-panel__label">Challenge Begins</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-02T05:30:00Z"
                  >
                    May 2, 2026, 11 AM IST
                  </time>
                </p>
                <p className="timeline-panel__label">Challenge Ends</p>
              </article>
              <div className="timeline-panel__divider" aria-hidden="true"></div>
              <article className="timeline-panel__item">
                <p className="timeline-panel__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-15T06:30:00Z"
                  >
                    May 15, 2026, 12 PM IST
                  </time>
                </p>
                <p className="timeline-panel__label">Results Announced</p>
              </article>
            </div>

            <div className="timeline-stack mobile-only" aria-label="Timeline">
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-04-30T14:30:00Z"
                  >
                    Apr 30, 2026, 8 PM IST
                  </time>
                </p>
                <p className="timeline-stack__label">Registration Closes</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-01T05:30:00Z"
                  >
                    May 1, 2026, 11 AM IST
                  </time>
                </p>
                <p className="timeline-stack__label">Challenge Begins</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-02T05:30:00Z"
                  >
                    May 2, 2026, 11 AM IST
                  </time>
                </p>
                <p className="timeline-stack__label">Challenge Ends</p>
              </article>
              <div className="timeline-stack__divider" aria-hidden="true"></div>
              <article className="timeline-stack__item">
                <p className="timeline-stack__date">
                  <time
                    className="js-local-datetime"
                    dateTime="2026-05-15T06:30:00Z"
                  >
                    May 15, 2026, 12 PM IST
                  </time>
                </p>
                <p className="timeline-stack__label">Results Announced</p>
              </article>
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section className="section" id="rewards-heading" aria-labelledby="rewards-heading">
          <div className="section__stack">
            <h2 className="section__title">Rewards</h2>

            {/* Desktop Rewards */}
            <div className="rewards-desktop desktop-only">
              <article className="reward-card reward-card--grand">
                <div className="reward-card__hero" aria-hidden="true">
                  <picture>
                    <img
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png"
                      alt=""
                      loading="lazy"
                    />
                  </picture>
                </div>

                <div className="reward-card__content">
                  <div className="reward-card__intro">
                    <div className="reward-badge">
                      <svg
                        className="reward-badge__icon"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="8"
                          cy="5"
                          r="3.4"
                          stroke="#724E0F"
                          strokeWidth="1.25"
                        />
                        <path
                          d="M5.2 8.2V12.2L8 10.6L10.8 12.2V8.2"
                          stroke="#724E0F"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Grand Prize!</span>
                    </div>
                    <h3 className="reward-card__title">1st Place</h3>
                    <p className="reward-card__description">
                      Everything you need to build. Recognition that opens doors.
                    </p>
                  </div>

                  <div
                    className="reward-feature-list"
                    aria-label="First place rewards"
                  >
                    <div className="reward-feature reward-feature--wide">
                      <div
                        className="reward-feature__media"
                        style={{ width: "50px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-7.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">$1000+</div>
                      <div className="reward-feature__body">
                        in AI tools like Elevenlabs, Granola etc
                      </div>
                    </div>

                    <div
                      className="reward-feature-list__divider"
                      aria-hidden="true"
                    ></div>

                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "52px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-9.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">Opportunities</div>
                      <div className="reward-feature__body">
                        with leading tech companies
                      </div>
                    </div>

                    <div
                      className="reward-feature-list__divider"
                      aria-hidden="true"
                    ></div>

                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "75px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-6.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">Chat 1:1</div>
                      <div className="reward-feature__body">
                        with top industry experts
                      </div>
                    </div>

                    <div
                      className="reward-feature-list__divider"
                      aria-hidden="true"
                    ></div>

                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "46px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-5.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">HackerRank</div>
                      <div className="reward-feature__body">
                        exclusive<br />merch
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div className="rewards-row">
                <article className="reward-card reward-card--runner">
                  <div className="reward-summary">
                    <div
                      className="reward-summary__media"
                      style={{ width: "92px", height: "100px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-10.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="reward-summary__copy">
                      <h3 className="reward-summary__title">2nd-5th Place</h3>
                      <p className="reward-summary__body">
                        Great ideas. Great rewards.
                      </p>
                    </div>
                  </div>

                  <div
                    className="reward-feature-list"
                    aria-label="2nd to 5th place rewards"
                  >
                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "50px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-4.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">$150+</div>
                      <div className="reward-feature__body">
                        worth of granola credits
                      </div>
                    </div>

                    <div
                      className="reward-feature-list__divider"
                      aria-hidden="true"
                    ></div>

                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "52px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-2.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">Opportunities</div>
                      <div className="reward-feature__body">
                        with leading tech companies
                      </div>
                    </div>

                    <div
                      className="reward-feature-list__divider"
                      aria-hidden="true"
                    ></div>

                    <div className="reward-feature">
                      <div
                        className="reward-feature__media"
                        style={{ width: "46px", height: "56px" }}
                        aria-hidden="true"
                      >
                        <img
                          src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-1.svg"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="reward-feature__title">HackerRank</div>
                      <div className="reward-feature__body">
                        exclusive<br />merch
                      </div>
                    </div>
                  </div>
                </article>

                <article className="reward-card reward-card--participants">
                  <div className="reward-summary">
                    <div
                      className="reward-summary__media"
                      style={{ width: "98px", height: "100px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="reward-summary__copy">
                      <h3 className="reward-summary__title">For All Participants</h3>
                      <p className="reward-summary__body">
                        Every participant wins something valuable
                      </p>
                    </div>
                  </div>

                  <div className="reward-ticket">
                    <div className="reward-ticket__icon" aria-hidden="true">
                      <img
                        className="reward-ticket__shape"
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Subtract.svg"
                        alt=""
                        loading="lazy"
                      />
                      <img
                        className="reward-ticket__mark"
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/image.png"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="reward-ticket__count">10</div>
                    <div className="reward-ticket__text">
                      HackerRank AI Mock Interview Credits
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Mobile Rewards */}
            <div className="rewards-mobile mobile-only">
              <div className="rewards-mobile__block">
                <div className="rewards-mobile__hero" aria-hidden="true">
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/trophy-g.png"
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="rewards-mobile__intro">
                  <div className="reward-badge">
                    <svg
                      className="reward-badge__icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="5"
                        r="3.4"
                        stroke="#724E0F"
                        strokeWidth="1.25"
                      />
                      <path
                        d="M5.2 8.2V12.2L8 10.6L10.8 12.2V8.2"
                        stroke="#724E0F"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Grand Prize!</span>
                  </div>
                  <h3 className="rewards-mobile__title">1st Place</h3>
                  <p className="rewards-mobile__description">
                    Everything you need to build. Recognition that opens doors.
                  </p>
                </div>

                <div
                  className="rewards-mobile__features rewards-mobile__features--four"
                  aria-label="First place rewards"
                >
                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "50px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-7.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">$1000+</div>
                    <div className="rewards-mobile__feature-body">
                      in AI tools like Elevenlabs, Granola etc
                    </div>
                  </div>

                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "52px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-9.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">Opportunities</div>
                    <div className="rewards-mobile__feature-body">
                      with leading tech companies
                    </div>
                  </div>

                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "75px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-6.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">Chat 1:1</div>
                    <div className="rewards-mobile__feature-body">
                      with top industry experts
                    </div>
                  </div>

                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "46px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-5.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">HackerRank</div>
                    <div className="rewards-mobile__feature-body">
                      exclusive<br />merch
                    </div>
                  </div>
                </div>
              </div>

              <div className="rewards-mobile__divider" aria-hidden="true"></div>

              <div className="rewards-mobile__block">
                <div
                  className="rewards-mobile__summary-media"
                  style={{ width: "92px", height: "100px" }}
                  aria-hidden="true"
                >
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-10.svg"
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="rewards-mobile__intro">
                  <h3 className="rewards-mobile__title">2nd-5th Place</h3>
                  <p className="rewards-mobile__description">
                    Great ideas. Great rewards.
                  </p>
                </div>

                <div
                  className="rewards-mobile__features rewards-mobile__features--three"
                  aria-label="2nd to 5th place rewards"
                >
                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "50px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-4.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">$150+</div>
                    <div className="rewards-mobile__feature-body">
                      in AI tools like Elevenlabs, Granola etc
                    </div>
                  </div>

                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "52px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-2.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">Opportunities</div>
                    <div className="rewards-mobile__feature-body">
                      with leading tech companies
                    </div>
                  </div>

                  <div className="rewards-mobile__feature">
                    <div
                      className="rewards-mobile__feature-media"
                      style={{ width: "46px", height: "56px" }}
                      aria-hidden="true"
                    >
                      <img
                        src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector-1.svg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="rewards-mobile__feature-title">HackerRank</div>
                    <div className="rewards-mobile__feature-body">
                      exclusive<br />merch
                    </div>
                  </div>
                </div>
              </div>

              <div className="rewards-mobile__divider" aria-hidden="true"></div>

              <div className="rewards-mobile__block">
                <div
                  className="rewards-mobile__summary-media"
                  style={{ width: "196px", height: "200px" }}
                  aria-hidden="true"
                >
                  <img
                    src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Vector.svg"
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="rewards-mobile__intro">
                  <h3 className="rewards-mobile__title">For All Participants</h3>
                  <p className="rewards-mobile__description">
                    Every participant wins something valuable
                  </p>
                </div>

                <div className="rewards-mobile__ticket">
                  <div className="reward-ticket__icon" aria-hidden="true">
                    <img
                      className="reward-ticket__shape"
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Subtract.svg"
                      alt=""
                      loading="lazy"
                    />
                    <img
                      className="reward-ticket__mark"
                      src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/image.png"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="rewards-mobile__ticket-count">10</div>
                  <div className="rewards-mobile__ticket-text">
                    HackerRank AI Mock Interview Credits
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section--faq" id="faq-heading" aria-labelledby="faq-heading">
          <div className="section__stack">
            <h2 className="section__title">
              Frequently Asked Questions
            </h2>

            <FAQSection />
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__links" aria-label="Footer">
              <a
                className="footer__link"
                href="https://www.hackerrank.com/about-us/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a
                className="footer__link"
                href="https://www.hackerrank.com/about-us/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms &amp; Conditions
              </a>
              <a className="footer__link" href="mailto:help@hackerrank.com">
                Contact Us
              </a>
              <a
                className="footer__discord-link"
                href="https://discord.gg/TzsUaAhPbr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord community"
              >
                <svg
                  className="footer__discord-icon"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15.246 1.185A14.93 14.93 0 0 0 11.548 0c-.174.316-.377.742-.517 1.08a13.765 13.765 0 0 0-4.063 0A11.517 11.517 0 0 0 6.45 0 14.975 14.975 0 0 0 2.75 1.188C.395 4.703-.242 8.131.076 11.51a15.086 15.086 0 0 0 4.592 2.327 11.4 11.4 0 0 0 .985-1.608 9.783 9.783 0 0 1-1.55-.748c.13-.095.257-.194.38-.295 2.99 1.381 6.232 1.381 9.185 0 .124.101.252.2.38.295-.494.294-1.014.544-1.553.75.284.573.611 1.116.985 1.606a15.048 15.048 0 0 0 4.595-2.326c.376-3.944-.64-7.34-2.829-10.326ZM6.009 9.435c-.878 0-1.6-.809-1.6-1.8 0-.99.706-1.8 1.6-1.8.893 0 1.614.81 1.599 1.8.001.991-.706 1.8-1.599 1.8Zm5.982 0c-.878 0-1.599-.809-1.599-1.8 0-.99.706-1.8 1.6-1.8.892 0 1.613.81 1.598 1.8 0 .991-.706 1.8-1.599 1.8Z"
                    fill="#ffffff"
                  />
                </svg>
                Discord
              </a>
            </div>

            <div className="brand-logo" aria-label="HackerRank">
              <img
                src="https://cdn.hackerrank.com/hackerrank-orchestrate-may26/assests/Logo-Emblem.svg"
                alt="HackerRank"
                loading="lazy"
              />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
