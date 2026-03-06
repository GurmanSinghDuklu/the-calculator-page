import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-1.5 mb-6">
      {/* Home */}
      <Link
        to="/"
        className="flex items-center gap-1.5 font-heading text-[9px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors"
      >
        <Home className="h-3 w-3 shrink-0" />
        <span>Home</span>
      </Link>

      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-white/10 shrink-0" />
          {item.href ? (
            <Link
              to={item.href}
              className="font-heading text-[9px] uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-white/40">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};