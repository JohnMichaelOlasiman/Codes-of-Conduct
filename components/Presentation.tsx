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
  {
    name: "ACM",
    fullName: "Association for Computing Machinery",
    index: "01",
  },
  {
    name: "IEEE",
    fullName: "Institute of Electrical and Electronics Engineers",
    index: "02",
  },
  {
    name: "IFIP",
    fullName: "International Federation for Information Processing",
    index: "03",
  },
];

const organizationImportance = [
  "Promotes professional ethics and standards",
  "Provides learning, training, and certification opportunities",
  "Supports research and technological innovation",
  "Connects professionals through conferences and networking",
  "Encourages responsible use of computing for society",
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
    <div className="mb-3 flex min-w-0 items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate sm:mb-6 sm:gap-4 sm:text-[10px] sm:tracking-[0.18em]">
      <span className="shrink-0 rounded-full border border-rule bg-white/70 px-2.5 py-1 text-graphite sm:px-3 sm:py-1.5">
        {code}
      </span>
      <span className="truncate">{children}</span>
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
      className={`max-w-5xl font-display text-[clamp(1.9rem,9vw,2.45rem)] font-black leading-[0.92] tracking-[-0.055em] text-graphite sm:text-[clamp(2.7rem,6vw,6.6rem)] sm:leading-[0.88] sm:tracking-[-0.065em] ${className}`}
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
            <h1 className="max-w-5xl font-display text-[clamp(2.5rem,12vw,3.35rem)] font-black leading-[0.86] tracking-[-0.07em] text-graphite sm:text-[clamp(3.3rem,7.4vw,8.5rem)] sm:leading-[0.82] sm:tracking-[-0.075em]">
              Code shapes
              <br />
              <span className="text-outline">conduct.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate sm:mt-7 sm:text-lg lg:text-xl">
              Professional Codes of Conduct in Computing
            </p>
          </div>

          <Reveal
            active={current === 0}
            delay={0.18}
            className="relative min-h-[220px] w-full max-w-[calc(100vw-2rem)] overflow-hidden sm:min-h-[320px] sm:max-w-full lg:min-h-[480px]"
          >
            <div className="protocol-panel relative h-full w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.5rem] border border-graphite bg-graphite text-white shadow-panel sm:absolute sm:inset-0 sm:max-w-full sm:rounded-[2rem]">
              <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 sm:px-6 sm:py-5">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/55 sm:text-[10px] sm:tracking-[0.22em]">
                  Decision record
                </span>
                <span className="status-chip">Active</span>
              </div>
              <div className="flex h-[calc(100%-45px)] flex-col justify-between p-4 sm:h-[calc(100%-65px)] sm:p-8">
                <ShieldIcon className="h-9 w-9 text-signal sm:h-16 sm:w-16" />
                <blockquote className="max-w-full font-display text-xl font-bold leading-[1.05] tracking-[-0.035em] sm:max-w-md sm:text-4xl lg:text-5xl">
                  Responsible decisions begin before the code is shipped.
                </blockquote>
                <p className="max-w-sm text-xs leading-relaxed text-white/55 sm:text-sm">
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
                className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-rule py-2.5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-4 sm:py-5"
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
                  <p className="text-base font-bold tracking-[-0.025em] sm:text-xl">
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
        <div className="grid items-start gap-4 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div>
              <Kicker code="STANDARDS">Professional organizations</Kicker>
              <SlideHeading className="max-w-3xl">
                What are computing professional organizations?
              </SlideHeading>
            </div>

            <Reveal
              active={current === 2}
              delay={0.12}
              className="definition-card mt-4 overflow-hidden rounded-[1.25rem] border border-graphite bg-white shadow-panel sm:mt-7 sm:rounded-[1.75rem]"
            >
              <div className="border-b border-rule px-4 py-2.5 sm:px-6 sm:py-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate">
                  Definition
                </span>
              </div>
              <p className="p-4 text-sm font-medium leading-relaxed text-slate sm:p-6 sm:text-lg">
                Computing professional organizations are groups that support
                growth and development in computing and information technology.
                They help professionals learn, connect, advance their careers,
                and use technology responsibly for society.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:gap-4">
            <div className="rounded-[1.25rem] border border-rule bg-white/85 p-3 shadow-float backdrop-blur sm:rounded-[1.75rem] sm:p-5">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate">
                  Examples
                </span>
                <PeopleIcon className="h-5 w-5 text-slate sm:h-6 sm:w-6" />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {organizations.map((organization, index) => (
                  <motion.article
                    key={organization.name}
                    className="relative overflow-hidden rounded-xl border border-rule bg-canvas p-2.5 sm:rounded-2xl sm:p-4"
                    animate={
                      current === 2
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 18 }
                    }
                    transition={{ delay: 0.14 + index * 0.07 }}
                  >
                    <span className="font-mono text-[9px] font-semibold text-slate">
                      ORG/{organization.index}
                    </span>
                    <p className="mt-5 font-display text-2xl font-black tracking-[-0.06em] text-graphite sm:mt-7 sm:text-4xl">
                      {organization.name}
                    </p>
                    <p className="mt-1.5 text-[7px] font-semibold uppercase leading-snug tracking-[0.06em] text-slate sm:mt-2 sm:text-[10px] sm:tracking-[0.1em]">
                      {organization.fullName}
                    </p>
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-signal ring-1 ring-graphite sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5" />
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-graphite p-4 text-white shadow-panel sm:rounded-[1.75rem] sm:p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Importance
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-signal" />
              </div>
              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-5">
                {organizationImportance.map((item, index) => (
                  <motion.div
                    key={item}
                    className={`grid grid-cols-[1.35rem_1fr] gap-2 border-t border-white/15 py-2.5 sm:grid-cols-[1.8rem_1fr] sm:gap-3 sm:py-3 ${
                      index === organizationImportance.length - 1
                        ? "col-span-2"
                        : ""
                    }`}
                    animate={
                      current === 2
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 16 }
                    }
                    transition={{ delay: 0.22 + index * 0.045 }}
                  >
                    <span className="font-mono text-[9px] text-white/35 sm:text-[10px]">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-medium leading-snug text-white/90 sm:text-sm">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
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

          <ol className="decision-path relative mt-6 grid gap-2 sm:mt-10 lg:mt-16 lg:grid-cols-5 lg:gap-0">
            {decisionSteps.map((step, index) => (
              <motion.li
                key={step}
                className="decision-step relative grid grid-cols-[2.75rem_1fr] items-center gap-3 border border-rule bg-white px-3 py-2.5 lg:block lg:min-h-56 lg:border-y lg:border-l-0 lg:border-r lg:px-5 lg:py-6 lg:first:border-l"
                animate={
                  current === 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ delay: 0.1 + index * 0.085 }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite font-mono text-[10px] font-bold text-white lg:h-12 lg:w-12 lg:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-semibold leading-snug sm:text-base lg:mt-16 lg:text-lg">
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

          <div className="relative overflow-hidden rounded-[1.25rem] bg-graphite p-4 text-white shadow-panel sm:rounded-[1.75rem] sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Consequence map
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-signal" />
            </div>
            {consequences.map((consequence, index) => (
              <motion.div
                key={consequence.label}
                className="grid grid-cols-[1.6rem_1fr_auto] items-center gap-2 border-t border-white/15 py-2.5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-3 sm:py-4"
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
                <span className="text-sm font-semibold sm:text-lg">
                  {consequence.label}
                </span>
                <span className="rounded-full border border-white/20 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-white/55 sm:px-2.5 sm:text-[9px]">
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
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate sm:mt-8 sm:text-lg">
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
                className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-rule py-3.5 sm:gap-4 sm:py-5"
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
