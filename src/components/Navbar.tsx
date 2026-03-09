import { Link } from "react-router-dom";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">

        {/* Logo */}
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Email - Hidden on mobile */}
        <div className="hidden md:block mr-6">
          <a
            href="mailto:thecalculatorpage@gmail.com"
            className="text-sm text-gray-400 hover:text-white transition-colors font-sans"
          >
            THECALCULATORPAGE@GMAIL.COM
          </a>
        </div>

        {/* Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-3 group">
              <span className="hidden sm:inline font-heading text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                Menu
              </span>
              <div className="w-10 h-10 bg-black border border-white/20 flex flex-col items-center justify-center gap-[5px] group-hover:border-white transition-colors">
                <span className="block w-5 h-[1.5px] bg-white" />
                <span className="block w-5 h-[1.5px] bg-white" />
                <span className="block w-3 h-[1.5px] bg-white" />
              </div>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[90vw] sm:w-[80vw] max-w-6xl p-0 border-l border-white/10 bg-black">
            <NavigationMenu onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
