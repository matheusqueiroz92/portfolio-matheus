"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useMemo, useSyncExternalStore } from "react";

/**
 * Intercepts clicks on same-page hash links (<a href="#foo">) and routes them
 * through the Lenis instance so they inherit the smooth-scroll easing instead
 * of using the browser's instant jump.
 *
 * Mounted inside <ReactLenis> so `useLenis` has access to the context.
 */
function LenisAnchorBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    function handleClick(event: MouseEvent) {
      // Respect modifier keys / middle-click (user wants a new tab/window).
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      // Only intercept same-origin hash links pointing at the current page.
      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      const sameDocument =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash.length > 1;

      if (!sameDocument) return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      event.preventDefault();
      // lenis handles updating history + scroll via scrollTo.
      lenis?.scrollTo(el as HTMLElement, { offset: 0 });
      // Keep the URL hash in sync for deep linking / back-button behavior.
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
}

/**
 * Subscribes to prefers-reduced-motion so we can opt out of Lenis when the user
 * has reduced motion enabled. Returns `true` when motion should be reduced.
 * Uses useSyncExternalStore to stay correct during hydration and media changes.
 */
function usePrefersReducedMotion(): boolean {
  const subscribe = useMemo(() => {
    return (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    };
  }, []);

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  // Server defaults to false; that's fine — the provider is a client component
  // and Lenis only runs in the browser.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // If the user asks for reduced motion, skip Lenis entirely and let the
  // browser handle scroll natively (instant, no easing).
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // Slightly longer than the default (1.2) for a calmer feel.
        duration: 1.1,
        // easeOutExpo — same curve family as our Framer Motion defaults.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Wheel/touch tuning.
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        // Let CSS smooth-behavior fall back if Lenis is disabled mid-session.
        smoothWheel: true,
      }}
    >
      <LenisAnchorBridge />
      {children}
    </ReactLenis>
  );
}
