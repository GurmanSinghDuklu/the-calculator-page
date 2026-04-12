import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";

export const Navbar = () => {
  return (
    <header className="border-b border-white/8 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo linkTo="/" size="sm" />
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
