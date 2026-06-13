"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SlideProps = {
  active: boolean;
  children: ReactNode;
  label: string;
};

export default function Slide({ active, children, label }: SlideProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-hidden={!active}
      aria-label={label}
      className="absolute inset-0 flex min-h-[100svh] items-center overflow-hidden"
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : reduceMotion ? 0 : 22,
        scale: active ? 1 : reduceMotion ? 1 : 0.985,
        pointerEvents: active ? "auto" : "none",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="slide-grid mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 lg:pl-32 lg:pr-20 xl:pl-40 xl:pr-28">
        {children}
      </div>
    </motion.section>
  );
}
