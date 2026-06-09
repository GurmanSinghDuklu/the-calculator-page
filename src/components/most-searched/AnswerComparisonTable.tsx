import type { ComparisonRow } from "@/data/most-searched/types";

export function AnswerComparisonTable({
  title, columns, rows,
}: { title: string; columns: [string, string]; rows: ComparisonRow[] }) {
  return (
    <div className="border border-dark-border bg-dark-card rounded-xl p-6">
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">{title}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="py-2 text-[10px] font-heading uppercase tracking-widest text-white/40">{columns[0]}</th>
            <th className="py-2 text-[10px] font-heading uppercase tracking-widest text-white/40 text-right">{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-white/5 last:border-0">
              <td className="py-3 text-zinc-300">{r.label}</td>
              <td className="py-3 text-white font-heading text-right">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
