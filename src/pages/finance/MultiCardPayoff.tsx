import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Trash2, Download, Target } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

// ─── Types (unchanged) ────────────────────────────────────────────────────────
interface CreditCard {
  id: string; name: string; balance: number;
  apr: number; minPct: number; floorMin: number;
}
interface SimulationResult {
  months: number; totalInterestAll: number; totalPaidAll: number;
  cards: Array<{ name: string; paidOffMonth: number | null; totalInterest: number; totalPaid: number }>;
  schedule: Array<{ month: number; totalBalance: number; spend: number; interest: number;
    items: Array<{ name: string; minPay: number; extra: number; endBal: number }> }>;
}

// ─── Reusable styled input ────────────────────────────────────────────────────
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1.5";

function DI({ value, onChange, type = "number", placeholder = "", step, min, max, className = "" }: {
  value: string | number; onChange: (v: string) => void; type?: string;
  placeholder?: string; step?: string; min?: string; max?: string; className?: string;
}) {
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} step={step} min={min} max={max}
      className={`w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-medium placeholder-white/20 focus:outline-none transition-all ${className}`}
      onFocus={e => (e.target.style.borderColor = ACCENT)}
      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

export default function MultiCardPayoff() {
  const [cards, setCards] = useState<CreditCard[]>([
    { id: "1", name: "Card A", balance: 2400, apr: 24.9, minPct: 2, floorMin: 25 }
  ]);
  const [strategy,  setStrategy]  = useState<"avalanche" | "snowball">("avalanche");
  const [budget,    setBudget]    = useState("400");
  const [days,      setDays]      = useState("30");
  const [maxMonths, setMaxMonths] = useState("600");
  const [result,    setResult]    = useState<SimulationResult | null>(null);

  const addCard = () => setCards([...cards, {
    id: Date.now().toString(),
    name: `Card ${String.fromCharCode(65 + cards.length)}`,
    balance: 0, apr: 29.9, minPct: 2, floorMin: 25,
  }]);
  const removeCard = (id: string) => setCards(cards.filter(c => c.id !== id));
  const updateCard = (id: string, field: keyof CreditCard, value: string | number) =>
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));

  const monthlyRate = (aprDecimal: number, daysInCycle: number) =>
    Math.pow(1 + aprDecimal / 365, daysInCycle) - 1;

  const simulateDebtPaydown = (): SimulationResult | null => {
    const budgetNum = parseFloat(budget), daysNum = parseInt(days), maxMonthsNum = parseInt(maxMonths);
    if (!cards.length) { toast.error("Add at least one card"); return null; }
    if (budgetNum <= 0) { toast.error("Please enter a positive monthly budget"); return null; }

    const cardsCopy = cards.map(c => ({ ...c, totalInterest: 0, totalPaid: 0, paidOffMonth: null as number | null }));
    const schedule: SimulationResult["schedule"] = [];
    let month = 0, totalInterestAll = 0, totalPaidAll = 0;

    const alive = () => cardsCopy.filter(c => c.balance > 0.000001);
    const sortKey = (c: typeof cardsCopy[0]) => strategy === "avalanche" ? -c.apr : c.balance;

    while (alive().length && month < maxMonthsNum) {
      month += 1;
      let remaining = budgetNum;
      const monthData = { month, totalBalance: 0, spend: 0, interest: 0, items: [] as any[] };

      for (const c of cardsCopy) {
        if (c.balance <= 0) continue;
        const iM = monthlyRate(c.apr / 100, daysNum);
        const interest = c.balance * iM;
        const minCandidate = Math.max(c.floorMin, (c.minPct / 100) * c.balance, interest + 1);
        const dueNow = Math.min(remaining, Math.min(c.balance + interest, minCandidate));
        const payment = dueNow;
        remaining -= payment;
        c.balance = Math.max(0, c.balance - Math.max(0, payment - interest));
        c.totalInterest += interest; c.totalPaid += payment;
        totalInterestAll += interest; totalPaidAll += payment;
        monthData.items.push({ name: c.name, minPay: payment, extra: 0, endBal: c.balance });
        monthData.interest += interest; monthData.spend += payment;
      }

      while (remaining > 0.000001 && alive().length) {
        const ordered = alive().slice().sort((a, b) => {
          const ka = sortKey(a), kb = sortKey(b);
          if (ka < kb) return -1; if (ka > kb) return 1;
          return strategy === "avalanche" ? (a.balance - b.balance) : (b.apr - a.apr);
        });
        const target = ordered[0];
        const pay = Math.min(remaining, target.balance);
        target.balance = Math.max(0, target.balance - pay);
        target.totalPaid += pay; totalPaidAll += pay; remaining -= pay;
        const item = monthData.items.find(x => x.name === target.name);
        if (item) { item.extra += pay; item.endBal = target.balance; }
        monthData.spend += pay;
        if (target.balance <= 0.000001 && target.paidOffMonth === null) target.paidOffMonth = month;
      }

      monthData.totalBalance = cardsCopy.reduce((s, c) => s + c.balance, 0);
      schedule.push(monthData);
      for (const c of cardsCopy) if (c.balance < 0.005) c.balance = 0;
    }

    return {
      months: month, totalInterestAll, totalPaidAll,
      cards: cardsCopy.map(c => ({ name: c.name, paidOffMonth: c.paidOffMonth, totalInterest: c.totalInterest, totalPaid: c.totalPaid })),
      schedule,
    };
  };

  const handleSimulate = () => {
    const res = simulateDebtPaydown();
    if (res) { setResult(res); toast.success("Simulation complete!"); }
  };

  const loadDemo = () => {
    setCards([
      { id: "1", name: "Card A", balance: 2400, apr: 24.9, minPct: 2, floorMin: 25 },
      { id: "2", name: "Card B", balance: 1200, apr: 29.9, minPct: 2, floorMin: 25 },
      { id: "3", name: "Card C", balance: 800,  apr: 19.9, minPct: 2, floorMin: 25 },
    ]);
    setBudget("400"); setStrategy("avalanche");
    toast.success("Demo data loaded");
  };

  const downloadCSV = () => {
    if (!result?.schedule.length) { toast.error("Run simulation first"); return; }
    let csv = "Month,Total Spend,Total Interest,Total Balance";
    const names = [...new Set(result.schedule.flatMap(r => r.items.map(i => i.name)))];
    for (const n of names) csv += `,${n} Min,${n} Extra,${n} Balance`;
    csv += "\n";
    for (const r of result.schedule) {
      const line = [r.month, r.spend.toFixed(2), r.interest.toFixed(2), r.totalBalance.toFixed(2)];
      const map = Object.fromEntries(r.items.map(i => [i.name, i]));
      for (const n of names) {
        const it = map[n] || { minPay: 0, extra: 0, endBal: 0 };
        line.push(it.minPay.toFixed(2), it.extra.toFixed(2), it.endBal.toFixed(2));
      }
      csv += line.join(",") + "\n";
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "debt_paydown_schedule.csv";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  };

  const solveForTarget = () => {
    const targetStr = prompt("Target months to be debt-free (e.g., 36):");
    const target = parseInt(targetStr || "", 10);
    if (!target || target < 1) return;
    const daysNum = parseInt(days);
    let lower = cards.reduce((s, c) => {
      const iM = monthlyRate(c.apr / 100, daysNum);
      return s + Math.max(c.floorMin, (c.minPct / 100) * c.balance, c.balance * iM + 1);
    }, 0);
    let upper = cards.reduce((s, c) => s + c.balance, 0) + 1000;
    let bestBudget = null;
    let iters = 0;
    const originalBudget = budget;
    while (iters++ < 40 && upper - lower > 0.01) {
      const mid = (lower + upper) / 2;
      setBudget(mid.toString());
      const res = simulateDebtPaydown();
      if (res && res.months <= target && res.months > 0) { bestBudget = mid; upper = mid; } else { lower = mid; }
    }
    if (bestBudget) {
      setBudget(Math.ceil(bestBudget).toString());
      const finalRes = simulateDebtPaydown();
      if (finalRes) setResult(finalRes);
      toast.success(`Budget set to £${Math.ceil(bestBudget).toLocaleString()} for ~${target} months`);
    } else {
      setBudget(originalBudget);
      toast.error(`Couldn't reach ${target} months with a reasonable budget`);
    }
  };

  const chartData = result?.schedule.slice(0, 200).map(s => ({ month: s.month, balance: s.totalBalance })) || [];
  const seo = seoData["/finance/multi-card-payoff"];

  const faqSchema = [
    { question: "What is the best strategy to pay off multiple credit cards?", answer: "Two popular strategies are the avalanche method (pay highest interest first to save the most money) and the snowball method (pay smallest balance first for psychological wins). The avalanche method saves more in interest." },
    { question: "Should I consolidate my credit card debt?", answer: "Debt consolidation can simplify payments and reduce interest if you qualify for a lower rate. Compare the consolidation loan rate to your existing card rates before deciding." },
    { question: "How long will it take to pay off my credit cards?", answer: "It depends on your balances, interest rates, and monthly payments. Use a multi-card payoff calculator to see exact timelines and total interest under different payment strategies." },
    { question: "What happens if I only make minimum payments?", answer: "Minimum payments extend your repayment timeline significantly and result in paying much more interest overall. Even small additional payments make a large difference to the total cost." }
  ];

  return (
    <>
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/multi-card-payoff`} faqSchema={faqSchema} />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Multi-Card Payoff</span>
          </nav>
        </div>

        {/* Hero title */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 select-none">
          <div className="absolute w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.07] pointer-events-none -z-10" style={{ background: ACCENT }} />
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[12vw] md:text-[95px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
            }}>MULTI-CARD</span>
            <span className="block text-[8vw] md:text-[65px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>PAYOFF</span>
            <span className="block text-[5vw] md:text-[42px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
              CALCULATOR
            </span>
          </h1>
          <div className="mt-6 max-w-md pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
              Simulate Avalanche or Snowball payoff across multiple credit cards. See exactly when each card gets paid off and how much interest you'll save.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 pb-20 space-y-4">

          {/* Strategy & Budget */}
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest mb-5" style={{ color: ACCENT }}>Strategy & Budget</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <div>
                <label className={labelClass}>Strategy</label>
                <Select value={strategy} onValueChange={(v: any) => setStrategy(v)}>
                  <SelectTrigger className="w-full bg-black/40 border-white/10 text-white rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1A1A] border-white/10 text-white">
                    <SelectItem value="avalanche">Avalanche (highest APR)</SelectItem>
                    <SelectItem value="snowball">Snowball (lowest balance)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Monthly Budget (£)</label>
                <DI value={budget} onChange={setBudget} min="1" step="1" />
              </div>
              <div>
                <label className={labelClass}>Days per Cycle</label>
                <DI value={days} onChange={setDays} min="28" max="31" />
              </div>
              <div>
                <label className={labelClass}>Max Months (Safety)</label>
                <DI value={maxMonths} onChange={setMaxMonths} min="12" step="12" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleSimulate}
                className="flex items-center gap-2 px-6 py-3 text-black font-heading font-bold rounded-lg text-xs uppercase tracking-widest transition-all"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
                Simulate
              </button>
              <button onClick={addCard}
                className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg font-heading text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
                <Plus className="h-3 w-3" /> Add Card
              </button>
              <button onClick={loadDemo}
                className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg font-heading text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
                Load Demo
              </button>
            </div>
            <p className="text-[10px] text-white/20 font-sans mt-3">
              Min payment model: max(floor, min% × balance, interest + 1)
            </p>
          </div>

          {/* Cards table */}
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest mb-5" style={{ color: ACCENT }}>Credit Cards</p>
            {cards.length === 0 ? (
              <p className="text-white/20 text-xs font-sans text-center py-6">No cards added. Click "Add Card" above.</p>
            ) : (
              <div className="space-y-3">
                {/* Header */}
                <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_40px] gap-3">
                  {["Name", "Balance (£)", "APR (%)", "Min %", "Min Floor (£)", ""].map(h => (
                    <p key={h} className="text-[9px] font-heading uppercase tracking-widest text-white/25">{h}</p>
                  ))}
                </div>
                {cards.map(card => (
                  <div key={card.id} className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_40px] gap-3 items-center p-4 md:p-0 bg-white/[0.02] md:bg-transparent border border-white/5 md:border-0 rounded-xl">
                    <DI value={card.name} onChange={v => updateCard(card.id, "name", v)} type="text" placeholder="Card name" />
                    <DI value={card.balance} onChange={v => updateCard(card.id, "balance", parseFloat(v) || 0)} step="0.01" min="0" />
                    <DI value={card.apr}     onChange={v => updateCard(card.id, "apr",     parseFloat(v) || 0)} step="0.01" min="0" />
                    <DI value={card.minPct}  onChange={v => updateCard(card.id, "minPct",  parseFloat(v) || 0)} step="0.01" min="0" />
                    <DI value={card.floorMin} onChange={v => updateCard(card.id, "floorMin", parseFloat(v) || 0)} step="1" min="0" />
                    <button onClick={() => removeCard(card.id)} className="flex items-center justify-center w-9 h-9 text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <>
              {/* Summary */}
              <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="text-[10px] font-heading uppercase tracking-widest mb-5" style={{ color: ACCENT }}>Results Summary</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total Months",   value: `${result.months}`,                                                                      large: true },
                    { label: "Total Interest", value: `£${result.totalInterestAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                    { label: "Total Paid",     value: `£${result.totalPaidAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                  ].map(({ label, value, large }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{label}</p>
                      <p className={`font-display ${large ? "text-4xl" : "text-2xl"} text-white`} style={{ color: large ? ACCENT : "white" }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Payoff timeline pills */}
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Payoff Timeline</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.cards.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full">
                      <span className="font-heading text-xs text-white">{c.name}:</span>
                      <span className="text-white/40 text-xs font-sans">{c.paidOffMonth ? `${c.paidOffMonth} mo` : "—"}</span>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontFamily: "Oswald", fontSize: 11 }}
                        label={{ value: "Month", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.3)", fontFamily: "Oswald", fontSize: 10 }} />
                      <YAxis stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontFamily: "Oswald", fontSize: 11 }}
                        tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(v: number) => [`£${v.toFixed(2)}`, "Balance"]}
                        contentStyle={{ backgroundColor: "#1C1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontFamily: "Oswald" }}
                      />
                      <Line type="monotone" dataKey="balance" stroke={ACCENT} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Months to Pay Off", value: `${result.months}` },
                  { label: "Total Interest", value: `£${result.totalInterestAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                  { label: "Total Paid", value: `£${result.totalPaidAll.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                ]} />

                {/* Action buttons */}
                <div className="flex gap-3 mt-5">
                  <button onClick={downloadCSV}
                    className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg font-heading text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <Download className="h-3 w-3" /> Download CSV
                  </button>
                  <button onClick={solveForTarget}
                    className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg font-heading text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <Target className="h-3 w-3" /> Solve for Target
                  </button>
                </div>
              </div>

              {/* Schedule table */}
              <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="text-[10px] font-heading uppercase tracking-widest mb-5" style={{ color: ACCENT }}>Payment Schedule (First 50 Months)</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["Month", "Spend", "Interest", "Balance"].map((h, i) => (
                          <th key={h} className={`py-3 font-heading uppercase tracking-widest text-white/25 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.slice(0, 50).map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-2.5 text-white/50 font-heading">{row.month}</td>
                          <td className="py-2.5 text-right font-heading text-white/50">£{row.spend.toFixed(2)}</td>
                          <td className="py-2.5 text-right font-heading text-white/50">£{row.interest.toFixed(2)}</td>
                          <td className="py-2.5 text-right font-heading text-white">£{row.totalBalance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.schedule.length > 50 && (
                  <p className="text-[10px] text-white/20 font-sans mt-4 text-center">
                    Showing 50 of {result.schedule.length} months. Download CSV for full schedule.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
}