import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CalculatorPreviewIcon } from "@/components/CalculatorPreviewIcon";
import { getRelatedCalculators } from "@/data/related-calculators";

/** Placed between Results and the Why/How section — the highest-intent
 * moment on the page, right after someone has their answer. */
export function RelatedCalculators({ pageKey }: { pageKey: string }) {
  const items = getRelatedCalculators(pageKey);
  if (items.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">
        You Might Also Need
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group bg-[#1a1918]/80 border border-white/8 rounded-xl p-4 hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            <CalculatorPreviewIcon shape={item.shape} accent={item.accent} />
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-white font-semibold text-sm group-hover:underline">{item.title}</p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{item.hook}</p>
              </div>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 mt-1 text-white/0 group-hover:text-white/60 -translate-x-1 group-hover:translate-x-0 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
