"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * App-wide Framer Motion config.
 *
 * - `reducedMotion="user"`: respects prefers-reduced-motion at the media-query
 *   level. When reduced, Framer Motion disables non-essential animations and
 *   collapses transitions to 0s.
 * - Default transition uses a soft, paper-like easing to match the editorial
 *   identity (no springy bounce by default).
 */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // easeOutExpo-ish: soft landing
      }}
    >
      {children}
    </MotionConfig>
  );
}
