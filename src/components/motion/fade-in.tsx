"use client";

import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type FadeInDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  /** Distance in pixels for the slide-in effect. Defaults to 24. */
  distance?: number;
  /** Direction the element slides in from. Defaults to "up". */
  direction?: FadeInDirection;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Duration in seconds. Overrides the MotionConfig default when provided. */
  duration?: number;
  /**
   * When true, animate on mount (good for above-the-fold).
   * When false (default), animate when scrolled into view (once).
   */
  immediate?: boolean;
  /** Intersection threshold (0–1). Defaults to 0.2. */
  amount?: number;
  /** Render as a different element (motion proxies `as`). Defaults to div. */
  as?: keyof typeof motion;
}

function getOffset(direction: FadeInDirection, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

/**
 * Drop-in replacement for the previous `.animate-on-scroll` GSAP trigger.
 * Declarative, respects prefers-reduced-motion via MotionConfig, and falls back
 * to a static render when JS is disabled (the element is visible by default,
 * then Framer Motion takes over on hydration).
 */
export function FadeIn({
  children,
  distance = 24,
  direction = "up",
  delay = 0,
  duration,
  immediate = false,
  amount = 0.2,
  as = "div",
  ...rest
}: FadeInProps) {
  const offset = getOffset(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        ...(duration ? { duration } : {}),
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  const viewportProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount },
      };

  return (
    <MotionTag variants={variants} {...viewportProps} {...rest}>
      {children}
    </MotionTag>
  );
}
