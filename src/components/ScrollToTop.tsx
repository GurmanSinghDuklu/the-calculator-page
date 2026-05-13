import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Disable browser scroll restoration so it doesn't fight us on navigation
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant avoids a visible scroll animation when arriving at a new page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

// DUAL EXPORT: This ensures compatibility with all files
export { ScrollToTop }; 
export default ScrollToTop;