import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";

const ACCENT = "#3B82F6";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 Page Not Found"
        description="The page you are looking for could not be found. Return to Calculator App homepage for free online calculators."
        keywords="404, page not found"
      />

      <div className="flex min-h-screen items-center justify-center bg-dark-bg relative overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)` }} />

        {/* Side decorative lines — left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="h-px bg-white/5" style={{ width: 32 + i * 8 }} />
          ))}
        </div>

        {/* Side decorative lines — right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
          {[4,3,2,1,0].map(i => (
            <div key={i} className="h-px bg-white/5" style={{ width: 32 + i * 8 }} />
          ))}
        </div>

        {/* Content */}
        <div className="text-center px-6 select-none z-10">

          {/* Giant 404 */}
          <p className="font-display leading-none tracking-tighter" style={{
            fontSize: "clamp(120px, 25vw, 280px)",
            background: `linear-gradient(135deg, ${ACCENT}30 0%, #a78bfa20 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            filter: `drop-shadow(0 0 60px ${ACCENT}20)`,
          }}>
            404
          </p>

          {/* Label */}
          <p className="font-display text-3xl md:text-4xl text-white/20 tracking-widest uppercase -mt-4 mb-6">
            Page Not Found
          </p>

          {/* Path that was attempted */}
          <p className="font-mono text-xs text-white/15 mb-10 tracking-wider">
            {location.pathname}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-px bg-white/10" />
            <p className="text-[9px] font-heading uppercase tracking-[0.3em] text-white/20">
              Lost in the calculation
            </p>
            <div className="w-16 h-px bg-white/10" />
          </div>

          {/* Return home button */}
          <Link
            to="/"
            replace
            className="group inline-flex items-center gap-2 px-8 py-4 font-heading text-xs uppercase tracking-widest text-black rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
          >
            Return Home
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* Corner branding */}
        <div className="absolute bottom-8 right-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.3em] text-white/10">Calculator App</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;