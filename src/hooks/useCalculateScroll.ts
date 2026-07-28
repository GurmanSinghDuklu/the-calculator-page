import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fixes the "nothing happened" feeling on Calculate buttons whose results
 * render off-screen (e.g. in a left column while the button sits in a right
 * column below the fold). Call `onCalculate()` from the button's onClick
 * instead of the raw calculate function, attach `resultRef` to the results
 * container, and spread `buttonProps` onto the button for instant visual
 * feedback (brief pulse) while the scroll happens.
 */
export function useCalculateScroll<T extends HTMLElement = HTMLDivElement>() {
  const resultRef = useRef<T | null>(null);
  const [justClicked, setJustClicked] = useState(false);
  const pendingScroll = useRef(false);

  // Scrolls once the result element actually exists/updates in the DOM,
  // not on the click itself — results are usually set a tick after calculate().
  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    const el = resultRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });

  const onCalculate = useCallback((calculateFn: () => void) => {
    calculateFn();
    pendingScroll.current = true;
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 400);
  }, []);

  return {
    resultRef,
    onCalculate,
    buttonProps: {
      className: justClicked ? "scale-[0.97] transition-transform duration-150" : "transition-transform duration-150",
    },
  };
}
