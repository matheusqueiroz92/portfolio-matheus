"use client";

import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInStaggerProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  /** Stagger between each child, in seconds. Defaults to 0.1. */
  stagger?: number;
  /** Initial delay before the first child starts, in seconds. */
  delay?: number;
  /** Animate on mount instead of on scroll. */
  immediate?: boolean;
  /** Intersection threshold (0–1). Defaults to 0.2. */
  amount?: number;
}

/**
 * Parent wrapper that orchestrates a stagger. Pair with `<FadeInItem>` or any
 * motion child using the "item" variant. Uses Framer Motion variants so every
 * child animates when the parent enters the viewport — no per-child observer.
 */
export function FadeInStagger({
  children,
  stagger = 0.1,
  delay = 0,
  immediate = false,
  amount = 0.2,
  ...rest
}: FadeInStaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const viewportProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount },
      };

  return (
    <motion.div variants={variants} {...viewportProps} {...rest}>
      {children}
    </motion.div>
  );
}

type FadeInItemDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  distance?: number;
  direction?: FadeInItemDirection;
  /** Override duration (seconds); otherwise inherits MotionConfig default. */
  duration?: number;
}

function getOffset(direction: FadeInItemDirection, distance: number) {
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
 * A staggered child. Use inside `<FadeInStagger>`. Variants are named "hidden"
 * / "visible" to match the parent's orchestration.
 */
export function FadeInItem({
  children,
  distance = 20,
  direction = "up",
  duration,
  ...rest
}: FadeInItemProps) {
  const offset = getOffset(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(duration ? { transition: { duration } } : {}),
    },
  };

  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}
