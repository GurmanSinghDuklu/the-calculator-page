import { Logo } from "@/components/Logo";
import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { toast } from "sonner";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Plus, Trash2, ArrowRight, CreditCard, TrendingDown, Zap, Info } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT   = "#3B82F6";
const AV_COLOR = "#3B82F6";   // blue  — avalanche
const SB_COLOR = "#F97316";   // orange — snowball

// ─── Types ────────────────────────────────────────────────────────────────────
interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

interface StrategyResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  payoffOrder: string[];
  balanceByMonth: number[];
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

function StyledInput({ value, onChange, prefix, suffix, placeholder, step = "1" }: {
  value: string; onChange: (v: string) => void;
  prefix?: string; suffix?: string; placeholder?: string; step?: string;
}) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-heading pointer-events-none">{prefix}</span>}
      <input
        type="number" step={step} min="0"
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-black/40 border border-white/10 rounded-lg py-3 text-white text-sm font-medium placeholder-white/20 focus:outline-none transition-all ${prefix ? "pl-7 pr-3" : suffix ? "pl-3 pr-7" : "px-3"}`}
        onFocus={e => (e.target.style.borderColor = ACCENT)}
        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-heading pointer-events-none">{suffix}</span>}
    </div>
  );
}

// ─── Simulation engine ────────────────────────────────────────────────────────
function simulate(
  debts: Debt[],
  strategy: "avalanche" | "snowball",
  extraBudget: number
): StrategyResult {
  // monthly rate: daily compounding approximation
  const rate = (apr: number) => Math.pow(1 + apr / 100 / 365, 365 / 12) - 1;

  const state = debts.map(d => ({ ...d, balance: d.balance }));
  let totalInterest = 0;
  let months = 0;
  const balanceByMonth: number[] = [state.reduce((s, d) => s + d.balance, 0)];
  const payoffOrder: string[] = [];
  const maxMonths = 1200;

  while (state.some(d => d.balance > 0.01) && months < maxMonths) {
    months++;

    // 1. accrue interest & pay minimums
    let freed = 0;
    for (const d of state) {
      if (d.balance <= 0) continue;
      const interest = d.balance * rate(d.apr);
      totalInterest += interest;
      d.balance += interest;
      const pay = Math.min(d.minPayment, d.balance);
      d.balance -= pay;
      if (d.balance <= 0.01) {
        freed += d.minPayment - d.balance;
        d.balance = 0;
        if (!payoffOrder.includes(d.name)) payoffOrder.push(d.name);
      }
    }

    // 2. apply extra budget to priority debt
    let extra = extraBudget + freed;
    const active = state
      .filter(d => d.balance > 0.01)
      .sort((a, b) =>
        strategy === "avalanche"
          ? b.apr - a.apr          // highest APR first
          : a.balance - b.balance  // lowest balance first
      );

    for (const target of active) {
      if (extra <= 0) break;
      const pay = Math.min(extra, target.balance);
      target.balance -= pay;
      extra -= pay;
      if (target.balance <= 0.01) {
        target.balance = 0;
        if (!payoffOrder.includes(target.name)) payoffOrder.push(target.name);
      }
    }

    balanceByMonth.push(state.reduce((s, d) => s + Math.max(0, d.balance), 0));
  }

  return {
    months,
    totalInterest,
    totalPaid: debts.reduce((s, d) => s + d.balance, 0) + totalInterest,
    payoffOrder,
    balanceByMonth,
  };
}

// ─── Custom tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, sym }: {
  active?: boolean; payload?: Array<{ name: string; value: number; color: string }>;
  label?: number; sym: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-xs font-sans shadow-xl">
      <p className="font-heading text-white/40 uppercase tracking-widest text-[9px] mb-2">Month {label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="text-white font-medium">{sym}{Number(p.value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CreditCardPayoff() {
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [extraBudget, setExtraBudget] = useState("200");
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Visa Card",    balance: 3200, apr: 24.9, minPayment: 65 },
    { id: "2", name: "Store Card",   balance: 1100, apr: 39.9, minPayment: 30 },
    { id: "3", name: "Loan",         balance: 5000, apr: 14.9, minPayment: 120 },
  ]);
  const [sliderMonth, setSliderMonth] = useState(0);
  const [results, setResults] = useState<{ avalanche: StrategyResult; snowball: StrategyResult } | null>(null);

  const sym = currencies[currency].symbol;

  const addDebt = () => setDebts(prev => [...prev, {
    id: Date.now().toString(),
    name: `Debt ${prev.length + 1}`,
    balance: 0, apr: 18.9, minPayment: 25,
  }]);

  const removeDebt = (id: string) => setDebts(prev => prev.filter(d => d.id !== id));

  const updateDebt = (id: string, field: keyof Debt, val: string) =>
    setDebts(prev => prev.map(d => d.id === id
      ? { ...d, [field]: field === "name" ? val : parseFloat(val) || 0 }
      : d
    ));

  const calculate = () => {
    if (!debts.length) { toast.error("Add at least one debt"); return; }
    const hasInvalid = debts.some(d => d.balance <= 0 || d.apr <= 0 || d.minPayment <= 0);
    if (hasInvalid) { toast.error("Check all debt fields — balance, APR and minimum payment must be positive"); return; }

    const extra = parseFloat(extraBudget) || 0;
    const av = simulate(debts, "avalanche", extra);
    const sb = simulate(debts, "snowball", extra);
    setResults({ avalanche: av, snowball: sb });
    setSliderMonth(0);
  };

  // Build chart data aligned to the longer of the two strategies
  const chartData = useMemo(() => {
    if (!results) return [];
    const maxLen = Math.max(results.avalanche.balanceByMonth.length, results.snowball.balanceByMonth.length);
    return Array.from({ length: maxLen }, (_, i) => ({
      month: i,
      Avalanche: results.avalanche.balanceByMonth[i] ?? 0,
      Snowball:  results.snowball.balanceByMonth[i] ?? 0,
    }));
  }, [results]);

  const maxMonth = chartData.length > 1 ? chartData.length - 1 : 0;

  const fmt = (n: number) => sym + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n: number) => sym + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalDebt = debts.reduce((s, d) => s + (d.balance || 0), 0);

  const seo = seoData["/finance/credit-card-payoff"];

  return (
    <>
      <SEO
        title="Debt Payoff Calculator — Avalanche vs Snowball Strategy UK 2026"
        description="Compare the debt avalanche and debt snowball methods side by side. Add all your debts, set a monthly budget and see exactly which strategy pays you off faster and saves the most interest."
        keywords="debt payoff calculator UK, avalanche vs snowball debt, credit card payoff calculator, debt avalanche calculator, debt snowball calculator, pay off multiple debts, best debt repayment strategy UK"
        canonicalUrl="https://www.thecalculatorapp.org/finance/credit-card-payoff"
        faqSchema={[
          { question: "What is the debt avalanche method?", answer: "The debt avalanche method means paying minimums on all debts and directing any extra money to the debt with the highest interest rate first. Once that's cleared, you roll its payment to the next highest-rate debt. This strategy minimises total interest paid." },
          { question: "What is the debt snowball method?", answer: "The debt snowball method targets your smallest balance first while paying minimums on all others. When that's cleared, you roll its payment into the next smallest. The psychological wins of clearing debts quickly can help people stay motivated." },
          { question: "Which is better — avalanche or snowball?", answer: "Mathematically, the avalanche almost always saves more money. But research shows many people stick with snowball longer because of the motivational boost from clearing small debts. The best method is whichever you'll stick to." },
          { question: "How does the debt snowball affect my credit score?", answer: "Paying off debts improves your credit score regardless of strategy. Closing accounts may slightly reduce your available credit, but the overall impact of becoming debt-free is strongly positive." },
          { question: "What monthly budget should I use?", answer: "The extra budget field is the amount you can add on top of all minimum payments. Even an extra £50–100/month can dramatically reduce your payoff time. Enter what you can realistically commit to every month." },
        ]}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Debt Payoff Calculator</span>
          </nav>
        </div>

        {/* Hero header */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-[400px] h-[400px] rounded-full blur-[120px] opacity-8 pointer-events-none" style={{ background: ACCENT }} />
            <div className="absolute -top-10 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-6 pointer-events-none bg-orange-500" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-heading uppercase tracking-widest mb-6">
              <CreditCard className="w-3 h-3" />
              Debt Payoff Strategies
            </div>

            <h1 className="font-display leading-none tracking-wide mb-6">
              <span className="block text-[13vw] sm:text-[90px] lg:text-[110px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 60%, ${SB_COLOR} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>DEBT</span>
              <span className="block text-[8vw] sm:text-[54px] lg:text-[66px] text-white/90 -mt-2">PAYOFF CALCULATOR</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 max-w-2xl">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-500/20 bg-blue-500/8 flex-1">
                <TrendingDown className="w-4 h-4 flex-shrink-0" style={{ color: AV_COLOR }} />
                <div>
                  <p className="font-heading text-xs text-blue-400 uppercase tracking-widest">Avalanche</p>
                  <p className="font-sans text-xs text-white/50 mt-0.5">Pay highest interest first. Saves the most money.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-orange-500/20 bg-orange-500/8 flex-1">
                <Zap className="w-4 h-4 flex-shrink-0 text-orange-400" />
                <div>
                  <p className="font-heading text-xs text-orange-400 uppercase tracking-widest">Snowball</p>
                  <p className="font-sans text-xs text-white/50 mt-0.5">Clear smallest balances first. Stay motivated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CALCULATOR ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-8">

          {/* Currency + Extra Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-dark-card border border-dark-border rounded-2xl">
            <div>
              <label className={labelClass}>Currency</label>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
            <div>
              <label className={labelClass}>Extra Monthly Budget (on top of minimums)</label>
              <StyledInput value={extraBudget} onChange={setExtraBudget} prefix={sym} placeholder="200" />
              <p className="font-sans text-[10px] text-white/30 mt-1.5">The extra amount you'll throw at debt each month beyond all minimums.</p>
            </div>
          </div>

          {/* Debt entries */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl text-white uppercase tracking-wide">Your Debts</h2>
                {totalDebt > 0 && (
                  <p className="font-sans text-xs text-white/40 mt-1">
                    Total: <span className="text-white">{fmt(totalDebt)}</span>
                  </p>
                )}
              </div>
              <button
                onClick={addDebt}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 font-heading text-xs uppercase tracking-widest hover:bg-blue-500/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Debt
              </button>
            </div>

            {/* Header row — desktop only */}
            <div className="hidden md:grid md:grid-cols-[1fr_130px_110px_110px_40px] gap-3 px-4">
              {["Name / Label", `Balance (${sym})`, "APR (%)", "Min Payment", ""].map(h => (
                <p key={h} className="text-[9px] font-heading uppercase tracking-widest text-white/25">{h}</p>
              ))}
            </div>

            {debts.map((d, idx) => (
              <div
                key={d.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_130px_110px_110px_40px] gap-3 p-4 bg-dark-card border border-dark-border rounded-xl items-end"
              >
                <div>
                  <label className="md:hidden block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1.5">Name</label>
                  <input
                    type="text" value={d.name}
                    onChange={e => updateDebt(d.id, "name", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-white text-sm font-medium focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label className="md:hidden block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1.5">Balance ({sym})</label>
                  <StyledInput value={String(d.balance)} onChange={v => updateDebt(d.id, "balance", v)} prefix={sym} placeholder="1000" />
                </div>
                <div>
                  <label className="md:hidden block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1.5">APR (%)</label>
                  <StyledInput value={String(d.apr)} onChange={v => updateDebt(d.id, "apr", v)} suffix="%" placeholder="24.9" step="0.1" />
                </div>
                <div>
                  <label className="md:hidden block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1.5">Min Payment ({sym})</label>
                  <StyledInput value={String(d.minPayment)} onChange={v => updateDebt(d.id, "minPayment", v)} prefix={sym} placeholder="25" />
                </div>
                <div className="flex items-end justify-end">
                  {debts.length > 1 && (
                    <button
                      onClick={() => removeDebt(d.id)}
                      className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Calculate button */}
          <button
            onClick={calculate}
            className="w-full group flex items-center justify-center gap-3 text-white font-heading font-bold py-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
            style={{ background: `linear-gradient(135deg, ${AV_COLOR}, #6366f1, ${SB_COLOR})`, boxShadow: `0 0 30px -8px ${ACCENT}80` }}
          >
            Calculate &amp; Compare Strategies
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* ── RESULTS ── */}
          {results && (
            <div className="space-y-8">

              {/* Strategy comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Avalanche */}
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${AV_COLOR}40`, background: `${AV_COLOR}08` }}>
                  <div className="flex items-center gap-2 mb-5">
                    <TrendingDown className="w-4 h-4" style={{ color: AV_COLOR }} />
                    <h3 className="font-display text-xl uppercase tracking-wide" style={{ color: AV_COLOR }}>Avalanche</h3>
                    {results.avalanche.totalInterest < results.snowball.totalInterest && (
                      <span className="ml-auto text-[8px] font-heading uppercase tracking-widest px-2 py-1 rounded-sm bg-green-500/10 text-green-400 border border-green-500/20">Saves More</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Debt-Free In</p>
                      <p className="font-display text-4xl text-white">{results.avalanche.months} <span className="text-xl text-white/40">months</span></p>
                      <p className="font-sans text-xs text-white/30 mt-1">≈ {(results.avalanche.months / 12).toFixed(1)} years</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/8">
                      <div>
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Interest</p>
                        <p className="font-heading text-lg" style={{ color: AV_COLOR }}>{fmtDec(results.avalanche.totalInterest)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Paid</p>
                        <p className="font-heading text-lg text-white">{fmtDec(results.avalanche.totalPaid)}</p>
                      </div>
                    </div>
                    {results.avalanche.payoffOrder.length > 0 && (
                      <div className="pt-3 border-t border-white/8">
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Payoff Order</p>
                        <div className="flex flex-wrap gap-1.5">
                          {results.avalanche.payoffOrder.map((name, i) => (
                            <span key={name} className="text-[9px] font-heading uppercase tracking-wide px-2 py-1 rounded border border-blue-500/20 text-blue-300/70">
                              {i + 1}. {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Snowball */}
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${SB_COLOR}40`, background: `${SB_COLOR}08` }}>
                  <div className="flex items-center gap-2 mb-5">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <h3 className="font-display text-xl uppercase tracking-wide text-orange-400">Snowball</h3>
                    {results.snowball.months < results.avalanche.months && (
                      <span className="ml-auto text-[8px] font-heading uppercase tracking-widest px-2 py-1 rounded-sm bg-green-500/10 text-green-400 border border-green-500/20">Faster</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Debt-Free In</p>
                      <p className="font-display text-4xl text-white">{results.snowball.months} <span className="text-xl text-white/40">months</span></p>
                      <p className="font-sans text-xs text-white/30 mt-1">≈ {(results.snowball.months / 12).toFixed(1)} years</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/8">
                      <div>
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Interest</p>
                        <p className="font-heading text-lg text-orange-400">{fmtDec(results.snowball.totalInterest)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Paid</p>
                        <p className="font-heading text-lg text-white">{fmtDec(results.snowball.totalPaid)}</p>
                      </div>
                    </div>
                    {results.snowball.payoffOrder.length > 0 && (
                      <div className="pt-3 border-t border-white/8">
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Payoff Order</p>
                        <div className="flex flex-wrap gap-1.5">
                          {results.snowball.payoffOrder.map((name, i) => (
                            <span key={name} className="text-[9px] font-heading uppercase tracking-wide px-2 py-1 rounded border border-orange-500/20 text-orange-300/70">
                              {i + 1}. {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Savings callout */}
              {Math.abs(results.avalanche.totalInterest - results.snowball.totalInterest) > 1 && (
                <div className="flex items-start gap-4 p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                  <Info className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-white/70 leading-relaxed">
                    The <strong className="text-white">avalanche method</strong> saves you{" "}
                    <strong className="text-green-400">{fmtDec(Math.abs(results.snowball.totalInterest - results.avalanche.totalInterest))}</strong>{" "}
                    in interest compared to snowball
                    {results.avalanche.months !== results.snowball.months && (
                      <> and{" "}
                        {results.avalanche.months < results.snowball.months
                          ? <><strong className="text-green-400">{results.snowball.months - results.avalanche.months} months faster</strong></>
                          : <><strong className="text-orange-400">{results.avalanche.months - results.snowball.months} months slower</strong></>
                        }
                      </>
                    )}.
                  </p>
                </div>
              )}

              {/* Chart */}
              <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-white uppercase tracking-wide">Balance Over Time</h3>
                    <p className="font-sans text-xs text-white/40 mt-1">Drag the slider to explore each month</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-heading uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: AV_COLOR, display: "inline-block" }} />Avalanche</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-orange-400 inline-block" />Snowball</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradAv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={AV_COLOR} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={AV_COLOR} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradSb" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={SB_COLOR} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={SB_COLOR} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "inherit" }}
                      label={{ value: "Months", position: "insideBottom", offset: -2, fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
                    />
                    <YAxis
                      tickFormatter={v => `${sym}${(v / 1000).toFixed(0)}k`}
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "inherit" }}
                      width={52}
                    />
                    <Tooltip content={<ChartTooltip sym={sym} />} />
                    <Area type="monotone" dataKey="Avalanche" stroke={AV_COLOR} strokeWidth={2} fill="url(#gradAv)" dot={false} activeDot={{ r: 4, fill: AV_COLOR }} />
                    <Area type="monotone" dataKey="Snowball"  stroke={SB_COLOR} strokeWidth={2} fill="url(#gradSb)" dot={false} activeDot={{ r: 4, fill: SB_COLOR }} />
                    {/* Vertical line at slider position */}
                    {sliderMonth > 0 && (
                      <CartesianGrid
                        vertical={false}
                        horizontalPoints={[]}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>

                {/* Slider */}
                {maxMonth > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-heading uppercase tracking-widest text-white/30">
                      <span>Month 0</span>
                      <span className="text-white/60">Month {sliderMonth}</span>
                      <span>Month {maxMonth}</span>
                    </div>
                    <input
                      type="range"
                      min={0} max={maxMonth} step={1}
                      value={sliderMonth}
                      onChange={e => setSliderMonth(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                      style={{ accentColor: ACCENT }}
                    />
                    {/* Snapshot at slider month */}
                    {chartData[sliderMonth] && (
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                          <p className="text-[9px] font-heading uppercase tracking-widest text-blue-400/70 mb-1">Avalanche — Month {sliderMonth}</p>
                          <p className="font-display text-xl text-white">{fmt(chartData[sliderMonth].Avalanche)}</p>
                          <p className="font-sans text-[10px] text-white/30 mt-0.5">remaining balance</p>
                        </div>
                        <div className="p-3 rounded-lg border border-orange-500/20 bg-orange-500/5">
                          <p className="text-[9px] font-heading uppercase tracking-widest text-orange-400/70 mb-1">Snowball — Month {sliderMonth}</p>
                          <p className="font-display text-xl text-white">{fmt(chartData[sliderMonth].Snowball)}</p>
                          <p className="font-sans text-[10px] text-white/30 mt-0.5">remaining balance</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STRATEGY EXPLAINERS ── */}
          <div className="pt-8 border-t border-dark-border space-y-16">

            {/* Avalanche deep-dive */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${AV_COLOR}20` }}>
                  <TrendingDown className="w-4 h-4" style={{ color: AV_COLOR }} />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide">The Debt Avalanche</h2>
                  <p className="font-sans text-xs text-blue-400 mt-0.5">Mathematically optimal — minimises total interest paid</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <p className="font-sans text-sm text-white/65 leading-relaxed">
                    The debt avalanche is the mathematically correct approach to debt repayment. You pay the minimum on every
                    debt and throw every spare pound at the one with the highest annual percentage rate (APR).
                    Once that debt reaches zero, you roll its minimum payment — plus your extra budget — into the next
                    highest-rate debt. The momentum builds like an avalanche picking up speed.
                  </p>
                  <p className="font-sans text-sm text-white/65 leading-relaxed">
                    Because you're always attacking the debt that is costing you the most per pound of outstanding balance,
                    you eliminate interest charges faster than any other strategy. Over the life of your repayment, this
                    almost always results in the lowest total amount paid.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-xs text-white/40 uppercase tracking-widest">How it works — step by step</h3>
                  {[
                    { n: "01", t: "List all debts by APR (highest to lowest)", d: "Order your credit cards, loans, and overdrafts by their interest rate — not by balance." },
                    { n: "02", t: "Pay minimums on everything", d: "Make the minimum payment on every single debt to avoid late fees and penalty rates." },
                    { n: "03", t: "Direct all extra money to #1", d: "Every spare pound — after minimums — goes to the highest-APR debt until it's gone." },
                    { n: "04", t: "Roll and repeat", d: "When a debt hits zero, its entire payment is redirected to the next debt on the list." },
                  ].map(step => (
                    <div key={step.n} className="flex gap-3">
                      <span className="font-display text-lg flex-shrink-0 leading-none mt-0.5" style={{ color: AV_COLOR }}>{step.n}</span>
                      <div>
                        <p className="font-heading text-xs text-white uppercase tracking-wide mb-0.5">{step.t}</p>
                        <p className="font-sans text-xs text-white/45 leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-dark-border rounded-xl overflow-hidden">
                {[
                  { icon: "✓", label: "Saves the most money", desc: "By attacking high-interest debt first, you eliminate the most expensive part of your debt load as quickly as possible." },
                  { icon: "✓", label: "Mathematically optimal", desc: "No other strategy consistently produces a lower total interest bill when the same budget is applied." },
                  { icon: "✗", label: "Slower psychological wins", desc: "High-APR debts often have large balances. You may not see a debt cleared for many months, which can feel discouraging." },
                ].map(item => (
                  <div key={item.label} className="bg-dark-card p-5">
                    <p className={`font-heading text-xs uppercase tracking-wide mb-2 ${item.icon === "✓" ? "text-green-400" : "text-red-400"}`}>{item.icon} {item.label}</p>
                    <p className="font-sans text-xs text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Snowball deep-dive */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500/15">
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide">The Debt Snowball</h2>
                  <p className="font-sans text-xs text-orange-400 mt-0.5">Psychologically powerful — keeps you motivated with early wins</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <p className="font-sans text-sm text-white/65 leading-relaxed">
                    The debt snowball, popularised by Dave Ramsey, ignores interest rates entirely. Instead, you focus on
                    your smallest balance — regardless of APR — because clearing a debt in full delivers a powerful
                    psychological reward that keeps you engaged in the process.
                  </p>
                  <p className="font-sans text-sm text-white/65 leading-relaxed">
                    Research published in the <em>Journal of Marketing Research</em> found that people who focus on
                    clearing one debt at a time — rather than attacking the highest interest — are more likely to eliminate
                    all their debt. The reason: motivation compounds just like debt does.
                    Each cleared debt increases the payment available for the next one, creating genuine momentum.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-xs text-white/40 uppercase tracking-widest">How it works — step by step</h3>
                  {[
                    { n: "01", t: "List all debts by balance (smallest first)", d: "Ignore the interest rates. Put the debt with the lowest remaining balance at the top." },
                    { n: "02", t: "Pay minimums on everything else", d: "Keep all other debts current with their minimums to avoid fees and rate increases." },
                    { n: "03", t: "Crush the smallest debt with everything you have", d: "All extra budget goes to that one target. The faster it clears, the faster the snowball rolls." },
                    { n: "04", t: "Roll the freed payment forward", d: "When a debt clears, its minimum plus your extra rolls straight into the next smallest." },
                  ].map(step => (
                    <div key={step.n} className="flex gap-3">
                      <span className="font-display text-lg flex-shrink-0 leading-none mt-0.5 text-orange-400">{step.n}</span>
                      <div>
                        <p className="font-heading text-xs text-white uppercase tracking-wide mb-0.5">{step.t}</p>
                        <p className="font-sans text-xs text-white/45 leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-dark-border rounded-xl overflow-hidden">
                {[
                  { icon: "✓", label: "Fast early wins", desc: "Clearing a small debt completely — even a £300 store card — delivers a real sense of progress that keeps you going." },
                  { icon: "✓", label: "Higher completion rate", desc: "Studies show snowball users are more likely to become fully debt-free because they stay engaged in the process longer." },
                  { icon: "✗", label: "Costs more interest", desc: "By ignoring APR, you may leave your most expensive debt unpaid for longer — costing more in total interest." },
                ].map(item => (
                  <div key={item.label} className="bg-dark-card p-5">
                    <p className={`font-heading text-xs uppercase tracking-wide mb-2 ${item.icon === "✓" ? "text-green-400" : "text-red-400"}`}>{item.icon} {item.label}</p>
                    <p className="font-sans text-xs text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Head to head comparison */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-8">
                Avalanche vs Snowball — <span style={{ color: ACCENT }}>Head to Head</span>
              </h2>
              <div className="overflow-x-auto rounded-xl border border-dark-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-border bg-dark-card">
                      <th className="text-left px-5 py-3 font-heading text-[9px] text-white/40 uppercase tracking-widest">Factor</th>
                      <th className="text-left px-5 py-3 font-heading text-[9px] uppercase tracking-widest" style={{ color: AV_COLOR }}>Avalanche</th>
                      <th className="text-left px-5 py-3 font-heading text-[9px] text-orange-400 uppercase tracking-widest">Snowball</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {[
                      ["Priority target", "Highest APR debt", "Smallest balance"],
                      ["Total interest paid", "Lower ✓", "Higher"],
                      ["Time to first cleared debt", "Can be longer", "Faster ✓"],
                      ["Psychological motivation", "Slower to feel progress", "Early wins ✓"],
                      ["Best for", "High-rate cards with large balances", "Many small debts or low discipline"],
                      ["Mathematically optimal?", "Yes ✓", "No"],
                      ["Completion rate (research)", "Lower — harder to stick to", "Higher ✓ (Journal of Marketing Research)"],
                    ].map(([factor, av, sb]) => (
                      <tr key={factor} className="bg-dark-bg hover:bg-dark-card transition-colors">
                        <td className="px-5 py-3 font-heading text-xs text-white/50 uppercase tracking-wide">{factor}</td>
                        <td className="px-5 py-3 font-sans text-xs text-white/65">{av}</td>
                        <td className="px-5 py-3 font-sans text-xs text-white/65">{sb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Which to choose */}
            <div className="p-6 rounded-2xl border border-dark-border bg-dark-card">
              <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-5">Which Strategy Should You Choose?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="font-heading text-xs uppercase tracking-widest" style={{ color: AV_COLOR }}>Choose Avalanche if...</p>
                  {[
                    "You have one or two very high-APR debts (over 25%) eating into your budget",
                    "You're data-driven and respond to numbers rather than feelings",
                    "The interest difference between your debts is large",
                    "You're confident you'll stick to the plan regardless of early progress",
                  ].map(p => (
                    <div key={p} className="flex gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: AV_COLOR }} />
                      <p className="font-sans text-xs text-white/55 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="font-heading text-xs text-orange-400 uppercase tracking-widest">Choose Snowball if...</p>
                  {[
                    "You have several small debts that could be cleared quickly",
                    "You've struggled with debt motivation or previous plans before",
                    "The psychological reward of clearing a debt matters to you",
                    "Your interest rates are similar across debts (the difference in total cost is then small)",
                  ].map(p => (
                    <div key={p} className="flex gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-orange-400" />
                      <p className="font-sans text-xs text-white/55 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg border border-white/8 bg-white/3">
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  <strong className="text-white">Bottom line:</strong> The best strategy is the one you'll actually follow through on.
                  If snowball keeps you motivated and you stick with it, you'll end up in a better position than someone who
                  chose avalanche and gave up after six months. Run both through the calculator above and see how the numbers
                  compare for your specific debts.
                </p>
              </div>
            </div>

            {/* Related calculators */}
            <div>
              <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-5">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: "Loan Calculator", desc: "Calculate monthly payments and total interest for any personal loan.", to: "/finance/loan" },
                  { title: "Budget Calculator", desc: "Map your income against expenses to find money to throw at debt.", to: "/finance/budget" },
                  { title: "Compound Interest", desc: "See how interest grows — and why clearing high-APR debt is so urgent.", to: "/finance/compound-interest" },
                  { title: "Compound Interest Formula Guide", desc: "Deep-dive: how compounding works, crypto markets, DCA, and inflation-adjusted returns.", to: "/learn/compound-interest-formula" },
                ].map(c => (
                  <Link key={c.to} to={c.to}
                    className="flex flex-col gap-2 p-5 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/40 transition-colors group"
                  >
                    <p className="font-heading text-sm text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors">{c.title}</p>
                    <p className="font-sans text-xs text-white/45 leading-relaxed flex-1">{c.desc}</p>
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <FinancialDisclosure variant="general" />
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
