"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertIcon,
  ArrowIcon,
  CompassIcon,
  PeopleIcon,
  ShieldIcon,
} from "./icons";
import NavigationDots from "./NavigationDots";
import ProgressIndicator from "./ProgressIndicator";
import Slide from "./Slide";

const slides = [
  {
    nav: "Introduction",
    title: "Professional Codes of Conduct in Computing",
    code: "FOUNDATION",
  },
  {
    nav: "Why ethics matters",
    title: "Importance of Professional Ethics",
    code: "PURPOSE",
  },
  {
    nav: "Organizations",
    title: "Computing Professional Organizations",
    code: "STANDARDS",
  },
  {
    nav: "Decision frameworks",
    title: "Ethical Decision-Making Frameworks",
    code: "PROCESS",
  },
  {
    nav: "Consequences",
    title: "Consequences of Unethical Behavior",
    code: "IMPACT",
  },
  { nav: "Conclusion", title: "Conclusion", code: "COMMITMENT" },
];

const ethicsPoints = [
  { title: "Privacy", detail: "Protect user data" },
  { title: "Trust", detail: "Earn confidence" },
  { title: "Safety", detail: "Prevent harm" },
  { title: "Fairness", detail: "Reduce bias" },
  { title: "Reputation", detail: "Honor the profession" },
];

const organizations = [
  { name: "ACM", detail: "Computing practice", index: "01" },
  { name: "IEEE", detail: "Technology standards", index: "02" },
  { name: "ISACA", detail: "Governance and trust", index: "03" },
];

const decisionSteps = [
  "Identify the problem",
  "Gather the facts",
  "Consider stakeholders",
  "Evaluate possible actions",
  "Choose the ethical decision",
];

const consequences = [
  { label: "Legal consequences", scope: "Law" },
  { label: "Financial loss", scope: "Business" },
  { label: "Loss of trust", scope: "People" },
  { label: "Job termination", scope: "Career" },
  { label: "Harm to society", scope: "Society" },
];

function Kicker({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
      <span className="rounded-full border border-rule bg-white/70 px-3 py-1.5 text-graphite">
        {code}
      </span>
      <span>{children}</span>
    </div>
  );
}

function SlideHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`max-w-5xl font-display text-[clamp(2.7rem,6vw,6.6rem)] font-black leading-[0.88] tracking-[-0.065em] text-graphite ${className}`}
    >
      {children}
    </h2>
  );
}

