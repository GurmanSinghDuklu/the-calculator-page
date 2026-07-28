import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NavigationMenu } from "@/components/NavigationMenu";
import { HeaderMegaMenu } from "@/components/HeaderMegaMenu";

/** Global sticky header, rendered once in App.tsx so every route gets it —
 * most calculator pages previously had no persistent nav at all. */
export const SiteHeader = () => {
  return (
    <header className="border-b border-white/8 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Logo linkTo="/" size="sm" />
        <HeaderMegaMenu />
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <NavigationMenu />
        </div>
      </div>
    </header>
  );
};
