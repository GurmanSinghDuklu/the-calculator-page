import { Link } from "react-router-dom";
import { getPopularForParent } from "@/data/converter-values";

/** Internal-link block: popular per-value pages for a parent converter. */
export function PopularConversions({ parentPath, accent }: { parentPath: string; accent: string }) {
  const pages = getPopularForParent(parentPath);
  if (pages.length === 0) return null;
  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <h2 className="font-display text-2xl uppercase text-white tracking-wide mb-6">Popular Conversions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {pages.map((p) => (
          <Link
            key={p.slug}
            to={`/converters/${p.slug}`}
            className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] transition-colors group"
          >
            <p className="text-white text-sm font-semibold group-hover:underline">{p.h1}</p>
            <p className="text-xs mt-1" style={{ color: accent }}>{p.bigAnswer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
