"use client";

import dynamic from "next/dynamic";

/**
 * The hero's 3D ornament is client-only — R3F boots a WebGL context so it must
 * not SSR. `next/dynamic` with `ssr: false` keeps the initial HTML clean and
 * avoids server-side errors.
 *
 * Fallback is `null` on purpose: the canvas sits in an `absolute inset-0`
 * wrapper behind the photo, so there's no layout to reserve — pre-hydration,
 * the user simply sees the photo without the ornament, which is the fully
 * accessible baseline.
 */
export const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
);
