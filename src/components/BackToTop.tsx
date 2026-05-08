import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(total > 200 && scrolled / total >= 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};
