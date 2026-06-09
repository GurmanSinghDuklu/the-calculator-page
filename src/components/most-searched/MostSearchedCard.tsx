import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { AnswerPageData } from "@/data/most-searched/types";

export function MostSearchedCard({ page }: { page: AnswerPageData }) {
  return (
    <Link
      to={`/most-searched/${page.market}/${page.slug}`}
      className="group flex flex-col justify-between gap-4 p-6 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/50 transition-colors min-h-[150px]"
    >
      <div>
        <span className="inline-block text-[10px] font-heading uppercase tracking-widest text-accent-blue mb-2">{page.category}</span>
        <p className="font-sans text-sm text-white/80 leading-snug">{page.question}</p>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-3xl text-white tracking-wide">{page.answerNumber}</span>
        <ArrowRight className="w-4 h-4 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
