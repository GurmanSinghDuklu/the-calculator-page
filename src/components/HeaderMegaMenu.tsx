import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SECTIONS } from "@/components/NavigationMenu";

// Desktop-only hover mega-menu across the top nav bar. Reuses the same
// SECTIONS data as the "All Tools" slide-out sheet, so every category is
// one hover away from every page instead of two clicks deep.
const TOP_LEVEL = ["property", "finance-uk", "finance-us", "everyday", "converters"];

export const HeaderMegaMenu = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const open = (id: string) => {
    clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenId(null), 150);
  };

  const sections = SECTIONS.filter((s) => TOP_LEVEL.includes(s.id));

  return (
    <nav className="hidden lg:flex items-center gap-1" onMouseLeave={scheduleClose}>
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="relative" onMouseEnter={() => open(section.id)}>
            <button
              className="px-3 py-2 font-heading text-[10px] uppercase tracking-widest transition-colors"
              style={{ color: isOpen ? "white" : "rgba(255,255,255,0.55)" }}
            >
              {section.label}
            </button>

            {isOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                onMouseEnter={() => open(section.id)}
              >
                <div className="w-[min(90vw,720px)] bg-[#0E0D0D] border border-white/10 rounded-xl shadow-2xl p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                  {section.groups.map((group) => (
                    <div key={group.label}>
                      <p
                        className="font-heading text-[8px] uppercase tracking-[0.25em] mb-2.5 pb-2 border-b"
                        style={{ color: section.color, borderColor: `${section.color}25` }}
                      >
                        {group.label}
                      </p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/[0.05] group transition-all"
                          >
                            <span className="text-xs text-white/75 group-hover:text-white transition-colors font-sans">
                              {item.title}
                            </span>
                            <ArrowRight className="h-2.5 w-2.5 text-white/0 group-hover:text-white/50 -translate-x-1 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