function Reveal({
  active,
  delay = 0,
  children,
  className = "",
}: {
  active: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 16, scale: 0.99 }
      }
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Presentation() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const wheelLock = useRef(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
  }, []);

  const move = useCallback((direction: number) => {
    setCurrent((value) =>
      Math.max(0, Math.min(slides.length - 1, value + direction)),
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 12 || wheelLock.current) return;
      wheelLock.current = true;
      move(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 650);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
    };
  }, [goTo, mounted, move]);

  if (!mounted) {
    return (
      <main
        className="h-[100svh] overflow-hidden bg-canvas"
        aria-label="Loading presentation"
      />
    );
  }

  return (
    <main
      className="relative h-[100svh] overflow-hidden bg-canvas text-graphite"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - event.changedTouches[0].clientY;
        if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div className="presentation-atmosphere pointer-events-none fixed inset-0 z-0" />
      <div className="protocol-rail pointer-events-none fixed bottom-0 left-0 top-0 z-10 hidden w-20 border-r border-rule lg:block">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-slate">
          Ethics protocol / computing practice
        </span>
      </div>

      <ProgressIndicator current={current} total={slides.length} />
      <NavigationDots
        current={current}
        labels={slides.map((slide) => slide.nav)}
        onSelect={goTo}
      />

      <div className="checkpoint-track pointer-events-none fixed bottom-20 left-7 top-20 z-30 hidden w-px bg-rule lg:left-[4.95rem] lg:block">
        <motion.span
          className="checkpoint-marker absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-graphite bg-signal shadow-signal"
          animate={{ top: `${(current / (slides.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <Slide active={current === 0} label={slides[0].title}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div>
            <Kicker code="FOUNDATION">Computing ethics</Kicker>
            <h1 className="max-w-5xl font-display text-[clamp(3.3rem,7.4vw,8.5rem)] font-black leading-[0.82] tracking-[-0.075em] text-graphite">
              Code shapes
              <br />
              <span className="text-outline">conduct.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-slate sm:text-lg lg:text-xl">
              Professional Codes of Conduct in Computing
            </p>
          </div>

          <Reveal
            active={current === 0}
            delay={0.18}
            className="relative min-h-[260px] min-w-0 sm:min-h-[320px] lg:min-h-[480px]"
          >
            <div className="protocol-panel absolute inset-0 overflow-hidden rounded-[2rem] border border-graphite bg-graphite text-white shadow-panel">
              <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Decision record
                </span>
                <span className="status-chip">Active</span>
              </div>
              <div className="flex h-[calc(100%-65px)] flex-col justify-between p-6 sm:p-8">
                <ShieldIcon className="h-12 w-12 text-signal sm:h-16 sm:w-16" />
                <blockquote className="max-w-md font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                  Responsible decisions begin before the code is shipped.
                </blockquote>
                <p className="max-w-sm text-sm leading-relaxed text-white/55">
                  Ethics, responsibility, and trust in technology.
                </p>
              </div>
              <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full border border-signal/35" />
            </div>
          </Reveal>
        </div>
      </Slide>

      <Slide active={current === 1} label={slides[1].title}>
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Kicker code="PURPOSE">Why it matters</Kicker>
            <SlideHeading>
              Ethics protects
              <br />
              what technology
              <br />
              <span className="text-outline">touches.</span>
            </SlideHeading>
          </div>

          <div className="ethics-ledger border-t border-graphite">
            {ethicsPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-rule py-4 sm:grid-cols-[3.5rem_1fr_auto] sm:py-5"
                animate={
                  current === 1
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 20 }
                }
                transition={{ delay: 0.1 + index * 0.065 }}
              >
                <span className="font-mono text-[10px] text-slate">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-lg font-bold tracking-[-0.025em] sm:text-xl">
                    {point.title}
                  </p>
                  <p className="text-xs text-slate sm:text-sm">{point.detail}</p>
                </div>
                <span className="h-3 w-3 rounded-full border-2 border-graphite bg-signal transition-transform group-hover:scale-125" />
              </motion.div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide active={current === 2} label={slides[2].title}>
        <div>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <Kicker code="STANDARDS">Professional organizations</Kicker>
              <SlideHeading className="max-w-4xl">
                Shared values become shared practice.
              </SlideHeading>
            </div>
            <p className="max-w-xs border-l-2 border-signal pl-4 text-sm leading-relaxed text-slate">
              They publish ethical standards and support professional
              development.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-rule bg-rule lg:mt-14 lg:grid-cols-3">
            {organizations.map((organization, index) => (
              <motion.article
                key={organization.name}
                className="organization-cell group relative min-h-40 overflow-hidden bg-white p-6 sm:min-h-48 lg:min-h-64 lg:p-8"
                animate={
                  current === 2
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                transition={{ delay: 0.12 + index * 0.09 }}
              >
                <div className="flex items-start justify-between">
                  <PeopleIcon className="h-7 w-7 text-slate" />
                  <span className="font-mono text-[10px] text-slate">
                    ORG/{organization.index}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                  <p className="font-display text-5xl font-black tracking-[-0.06em] lg:text-7xl">
                    {organization.name}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                    {organization.detail}
                  </p>
                </div>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-signal transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>
      </Slide>

      <Slide active={current === 3} label={slides[3].title}>
        <div>
          <div className="flex items-end justify-between gap-8">
            <div>
              <Kicker code="PROCESS">Decision framework</Kicker>
              <SlideHeading>Make the reasoning visible.</SlideHeading>
            </div>
            <CompassIcon className="hidden h-20 w-20 text-slate sm:block lg:h-24 lg:w-24" />
          </div>

          <ol className="decision-path relative mt-10 grid gap-2 lg:mt-16 lg:grid-cols-5 lg:gap-0">
            {decisionSteps.map((step, index) => (
              <motion.li
                key={step}
                className="decision-step relative grid grid-cols-[3.25rem_1fr] items-center gap-4 border border-rule bg-white px-4 py-3 lg:block lg:min-h-56 lg:border-y lg:border-l-0 lg:border-r lg:px-5 lg:py-6 lg:first:border-l"
                animate={
                  current === 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 0.1 + index * 0.085 }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-graphite font-mono text-xs font-bold text-white lg:h-12 lg:w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold leading-snug lg:mt-16 lg:text-lg">
                  {step}
                </p>
                {index < decisionSteps.length - 1 && (
                  <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-graphite bg-white lg:block" />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </Slide>

      <Slide active={current === 4} label={slides[4].title}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <Kicker code="IMPACT">When standards fail</Kicker>
            <SlideHeading>
              One choice.
              <br />
              <span className="text-outline">Many costs.</span>
            </SlideHeading>
            <AlertIcon className="mt-8 h-14 w-14 text-slate" />
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] bg-graphite p-5 text-white shadow-panel sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Consequence map
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-signal" />
            </div>
            {consequences.map((consequence, index) => (
              <motion.div
                key={consequence.label}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-t border-white/15 py-3.5 sm:grid-cols-[3.5rem_1fr_auto] sm:py-4"
                animate={
                  current === 4
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 20 }
                }
                transition={{ delay: 0.12 + index * 0.065 }}
              >
                <span className="font-mono text-[10px] text-white/35">
                  0{index + 1}
                </span>
                <span className="text-base font-semibold sm:text-lg">
                  {consequence.label}
                </span>
                <span className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/55">
                  {consequence.scope}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide active={current === 5} label={slides[5].title}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Kicker code="COMMITMENT">Conclusion</Kicker>
            <SlideHeading className="max-w-5xl">
              Build technology worthy of{" "}
              <span className="relative inline-block">
                trust.
                <motion.span
                  className="absolute -bottom-1 left-0 h-3 w-full bg-signal -z-10"
                  animate={{ scaleX: current === 5 ? 1 : 0 }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </SlideHeading>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Computing professionals protect users and society through the
              choices they make.
            </p>
          </div>

          <div className="commitment-list border-t border-graphite">
            {[
              "Technology affects real people",
              "Ethics guides responsible action",
              "Professionals protect users and society",
            ].map((point, index) => (
              <motion.div
                key={point}
                className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-rule py-5"
                animate={
                  current === 5
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: 18 }
                }
                transition={{ delay: 0.13 + index * 0.09 }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-signal">
                  <ShieldIcon className="h-5 w-5 text-graphite" />
                </span>
                <p className="font-semibold leading-snug sm:text-lg">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Slide>

      <div className="fixed bottom-5 left-6 z-40 hidden items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-slate sm:flex lg:left-28">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal ring-1 ring-graphite" />
        Scroll / arrows to navigate
      </div>

      <div className="fixed bottom-4 right-5 z-40 flex gap-2 sm:right-8 lg:right-10">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => move(-1)}
          disabled={current === 0}
          className="nav-button"
        >
          <ArrowIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => move(1)}
          disabled={current === slides.length - 1}
          className="nav-button"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
        </button>
      </div>
    </main>
  );
}
