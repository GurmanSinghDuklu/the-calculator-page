import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

export interface ScheduleRow {
  period: string;
  periodIndex: number;
  payment?: number;
  principal?: number;
  interest?: number;
  balance: number;
  balance2?: number;
}

export interface AmortisationScheduleProps {
  rows: ScheduleRow[];
  monthlyRows?: ScheduleRow[];
  currencySymbol: string;
  accentColour: string;
  balanceLabel?: string;
  balance2Label?: string;
  granularity?: "year" | "month";
}

export function AmortisationSchedule({
  rows,
  monthlyRows,
  currencySymbol: sym,
  accentColour: accent,
  balanceLabel = "Remaining Balance",
  balance2Label,
  granularity = "year",
}: AmortisationScheduleProps) {
  const [view, setView] = useState<"yearly" | "monthly">("yearly");
  const [jumpInput, setJumpInput] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const highlightRef = useRef<HTMLTableRowElement | null>(null);

  const activeRows = view === "monthly" && monthlyRows ? monthlyRows : rows;
  const hasMonthly = !!monthlyRows && monthlyRows.length > 0;
  const hasPaymentCols = activeRows.some(r => r.payment !== undefined);
  const hasDualBalance = !!balance2Label;

  // granularity prop drives the jump-to label when there's no toggle
  const jumpLabel = hasMonthly ? (view === "yearly" ? "Year" : "Month") : (granularity === "month" ? "Month" : "Year");

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIndex]);

  const fmt = (n?: number) =>
    n !== undefined
      ? sym + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "—";

  const handleJump = () => {
    const n = parseInt(jumpInput);
    if (isNaN(n) || n < 1) return;
    const idx = activeRows.findIndex(r => r.periodIndex === n);
    if (idx !== -1) setHighlightedIndex(idx);
  };

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-[#252323]/80 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
          <h3 className="font-display text-xl uppercase text-white tracking-wide">
            Amortisation Schedule
          </h3>
        </div>

        {/* Yearly / Monthly toggle — only shown when monthly rows are provided */}
        {hasMonthly && (
          <div className="flex rounded-lg border border-white/10 overflow-hidden self-start sm:self-auto">
            {(["yearly", "monthly"] as const).map(v => (
              <button
                key={v}
                onClick={() => { setView(v); setHighlightedIndex(null); setJumpInput(""); }}
                className={`px-4 py-2 text-[9px] font-heading uppercase tracking-widest transition-colors ${
                  view === v ? "bg-white/10 text-white" : "text-white/30 hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Jump-to bar */}
      <div className="px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        <span className="text-[10px] font-heading uppercase tracking-widest text-white/40 shrink-0">
          Jump to {jumpLabel}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            min="1"
            value={jumpInput}
            onChange={e => setJumpInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleJump()}
            placeholder={jumpLabel === "Year" ? "e.g. 5" : "e.g. 24"}
            className="w-24 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-heading focus:outline-none transition-all"
            style={{ borderColor: jumpInput ? `${accent}60` : undefined }}
          />
          <button
            onClick={handleJump}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-[10px] uppercase tracking-widest text-black transition-all hover:-translate-y-0.5"
            style={{ background: accent }}
          >
            <Search className="h-3 w-3" />
            Find
          </button>
          {highlightedIndex !== null && (
            <button
              onClick={() => { setHighlightedIndex(null); setJumpInput(""); }}
              className="text-[10px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          {highlightedIndex !== null && activeRows[highlightedIndex] && (
            <span className="text-[10px] font-heading uppercase tracking-widest" style={{ color: accent }}>
              Balance: {fmt(activeRows[highlightedIndex].balance)}
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30">Period</th>
              {hasPaymentCols && (
                <>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Payment</th>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Principal</th>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Interest</th>
                </>
              )}
              <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30">{balanceLabel}</th>
              {hasDualBalance && (
                <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden sm:table-cell">{balance2Label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {activeRows.map((row, i) => {
              const isHighlighted = i === highlightedIndex;
              return (
                <tr
                  key={i}
                  ref={isHighlighted ? highlightRef : null}
                  className={`border-b border-white/[0.04] transition-colors ${
                    isHighlighted ? "border-l-2" : "hover:bg-white/[0.02]"
                  }`}
                  style={isHighlighted ? {
                    backgroundColor: `${accent}12`,
                    borderLeftColor: accent,
                  } : undefined}
                >
                  <td className="px-5 py-3 font-heading text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                    {row.period}
                  </td>
                  {hasPaymentCols && (
                    <>
                      <td className="px-5 py-3 text-white/70 font-heading text-xs hidden md:table-cell">{fmt(row.payment)}</td>
                      <td className="px-5 py-3 text-white/70 font-heading text-xs hidden md:table-cell">{fmt(row.principal)}</td>
                      <td className="px-5 py-3 text-white/50 font-heading text-xs hidden md:table-cell">{fmt(row.interest)}</td>
                    </>
                  )}
                  <td className="px-5 py-3 font-heading text-xs font-medium text-white">{fmt(row.balance)}</td>
                  {hasDualBalance && (
                    <td className="px-5 py-3 font-heading text-xs text-white/50 hidden sm:table-cell">{fmt(row.balance2)}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
