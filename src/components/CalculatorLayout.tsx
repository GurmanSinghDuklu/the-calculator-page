import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Logo } from "@/components/Logo";

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const CalculatorLayout = ({ children, title, description }: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="sm" linkTo="/home" />
          <div className="flex items-center gap-4">
            <Link to="/home"
              className="flex items-center gap-2 text-white/25 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 border-b border-white/8 pb-10">
          <h1 className="font-display text-5xl md:text-6xl leading-[0.9] tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-zinc-500 text-lg font-sans leading-relaxed">{description}</p>
        </div>

        <div>{children}</div>
      </main>

    </div>
  );
};