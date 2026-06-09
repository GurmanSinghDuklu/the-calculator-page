import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import type { ChartPoint } from "@/data/most-searched/types";

const ACCENT = "#3B82F6";

export function AnswerChart({ title, points }: { title: string; points: ChartPoint[] }) {
  return (
    <div className="border border-dark-border bg-dark-card rounded-xl p-6">
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={points} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis dataKey="name" stroke="#666" fontSize={11} tickLine={false} />
          <YAxis stroke="#666" fontSize={11} tickLine={false} width={48} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {points.map((_, i) => (
              <Cell key={i} fill={i === points.length - 1 ? "#22C55E" : ACCENT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
