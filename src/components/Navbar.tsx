import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";

export const Navbar = () => {
  return (
    <header className="border-b border-white/8 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="font-display text-lg font-bold tracking-widest text-white group-hover:text-white/80 transition-colors">
            THE
          </span>
          <span className="font-display text-lg font-bold tracking-widest text-green-500 group-hover:text-green-400 transition-colors">
            CALC
          </span>
          <span className="font-display text-lg font-bold tracking-widest text-white group-hover:text-white/80 transition-colors">
            PAGE
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <NavigationMenu />
        </div>
      </div>
    </header>
  );
};
